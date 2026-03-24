import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import About from './components/About'
import AboutInfo from './components/AboutInfo'
import Projects from './components/Projects'
import RightNow from './components/RightNow'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import RightNowLoader from './components/Loader'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import vibeSong from './assets/Luz Roja.mp3'

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [showMusicPrompt, setShowMusicPrompt] = useState(false)
  const [musicPlayError, setMusicPlayError] = useState('')
  const audioRef = useRef(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Standard Lenis setup
    const lenis = new Lenis()

    lenis.on('scroll', ScrollTrigger.update)

    const update = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)

    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)

      setShowMusicPrompt(true)
    }
  }, [isLoading])

  const closeMusicPrompt = () => {
    setShowMusicPrompt(false)
    setMusicPlayError('')
  }

  const handlePlayMusic = async () => {
    if (!audioRef.current) {
      closeMusicPrompt()
      return
    }

    try {
      audioRef.current.currentTime = 0
      await audioRef.current.play()
      closeMusicPrompt()
    } catch (error) {
      setMusicPlayError('Unable to play audio on this browser right now.')
    }
  }

  return (
    <main className="bg-[#000000] min-h-screen">
      <audio ref={audioRef} src={vibeSong} loop preload="auto" />

      {isLoading ? (
        <RightNowLoader onFinished={() => setIsLoading(false)} />
      ) : (
        <>
          <Navbar />
          <Hero />
          <About />
          <AboutInfo />
          <Projects />
          <RightNow />
          <Footer />
        </>
      )}

      {showMusicPrompt && !isLoading && (
        <div className="music-prompt-overlay fixed inset-0 z-[1000] flex items-center justify-center px-6">
          <div className="music-prompt-card w-full max-w-xl rounded-2xl border border-[#EAD7CC]/40 bg-black/90 p-6 md:p-8 text-[#EAD7CC] shadow-[0_28px_90px_rgba(0,0,0,0.6)]">
            <p className="text-center font-serif uppercase tracking-[0.1em] text-lg md:text-2xl leading-relaxed">
              Want to experience website with my vibe song?
            </p>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={handlePlayMusic}
                className="rounded-full border border-[#FF4D00] bg-[#FF4D00] px-7 py-2 text-sm font-semibold uppercase tracking-[0.1em] text-black transition hover:brightness-110"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={closeMusicPrompt}
                className="rounded-full border border-[#EAD7CC]/55 px-7 py-2 text-sm font-semibold uppercase tracking-[0.1em] text-[#EAD7CC] transition hover:bg-[#EAD7CC]/10"
              >
                No
              </button>
            </div>

            {musicPlayError && (
              <p className="mt-4 text-center text-xs tracking-wide text-[#FF9A70]">{musicPlayError}</p>
            )}
          </div>
        </div>
      )}
    </main>
  )
}

export default App