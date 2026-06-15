'use client'
import { useRef, useEffect, useState, useCallback } from 'react'
import {
  Bold, Italic, Underline, Strikethrough, Heading2, Heading3, Heading4,
  Highlighter, Quote, List, ListOrdered, Link2, Unlink, Image as ImageIcon,
  Table as TableIcon, Code2, AlignLeft, AlignCenter, AlignRight,
  Undo2, Redo2, Eraser, Minus, Pilcrow, Type, Eye, Loader2, FileCode
} from 'lucide-react'
import toast from 'react-hot-toast'
import EditorPromptModal from './EditorPromptModal'

/**
 * Dependency-free modern WYSIWYG blog editor.
 * Outputs clean HTML that is rendered on the public site via `prose-luxury`.
 * Supports headings, highlight, internal/external links (interlinks & backlinks),
 * tables, images (upload or URL), lists, quotes, code blocks and a raw-HTML view.
 */
export default function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null)
  const fileInputRef = useRef(null)
  const htmlFileRef = useRef(null)
  const [showSource, setShowSource] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [counts, setCounts] = useState({ words: 0, chars: 0 })
  const [prompt, setPrompt] = useState(null) // { config, resolve }
  const savedRange = useRef(null)

  // Promise-based replacement for window.prompt() using the themed modal.
  function askInput(config) {
    return new Promise((resolve) => setPrompt({ config, resolve }))
  }

  // Sync external value into the editable area (only when it actually differs,
  // so typing never resets the caret). Decode content that was accidentally
  // saved as escaped HTML (e.g. pasted as plain text) so it renders properly.
  useEffect(() => {
    if (showSource) return
    const decoded = decodeIfEscaped(value || '')
    if (editorRef.current && decoded !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = decoded
      updateCounts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, showSource])

  const updateCounts = useCallback(() => {
    const text = editorRef.current?.innerText || ''
    const words = text.trim() ? text.trim().split(/\s+/).length : 0
    setCounts({ words, chars: text.length })
  }, [])

  const emit = useCallback(() => {
    if (!editorRef.current) return
    onChange(editorRef.current.innerHTML)
    updateCounts()
  }, [onChange, updateCounts])

  // When the clipboard contains HTML *source code* (e.g. you copied the snippet
  // we gave you), render it as real HTML instead of escaping it into text.
  function handlePaste(e) {
    const cb = e.clipboardData
    if (!cb) return
    // 1) Pasted image (e.g. screenshot from clipboard) → upload + insert inline.
    const imageItem = Array.from(cb.items || []).find((it) => it.type.startsWith('image/'))
    if (imageItem) {
      const file = imageItem.getAsFile()
      if (file) {
        e.preventDefault()
        saveSelection()
        uploadAndInsertImage(file, { askAlt: false })
        return
      }
    }
    // 2) Pasted HTML source code → render it as real HTML instead of escaping.
    const text = cb.getData('text/plain')
    if (text && looksLikeHtml(text)) {
      e.preventDefault()
      editorRef.current?.focus()
      document.execCommand('insertHTML', false, text)
      emit()
    }
    // Otherwise let the browser handle a normal paste.
  }

  function saveSelection() {
    const sel = window.getSelection()
    if (sel && sel.rangeCount > 0) savedRange.current = sel.getRangeAt(0)
  }

  function restoreSelection() {
    const sel = window.getSelection()
    if (savedRange.current && sel) {
      sel.removeAllRanges()
      sel.addRange(savedRange.current)
    }
  }

  function exec(command, arg = null) {
    editorRef.current?.focus()
    restoreSelection()
    document.execCommand(command, false, arg)
    emit()
  }

  function format(tag) {
    exec('formatBlock', tag)
  }

  // Wrap the current selection in a tag (used for <mark> highlight).
  function highlight() {
    editorRef.current?.focus()
    restoreSelection()
    const sel = window.getSelection()
    if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
      // Nothing selected — toggle highlight off for parent mark if caret inside one
      return
    }
    const range = sel.getRangeAt(0)
    // If selection is already fully inside a <mark>, unwrap it.
    const parentMark = closestTag(range.commonAncestorContainer, 'MARK')
    if (parentMark) {
      const parent = parentMark.parentNode
      while (parentMark.firstChild) parent.insertBefore(parentMark.firstChild, parentMark)
      parent.removeChild(parentMark)
    } else {
      const mark = document.createElement('mark')
      try {
        mark.appendChild(range.extractContents())
        range.insertNode(mark)
      } catch {
        document.execCommand('hiliteColor', false, '#fde9b6')
      }
    }
    sel.removeAllRanges()
    emit()
  }

  function closestTag(node, tagName) {
    let n = node
    while (n && n !== editorRef.current) {
      if (n.nodeType === 1 && n.tagName === tagName) return n
      n = n.parentNode
    }
    return null
  }

  function insertHTML(html) {
    editorRef.current?.focus()
    restoreSelection()
    document.execCommand('insertHTML', false, html)
    emit()
  }

  async function insertLink() {
    saveSelection()
    const sel = window.getSelection()
    const selectedText = sel ? sel.toString() : ''
    const fields = [
      { name: 'url', label: 'Link URL', placeholder: '/blog/my-post  or  https://…', defaultValue: 'https://', hint: 'Use /page for internal links (interlinks); full https:// links open in a new tab.' },
    ]
    if (!selectedText) {
      fields.push({ name: 'text', label: 'Link text', placeholder: 'Text to display' })
    }
    const res = await askInput({ title: 'Insert Link', confirmText: 'Insert link', fields })
    if (!res || !res.url) return
    const url = res.url
    const isExternal = /^https?:\/\//i.test(url) && !url.includes('weddinggurukul.com')
    const rel = isExternal ? ' rel="noopener noreferrer"' : ''
    const target = isExternal ? ' target="_blank"' : ''
    const text = selectedText || res.text || url
    editorRef.current?.focus()
    restoreSelection()
    document.execCommand('insertHTML', false,
      `<a href="${escapeAttr(url)}"${target}${rel}>${escapeHtml(text)}</a>`)
    emit()
  }

  async function insertTable() {
    saveSelection()
    const res = await askInput({
      title: 'Insert Table',
      confirmText: 'Insert table',
      fields: [
        { name: 'rows', label: 'Rows (including header)', type: 'number', defaultValue: '3' },
        { name: 'cols', label: 'Columns', type: 'number', defaultValue: '3' },
      ],
    })
    if (!res) return
    const rows = parseInt(res.rows || '0', 10)
    const cols = parseInt(res.cols || '0', 10)
    if (!rows || !cols || rows < 1 || cols < 1) return
    let html = '<table><thead><tr>'
    for (let c = 0; c < cols; c++) html += `<th>Heading ${c + 1}</th>`
    html += '</tr></thead><tbody>'
    for (let r = 1; r < rows; r++) {
      html += '<tr>'
      for (let c = 0; c < cols; c++) html += '<td>Cell</td>'
      html += '</tr>'
    }
    html += '</tbody></table><p><br/></p>'
    insertHTML(html)
  }

  async function insertImageByUrl() {
    saveSelection()
    const res = await askInput({
      title: 'Insert Image by URL',
      confirmText: 'Insert image',
      fields: [
        { name: 'url', label: 'Image URL', placeholder: 'https://…', defaultValue: 'https://' },
        { name: 'alt', label: 'Alt text', placeholder: 'Describe the image', hint: 'Used for SEO & accessibility.' },
      ],
    })
    if (!res || !res.url || res.url === 'https://') return
    const alt = res.alt || ''
    insertHTML(`<figure><img src="${escapeAttr(res.url)}" alt="${escapeAttr(alt)}" />${alt ? `<figcaption>${escapeHtml(alt)}</figcaption>` : ''}</figure><p><br/></p>`)
  }

  // Upload a single image file to /api/upload and insert it inside the content
  // at the current cursor position (asks for alt text for SEO).
  async function uploadAndInsertImage(file, { askAlt = true } = {}) {
    if (!file || !file.type?.startsWith('image/')) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('files', file)
      fd.append('folder', 'blogs')
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      const up = data?.uploaded?.[0]
      if (up?.url) {
        let alt = up.alt || ''
        if (askAlt) {
          const ans = await askInput({
            title: 'Image Alt Text',
            description: 'A short description of the image.',
            confirmText: 'Add image',
            fields: [{ name: 'alt', label: 'Alt text', placeholder: 'Describe the image', defaultValue: up.alt || '', hint: 'Used for SEO & accessibility. Leave blank to skip the caption.' }],
          })
          // ans === null means the user cancelled the dialog; still insert the image.
          if (ans && typeof ans.alt === 'string') alt = ans.alt
        }
        insertHTML(`<figure><img src="${escapeAttr(up.url)}" alt="${escapeAttr(alt)}" />${alt ? `<figcaption>${escapeHtml(alt)}</figcaption>` : ''}</figure><p><br/></p>`)
      } else if (data?.error) {
        toast.error('Image upload failed: ' + data.error)
      }
    } catch {
      toast.error('Image upload failed. Please try again.')
    }
    setUploading(false)
  }

  async function handleImageUpload(e) {
    const file = e.target.files?.[0]
    await uploadAndInsertImage(file)
    e.target.value = ''
  }

  // Drag an image straight onto the editor to upload + insert it inline.
  async function handleDrop(e) {
    const files = Array.from(e.dataTransfer?.files || []).filter((f) => f.type.startsWith('image/'))
    if (files.length === 0) return
    e.preventDefault()
    saveSelection()
    for (const f of files) await uploadAndInsertImage(f, { askAlt: false })
  }

  // Load a full .html / .htm file and use it as the post content (rendered as-is).
  async function handleHtmlFileUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      let text = await file.text()
      // If it's a full document, keep only what's inside <body> so it renders
      // cleanly inside the article (head/scripts/styles tags are stripped).
      const bodyMatch = /<body[^>]*>([\s\S]*?)<\/body>/i.exec(text)
      if (bodyMatch) text = bodyMatch[1]
      text = text.replace(/<\/?(html|head|body|meta|title|!doctype)[^>]*>/gi, '').trim()
      onChange(text)
      if (editorRef.current && !showSource) {
        editorRef.current.innerHTML = text
        updateCounts()
      }
    } catch {
      // ignore — admin can paste manually via source view
    }
    e.target.value = ''
  }

  function insertDivider() {
    saveSelection()
    insertHTML('<hr/><p><br/></p>')
  }

  function insertCallout() {
    saveSelection()
    insertHTML('<div class="callout"><p>💡 Add a helpful tip or important note here.</p></div><p><br/></p>')
  }

  function clearFormatting() {
    exec('removeFormat')
    exec('formatBlock', 'p')
  }

  const Btn = ({ onClick, title, active, children, danger }) => (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => { e.preventDefault(); saveSelection() }}
      onClick={onClick}
      className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors ${
        active ? 'bg-[#c9922a] text-white' : danger
          ? 'text-gray-500 hover:bg-red-50 hover:text-red-500'
          : 'text-gray-600 hover:bg-[#c9922a]/10 hover:text-[#c9922a]'
      }`}
    >
      {children}
    </button>
  )

  const Divider = () => <span className="w-px h-5 bg-gray-200 mx-0.5" />

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 p-2 border-b border-gray-100 bg-gray-50 sticky top-0 z-10">
        <Btn onClick={() => format('p')} title="Paragraph"><Pilcrow size={15} /></Btn>
        <Btn onClick={() => format('h2')} title="Heading 2 (appears in Table of Contents)"><Heading2 size={16} /></Btn>
        <Btn onClick={() => format('h3')} title="Heading 3 (appears in Table of Contents)"><Heading3 size={16} /></Btn>
        <Btn onClick={() => format('h4')} title="Heading 4"><Heading4 size={16} /></Btn>
        <Divider />
        <Btn onClick={() => exec('bold')} title="Bold (Ctrl+B)"><Bold size={15} /></Btn>
        <Btn onClick={() => exec('italic')} title="Italic (Ctrl+I)"><Italic size={15} /></Btn>
        <Btn onClick={() => exec('underline')} title="Underline (Ctrl+U)"><Underline size={15} /></Btn>
        <Btn onClick={() => exec('strikeThrough')} title="Strikethrough"><Strikethrough size={15} /></Btn>
        <Btn onClick={highlight} title="Highlight text"><Highlighter size={15} /></Btn>
        <Divider />
        <Btn onClick={() => exec('insertUnorderedList')} title="Bullet list"><List size={16} /></Btn>
        <Btn onClick={() => exec('insertOrderedList')} title="Numbered list"><ListOrdered size={16} /></Btn>
        <Btn onClick={() => format('blockquote')} title="Quote"><Quote size={15} /></Btn>
        <Btn onClick={insertCallout} title="Callout / tip box"><Type size={15} /></Btn>
        <Btn onClick={() => format('pre')} title="Code block"><Code2 size={15} /></Btn>
        <Divider />
        <Btn onClick={() => exec('justifyLeft')} title="Align left"><AlignLeft size={15} /></Btn>
        <Btn onClick={() => exec('justifyCenter')} title="Align center"><AlignCenter size={15} /></Btn>
        <Btn onClick={() => exec('justifyRight')} title="Align right"><AlignRight size={15} /></Btn>
        <Divider />
        <Btn onClick={insertLink} title="Insert link (interlink / backlink)"><Link2 size={15} /></Btn>
        <Btn onClick={() => exec('unlink')} title="Remove link"><Unlink size={15} /></Btn>
        {/* <Btn onClick={() => fileInputRef.current?.click()} title="Upload image into content (or drag & drop / paste a screenshot)">
          {uploading ? <Loader2 size={15} className="animate-spin" /> : <ImageIcon size={15} />}
        </Btn>
        <Btn onClick={insertImageByUrl} title="Insert image by URL"><ImageIcon size={15} className="opacity-60" /></Btn> */}
        <Btn onClick={insertTable} title="Insert table"><TableIcon size={15} /></Btn>
        <Btn onClick={insertDivider} title="Divider line"><Minus size={15} /></Btn>
        <Divider />
        <Btn onClick={() => exec('undo')} title="Undo"><Undo2 size={15} /></Btn>
        <Btn onClick={() => exec('redo')} title="Redo"><Redo2 size={15} /></Btn>
        <Btn onClick={clearFormatting} title="Clear formatting"><Eraser size={15} /></Btn>
        <div className="ml-auto flex items-center gap-0.5">
          <Btn onClick={() => htmlFileRef.current?.click()} title="Upload an .html file as content">
            <FileCode size={15} />
          </Btn>
          <Btn onClick={() => setShowSource((s) => !s)} active={showSource} title="Toggle / edit raw HTML">
            <Eye size={15} />
          </Btn>
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        <input ref={htmlFileRef} type="file" accept=".html,.htm,text/html" className="hidden" onChange={handleHtmlFileUpload} />
      </div>

      {/* Editor / Source */}
      {showSource ? (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          rows={18}
          spellCheck={false}
          className="w-full px-4 py-3 text-sm font-mono text-gray-700 focus:outline-none resize-y min-h-[300px]"
          placeholder="<p>Raw HTML…</p>"
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={emit}
          onBlur={emit}
          onPaste={handlePaste}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onKeyUp={saveSelection}
          onMouseUp={saveSelection}
          data-placeholder="Start writing your blog post… Use the toolbar to add headings, highlights, links, tables and images. Tip: drag an image here, or paste a screenshot, to add it inside the content."
          className="rte-content min-h-[340px] max-h-[55vh] overflow-y-auto px-5 py-4 text-[15px] leading-relaxed text-gray-800 focus:outline-none"
        />
      )}

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 bg-gray-50 text-xs text-gray-400">
        <span>{counts.words} words · {counts.chars} characters</span>
        <span>Paste/edit raw HTML with the eye icon, or upload an .html file — it renders exactly on the blog page</span>
      </div>

      <style jsx global>{`
        .rte-content:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        .rte-content h2 { font-size: 1.5rem; font-weight: 600; margin: 1rem 0 .5rem; color: #1a1612; }
        .rte-content h3 { font-size: 1.25rem; font-weight: 600; margin: .85rem 0 .4rem; color: #1a1612; }
        .rte-content h4 { font-size: 1.1rem; font-weight: 600; margin: .75rem 0 .35rem; color: #1a1612; }
        .rte-content p { margin: 0 0 .75rem; }
        .rte-content ul { list-style: disc; padding-left: 1.5rem; margin: 0 0 .75rem; }
        .rte-content ol { list-style: decimal; padding-left: 1.5rem; margin: 0 0 .75rem; }
        .rte-content a { color: #c9922a; text-decoration: underline; }
        .rte-content mark { background: #fde9b6; padding: 0 .15em; border-radius: 2px; }
        .rte-content blockquote { border-left: 3px solid #c9922a; padding-left: 1rem; margin: 1rem 0; font-style: italic; color: #574840; }
        .rte-content pre { background: #1a1612; color: #f5e7b8; padding: 1rem; border-radius: .5rem; overflow-x: auto; font-family: ui-monospace, monospace; font-size: .85em; margin: 1rem 0; }
        .rte-content table { width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: .9em; }
        .rte-content th, .rte-content td { border: 1px solid #e5e0d5; padding: .5rem .75rem; text-align: left; }
        .rte-content th { background: #faf0d7; font-weight: 600; }
        .rte-content img { max-width: 100%; height: auto; border-radius: .5rem; margin: .5rem 0; }
        .rte-content figure { margin: 1rem 0; }
        .rte-content figcaption { font-size: .8em; color: #7a6a60; text-align: center; margin-top: .35rem; }
        .rte-content hr { border: none; border-top: 1px solid #e5e0d5; margin: 1.5rem 0; }
        .rte-content .callout { background: #faf0d7; border: 1px solid #f4dfaa; border-left: 4px solid #c9922a; border-radius: .5rem; padding: .75rem 1rem; margin: 1rem 0; }
        .rte-content .callout p { margin: 0; }
      `}</style>

      <EditorPromptModal
        config={prompt?.config || null}
        onSubmit={(values) => { prompt?.resolve(values); setPrompt(null) }}
        onCancel={() => { prompt?.resolve(null); setPrompt(null) }}
      />
    </div>
  )
}

function escapeHtml(str = '') {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
function escapeAttr(str = '') {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

// Does this text look like HTML markup (not just plain text with a stray "<")?
function looksLikeHtml(str = '') {
  return /<([a-z][a-z0-9]*)\b[^>]*>([\s\S]*?)<\/\1>|<[a-z][a-z0-9]*\b[^>]*\/?>/i.test(str)
}

// If HTML was stored escaped (e.g. "&lt;p&gt;…"), turn it back into real HTML.
function decodeIfEscaped(str = '') {
  if (/<[a-z][\s\S]*>/i.test(str)) return str // already real HTML
  if (/&lt;\s*[a-z!/]/i.test(str)) {
    return str
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
  }
  return str
}
