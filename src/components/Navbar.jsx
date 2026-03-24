import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Navbar = () => {
  const logoRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    if (!headerRef.current || !logoRef.current) return
    const isDesktop = window.innerWidth >= 768
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!isDesktop || prefersReducedMotion) return

    let ctx

    const id = setTimeout(() => {
      ctx = gsap.context(() => {
        gsap.to(logoRef.current, {
          x: () => {
            const headerWidth = headerRef.current?.offsetWidth ?? 0
            const logoWidth = logoRef.current?.offsetWidth ?? 0
            const padding = window.innerWidth >= 768 ? 48 : 24
            return (headerWidth / 2) - (logoWidth / 2) - padding
          },
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "+=1000",
            scrub: 1,
            invalidateOnRefresh: true,
          }
        })
      })
    }, 100)

    return () => {
      clearTimeout(id)
      ctx?.revert()
    }
  }, [])

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 w-full font-inter">
      <div className="relative flex items-center justify-between gap-4 p-4 md:p-6 md:px-12">
        <div ref={logoRef}>
          <a href="#" className="group relative inline-flex items-center py-2 px-1">
            <motion.span className="font-anton text-2xl md:text-3xl uppercase tracking-tight text-[#EAD7CC] transition-colors duration-300 group-hover:text-[#FF4D00]">
              Rahul Moharana
            </motion.span>
          </a>
        </div>
      </div>
    </header>
  )
}

export default Navbar