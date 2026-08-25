import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import aboutMeImg from '../assets/about.png'
import signatureImg from '../assets/signature.png'

gsap.registerPlugin(ScrollTrigger)

const chapters = [
  { id: 'I', label: 'CHAPTER I', active: true },
  { id: 'II', label: 'CHAPTER II', active: false },
  { id: 'III', label: 'CHAPTER III', active: false },
  { id: 'IV', label: 'CHAPTER IV', active: false },
  { id: 'V', label: 'CHAPTER V', active: false },
]

const skillCategories = [
  { id: 'all', label: 'All Arsenal' },
  { id: 'frontend', label: 'Frontend & UI' },
  { id: 'backend', label: 'Backend & DB' },
  { id: 'creative', label: 'Creative & 3D' },
  { id: 'tools', label: 'DevOps & Tools' },
]

const skills = [
  { name: 'React.js', category: 'frontend', level: 'Mastery', highlight: true },
  { name: 'Next.js (App Router)', category: 'frontend', level: 'Advanced', highlight: true },
  { name: 'TypeScript', category: 'frontend', level: 'Advanced', highlight: false },
  { name: 'JavaScript (ES6+)', category: 'frontend', level: 'Mastery', highlight: true },
  { name: 'Tailwind CSS', category: 'frontend', level: 'Mastery', highlight: false },
  { name: 'HTML5 / Semantic SEO', category: 'frontend', level: 'Mastery', highlight: false },

  { name: 'Node.js', category: 'backend', level: 'Advanced', highlight: true },
  { name: 'Express.js', category: 'backend', level: 'Advanced', highlight: false },
  { name: 'PostgreSQL', category: 'backend', level: 'Advanced', highlight: true },
  { name: 'MongoDB', category: 'backend', level: 'Mastery', highlight: true },
  { name: 'REST & GraphQL APIs', category: 'backend', level: 'Advanced', highlight: false },
  { name: 'Redis & Caching', category: 'backend', level: 'Intermediate', highlight: false },

  { name: 'GSAP & ScrollTrigger', category: 'creative', level: 'Mastery', highlight: true },
  { name: 'Three.js & WebGL', category: 'creative', level: 'Advanced', highlight: true },
  { name: 'Framer Motion', category: 'creative', level: 'Mastery', highlight: false },
  { name: 'Lenis Smooth Scroll', category: 'creative', level: 'Mastery', highlight: false },
  { name: 'Canvas & Shaders', category: 'creative', level: 'Intermediate', highlight: false },

  { name: 'Git & GitHub', category: 'tools', level: 'Mastery', highlight: false },
  { name: 'Docker', category: 'tools', level: 'Intermediate', highlight: false },
  { name: 'Vercel / AWS', category: 'tools', level: 'Advanced', highlight: false },
  { name: 'Figma UI/UX', category: 'tools', level: 'Advanced', highlight: true },
  { name: 'Postman / API Testing', category: 'tools', level: 'Mastery', highlight: false },
  { name: 'Firebase', category: 'tools', level: 'Advanced', highlight: false },
]

const corePillars = [
  {
    num: '01',
    title: 'Full-Stack Systems',
    desc: 'Engineering resilient, scalable full-stack applications with Node.js, Next.js, PostgreSQL, and MongoDB. Clean architectures built for high throughput and security.',
    tags: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'MongoDB']
  },
  {
    num: '02',
    title: 'Creative Engineering',
    desc: 'Elevating digital interfaces into fluid, cinematic web experiences. Mastering GSAP ScrollTrigger choreography, smooth inertial scrolling, and Three.js scenes.',
    tags: ['GSAP', 'Three.js', 'WebGL', 'Framer Motion', 'Micro-interactions']
  },
  {
    num: '03',
    title: 'AI SaaS & Modern Products',
    desc: 'Building intelligent digital products with LLM pipelines, reactive state flows, real-time data streaming, and high-conversion UX architecture.',
    tags: ['AI Workflows', 'LLM Integrations', 'Real-time UX', 'SaaS Architecture']
  },
  {
    num: '04',
    title: 'Extreme Performance & SEO',
    desc: 'Obsessed with sub-second response times, 0 layout shifts, 99+ Core Web Vitals, and structured technical data for next-generation search and AI visibility.',
    tags: ['100 Lighthouse', 'Core Web Vitals', 'Structured Data', 'AEO / GEO']
  }
]

const stats = [
  { value: '03+', label: 'Years of Craft', sub: 'Building Scalable Web Apps' },
  { value: '20+', label: 'Projects Shipped', sub: 'From SaaS to Creative Sites' },
  { value: '99+', label: 'Performance Score', sub: 'Obsession with Web Vitals' },
  { value: '100%', label: 'Commitment', sub: 'Pixel & Logic Perfection' },
]

const AboutMe = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [copiedEmail, setCopiedEmail] = useState(false)
  
  const sectionRef = useRef(null)
  const leftColRef = useRef(null)
  const rightColRef = useRef(null)
  const portraitImgRef = useRef(null)


  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(s => s.category === activeCategory)

  const handleCopyEmail = (e) => {
    e.preventDefault()
    navigator.clipboard.writeText('dev.rahulmoharana@gmail.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2400)
  }

  // Mouse tilt parallax for portrait
  const handleMouseMove = (e) => {
    if (!leftColRef.current || window.innerWidth < 1024) return
    const rect = leftColRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.015
    const y = (e.clientY - rect.top - rect.height / 2) * 0.015

    if (portraitImgRef.current) {
      gsap.to(portraitImgRef.current, {
        x: -x * 6,
        y: -y * 6,
        duration: 0.8,
        ease: 'power2.out'
      })
    }
  }

  const handleMouseLeave = () => {
    if (!portraitImgRef.current) return
    gsap.to(portraitImgRef.current, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
  }

  // Scroll-triggered content reveals (no overlay — App.jsx Chapter 1 dissolve handles the transition)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Portrait image reveal
      gsap.from(portraitImgRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 40%',
          toggleActions: 'play none none reverse'
        },
        immediateRender: false,
        scale: 0.92,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out'
      })

      // Right editorial paragraphs
      gsap.from('.editorial-paragraph', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 35%',
          toggleActions: 'play none none reverse'
        },
        immediateRender: false,
        y: 35,
        opacity: 0,
        filter: 'blur(6px)',
        stagger: 0.14,
        duration: 1.0,
        ease: 'power2.out'
      })

      // Chapter timeline bar
      gsap.from('.chapter-bar-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 30%',
          toggleActions: 'play none none reverse'
        },
        immediateRender: false,
        opacity: 0,
        y: 15,
        stagger: 0.06,
        duration: 0.8,
        ease: 'power2.out'
      })

      // Pillars & Arsenal reveal
      gsap.from('.pillar-card-ref', {
        scrollTrigger: {
          trigger: '.pillars-section-container',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        },
        immediateRender: false,
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out'
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative z-30 w-full bg-black text-white selection:bg-[#ba9b82] selection:text-black overflow-hidden font-inter"
    >

      {/* ── MAIN SPLIT SCREEN HERO (1:1 Reference from nabilissa.com) ── */}
      <div 
        className="relative w-full min-h-screen lg:h-screen grid grid-cols-1 lg:grid-cols-12 overflow-hidden"
      >
        {/* ── LEFT COLUMN: PURE CINEMATIC BLACK PORTRAIT (IMAGE ONLY) ── */}
        <div 
          ref={leftColRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-6 relative bg-black flex items-center justify-center p-4 sm:p-8 lg:p-12 min-h-[65vh] lg:min-h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-white/[0.08]"
        >
          {/* Subtle Ambient Grain & Edge Vignettes to blend into pure black */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-10 pointer-events-none" />

          {/* Portrait Image Only (about.png) */}
          <div className="relative w-full h-full flex items-center justify-center z-0">
            <img
              ref={portraitImgRef}
              src={aboutMeImg}
              alt="Rahul Moharana"
              className="w-auto h-[85%] sm:h-[90%] lg:h-[94%] max-w-full object-contain object-center filter grayscale contrast-125 brightness-95 will-change-transform opacity-95 select-none"
            />
          </div>
        </div>

        {/* ── RIGHT COLUMN: WARM STONE/CONCRETE GREY EDITORIAL PANEL ── */}
        <div 
          ref={rightColRef}
          className="lg:col-span-6 relative bg-[#82807e] text-[#f7f6f4] flex flex-col justify-between p-6 sm:p-10 lg:p-14 min-h-[65vh] lg:min-h-full"
          style={{ backgroundColor: '#83817f' }}
        >
          {/* Top Bar: GET IN TOUCH Button + 2-Line Minimalist Menu Icon */}
          <div className="relative z-10 flex items-center justify-end gap-5">
            <a
              href="mailto:dev.rahulmoharana@gmail.com"
              className="inline-flex items-center justify-center px-6 sm:px-7 py-2.5 rounded-full bg-transparent hover:bg-black/10 text-black border border-black/30 hover:border-black transition-all duration-200 text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase select-none"
            >
              GET IN TOUCH
            </a>

            {/* Minimalist 2-line hamburger menu icon */}
            <button 
              onClick={() => {
                const el = document.getElementById('details-section')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="flex flex-col justify-center gap-[5px] w-8 h-8 p-1 cursor-pointer group"
              title="Explore Details"
            >
              <span className="w-7 h-[1.5px] bg-black group-hover:bg-white transition-colors" />
              <span className="w-7 h-[1.5px] bg-black group-hover:bg-white transition-colors" />
            </button>
          </div>

          {/* Centered Editorial Paragraphs */}
          <div className="relative z-10 my-auto max-w-xl py-8 space-y-6 sm:space-y-8 font-inter text-[#eceae6]">
            <p className="editorial-paragraph text-[15px] sm:text-[17px] lg:text-[18px] font-light leading-[1.65] sm:leading-[1.7] tracking-normal text-[#f4f2ee]">
              <span className="font-semibold text-black">Rahul Moharana</span> is a globally recognized full-stack developer and creative engineer whose work spans web architecture, AI systems, and interactive digital design. With a rare synthesis of technical precision, clarity, and craft, he builds digital products that command attention.
            </p>

            <p className="editorial-paragraph text-[15px] sm:text-[17px] lg:text-[18px] font-light leading-[1.65] sm:leading-[1.7] tracking-normal text-[#e8e6e2]">
              His approach is rooted in digital storytelling — designing digital environments that are not only robust, scalable, and high-performance, but emotionally resonant and intuitive to navigate.
            </p>

            <p className="editorial-paragraph text-[15px] sm:text-[17px] lg:text-[18px] font-light leading-[1.65] sm:leading-[1.7] tracking-normal text-[#dedcd8]">
              Based in Cuttack, India with a global engineering reach, he leads development for high-stakes web applications, custom 3D web experiences, and scalable cloud backends.
            </p>

            <div className="pt-4 flex justify-center w-full">
              <img
                src={signatureImg}
                alt="Rahul Moharana Signature"
                className="editorial-paragraph h-24 sm:h-28 md:h-32 lg:h-36 w-auto max-w-full object-contain opacity-90 mix-blend-screen select-none"
              />
            </div>
          </div>

          {/* Bottom Right Chapter Timeline Bar */}
          <div className="relative z-10 pt-8 mt-auto flex flex-wrap items-center gap-6 sm:gap-8 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-[#dcdad6] uppercase border-t border-black/10">
            {chapters.slice(1).map((chap) => (
              <div 
                key={chap.id}
                onClick={() => {
                  const el = document.getElementById('details-section')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="chapter-bar-item flex items-center gap-2 cursor-pointer hover:text-black transition-colors"
              >
                <span className="w-1.5 h-1.5 border border-current block flex-shrink-0" />
                <span>{chap.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── EXPANDED DETAILS SECTION: CAPABILITIES, ARSENAL & METRICS ── */}
      <div 
        id="details-section"
        className="pillars-section-container relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-24 sm:py-32 space-y-24"
      >
        {/* Section Header */}
        <div className="border-b border-white/[0.08] pb-8">
          <div className="flex items-center gap-3 text-zinc-500 text-[10px] sm:text-xs font-mono tracking-[0.25em] uppercase mb-4">
            <span className="w-2 h-2 border border-zinc-500 inline-block rotate-45" />
            <span>DISCIPLINES & PHILOSOPHY // 04 PILLARS</span>
          </div>

          <h3 className="font-montserrat text-3xl sm:text-4xl md:text-5xl font-[100] tracking-tight uppercase leading-[1.0] text-white">
            SCALABLE ARCHITECTURE. <br />
            <span className="font-semibold text-[#ba9b82]">CINEMATIC MOTION.</span>
          </h3>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {corePillars.map((pillar, idx) => (
            <div
              key={idx}
              className="pillar-card-ref group relative p-6 sm:p-8 rounded-xl bg-zinc-950/80 border border-white/[0.08] hover:border-[#ba9b82]/40 transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-900/40"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-mono font-bold text-zinc-500 group-hover:text-[#ba9b82] transition-colors">
                  {pillar.num}
                </span>
                <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-[#ba9b82] transition-colors" />
              </div>

              <h4 className="font-montserrat text-xl font-medium text-white mb-3 group-hover:text-zinc-100">
                {pillar.title}
              </h4>

              <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                {pillar.desc}
              </p>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.04]">
                {pillar.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/[0.04] text-zinc-300 border border-white/[0.06]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Technical Arsenal Filter Matrix */}
        <div className="space-y-6 pt-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-zinc-400">
              TECHNICAL ARSENAL
            </span>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {skillCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#ba9b82] text-black font-bold'
                      : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.04]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredSkills.map((skill, sIdx) => (
              <div
                key={sIdx}
                className={`p-3.5 rounded-lg border transition-all duration-200 flex flex-col justify-between group ${
                  skill.highlight
                    ? 'bg-zinc-950/90 border-[#ba9b82]/30 hover:border-[#ba9b82]'
                    : 'bg-zinc-950/50 border-white/[0.06] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-zinc-200 group-hover:text-white transition-colors">
                    {skill.name}
                  </span>
                  {skill.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ba9b82] animate-pulse" title="Core Specialty" />
                  )}
                </div>
                <div className="flex items-center justify-between text-[9.5px] font-mono text-zinc-500">
                  <span className="capitalize">{skill.category}</span>
                  <span className="text-zinc-400">{skill.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Proven Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-zinc-950/80 border border-white/[0.06] hover:border-[#ba9b82]/30 transition-colors"
            >
              <div className="font-montserrat text-3xl sm:text-4xl font-extralight text-white mb-1">
                {stat.value}
              </div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-300 font-semibold mb-0.5">
                {stat.label}
              </div>
              <div className="text-[9px] font-mono text-zinc-500">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive CTA Strip */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <h4 className="font-montserrat text-2xl font-light text-white">
              Ready to collaborate or hire?
            </h4>
            <p className="text-xs text-zinc-400 font-mono">
              DIRECT: <span className="text-zinc-200">dev.rahulmoharana@gmail.com</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyEmail}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-mono text-[10px] font-semibold tracking-[0.18em] uppercase transition-all duration-200 border border-white/20 cursor-pointer"
            >
              {copiedEmail ? 'COPIED EMAIL!' : 'COPY EMAIL'}
            </button>
            <a
              href="mailto:dev.rahulmoharana@gmail.com"
              className="px-6 py-3 rounded-full bg-[#ba9b82] hover:bg-[#cbb09b] text-black font-mono text-[10px] font-bold tracking-[0.18em] uppercase transition-all duration-200"
            >
              SEND INQUIRY →
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}

export default AboutMe
