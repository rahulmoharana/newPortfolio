import React from 'react'
import ScrollHighlight from './originkit/ui/scroll-text-highlight'

const MANIFESTO_TEXT =
  'EVERY SYSTEM SERVES AS A PROFOUND SYNTHESIS OF LOGIC AND ART — STRIKING IN ITS INTERACTION, INTENTIONAL IN FULL-STACK ARCHITECTURE, AND ENGINEERED TO RESHAPE MODERN DIGITAL EXPERIENCES.'

const DOMAIN_TAGS = [
  'FULL-STACK ARCHITECTURE',
  'CREATIVE ENGINEERING',
  'SUB-SECOND PERFORMANCE',
  'SCALABLE CLOUD SYSTEMS',
]

const ManifestoSection = () => {
  return (
    <section
      id="manifesto"
      className="relative z-30 w-full bg-black text-white selection:bg-[#9a7459] selection:text-white flex flex-col justify-start px-6 sm:px-10 md:px-14 lg:px-20 pt-4 sm:pt-6 lg:pt-8 pb-16 sm:pb-24 lg:pb-32 overflow-hidden"
    >
      {/* Center Main Statement Area */}
      <div className="relative w-full max-w-[1700px] mx-auto flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-16">
        {/* Left Editorial Meta Tags */}
        <div className="flex lg:flex-col justify-between lg:justify-start gap-6 lg:gap-10 text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-zinc-400 uppercase select-none w-full lg:w-auto flex-shrink-0 pt-1 lg:pt-2">
          <div>
            <span className="text-zinc-200 font-semibold block">PHILOSOPHY</span>
            <span className="text-zinc-500 text-[9px] block mt-0.5">EST. 2024–2025</span>
          </div>

          <div className="flex flex-col gap-1.5 text-zinc-400">
            <span>FULL-STACK</span>
            <span>CREATIVE LOGIC</span>
            <span>BUILT TO SCALE</span>
          </div>

          <div className="hidden lg:flex flex-col gap-1 pt-4 border-t border-white/10 text-zinc-500 text-[9px] tracking-widest">
            <span>RAHUL MOHARANA</span>
            <span>DEV // ARCHITECT</span>
          </div>
        </div>

        {/* Right Monumental Manifesto Typography via Originkit ScrollHighlight */}
        <div className="w-full lg:max-w-[78%] xl:max-w-[75%] select-none">
          <ScrollHighlight
            text={MANIFESTO_TEXT}
            dimColor="rgba(255, 255, 255, 0.2)"
            highlightColor="#FFFFFF"
            splitBy="characters"
            scrollStart="top 85%"
            scrollEnd="bottom 45%"
            scrub={0.8}
            disablePadding={true}
            className="font-['Plus_Jakarta_Sans',sans-serif] text-[28px] sm:text-[44px] md:text-[62px] lg:text-[80px] xl:text-[96px] 2xl:text-[108px] font-[100] leading-[0.92] tracking-[-0.015em] uppercase"
          />

          {/* Domain Specialty Tags */}
          <div className="mt-8 sm:mt-12 flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-[11px] tracking-wider uppercase">
            {DOMAIN_TAGS.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white hover:border-white/30 transition-colors duration-300 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ManifestoSection
