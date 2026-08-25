import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * SplitText component splits any text string into individual character spans
 * allowing GSAP to animate each letter independently.
 */
const SplitText = ({ text, className = '', charClassName = '' }) => {
  const words = text.split(' ')
  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <span
              key={charIndex}
              className={`split-char inline-block will-change-[transform,opacity,filter] ${charClassName}`}
              style={{
                transformOrigin: 'center center',
                backfaceVisibility: 'hidden',
              }}
              aria-hidden="true"
            >
              {char}
            </span>
          ))}
          {wordIndex < words.length - 1 && (
            <span
              className="split-char inline-block whitespace-pre"
              style={{
                transformOrigin: 'center center',
              }}
              aria-hidden="true"
            >
              {'\u00A0'}
            </span>
          )}
        </span>
      ))}
    </span>
  )
}

const LocationRoleSection = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const katakChars = sectionRef.current.querySelectorAll('.katak-char')
      const hdtChars = sectionRef.current.querySelectorAll('.hdt-char')
      const odishaChars = sectionRef.current.querySelectorAll('.odisha-char')
      const labelChars = sectionRef.current.querySelectorAll('.label-char')
      const glows = sectionRef.current.querySelectorAll('.location-ambient-glow')

      // ── Initial 3D & Transform States ──
      gsap.set(katakChars, {
        opacity: 0,
        rotateY: 90,
        rotateX: 20,
        y: 40,
        scale: 0.82,
        filter: 'blur(10px)',
        transformOrigin: '50% 50%',
        transformPerspective: 1200,
        force3D: true,
      })

      gsap.set(hdtChars, {
        opacity: 0,
        rotateY: -90,
        rotateX: -15,
        y: -40,
        scale: 0.85,
        filter: 'blur(10px)',
        transformOrigin: '50% 50%',
        transformPerspective: 1200,
        force3D: true,
      })

      gsap.set(odishaChars, {
        opacity: 0,
        y: 18,
        scale: 0.9,
        filter: 'blur(6px)',
        transformOrigin: 'center center',
        force3D: true,
      })

      gsap.set(labelChars, {
        opacity: 0,
        y: 14,
        filter: 'blur(5px)',
        transformOrigin: 'center center',
        force3D: true,
      })

      gsap.set(glows, {
        opacity: 0,
        scale: 0.75,
      })

      // ── Master ScrollTrigger Timeline with Smooth Scrub ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'center 45%',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })

      // 1. Ambient luxury glow reveal (starts at 0.2s)
      tl.to(
        glows,
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power2.out',
        },
        0.2
      )

      // 2. Far-left labels ("LIVES IN") character split reveal
      tl.to(
        sectionRef.current.querySelectorAll('.lives-in-label .split-char'),
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.55,
          stagger: 0.025,
          ease: 'power2.out',
        },
        0.25
      )

      // 3. Giant Vertical KATAK Split-Text Character 3D Stagger
      tl.to(
        katakChars,
        {
          opacity: 1,
          rotateY: 0,
          rotateX: 0,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.95,
          ease: 'power3.out',
          stagger: {
            each: 0.08,
            from: 'start',
          },
        },
        0.35
      )

      // 4. "ODISHA" Subtitle Split Characters
      tl.to(
        odishaChars,
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.65,
          stagger: 0.03,
          ease: 'power2.out',
        },
        0.65
      )

      // 5. Middle Label ("JOB")
      tl.to(
        sectionRef.current.querySelectorAll('.job-label .split-char'),
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.5,
          stagger: 0.03,
          ease: 'power2.out',
        },
        0.5
      )

      // 6. Giant Vertical HDT Split-Text Character 3D Stagger
      tl.to(
        hdtChars,
        {
          opacity: 1,
          rotateY: 0,
          rotateX: 0,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.05,
          ease: 'back.out(1.3)',
          stagger: {
            each: 0.12,
            from: 'start',
          },
        },
        0.55
      )

      // 7. Far-right labels ("RAHUL'S REACH IS" "GLOBAL")
      tl.to(
        sectionRef.current.querySelectorAll('.global-label .split-char'),
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.55,
          stagger: 0.018,
          ease: 'power2.out',
        },
        0.75
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative z-30 w-full min-h-[80vh] lg:min-h-screen bg-black text-white flex items-center justify-center overflow-hidden select-none px-4 sm:px-8 md:px-14 lg:px-20 py-12 sm:py-8 font-montserrat [perspective:1200px]"
    >
      {/* ── SUBTLE LUXURY LIGHTING ── */}
      <div className="location-ambient-glow absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[#c08261]/[0.035] rounded-full blur-[150px] pointer-events-none will-change-transform" />
      <div className="location-ambient-glow absolute top-1/2 right-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-white/[0.02] rounded-full blur-[150px] pointer-events-none will-change-transform" />

      {/* ── FULL-HEIGHT EDITORIAL STAGE ── */}
      {/* Mobile: stacked vertically with two columns for the giant words */}
      {/* Desktop: original horizontal spread */}
      <div className="relative w-full min-h-[60vh] lg:h-[88vh] flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 lg:gap-0 max-w-[1600px] mx-auto [perspective:1200px]">

        {/* ── MOBILE/TABLET: Top label ── */}
        <div className="lives-in-label flex-shrink-0 z-20 lg:pr-6 [perspective:1000px] order-1 lg:order-none">
          <span className="text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-zinc-400 font-semibold whitespace-nowrap block text-center lg:text-left">
            <SplitText text="LIVES IN" charClassName="label-char" />
          </span>
        </div>

        {/* ── MOBILE: Both giant words side-by-side in a row ── */}
        {/* ── DESKTOP: They are separate flex children ── */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 lg:contents order-2 lg:order-none">

          {/* GIANT VERTICAL WORD: "KATAK" & HORIZONTAL SUBTITLE "ODISHA" */}
          <div className="relative lg:h-full flex flex-col items-center justify-center flex-shrink-0 [perspective:1200px]">
            <h2
              className="flex items-center justify-center text-[10vh] sm:text-[14vh] md:text-[18vh] lg:text-[22vh] font-medium uppercase tracking-[0.02em] leading-none text-[#c08261] hover:text-[#d6936f] transition-colors duration-500 select-none [perspective:1200px]"
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
              }}
              aria-label="KATAK"
            >
              {'KATAK'.split('').map((char, idx) => (
                <span
                  key={idx}
                  className="katak-char inline-block will-change-[transform,opacity,filter]"
                  style={{
                    transformOrigin: '50% 50%',
                    backfaceVisibility: 'hidden',
                  }}
                  aria-hidden="true"
                >
                  {char}
                </span>
              ))}
            </h2>
            <span className="text-[10px] sm:text-[12px] md:text-[13px] lg:text-[14px] font-semibold uppercase tracking-[0.25em] sm:tracking-[0.35em] text-[#c08261] hover:text-[#d6936f] transition-colors duration-500 select-none whitespace-nowrap block mt-2 sm:mt-4 [perspective:1000px]">
              <SplitText text="ODISHA" charClassName="odisha-char" />
            </span>
          </div>

          {/* MIDDLE CENTERED LABEL: "JOB" */}
          <div className="job-label flex-shrink-0 z-20 px-1 sm:px-4 md:px-8 text-center [perspective:1000px] hidden lg:block">
            <span className="text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.25em] uppercase text-zinc-400 font-medium whitespace-nowrap block">
              <SplitText text="JOB" />
            </span>
          </div>

          {/* GIANT VERTICAL WORD: "HDT" */}
          <div className="relative lg:h-full flex items-center justify-center flex-shrink-0 [perspective:1200px]">
            <h2
              className="lg:h-full flex items-center justify-center text-[10vh] sm:text-[13vh] md:text-[17vh] lg:text-[28vh] font-[100] font-thin uppercase tracking-[-0.08em] leading-none text-white select-none font-['Outfit'] [perspective:1200px]"
              style={{
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                letterSpacing: '-0.06em',
              }}
              aria-label="HDT"
            >
              {'HDT'.split('').map((char, idx) => (
                <span
                  key={idx}
                  className="hdt-char inline-block will-change-[transform,opacity,filter]"
                  style={{
                    transformOrigin: '50% 50%',
                    backfaceVisibility: 'hidden',
                  }}
                  aria-hidden="true"
                >
                  {char}
                </span>
              ))}
            </h2>
          </div>
        </div>

        {/* MOBILE: JOB label shown between words area and bottom */}
        <div className="job-label flex-shrink-0 z-20 text-center [perspective:1000px] block lg:hidden order-3">
          <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-zinc-400 font-medium whitespace-nowrap block">
            <SplitText text="JOB" />
          </span>
        </div>

        {/* FAR-RIGHT CENTERED LABELS: "RAHUL'S REACH IS" "GLOBAL" */}
        <div className="global-label flex-shrink-0 z-20 lg:pl-8 flex items-center justify-center gap-2 sm:gap-4 md:gap-8 [perspective:1000px] order-4 lg:order-none">
          <span className="text-[8px] sm:text-[9.5px] md:text-[10.5px] font-mono tracking-[0.22em] uppercase text-zinc-400 whitespace-nowrap">
            <SplitText text="RAHUL'S REACH IS" charClassName="label-char" />
          </span>
          <span className="text-[9px] sm:text-[10.5px] md:text-[11.5px] font-mono tracking-[0.28em] uppercase text-white font-bold whitespace-nowrap">
            <SplitText text="GLOBAL" charClassName="label-char" />
          </span>
        </div>

      </div>
    </section>
  )
}

export default LocationRoleSection
