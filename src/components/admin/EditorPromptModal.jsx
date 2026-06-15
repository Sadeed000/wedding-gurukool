'use client'
import { useState, useEffect, useRef } from 'react'
import { X, Check } from 'lucide-react'

/**
 * Themed replacement for native window.prompt() used by the blog editor.
 * Controlled via a `config` object; resolves values through onSubmit / onCancel.
 *
 * config = {
 *   title, description, confirmText,
 *   fields: [{ name, label, type, placeholder, defaultValue, hint, options }]
 * }
 */
export default function EditorPromptModal({ config, onSubmit, onCancel }) {
  const [values, setValues] = useState({})
  const firstRef = useRef(null)

  useEffect(() => {
    if (!config) return
    const init = {}
    config.fields.forEach((f) => { init[f.name] = f.defaultValue ?? '' })
    setValues(init)
    const t = setTimeout(() => {
      firstRef.current?.focus()
      firstRef.current?.select?.()
    }, 60)
    return () => clearTimeout(t)
  }, [config])

  if (!config) return null

  const set = (name, v) => setValues((prev) => ({ ...prev, [name]: v }))
  const submit = () => onSubmit(values)

  function onKeyDown(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault()
      submit()
    } else if (e.key === 'Escape') {
      onCancel()
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/45 px-4">
      <div className="w-full max-w-md rounded-2xl bg-[#f8f1e7] shadow-2xl border border-[#e7dccb] overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e5d8c5]">
          <div>
            <h2 className="text-lg font-serif font-bold text-[#1f1713]">{config.title}</h2>
            {config.description && (
              <p className="text-xs text-[#7b6b5c] mt-0.5">{config.description}</p>
            )}
          </div>
          <button onClick={onCancel} className="text-[#7b6b5c] hover:text-[#1f1713] transition">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {config.fields.map((f, i) => (
            <div key={f.name}>
              <label className="block text-xs font-medium text-[#7b6b5c] uppercase tracking-wider mb-1.5">
                {f.label}
              </label>
              {f.type === 'select' ? (
                <select
                  ref={i === 0 ? firstRef : null}
                  value={values[f.name] ?? ''}
                  onChange={(e) => set(f.name, e.target.value)}
                  onKeyDown={onKeyDown}
                  className="w-full rounded-lg border border-[#d7c7b2] bg-white px-3.5 py-2.5 text-sm text-[#1f1713] focus:outline-none focus:border-[#c9922a] focus:ring-2 focus:ring-[#c9922a]/20"
                >
                  {(f.options || []).map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              ) : f.type === 'textarea' ? (
                <textarea
                  ref={i === 0 ? firstRef : null}
                  rows={3}
                  value={values[f.name] ?? ''}
                  placeholder={f.placeholder}
                  onChange={(e) => set(f.name, e.target.value)}
                  onKeyDown={onKeyDown}
                  className="w-full rounded-lg border border-[#d7c7b2] bg-white px-3.5 py-2.5 text-sm text-[#1f1713] focus:outline-none focus:border-[#c9922a] focus:ring-2 focus:ring-[#c9922a]/20 resize-none"
                />
              ) : (
                <input
                  ref={i === 0 ? firstRef : null}
                  type={f.type === 'number' ? 'number' : 'text'}
                  value={values[f.name] ?? ''}
                  placeholder={f.placeholder}
                  min={f.type === 'number' ? 1 : undefined}
                  onChange={(e) => set(f.name, e.target.value)}
                  onKeyDown={onKeyDown}
                  className="w-full rounded-lg border border-[#d7c7b2] bg-white px-3.5 py-2.5 text-sm text-[#1f1713] focus:outline-none focus:border-[#c9922a] focus:ring-2 focus:ring-[#c9922a]/20"
                />
              )}
              {f.hint && <p className="text-[11px] text-[#9a8a7a] mt-1">{f.hint}</p>}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[#f3eadc] border-t border-[#e5d8c5]">
          <button
            onClick={onCancel}
            className="rounded-full px-5 py-2 text-sm font-medium border border-[#d7c7b2] text-[#4b4038] hover:bg-white transition"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            className="rounded-full px-5 py-2 text-sm font-medium bg-[#c9922a] text-white hover:bg-[#b8821f] transition flex items-center gap-2"
          >
            <Check size={16} />
            {config.confirmText || 'Insert'}
          </button>
        </div>
      </div>
    </div>
  )
}
