import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Footer = () => {
  const sectionRef = useRef(null)
  const brandingRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set('.footer-reveal', { y: 0, opacity: 1 })
      gsap.set(brandingRef.current, { y: 0, opacity: 1 })
      return
    }

    const ctx = gsap.context(() => {
      // Staggered reveal for footer content
      gsap.fromTo(".footer-reveal", 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      )

      // Oversized branding reveal
      gsap.fromTo(brandingRef.current,
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer 
      ref={sectionRef}
      className="relative w-full min-h-screen md:h-screen bg-[#000000] pt-16 md:pt-20 pb-8 md:pb-10 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden border-t border-[#EAD7CC]/5 flex flex-col justify-between"
    >
      {/* Background Glow */}
      <div className="absolute -bottom-1/2 -left-1/4 w-screen h-[100vw] bg-[#FF4D00]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-1/2 -right-1/4 w-[80vw] h-[80vw] bg-[#A78BFA]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20">
        {/* CTA Heading */}
        <div className="footer-reveal">
          <h2 className="text-2xl sm:text-3xl font-anton md:text-5xl lg:text-5xl font-inter font-light text-[#EAD7CC] leading-[1.1] max-w-2xl tracking-normal">
            Interested in working together, <span className="text-[#EAD7CC]/30 font-anton">building something extraordinary or simply learning more?</span>
          </h2>
        </div>

        {/* Links & Contact */}
        <div className="flex flex-col md:flex-row justify-between gap-12 lg:pl-20">
          <div className="footer-reveal">
            <span className="block text-[10px] tracking-[0.2em] text-[#FF4D00] uppercase font-bold mb-6 font-datatype">
              Contact Rahul at:
            </span>
            <a 
              href="mailto:dev.rahulmoharana@gmail.com" 
              className="text-lg sm:text-xl md:text-2xl font-datatype text-[#EAD7CC] hover:text-[#FF4D00] transition-colors group flex items-center gap-2 break-all"
            >
              dev.rahulmoharana@gmail.com
              <span className="text-sm transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </a>
          </div>

          <div className="footer-reveal flex flex-col gap-4 min-w-30">
             <span className="block text-[10px] tracking-[0.2em] text-[#FF4D00] uppercase font-bold mb-2 font-datatype">
              Elsewhere
            </span>
            <a href="https://github.com/rahulmoharana" target="_blank" rel="noopener noreferrer" className="text-xs text-[#EAD7CC]/60 hover:text-[#FF4D00] transition-colors font-datatype uppercase tracking-[0.2em] py-2">Github</a>
            <a href="https://www.linkedin.com/in/rahul-moharana-7a89a0172/" target="_blank" rel="noopener noreferrer" className="text-xs text-[#EAD7CC]/60 hover:text-[#FF4D00] transition-colors font-datatype uppercase tracking-[0.2em] py-2">LinkedIn</a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-xs text-[#EAD7CC]/60 hover:text-[#FF4D00] transition-colors font-datatype uppercase tracking-[0.2em] py-2">X (Twitter)</a>
          </div>
        </div>
      </div>

      {/* Massive Branding */}
      <div className="relative border-t border-[#EAD7CC]/10 pt-10">
        <div 
          ref={brandingRef}
          className="w-full flex justify-center overflow-hidden"
        >
          <h1 className="font-anton text-[12vw] leading-none text-[#EAD7CC] uppercase select-none opacity-100 whitespace-nowrap">
            RAHUL MOHARANA
          </h1>
        </div>
        
        {/* Star Icon (from screenshot style) */}
        <div className="absolute top-10 left-0 hidden md:block opacity-20">
           <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 0L24.49 15.51L40 20L24.49 24.49L20 40L15.51 24.49L0 20L15.51 15.51L20 0Z" fill="#FF4D00"/>
          </svg>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 mt-12 md:mt-16 text-[#EAD7CC]/30 font-datatype text-[10px] tracking-[0.2em] uppercase text-center md:text-left">
        <p>© 2026 RAHUL MOHARANA - ALL RIGHTS RESERVED</p>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover:text-[#FF4D00] transition-colors flex items-center gap-2 py-2 px-2"
        >
          BACK TO TOP ↑
        </button>
      </div>
    </footer>
  )
}

export default Footer
