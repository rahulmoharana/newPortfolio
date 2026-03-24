import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATUS_ITEMS = [
  { 
    label: "LISTENING", 
    title: "Kind of Blue - Miles Davis", 
    sub: "on repeat since 1959" 
  },
  { 
    label: "READING", 
    title: "Giovanni's Room - Baldwin", 
    sub: "third time through" 
  },
  { 
    label: "BUILDING", 
    title: "Ara", 
    sub: "coming soon(ish)" 
  },
  { 
    label: "WEARING", 
    title: "Vintage Levi's 501 / 1988", 
    sub: "the real ones" 
  },
  { 
    label: "CITY", 
    title: "Silver city , Cuttack", 
    sub: "for now" 
  },
  { 
    label: "WORKING", 
    title: "Hyper Digitech - Full Stack Developer", 
    sub: "Tech, hybrid" 
  }
]

const RightNow = () => {
  const sectionRef = useRef(null)
  const title1Ref = useRef(null)
  const title2Ref = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set([title1Ref.current, title2Ref.current], { y: 0, opacity: 1 })
      gsap.set('.status-item', { y: 0, opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      // Title Animations
      gsap.fromTo([title1Ref.current, title2Ref.current],
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            scrub:true
          }
        }
      )

      // Grid Items Animation
      gsap.fromTo(".status-item",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            scrub:true
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full bg-[#000000] py-20 md:py-32 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* Top Label */}
      <div className="mb-12 md:mb-20">
        <span className="font-datatype text-[10px] tracking-[0.4em] text-[#FF4D00] font-medium uppercase">
          / RIGHT NOW / P. 005
        </span>
      </div>

      {/* Hero Typography */}
      <div className="mb-16 md:mb-32">
        <div className="relative">
          <h2 
            ref={title1Ref}
            className="font-anton text-[24vw] sm:text-[18vw] md:text-[15vw] leading-[0.85] text-[#EAD7CC] uppercase select-none tracking-normal"
          >
            RIGHT
          </h2>
          <div className="flex items-start gap-4 pt-3">
            <h2 
              ref={title2Ref}
              className="font-anton text-[24vw] sm:text-[18vw] md:text-[15vw] leading-[0.85] text-[#FF4D00] uppercase select-none tracking-normal"
            >
              NOW
            </h2>
            {/* Visual Flare from Screenshot */}
            
          </div>
        </div>
      </div>

      {/* Status Grid */}
      <div 
        ref={gridRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 md:gap-y-16 gap-x-6 md:gap-x-8 border-t border-[#EAD7CC]/10 pt-10 md:pt-16 mt-auto"
      >
        {STATUS_ITEMS.map((item, index) => (
          <div key={index} className="status-item flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF4D00]" />
              <span className="text-[10px] md:text-xs font-datatype tracking-[0.2em] text-[#FF4D00] uppercase font-bold">
                {item.label}
              </span>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-datatype font-inter text-[#EAD7CC] font-light leading-snug">
                {item.title}
              </h3>
              <p className="text-[10px] md:text-xs font-datatype text-[#EAD7CC]/40 mt-1 italic font-light">
                {item.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RightNow
