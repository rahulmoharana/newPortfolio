import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CODE_ITEMS = [
  { label: "LANGS", content: "JavaScript · C · Java" },
  { label: "FRONT", content: "React · Next.js · React Native" },
  { label: "BACK", content: "Node.js · Express" },
  { label: "DATA", content: "MongoDB · PostgreSQL" },
  { label: "TOOLS", content: "Figma · GSAP · Three.js" },
  { label: "DEPLOY", content: "Vercel · AWS · Docker" }
]

const CULTURE_ITEMS = [
  { label: "SOUND", content: "Miles Davis · Coltrane · Sade" },
  { label: "INSTRUMENT", content: "Guitar, Drums" },
  { label: "READ", content: "Bhagwat Gita" },
  { label: "WEAR", content: "Vintage" },
  { label: "CITY", content: "Cuttack" },
  { label: "NOW", content: "Building in public. Slowly." }
]

const AboutInfo = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const leftHeadingRef = useRef(null)
  const rightHeadingRef = useRef(null)
  const progressBarRef = useRef(null)
  const leftItemsRef = useRef([])
  const rightItemsRef = useRef([])
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set([leftHeadingRef.current, rightHeadingRef.current, ...leftItemsRef.current, ...rightItemsRef.current], {
        opacity: 1,
        y: 0,
      })
      gsap.set(progressBarRef.current, { scaleY: 1 })
      return
    }

    const ctx = gsap.context(() => {
      if (isMobile) {
        gsap.fromTo(
          [leftHeadingRef.current, rightHeadingRef.current, ...leftItemsRef.current, ...rightItemsRef.current],
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        )
        return
      }

      // Pin the section content
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        scrub: true,
      })

      // Progress bar animation
      gsap.fromTo(progressBarRef.current, 
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          }
        }
      )

      // Timeline for staggered reveal
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      })
      
      // LEFT SIDE: Animate from bottom up
      const leftElements = [leftHeadingRef.current, ...leftItemsRef.current]
      tl.fromTo(leftElements, 
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          ease: "power2.out"
        }, 0)

      // RIGHT SIDE: Animate from top down
      const rightElements = [rightHeadingRef.current, ...rightItemsRef.current]
      tl.fromTo(rightElements, 
        { opacity: 0, y: -100 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          ease: "power2.out"
        }, 0)
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile])

  return (
    <section 
      id="about-info" 
      ref={sectionRef} 
      className="relative w-full bg-[#000000] h-auto md:h-[300vh]"
    >
      <div 
        ref={contentRef}
        className="min-h-screen md:h-screen w-full py-10 md:py-16 px-4 sm:px-6 md:px-16 lg:px-24 font-inter text-[#EAD7CC] flex flex-col justify-between md:sticky top-0 overflow-hidden"
      >
        {/* Top Label */}
        <div className="mb-10 block">
          <span className="text-[10px] font-datatype md:text-[10px] tracking-[0.2em] text-[#FF4D00] font-light uppercase">
            / WHO AM I / P. 003
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 relative flex-1">
          {/* Vertical Separator (Desktop) */}
          <div 
            ref={progressBarRef}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-[#FF4D00] -translate-x-1/2" 
          />

          {/* Left Column: THE CODE */}
          <div className="md:pr-12 lg:pr-20 flex flex-col justify-center">
            <div 
              ref={leftHeadingRef}
              className="mb-8 md:mb-12 "
            >
              <span className="text-[10px] md:text-xs tracking-[0.3em] text-[#FF4D00] uppercase font-bold block mb-4">
                THE CODE
              </span>
              <h2 className="font-anton text-[12vw] sm:text-[9vw] md:text-[5vw] leading-[0.9] tracking-normal uppercase select-none">
                WHAT <br /> I BUILD
              </h2>
            </div>

            <div className="flex flex-col border-t border-[#EAD7CC]/10">
              {CODE_ITEMS.map((item, index) => (
                <div 
                  key={index}
                  ref={el => leftItemsRef.current[index] = el}
                  className="flex flex-col sm:flex-row sm:items-center justify-between py-3 md:py-4 border-b border-[#EAD7CC]/10 group gap-2 sm:gap-4"
                >
                  <span className="text-[11px] md:text-[11px] tracking-[0.2em] text-[#FF4D00] uppercase font-bold w-16 md:w-20 shrink-0 font-datatype">
                    {item.label}
                  </span>
                  <span className="text-sm md:text-sm lg:text-sm font-light text-left flex-1 font-datatype wrap-break-word">
                    {item.content}
                  </span>
                </div>
              ))}
            </div>
            
            
          </div>

          {/* Right Column: THE CULTURE */}
          <div className="md:pl-12 lg:pl-20 flex flex-col justify-center">
            <div 
              ref={rightHeadingRef}
              className="mb-8 md:mb-12"
            >
              <span className="text-[10px] md:text-xs tracking-[0.3em] text-[#FF4D00] uppercase font-bold block mb-4">
                THE CULTURE
              </span>
              <h2 className="font-anton text-[12vw] sm:text-[9vw] md:text-[5vw] leading-[0.9] tracking-normal uppercase select-none">
                WHAT <br /> MOVES ME
              </h2>
            </div>

            <div className="flex flex-col border-t border-[#EAD7CC]/10">
              {CULTURE_ITEMS.map((item, index) => (
                <div 
                  key={index}
                  ref={el => rightItemsRef.current[index] = el}
                  className="flex flex-col sm:flex-row sm:items-center justify-between py-3 md:py-4 border-b border-[#EAD7CC]/10 group gap-2 sm:gap-4"
                >
                  <span className="text-[9px] md:text-[11px] tracking-[0.2em] text-[#FF4D00] uppercase font-bold w-20 md:w-28 shrink-0 font-datatype">
                    {item.label}
                  </span>
                  <span className="text-sm md:text-sm lg:text-sm font-light text-left flex-1 font-datatype wrap-break-word">
                    {item.content}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutInfo
