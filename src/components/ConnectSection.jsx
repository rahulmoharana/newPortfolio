import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import portraitImg from '../assets/about.png'

gsap.registerPlugin(ScrollTrigger)

const SOCIAL_LINKS = [
  { name: 'GITHUB', url: 'https://github.com/RahulMoharana' },
  { name: 'LINKEDIN', url: 'https://linkedin.com/in/rahulmoharana' },
  { name: 'TWITTER / X', url: 'https://x.com/rahulmoharana' },
  { name: 'INSTAGRAM', url: 'https://instagram.com/rahulmoharana' },
]

// Interlocking connected letter offsets matching exact reference
const CONNECT_LETTERS = [
  { char: 'C', offsetClass: 'ml-0 z-[1]' },
  { char: 'O', offsetClass: '-ml-[0.8vw] sm:-ml-[1.6vw] md:-ml-[2.0vw] z-[2]' },
  { char: 'N', offsetClass: '-ml-[0.6vw] sm:-ml-[1.4vw] md:-ml-[1.8vw] z-[3]' },
  { char: 'N', offsetClass: '-ml-[0.8vw] sm:-ml-[1.8vw] md:-ml-[2.4vw] z-[4]' },
  { char: 'E', offsetClass: '-ml-[1.2vw] sm:-ml-[2.6vw] md:-ml-[3.4vw] z-[5]' },
  { char: 'C', offsetClass: '-ml-[1.0vw] sm:-ml-[2.2vw] md:-ml-[2.8vw] z-[6]' },
  { char: 'T', offsetClass: '-ml-[1.4vw] sm:-ml-[3.2vw] md:-ml-[4.0vw] z-[7]' },
]

const ConnectSection = () => {
  const sectionRef = useRef(null)
  const portraitRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const [currentTime, setCurrentTime] = useState('')

  // Live India Standard Time
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }
      const timeStr = new Intl.DateTimeFormat('en-GB', options).format(new Date())
      setCurrentTime(`${timeStr} IST`)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  // Slower, weighted parallax and gradual entrance
  useEffect(() => {
    if (!sectionRef.current) return undefined

    const ctx = gsap.context(() => {
      // Slower portrait parallax drift
      if (portraitRef.current) {
        gsap.fromTo(
          portraitRef.current,
          { yPercent: -5, scale: 1.03 },
          {
            yPercent: 5,
            scale: 0.98,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.8,
            },
          },
        )
      }

      // Slower, stately CONNECT letters reveal
      const letters = sectionRef.current.querySelectorAll('.connect-letter')
      gsap.fromTo(
        letters,
        {
          yPercent: 20,
          opacity: 0,
          rotateX: 25,
          filter: 'blur(10px)',
        },
        {
          yPercent: 0,
          opacity: 1,
          rotateX: 0,
          filter: 'blur(0px)',
          stagger: 0.08,
          ease: 'power3.out',
          duration: 1.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('dev.rahulmoharana@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  return (
    <section
      ref={sectionRef}
      id="connect"
      className="relative z-30 w-full min-h-[90vh] sm:min-h-screen bg-black text-white selection:bg-[#9a7459] selection:text-white flex flex-col justify-between pt-10 sm:pt-16 md:pt-20 pb-6 sm:pb-12 px-4 sm:px-8 md:px-12 lg:px-16 border-t border-white/[0.08] overflow-hidden"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/3 right-1/4 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#9a7459]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] bg-white/[0.02] rounded-full blur-[140px] pointer-events-none" />

      {/* Top Action Pill Button */}
      <div className="relative z-20 w-full max-w-[1800px] mx-auto flex items-center justify-between">
        <button
          type="button"
          onClick={handleCopyEmail}
          className="group relative inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/25 bg-black/60 backdrop-blur-md hover:bg-white hover:text-black hover:border-white transition-all duration-500 cursor-pointer shadow-2xl"
          title="Click to copy email"
        >
          <span className="font-['Inter',sans-serif] text-[10px] sm:text-[11px] font-medium tracking-[0.16em] uppercase text-white group-hover:text-black transition-colors">
            {copied ? 'EMAIL COPIED!' : 'GET IN TOUCH'}
          </span>
          <span className="font-mono text-[9px] text-zinc-400 group-hover:text-zinc-700 transition-colors hidden sm:inline">
            dev.rahulmoharana@gmail.com
          </span>
        </button>

        {/* Status indicator */}
        <div className="hidden md:flex items-center gap-2 text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>AVAILABLE FOR NEW PROJECTS</span>
        </div>
      </div>

      {/* Center Cinematic Stage with Portrait & Interlocking Connected Letters */}
      <div className="relative z-10 w-full max-w-[1900px] mx-auto my-auto flex items-center justify-center min-h-[40vh] sm:min-h-[55vh] md:min-h-[65vh] lg:min-h-[75vh]">
        {/* Cinematic Portrait Overlay - Positioned Behind and Interlaced with Letters */}
        <div className="absolute inset-0 flex items-center justify-center lg:justify-end pointer-events-none select-none z-10 lg:pr-8 xl:pr-16">
          <div
            ref={portraitRef}
            className="relative w-[240px] sm:w-[440px] md:w-[560px] lg:w-[700px] xl:w-[780px] h-[360px] sm:h-[580px] md:h-[700px] lg:h-[840px] max-h-[85vh] will-change-transform opacity-85"
          >
            <img
              src={portraitImg}
              alt="Rahul Moharana - Creative Engineer"
              className="w-full h-full object-contain object-bottom filter contrast-125 brightness-95 grayscale"
            />
            {/* Smooth Vignette and Bottom Fade */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 lg:hidden" />
          </div>
        </div>

        {/* Monumental Connected Interlocking CONNECT Typography */}
        <div className="relative z-20 w-full flex items-center justify-center select-none [perspective:1000px] pointer-events-auto">
          <div className="flex items-baseline justify-center overflow-visible leading-[0.72]">
            {CONNECT_LETTERS.map(({ char, offsetClass }, index) => (
              <span
                key={`${char}-${index}`}
                className={`connect-letter relative inline-block font-['Italiana','Cormorant_Garamond',serif] text-[13vw] sm:text-[16vw] md:text-[17.5vw] lg:text-[18vw] font-[100] text-white/95 hover:text-[#9a7459] transition-colors duration-500 transform-gpu [transform-style:preserve-3d] will-change-[transform,opacity,filter] origin-bottom scale-y-[1.35] sm:scale-y-[1.55] md:scale-y-[1.7] uppercase select-none flex-shrink-0 ${offsetClass}`}
                style={{
                  textShadow: '0 12px 50px rgba(0,0,0,0.9)',
                }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Editorial Footer Info & Social Links */}
      <div className="relative z-20 w-full max-w-[1800px] mx-auto flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/[0.08] select-none">
        {/* Location & Time */}
        <div className="flex flex-col gap-1 font-mono text-[10px] sm:text-[11px] tracking-widest text-zinc-400 uppercase">
          <span className="text-zinc-200 font-semibold">BHUBANESWAR, INDIA</span>
          <span className="text-zinc-400">{currentTime || 'LOCAL TIME'}</span>
        </div>

        {/* Social Links Bar */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 md:gap-8 font-mono text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.15em] sm:tracking-[0.2em] uppercase">
          {SOCIAL_LINKS.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors duration-300 relative group"
            >
              <span>{item.name}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#9a7459] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-zinc-400 uppercase">
          <span>© {new Date().getFullYear()} RAHUL MOHARANA</span>
        </div>
      </div>
    </section>
  )
}

export default ConnectSection
