import React from 'react'

// Large monochrome Black & White technology SVGs
const icons = [
  {
    name: 'React.js',
    svg: (
      <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 115.3 100" fill="currentColor">
        <path d="M57.6,44.9c3,0,5.4,2.3,5.4,5.1s-2.4,5.1-5.4,5.1c-3,0-5.4-2.3-5.4-5.1S54.6,44.9,57.6,44.9z"/>
        <path fill="none" stroke="currentColor" strokeWidth="4.5" strokeMiterlimit="10" d="M57.6,6.7c19.3,0,32.7,18.7,32.7,43.3s-13.4,43.3-32.7,43.3S25,74.7,25,50S38.4,6.7,57.6,6.7z" transform="matrix(0.866 -0.5 0.5 0.866 -17.3 36.3)"/>
        <path fill="none" stroke="currentColor" strokeWidth="4.5" strokeMiterlimit="10" d="M57.6,6.7c19.3,0,32.7,18.7,32.7,43.3s-13.4,43.3-32.7,43.3S25,74.7,25,50S38.4,6.7,57.6,6.7z" transform="matrix(-0.866 -0.5 0.5 -0.866 82.7 121.7)"/>
        <path fill="none" stroke="currentColor" strokeWidth="4.5" strokeMiterlimit="10" d="M57.6,6.7c19.3,0,32.7,18.7,32.7,43.3s-13.4,43.3-32.7,43.3S25,74.7,25,50S38.4,6.7,57.6,6.7z"/>
      </svg>
    )
  },
  {
    name: 'Next.js',
    svg: (
      <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 180 180" fill="currentColor">
        <circle cx="90" cy="90" r="88" fill="none" stroke="currentColor" strokeWidth="4"/>
        <path d="M149.5 157.4L69.1 54H54v72h12.1V69.4l73.9 95.4c3.3-2.2 6.5-4.7 9.5-7.4z" fill="currentColor"/>
        <rect x="115" y="54" width="12" height="72" fill="currentColor"/>
      </svg>
    )
  },
  {
    name: 'TypeScript',
    svg: (
      <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 128 128" fill="none">
        <rect width="128" height="128" rx="20" fill="none" stroke="currentColor" strokeWidth="6"/>
        <path d="M60.1 76.8h-9.9v35.7h-9.5V76.8h-9.9v-8.2h29.3v8.2zm20.8 36.2c-5.5 0-9.8-1.5-13-4.4l5.3-6.8c2.4 2.2 5.1 3.4 8.3 3.4 3.3 0 5.2-1.3 5.2-3.4 0-1.8-1.2-2.9-4.8-4.1l-4.5-1.5c-6.8-2.3-10.2-6.2-10.2-11.8 0-6.9 5.3-11.7 13.5-11.7 5.1 0 9 1.4 11.9 3.8l-4.8 6.9c-2.3-1.8-4.6-2.8-7.3-2.8-3.1 0-4.8 1.4-4.8 3.3 0 1.7 1.3 2.7 4.9 3.9l4.5 1.5c7.2 2.4 10.5 6.4 10.5 12 0 7.4-5.3 11.8-14.7 11.8z" fill="currentColor"/>
      </svg>
    )
  },
  {
    name: 'JavaScript',
    svg: (
      <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 128 128" fill="none">
        <rect width="128" height="128" rx="20" fill="none" stroke="currentColor" strokeWidth="6"/>
        <path d="M78.6 102.2c2.6 4.3 6 7 11.9 7 6 0 9.9-2.9 9.9-9.9v-39h12.5v39.1c0 14.1-8.3 20.3-21.7 20.3-11.4 0-18.4-5.9-22-14.7l9.4-2.8zm-43.2-1.6c3.2 5.2 7.7 8.6 15.3 8.6 6.5 0 10.8-3.2 10.8-7.7 0-5.3-4.3-7.3-11.5-10.4l-3.9-1.7c-11.3-4.8-18.8-10.8-18.8-23.4 0-11.7 9.1-20.6 23.3-20.6 10.1 0 17.3 3.6 22.4 12.6l-9.8 6.3c-2.2-3.9-5.1-5.7-9.8-5.7-4.6 0-7.8 2.9-7.8 6.6 0 4.6 3 6.6 9.8 9.5l3.9 1.7c13.3 5.7 20.7 11.4 20.7 24.3 0 13.9-10.9 21.6-25.7 21.6-14.6 0-23.7-7-28.1-15.6l9.2-6.2z" fill="currentColor"/>
      </svg>
    )
  },
  {
    name: 'Three.js',
    svg: (
      <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 128 128" fill="currentColor">
        <path d="M64 16L16 44v40l48 28 48-28V44L64 16zm0 14.5l34.8 20.3L64 71.1 29.2 50.8 64 30.5zM24 55.4l36 21v38.8L24 94.2V55.4zm72 38.8l-36 21V76.4l36-21v38.8z"/>
      </svg>
    )
  },
  {
    name: 'GSAP',
    svg: (
      <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 128 128" fill="none">
        <circle cx="64" cy="64" r="56" fill="none" stroke="currentColor" strokeWidth="6"/>
        <text x="50%" y="62%" textAnchor="middle" fill="currentColor" fontSize="28" fontWeight="bold" fontFamily="monospace">GSAP</text>
      </svg>
    )
  },
  {
    name: 'Node.js',
    svg: (
      <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 128 128" fill="none">
        <path d="M64 4.5L12 34.5v60l52 30 52-30v-60L64 4.5z" stroke="currentColor" strokeWidth="6"/>
        <path d="M64 43.8c-12.7 0-18.4 6.7-18.4 15.6 0 14.5 19.9 13.4 19.9 22.6 0 3.7-2.9 6.2-7.8 6.2-5.4 0-9.2-2.8-12.2-7l-6.8 5.7c4.6 6.3 11 9.8 19 9.8 13.3 0 19.5-7.4 19.5-16.4 0-15.4-19.9-14.1-19.9-22.6 0-3.3 2.5-5.5 6.9-5.5 4.6 0 7.8 2.2 10.4 5.7l6.8-5.6c-4.2-5.6-9.9-8.5-17.4-8.5z" fill="currentColor"/>
      </svg>
    )
  },
  {
    name: 'Tailwind CSS',
    svg: (
      <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z"/>
      </svg>
    )
  },
  {
    name: 'PostgreSQL',
    svg: (
      <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 128 128" fill="none">
        <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="6"/>
        <path d="M90.2 86.4c-3.5 4.5-9.6 7.6-17.7 7.6-14.7 0-25.8-10.4-25.8-24.9 0-14.7 11.2-25.1 26.2-25.1 8 0 14.2 3.1 17.5 7.8l-6.8 5.6c-2.3-3.1-6-5-10.7-5-9.5 0-16.1 6.8-16.1 16.7 0 9.8 6.5 16.5 15.9 16.5 4.9 0 8.7-2 11.1-5.3l6.4 6.1z" fill="currentColor"/>
      </svg>
    )
  },
  {
    name: 'MongoDB',
    svg: (
      <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 128 128" fill="none">
        <path d="M64.7 125.7c-1.8 0-3.3-.9-4.2-2.3C52.9 110.8 19 55.4 61.8 5.4c1.1-1.3 2.8-2.1 4.6-2.1s3.5.8 4.6 2.1c42.8 50 8.9 105.4 1.3 118-1 1.4-2.5 2.3-4.3 2.3h-3.3zm-.7-109.8C35.8 52.8 53.6 94.6 64 108.9c10.4-14.3 28.2-56.1-.7-93z" stroke="currentColor" strokeWidth="6" fill="currentColor"/>
      </svg>
    )
  },
  {
    name: 'Docker',
    svg: (
      <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 128 128" fill="currentColor">
        <path d="M118.8 56.4c-1.5-1-4.8-1.5-7.9-.7-1.3-4.8-4.7-9-9.9-12l-5.3-3.1-3.2 5.2c-3.1 5-4.3 11.2-3.3 17.1-2.2.9-6.3 1.4-11.4 1.4H6.2c-2.3 0-4.2 1.9-4.2 4.2 0 14.3 5.4 28 15.2 38.6 10.3 11.1 24.3 17.5 39.4 17.8 28.5.6 54.4-15.3 64.9-39.9 7.7-1.3 14.5-6.3 18.2-13.6 1.4-2.8 1.4-6.3-.9-9zm-69.2-30.8h-11v11h11v-11zm15.4 0H54v11h11v-11zm15.4 0H69.4v11h11v-11zm-46.2 15.4h-11v11h11v-11zm15.4 0H34.2v11h11v-11zm15.4 0H49.6v11h11v-11zm15.4 0H65v11h11v-11zm-46.2 15.4h-11v11h11v-11zm15.4 0H18.8v11h11v-11z"/>
      </svg>
    )
  },
  {
    name: 'Git',
    svg: (
      <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 128 128" fill="currentColor">
        <path d="M123.6 57.3L70.7 4.4c-3.9-3.9-10.2-3.9-14.1 0L42.5 18.5l17.8 17.8c4.2-1.4 9.1-.5 12.5 2.8 3.4 3.4 4.3 8.3 2.9 12.5l17.2 17.2c4.2-1.4 9.1-.5 12.5 2.8 4.7 4.7 4.7 12.4 0 17.1-4.7 4.7-12.4 4.7-17.1 0-3.6-3.6-4.4-8.9-2.5-13.2L67.1 56.7v35.3c1.2.6 2.4 1.5 3.3 2.5 4.7 4.7 4.7 12.4 0 17.1-4.7 4.7-12.4 4.7-17.1 0-4.7-4.7-4.7-12.4 0-17.1 1.4-1.4 3.1-2.4 5-3V55.8c-1.9-.6-3.6-1.6-5-3-3.6-3.6-4.4-8.9-2.5-13.2L33 21.8 4.4 50.4c-3.9 3.9-3.9 10.2 0 14.1l52.9 52.9c3.9 3.9 10.2 3.9 14.1 0l52.2-52.2c3.9-3.9 3.9-10.2 0-14.1z"/>
      </svg>
    )
  },
  {
    name: 'Figma',
    svg: (
      <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 128 128" fill="none">
        <path d="M38 128c14.4 0 26-11.6 26-26V76H38c-14.4 0-26 11.6-26 26s11.6 26 26 26z" stroke="currentColor" strokeWidth="6" fill="currentColor"/>
        <path d="M12 50c0-14.4 11.6-26 26-26h26v52H38c-14.4 0-26-11.6-26-26z" stroke="currentColor" strokeWidth="6"/>
        <path d="M12 26C12 11.6 23.6 0 38 0h26v52H38C23.6 52 12 40.4 12 26z" stroke="currentColor" strokeWidth="6"/>
        <path d="M64 0h26c14.4 0 26 11.6 26 26s-11.6 26-26 26H64V0z" stroke="currentColor" strokeWidth="6"/>
        <path d="M116 76c0 14.4-11.6 26-26 26s-26-11.6-26-26 11.6-26 26-26 26 11.6 26 26z" stroke="currentColor" strokeWidth="6"/>
      </svg>
    )
  },
  {
    name: 'GraphQL',
    svg: (
      <svg className="w-12 h-12 md:w-14 md:h-14" viewBox="0 0 128 128" fill="none">
        <path d="M64 8l48.5 28v56L64 120 15.5 92V36L64 8zm0 11.5L25.4 42v44L64 108.5l38.6-22.5V42L64 19.5z" stroke="currentColor" strokeWidth="5"/>
        <circle cx="64" cy="8" r="8" fill="currentColor"/>
        <circle cx="112.5" cy="36" r="8" fill="currentColor"/>
        <circle cx="112.5" cy="92" r="8" fill="currentColor"/>
        <circle cx="64" cy="120" r="8" fill="currentColor"/>
        <circle cx="15.5" cy="92" r="8" fill="currentColor"/>
        <circle cx="15.5" cy="36" r="8" fill="currentColor"/>
      </svg>
    )
  }
]

const CurvedMarquee = () => {
  return (
    <section className="relative z-30 w-full py-28 md:py-36 bg-[#080808] overflow-hidden select-none border-t border-white/[0.06]">
      
      {/* Studio Lighting & Ambient Dark Vignettes */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />

      {/* Center Spotlight */}
      <div className="absolute inset-0 bg-radial from-white/[0.03] via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <div className="max-w-[1200px] mx-auto px-6 mb-16 md:mb-20 text-center relative z-20">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md mb-5">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span className="text-[10.5px] font-semibold tracking-[0.25em] uppercase text-zinc-400 font-inter">
            Tech Arsenal & Capabilities
          </span>
        </div>
        <h2 className="text-[28px] sm:text-[36px] md:text-[46px] lg:text-[54px] font-montserrat font-[100] tracking-[0.04em] uppercase text-white/95 leading-[1.1]">
          STACK BEHIND THE <span className="font-[400] text-white">CRAFT</span>
        </h2>
      </div>

      {/* ── 3D CYLINDER CURVED MARQUEE TRACK (Pure Monochrome Black & White) ── */}
      <div className="relative w-full overflow-hidden [perspective:1400px] flex flex-col gap-10 md:gap-14 py-8">
        
        {/* ROW 1: Tilted -3.5° Curved Ribbon with Large B&W Icon Cards (Scrolling Left) */}
        <div className="relative w-full -rotate-3 scale-[1.06] overflow-hidden py-4">
          <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused] items-center gap-6 md:gap-8">
            {[...icons, ...icons, ...icons].map((item, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col items-center justify-center w-[140px] h-[140px] md:w-[170px] md:h-[170px] rounded-3xl bg-zinc-950/80 backdrop-blur-xl border border-white/10 hover:border-white/40 hover:bg-zinc-900/90 transition-all duration-400 cursor-pointer shadow-2xl hover:scale-105"
              >
                {/* Large Monochrome Icon */}
                <div className="text-zinc-400 group-hover:text-white transition-colors duration-300 flex items-center justify-center mb-3">
                  {item.svg}
                </div>

                {/* Minimal B&W Label */}
                <span className="text-[11px] md:text-[12px] font-medium tracking-[0.14em] uppercase text-zinc-500 group-hover:text-white transition-colors font-inter text-center">
                  {item.name}
                </span>

                {/* Subtle Glass Inner Border Highlight */}
                <div className="absolute inset-0 rounded-3xl border border-white/[0.04] pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

        {/* ROW 2: Tilted +3.5° Counter-Curved Ribbon with Large B&W Icon Cards (Scrolling Right) */}
        <div className="relative w-full rotate-3 scale-[1.06] overflow-hidden py-4">
          <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused] items-center gap-6 md:gap-8">
            {[...icons.slice().reverse(), ...icons.slice().reverse(), ...icons.slice().reverse()].map((item, idx) => (
              <div
                key={idx}
                className="group relative flex flex-col items-center justify-center w-[140px] h-[140px] md:w-[170px] md:h-[170px] rounded-3xl bg-zinc-950/80 backdrop-blur-xl border border-white/10 hover:border-white/40 hover:bg-zinc-900/90 transition-all duration-400 cursor-pointer shadow-2xl hover:scale-105"
              >
                {/* Large Monochrome Icon */}
                <div className="text-zinc-400 group-hover:text-white transition-colors duration-300 flex items-center justify-center mb-3">
                  {item.svg}
                </div>

                {/* Minimal B&W Label */}
                <span className="text-[11px] md:text-[12px] font-medium tracking-[0.14em] uppercase text-zinc-500 group-hover:text-white transition-colors font-inter text-center">
                  {item.name}
                </span>

                {/* Subtle Glass Inner Border Highlight */}
                <div className="absolute inset-0 rounded-3xl border border-white/[0.04] pointer-events-none" />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Deep Side Vignette Fades */}
      <div className="absolute top-0 bottom-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#080808] via-[#080808]/90 to-transparent pointer-events-none z-20" />
      <div className="absolute top-0 bottom-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#080808] via-[#080808]/90 to-transparent pointer-events-none z-20" />

    </section>
  )
}

export default CurvedMarquee
