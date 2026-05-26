'use client'
import { useState, useRef } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react'

export default function VideoSection() {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [showCtrl, setShowCtrl] = useState(false)
  const videoRef = useRef(null)

  const togglePlay = () => {
    if (!videoRef.current) return
    playing ? videoRef.current.pause() : videoRef.current.play()
    setPlaying(!playing)
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !muted
    setMuted(!muted)
  }

  return (
    <section id="video-section" className="section-padding bg-charcoal-900 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label text-gold-400">Our Story in Motion</span>
          <div className="gold-divider my-4">
            <span className="ornament text-gold-400">✦</span>
          </div>
          <h2 className="font-cormorant text-4xl lg:text-5xl xl:text-6xl text-white mt-4 mb-4">
            See the Magic We<br />
            <em className="text-gold-400">Create Together</em>
          </h2>
          <p className="font-dm-sans text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
            Step inside a Wedding Gurukul celebration — where royal traditions meet modern elegance and every detail tells a timeless love story.
          </p>
        </div>

{/* Video container */}
{/* <div
  className="relative max-w-5xl mx-auto overflow-hidden cursor-pointer group shadow-2xl bg-black"
  style={{ aspectRatio: "16 / 9", borderRadius: "4px" }}
  onMouseEnter={() => setShowCtrl(true)}
  onMouseLeave={() => setShowCtrl(false)}
>
  <video
    ref={videoRef}
    className="w-full h-full object-contain bg-black"
    muted={muted}
    loop
    playsInline
    preload="metadata"
    poster="/static-image/video-poster.jpeg"
    onPlay={() => setPlaying(true)}
    onPause={() => setPlaying(false)}
  >
    <source src="/videos/video1.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>

  <div
    className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${
      playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
    }`}
  />

  {!playing && (
    <button
      onClick={togglePlay}
      className="absolute inset-0 flex items-center justify-center"
      aria-label="Play video"
      type="button"
    >
      <div className="relative">
        <div className="w-20 h-20 rounded-full bg-gold-500/25 border-2 border-gold-400 backdrop-blur-sm flex items-center justify-center hover:scale-110 hover:bg-gold-500/40 transition-all duration-300">
          <Play size={32} className="text-white ml-1 fill-white" />
        </div>

        <div className="absolute inset-0 rounded-full border border-gold-400/40 animate-ping" />

        <div
          className="absolute -inset-5 rounded-full border border-gold-400/20 animate-ping"
          style={{ animationDelay: "0.5s" }}
        />
      </div>
    </button>
  )}

  <div
    className={`absolute bottom-0 left-0 right-0 px-5 py-4 flex items-center gap-4 bg-gradient-to-t from-black/75 to-transparent transition-all duration-300 ${
      showCtrl || !playing
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-2"
    }`}
  >
    <button
      onClick={togglePlay}
      className="text-white/90 hover:text-gold-300 transition-colors"
      aria-label={playing ? "Pause" : "Play"}
      type="button"
    >
      {playing ? (
        <Pause size={20} />
      ) : (
        <Play size={20} className="fill-current" />
      )}
    </button>

    <button
      onClick={toggleMute}
      className="text-white/90 hover:text-gold-300 transition-colors"
      aria-label={muted ? "Unmute" : "Mute"}
      type="button"
    >
      {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </button>

    <span className="flex-1" />

    <span className="font-dm-sans text-white/40 text-xs hidden sm:block">
      Wedding Gurukul · Highlight Reel 2025
    </span>

    <button
      onClick={() => videoRef.current?.requestFullscreen?.()}
      className="text-white/90 hover:text-gold-300 transition-colors"
      aria-label="Fullscreen"
      type="button"
    >
      <Maximize size={18} />
    </button>
  </div>
</div> */}

        <p className="text-center text-white/20 font-dm-sans text-xs mt-5">
          Place your wedding highlight reel at{' '}
          <code className="text-white/35 bg-white/5 px-2 py-0.5 rounded">public/videos/wedding-highlight.mp4</code>
        </p>
      </div>
    </section>
  )
}
