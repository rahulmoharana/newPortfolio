import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MANIFESTO_ITEMS = [
  { text: "MAKE IT FEEL.", indent: "ml-0" },
  { text: "MAKE IT MEAN", indent: "ml-[15vw] md:ml-[20vw]" },
  { text: "SOMETHING.", indent: "ml-[25vw] md:ml-[35vw]" },
  { text: "KEEP IT RAW.", indent: "ml-0" }
]

const About = () => {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const itemsRef = useRef([])
  const bottomLabelRef = useRef(null)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set(itemsRef.current, { opacity: 1, y: 0 })
      gsap.set('.manifesto-word', { opacity: 1 })
      gsap.set(bottomLabelRef.current, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      if (isMobile) {
        gsap.fromTo(itemsRef.current,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.16,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        )

        gsap.fromTo(bottomLabelRef.current,
          { opacity: 0, y: 10 },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bottomLabelRef.current,
              start: 'top 95%',
            },
          }
        )
        return
      }

      // Pin the entire content container for the duration of the 300vh scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: contentRef.current,
        scrub: true,
      })

      // Animate words word-by-word across the scroll
      itemsRef.current.forEach((itemContainer, index) => {
        if (!itemContainer) return
        const words = itemContainer.querySelectorAll('.manifesto-word')
        
        gsap.fromTo(words, 
          { opacity: 0.05 }, 
          { 
            opacity: 1, 
            stagger: 0.2, 
            ease: "none",
            scrollTrigger: {
              trigger: itemContainer,
              start: "top 60%", 
              end: "bottom 40%",
              scrub: true,
            }
          }
        )
      })

      // Bottom label reveal animation
      gsap.fromTo(bottomLabelRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "bottom 110%", 
            end: "bottom 100%",
            scrub: true,
            
          }
        }
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile])

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative w-full bg-[#000000] h-auto md:h-[200vh] overflow-hidden"
    >
      <div 
        ref={contentRef} 
        className="min-h-screen md:h-screen flex flex-col justify-between py-10 md:py-15 px-4 sm:px-6 md:px-16 lg:px-24 font-inter md:sticky top-0"
      >
        {/* Top Label */}
        <div className="flex flex-col gap-8 h-screen md:gap-10">
          <div>
            <span className="font-datatype text-[10px] md:text-[10px] tracking-[0.4em] text-[#FF4D00] font-medium uppercase">
              / MANIFESTO / P. 002
            </span>
          </div>

          {/* Staggered Headers with Word Splitting */}
          <div className="flex flex-col gap-3 md:gap-6 lg:gap-8">
            {MANIFESTO_ITEMS.map((item, index) => (
            <h2 
                key={index}
                ref={(el) => itemsRef.current[index] = el}
                className={`font-anton text-[13vw] sm:text-[10vw] md:text-[8vw] leading-[0.9] tracking-tighter text-[#EAD7CC] uppercase select-none ${item.indent} flex flex-wrap gap-x-[0.3em]`}
              >
                {item.text.split(' ').map((word, wIdx) => (
                  <span key={wIdx} className="manifesto-word inline-block">
                    {word}
                  </span>
                ))}
              </h2>
            ))}
          </div>
        </div>

        {/* Bottom Label */}
        <div 
          ref={bottomLabelRef}
          className="self-end pb-6 md:pb-8"
        >
          <span className="text-[10px] md:text-xs tracking-[0.2em] text-[#999999]/50 uppercase font-mono">
            Rahul Moharana / 2026
          </span>
        </div>
      </div>
    </section>
  )
}

export default About
