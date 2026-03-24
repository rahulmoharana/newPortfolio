import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import img1 from '../assets/1-QuickAi.png'
import img2 from '../assets/2-Splyt.png'
import img3 from '../assets/3-Sundown.png'
import img4 from '../assets/4-twofoodco.png'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: "01",
    title: "QUICKAI",
    subtitle: "Full Stack Web App",
    description: "A cutting-edge platform utilizing advanced machine learning models to streamline content creation and creative workflows.",
    tags: ["REACT", "OPENAI", "TAILWIND", "NODE.JS"],
    year: "2025",
    category: "AI SAAS",
    bgColor: "#1a1a1a",
    image: img1,
    liveUrl: "https://ai-saas-nine-rosy.vercel.app/",
    githubUrl: "https://github.com/rahulmoharana/AI-saas"
  },
  {
    id: "02",
    title: "SPLYT",
    subtitle: "Web Application",
    description: "Reimagining personal finance through a social lens, Splyt makes splitting bills and managing shared expenses seamless and intuitive.",
    tags: ["NEXT.JS", "TYPESCRIPT", "PRISMA", "STRIPE"],
    year: "2024",
    category: "FRONTEND CLONE",
    bgColor: "#141414",
    image: img2,
    liveUrl: "https://spylt-clone-tawny.vercel.app/",
    githubUrl: "https://github.com/rahulmoharana/spylt-clone"
  },
  {
    id: "03",
    title: "SUNDOWN",
    subtitle: "Landing Page",
    description: "A showcase of high-end digital experiences, focusing on fluid motion, immersive storytelling, and technical excellence.",
    tags: ["GSAP", "THREE.JS", "LOCOMOTIVE", "REACT"],
    year: "2024",
    category: "FRONTEND CLONE",
    bgColor: "#0d0d0d",
    image: img3,
    liveUrl: "https://rahulmoharana.github.io/sundown-clone/",
    githubUrl: "https://github.com/rahulmoharana/sundown-clone"
  },
  {
    id: "04",
    title: "TWO GOOD CO",
    subtitle: "Interactive Website",
    description: "A fresh take on sustainable eating, combining artisanal quality with modern digital ordering and community engagement.",
    tags: ["SHOPIFY", "REACT", "FRAMER MOTION", "CSS"],
    year: "2023",
    category: "FRONTEND CLONE",
    bgColor: "#1a1a1a",
    image: img4,
    liveUrl: "https://rahulmoharana.github.io/two-good-co-clone/",
    githubUrl: "https://github.com/rahulmoharana/two-good-co-clone"
  }
]

const Projects = () => {
  const sectionRef = useRef(null)
  const containerRef = useRef(null)
  const progressRef = useRef(null)
  const titleRefs = useRef([])
  const imageRefs = useRef([])
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (isMobile || isReducedMotion) return

    const ctx = gsap.context(() => {
      const horizontalLength = containerRef.current.scrollWidth - window.innerWidth
      const slides = gsap.utils.toArray(".project-slide")

      // Horizontal Scroll Animation
      const scrollTween = gsap.to(containerRef.current, {
        x: -horizontalLength,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${horizontalLength}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      })

      // Title Reveal Animations using containerAnimation
      slides.forEach((slide, index) => {
        const title = titleRefs.current[index]
        if (!title) return

        gsap.fromTo(title,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            ease: "none",
            scrollTrigger: {
              trigger: slide,
              containerAnimation: scrollTween,
              start: "left 90%", // Start earlier
              end: "left 20%",
              scrub: true,
            }
          }
        )

        // Image Parallax/Reveal
        const image = imageRefs.current[index]
        if (!image) return

        gsap.fromTo(image,
          { 
            scale: 1.15,
            filter: "grayscale(100%) brightness(0.5)"
          },
          {
            scale: 1,
            filter: "grayscale(0%) brightness(0.7)",
            ease: "none",
            scrollTrigger: {
              trigger: slide,
              containerAnimation: scrollTween,
              start: "left 100%",
              end: "right 0%",
              scrub: true,
            }
          }
        )
      })

      // Bottom Progress Bar
      gsap.fromTo(progressRef.current, 
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${horizontalLength}`,
            scrub: 1,
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile, isReducedMotion])

  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-auto md:h-screen overflow-hidden bg-black"
    >
      {/* Top Label */}
      <div className="absolute top-8 left-4 sm:left-6 md:left-16 lg:left-24 z-20">
        <span className="font-datatype text-[10px] tracking-[0.2em] text-[#FF4D00] font-light uppercase">
          / STUFF I BUILT / P. 004
        </span>
      </div>

      {isMobile || isReducedMotion ? (
        <div className="pt-20 pb-10 px-4 sm:px-6 space-y-6">
          {PROJECTS.map((project) => (
            <article key={project.id} className="relative rounded-xl overflow-hidden border border-[#EAD7CC]/10 bg-[#0f0f0f]">
              <div className="relative h-52">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                <h3 className="absolute bottom-3 left-3 font-anton text-4xl leading-none text-[#EAD7CC] uppercase">
                  {project.title}
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <p className="text-sm font-datatype text-[#EAD7CC]/90 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 border border-[#EAD7CC]/25 text-[10px] font-datatype text-[#EAD7CC] uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-datatype text-[#EAD7CC]/60 uppercase tracking-wider">{project.category} · {project.year}</span>
                </div>
                <div className="flex gap-4">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold tracking-widest text-[#FF4D00] uppercase font-datatype inline-flex items-center min-h-10">View Project</a>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-bold tracking-widest text-[#FF4D00] uppercase font-datatype inline-flex items-center min-h-10">Visit Site</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div 
          ref={containerRef}
          className="flex h-full w-fit"
        >
          {PROJECTS.map((project, index) => (
          <div 
            key={project.id}
            className="project-slide relative w-screen h-full flex items-center px-6 md:px-16 lg:px-24 overflow-hidden"
          >
            {/* Full-screen Project Image Background */}
            <div className="absolute inset-0 z-0">
              <img 
                ref={el => imageRefs.current[index] = el}
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
              {/* Refined Overlays for Readability */}
              <div className="absolute inset-0 bg-linear-to-r from-black via-black/50 to-transparent z-10" />
              <div className="absolute inset-0 bg-black/20 z-10" />
            </div>

            {/* Background Texture Placeholder (Very subtle) */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-screen select-none z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-anton text-[40vw] leading-none text-white whitespace-nowrap">
                {project.title}
              </div>
            </div>

            <div className="relative z-20 w-full max-w-4xl">
              {/* Project Title with Shadow/Duplicate effect */}
              <div 
                ref={el => titleRefs.current[index] = el}
                className="relative mb-6"
              >
                <h2 className="absolute -top-4 -left-4 font-anton text-[10vw] md:text-[8vw] leading-none text-white/5 uppercase select-none">
                  {project.title}
                </h2>
                <h2 className="font-anton text-[10vw] md:text-[8vw] leading-none text-[#EAD7CC] uppercase select-none relative">
                  {project.title}
                </h2>
              </div>

              {/* Subheading (Purple accent) */}
              <div className="mb-8">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-datatype text-[#A78BFA] lowercase tracking-tight">
                  {project.subtitle}
                </h3>
              </div>

              {/* Description & Metadata */}
              <div className="max-w-xl mb-12">
                <p className="text-xs md:text-sm lg:text-base font-datatype text-[#EAD7CC] leading-relaxed font-light mb-8 drop-shadow-lg">
                  {project.description}
                </p>
                
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {project.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-3 py-1 border border-[#EAD7CC]/30 bg-black/20 backdrop-blur-sm text-[9px] md:text-[10px] font-datatype text-[#EAD7CC] uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Project CTA Links (Bottom-Right) */}
            <div className="absolute bottom-24 right-6 md:right-16 lg:right-24 z-30 flex flex-col items-end gap-6">
              <div className="flex flex-col items-end gap-1">
                 <span className="text-[10px] font-datatype text-[#EAD7CC]/60 uppercase tracking-widest">
                  {project.category}
                </span>
                 <span className="text-[10px] font-datatype text-[#EAD7CC]/60 block">
                  {project.year}
                </span>
              </div>

              <div className="flex flex-col items-end gap-4">
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 group"
                >
                  <span className="text-[15px] font-bold tracking-widest text-[#FF4D00] uppercase font-datatype group-hover:underline">
                    VIEW PROJECT
                  </span>
                  <span className="text-[#FF4D00] text-lg transition-transform group-hover:translate-x-1">→</span>
                </a>
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-3 group"
                >
                  <span className="text-[15px] font-bold tracking-widest text-[#FF4D00] uppercase font-datatype group-hover:underline">
                    VISIT SITE
                  </span>
                  <span className="text-[#FF4D00] text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">→</span>
                </a>
              </div>
            </div>
          </div>
          ))}
        </div>
      )}

      {/* Persistent Bottom Progress Line */}
      <div className="hidden md:block absolute bottom-10 left-6 md:left-16 lg:left-24 right-6 md:right-16 lg:right-24 h-px bg-[#EAD7CC]/10">
        <div 
          ref={progressRef}
          className="h-full w-full bg-[#FF4D00] origin-left" 
        />
      </div>
    </section>
  )
}

export default Projects
