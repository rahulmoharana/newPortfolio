import React from 'react'
import quickAiImg from '../assets/1-QuickAi.webp'
import splytImg from '../assets/2-Splyt.webp'
import sundownImg from '../assets/3-Sundown.webp'
import twoFoodImg from '../assets/4-twofoodco.webp'

const PROJECT_HEADLINE = [
  { word: 'WHERE', isAccent: false, weight: 'font-[100]' },
  { word: 'SPACE', isAccent: false, weight: 'font-[100]' },
  { word: 'BECOMES', isAccent: false, weight: 'font-[100]' },
  { word: 'NARRATIVE', isAccent: true, weight: 'font-[350]' },
]

const projects = [
  {
    id: 1,
    num: '01',
    chapter: 'CHAPTER I',
    roman: 'I',
    title: 'QuickAI Platform',
    category: 'AI SaaS & Workflow Intelligence',
    year: '2025',
    description:
      'An enterprise-grade generative AI workspace with real-time text processing, prompt engineering pipelines, streaming interfaces, and multi-model LLM orchestration built for next-generation product speed.',
    image: quickAiImg,
    stack: ['Next.js', 'React', 'Node.js', 'Tailwind CSS', 'OpenAI API', 'PostgreSQL'],
    liveUrl: 'https://quickai.rahulmoharana.me',
    githubUrl: 'https://github.com/rahulmoharana',
    align: 'left',
    containerClass: 'lg:w-[56%] xl:w-[54%] lg:ml-0',
    originClass: 'origin-left',
  },
  {
    id: 2,
    num: '02',
    chapter: 'CHAPTER II',
    roman: 'II',
    title: 'Splyt Finance',
    category: 'Fintech & Group Ledger System',
    year: '2024',
    description:
      'A high-conversion fintech platform engineered for seamless group expense splitting, real-time balance calculations, multi-currency ledger tracking, and instant automated debt simplifications.',
    image: splytImg,
    stack: ['React.js', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT Auth'],
    liveUrl: 'https://splyt.rahulmoharana.me',
    githubUrl: 'https://github.com/rahulmoharana',
    align: 'right',
    containerClass: 'lg:w-[56%] xl:w-[54%] lg:ml-auto lg:-mt-12 xl:-mt-20',
    originClass: 'origin-right',
  },
  {
    id: 3,
    num: '03',
    chapter: 'CHAPTER III',
    roman: 'III',
    title: 'Sundown Studio',
    category: 'Creative Engineering & Interactive Web',
    year: '2024',
    description:
      'An award-caliber digital experience recreating premier kinetic web design with complex GSAP timelines, inertial smooth scrolling choreography, magnetic cursors, and custom canvas shaders.',
    image: sundownImg,
    stack: ['GSAP ScrollTrigger', 'JavaScript', 'Lenis Smooth Scroll', 'HTML5 Canvas', 'Modern CSS'],
    liveUrl: 'https://sundown.rahulmoharana.me',
    githubUrl: 'https://github.com/rahulmoharana',
    align: 'left',
    containerClass: 'lg:w-[56%] xl:w-[54%] lg:ml-0 lg:-mt-12 xl:-mt-20',
    originClass: 'origin-left',
  },
  {
    id: 4,
    num: '04',
    chapter: 'CHAPTER IV',
    roman: 'IV',
    title: 'Two Food Co',
    category: 'Editorial E-Commerce & Culinary Brand',
    year: '2024',
    description:
      'An artisanal culinary brand experience combining monumental editorial typography, buttery micro-interactions, responsive checkout workflows, and ultra-fluid page transitions.',
    image: twoFoodImg,
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Stripe API'],
    liveUrl: 'https://twofoodco.rahulmoharana.me',
    githubUrl: 'https://github.com/rahulmoharana',
    align: 'right',
    containerClass: 'lg:w-[56%] xl:w-[54%] lg:ml-auto lg:-mt-12 xl:-mt-20',
    originClass: 'origin-right',
  },
]

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      style={{ opacity: 0 }}
      className="relative z-30 w-full min-h-screen bg-black text-white selection:bg-[#9a7459] selection:text-white pt-4 sm:pt-6 lg:pt-8 pb-8 sm:pb-12 md:pb-16 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 border-t border-white/[0.08] overflow-hidden will-change-[transform,opacity]"
    >
      {/* Background Ambient Glow Accents */}
      <div className="absolute top-[15%] left-[5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] bg-[#9a7459]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[60%] right-[5%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none" />

      {/* ============================================================
          CENTERED MONUMENTAL EDITORIAL HEADLINE
          ============================================================ */}
      <div className="projects-headline-wrapper relative max-w-7xl mx-auto mb-10 sm:mb-14 lg:mb-16 flex flex-col items-center justify-center text-center will-change-[opacity,transform] [perspective:1200px]">
        {/* Exact Monumental Headline Stacked in Center */}
        <div className="flex flex-col items-center justify-center select-none text-center">
          {PROJECT_HEADLINE.map(({ word, isAccent, weight }) => (
            <div
              key={word}
              className="overflow-visible [transform-style:preserve-3d] flex justify-center"
            >
              <h2
                className={`font-['Plus_Jakarta_Sans',sans-serif] text-[36px] sm:text-[64px] md:text-[84px] lg:text-[104px] xl:text-[120px] leading-[0.84] tracking-[-0.015em] uppercase flex [transform-style:preserve-3d] ${weight} ${
                  isAccent
                    ? 'text-[#9a7459] drop-shadow-[0_4px_30px_rgba(154,116,89,0.18)]'
                    : 'text-white'
                }`}
              >
                {word.split('').map((char, charIdx) => {
                  const totalChars = Math.max(word.length - 1, 1)
                  const offset = `${(charIdx / totalChars) * 100}%`

                  return (
                    <span
                      key={`${word}-${char}-${charIdx}`}
                      className="project-headline-char inline-block will-change-[transform,opacity,filter]"
                      style={{
                        transformOrigin: `${offset} 50% -20px`,
                      }}
                    >
                      {char}
                    </span>
                  )
                })}
              </h2>
            </div>
          ))}
        </div>

        {/* Section Subtitle & Metadata Row */}
        <div className="projects-meta-tag mt-8 md:mt-12 flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-xs md:text-sm font-mono tracking-widest uppercase text-zinc-400 will-change-[transform,opacity,filter]">
          <p className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9a7459] animate-pulse" />
            <span className="font-bold text-white">SELECTED WORKS</span>
            <span className="text-zinc-600">/</span>
            <span>(04 ARCHIVES)</span>
          </p>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <p className="text-zinc-500 text-[11px] md:text-xs">
            FULL-STACK & CREATIVE ENGINEERING
          </p>
        </div>
      </div>

      {/* ============================================================
          INTERLOCKING / STEPPED ASYMMETRIC PROJECTS SHOWCASE
          ============================================================ */}
      <div className="relative w-full max-w-[1700px] mx-auto flex flex-col gap-12 sm:gap-20 lg:gap-8 [perspective:1000px]">
        {projects.map((proj) => (
          <article
            key={proj.id}
            data-align={proj.align}
            className={`project-scatter-card relative w-full ${proj.containerClass} group will-change-[transform,opacity,filter] [transform-style:preserve-3d] ${proj.originClass}`}
          >
            {/* Monumental Floating Number in Background */}
            <div className={`project-floating-num absolute -top-6 sm:-top-16 lg:-top-24 z-0 pointer-events-none select-none will-change-transform ${
              proj.align === 'right' ? '-right-4 sm:-right-8 lg:-right-10' : '-left-4 sm:-left-8 lg:-left-10'
            }`}>
              <span className="font-['Tenor_Sans',serif] text-white/[0.04] group-hover:text-[#9a7459]/10 text-[70px] sm:text-[140px] md:text-[180px] lg:text-[220px] xl:text-[250px] font-light leading-none tracking-tighter transition-colors duration-700">
                {proj.num}
              </span>
            </div>

            {/* Top Meta Details Row */}
            <div className="relative z-10 flex items-center justify-between gap-4 mb-2.5 sm:mb-3.5 px-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs md:text-sm text-[#9a7459] font-bold tracking-widest uppercase">
                  {proj.chapter}
                </span>
                <span className="text-zinc-600">//</span>
                <span className="font-mono text-[10px] md:text-xs text-zinc-400 uppercase tracking-wider hidden sm:inline">
                  {proj.category}
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
                <span>YEAR</span>
                <span className="text-white font-semibold">{proj.year}</span>
              </div>
            </div>

            {/* Main Interactive Card Frame */}
            <div className="relative z-10 w-full aspect-[16/10] sm:aspect-[16/9.5] md:aspect-[16/9] overflow-hidden bg-[#111111] border border-white/10 rounded-sm shadow-2xl transition-all duration-500 group-hover:border-white/30 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              {/* Background Image with Parallax */}
              <img
                src={proj.image}
                alt={proj.title}
                className="project-parallax-img w-full h-full object-cover object-center filter brightness-[0.92] contrast-[1.06] group-hover:brightness-100 transition-[filter,opacity] duration-500 will-change-transform"
              />

              {/* Idle Bottom Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />

              {/* Idle Bottom Overlay */}
              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-10 flex items-end justify-between pointer-events-none group-hover:opacity-0 transition-opacity duration-300">
                <div>
                  <span className="font-mono text-[10px] sm:text-xs text-[#9a7459] tracking-widest uppercase block mb-1">
                    {proj.category}
                  </span>
                  <h3 className="font-montserrat text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                    {proj.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest text-zinc-300 uppercase">
                  <span>DETAILS</span>
                  <span>↗</span>
                </div>
              </div>

              {/* Interactive Hover Reveal Overlay */}
              <div className="absolute inset-0 z-20 bg-black/88 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                {/* Overlay Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3 sm:pb-4">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs md:text-sm text-[#9a7459] font-bold tracking-widest uppercase">
                      {proj.chapter} //
                    </span>
                    <span className="font-mono text-[11px] md:text-xs text-zinc-400 uppercase tracking-widest">
                      {proj.category}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-zinc-400">
                    {proj.year}
                  </span>
                </div>

                {/* Overlay Body */}
                <div className="my-auto py-2">
                  <h3 className="font-montserrat text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
                    {proj.title}
                  </h3>
                  <p className="text-zinc-300 text-xs sm:text-sm md:text-[15px] leading-[1.7] font-inter font-light max-w-2xl">
                    {proj.description}
                  </p>
                </div>

                {/* Overlay Footer */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 sm:pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {proj.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-[9px] sm:text-[10px] font-mono tracking-wider text-zinc-300 bg-white/[0.06] border border-white/10 uppercase"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-black font-mono text-[11px] font-bold tracking-wider uppercase hover:bg-[#9a7459] hover:text-white transition-colors duration-200"
                    >
                      <span>LIVE DEMO</span>
                      <span>↗</span>
                    </a>

                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-transparent text-zinc-300 border border-white/20 font-mono text-[11px] font-medium tracking-wider uppercase hover:text-white hover:border-white/50 transition-colors duration-200"
                    >
                      <span>SOURCE</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Meta Bar (Visible on Mobile / Fallback) */}
            <div className="relative z-10 mt-2.5 sm:mt-3 flex flex-wrap items-center justify-between gap-3 px-1">
              <div className="flex flex-wrap gap-2">
                {proj.stack.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] md:text-[11px] font-mono text-zinc-500 tracking-wider uppercase"
                  >
                    #{tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[#9a7459] hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider font-semibold"
                >
                  <span>VIEW LIVE</span>
                  <span>↗</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default ProjectsSection
