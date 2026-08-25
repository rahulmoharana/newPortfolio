import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import wpImg from '../assets/png/001-wordpress-icon.png'
import githubImg from '../assets/png/003-github.png'
import cssImg from '../assets/png/004-css-3.png'
import devImg from '../assets/png/005-developer.png'
import reactImg from '../assets/png/006-atom.png'
import jsImg from '../assets/png/007-technology.png'
import css3Img from '../assets/png/008-css-3-1.png'
import firebaseImg from '../assets/png/009-fire.png'
import postgresImg from '../assets/png/010-postgre.png'
import expressImg from '../assets/png/Express.png'
import mongoImg from '../assets/png/MongoDB.png'

gsap.registerPlugin(ScrollTrigger)

const LOGOS = [
  { name: 'React', src: reactImg },
  { name: 'JavaScript', src: jsImg },
  { name: 'Node / Express', src: expressImg },
  { name: 'MongoDB', src: mongoImg },
  { name: 'PostgreSQL', src: postgresImg },
  { name: 'Firebase', src: firebaseImg },
  { name: 'GitHub', src: githubImg },
  { name: 'MySQL', isSvg: true, svg: (
    <svg className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto" viewBox="0 0 128 65" fill="currentColor">
      <path d="M44.7 13.8c-1.2-3.8-3.9-7-7.4-8.8C33.7 3.2 29.5 3 25.6 4.4c-6.1 2.2-10.8 7.3-12.8 13.5-1.9 6-1 12.6 2.4 17.8 2.6 4 6.6 6.8 11.3 7.8 1.9.4 3.9.5 5.8.3 1.1-.1 2.2-.4 3.2-.8l.8 1.5c-2.3 1.4-5 2.1-7.7 2.1-4.7 0-9.2-1.9-12.6-5.2C12.7 38.1 10.7 33.1 10.7 28c0-5 2-9.8 5.6-13.3C19.8 11.2 24.6 9.2 29.6 9.2c3.4 0 6.8.9 9.8 2.6 2.8 1.6 5 4 6.4 6.9l-1.1-4.9zm13.1 32.5V17.9h5.1l7.8 18.2 7.7-18.2h5.1v28.4h-4.6V24.5l-6.8 16.3h-2.9L62.4 24.5v21.8h-4.6zm33.5-12.8v12.8h-4.6V17.9h9.1c3.1 0 5.6.8 7.5 2.4 1.9 1.6 2.8 3.8 2.8 6.6 0 2.9-.9 5.1-2.8 6.7-1.9 1.6-4.4 2.4-7.5 2.4h-4.5zm0-4.1h4.5c1.8 0 3.2-.5 4.3-1.4 1.1-1 1.6-2.3 1.6-3.9 0-1.6-.5-2.9-1.6-3.8-1.1-1-2.5-1.4-4.3-1.4h-4.5v10.5zm25.9 16.9h-4.6V17.9h4.6v24.2h12.1v4.2h-12.1z"/>
      <path d="M47.8 8.1c3.2 2.5 5.6 6 6.6 10 .8 3.2.7 6.6-.4 9.6-1.5 4.1-4.6 7.4-8.5 9.1-3.9 1.7-8.4 1.8-12.4.3-2.7-1-5.1-2.8-6.9-5.1l2.5-1.9c1.4 1.9 3.4 3.3 5.6 4.1 3.2 1.2 6.8 1.1 9.9-.2 3.1-1.4 5.6-4 6.8-7.3.9-2.4 1-5.1.3-7.6-.8-3.2-2.7-6-5.3-7.9l1.8-3.1z"/>
    </svg>
  )},
  { name: 'HTML5 Developer', src: devImg },
  { name: 'CSS3', src: cssImg },
  { name: 'Web Stack', src: css3Img },
  { name: 'WordPress', src: wpImg },
]

const SkillsMarquee = () => {
  const containerRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let xPos = 0
    const baseSpeed = 0.9
    let targetVelocityBoost = 0
    let currentVelocityBoost = 0

    // Set quickSetter on track transform
    const setTrackX = gsap.quickSetter(track, 'x', 'px')

    const updateWrapWidth = () => track.scrollWidth / 2
    let wrapWidth = updateWrapWidth()

    const handleResize = () => {
      wrapWidth = updateWrapWidth()
    }
    window.addEventListener('resize', handleResize, { passive: true })

    // Scroll velocity tracking via ScrollTrigger
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const vel = Math.abs(self.getVelocity())
        targetVelocityBoost = Math.min(vel * 0.003, 10)
      },
    })

    // Animation Loop via GSAP ticker with frame-rate independent delta time
    const tick = (time, deltaTime) => {
      const deltaFactor = Math.min(deltaTime / 16.6667, 2.5) || 1

      // Smooth exponential lerp for scroll acceleration
      currentVelocityBoost += (targetVelocityBoost - currentVelocityBoost) * 0.08
      targetVelocityBoost *= 0.94
      if (targetVelocityBoost < 0.01) targetVelocityBoost = 0

      const effectiveSpeed = (baseSpeed + currentVelocityBoost) * deltaFactor

      xPos -= effectiveSpeed
      if (wrapWidth > 0 && Math.abs(xPos) >= wrapWidth) {
        xPos += wrapWidth
      }

      setTrackX(xPos)
    }

    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      window.removeEventListener('resize', handleResize)
      scrollTrigger.kill()
    }
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative z-30 w-full py-10 md:py-16 bg-black text-white overflow-hidden select-none"
    >
      {/* ── SOFT DARK SHADOW & GRADIENT OVERLAYS (MATCHING LUXURY REFERENCE) ── */}
      {/* Top Deep Dark Shadow Over Section */}
      <div className="absolute top-0 inset-x-0 h-24 md:h-32 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-10" />
      
      {/* Bottom Deep Dark Shadow (Significantly Increased Height) */}
      <div className="absolute bottom-0 inset-x-0 h-44 sm:h-56 md:h-72 lg:h-80 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none z-10" />

      {/* Subtle Central Ambient Dark Glow */}
      <div className="absolute inset-0 bg-radial from-white/[0.015] via-transparent to-transparent pointer-events-none" />

      {/* Reduced Minimalist Top Category Label */}
      <div className="flex justify-center mb-5 md:mb-7 relative z-20">
        <span className="text-[8px] md:text-[9px] font-mono tracking-[0.28em] uppercase text-zinc-500 font-medium">
          TECH ARSENAL &amp; CAPABILITIES
        </span>
      </div>

      {/* ── LUXURY MONOCHROME LOGO TICKER TRACK ── */}
      <div className="relative w-full overflow-hidden flex items-center py-2 relative z-20">
        <div
          ref={trackRef}
          className="flex items-center gap-7 sm:gap-9 md:gap-11 lg:gap-14 will-change-transform w-max px-4"
        >
          {[...LOGOS, ...LOGOS].map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="flex items-center justify-center flex-shrink-0 cursor-pointer group"
              title={item.name}
            >
              {item.isSvg ? (
                <div className="text-white/70 group-hover:text-white transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.4)]">
                  {item.svg}
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={item.name}
                  className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto object-contain brightness-0 invert opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 select-none pointer-events-none group-hover:drop-shadow-[0_0_16px_rgba(255,255,255,0.4)]"
                  loading="lazy"
                  draggable="false"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Left Deep Side Vignette Fade */}
      <div className="absolute top-0 bottom-0 left-0 w-24 md:w-56 bg-gradient-to-r from-black via-black/90 to-transparent pointer-events-none z-20" />

      {/* Right Deep Side Vignette Fade */}
      <div className="absolute top-0 bottom-0 right-0 w-24 md:w-56 bg-gradient-to-l from-black via-black/90 to-transparent pointer-events-none z-20" />
    </section>
  )
}

export default SkillsMarquee