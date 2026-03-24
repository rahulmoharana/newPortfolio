import React, { useEffect, useState } from 'react'
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

gsap.registerPlugin(ScrollTrigger)

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

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
    }
  }, [isLoading])

  return (
    <main className="bg-[#000000] min-h-screen">
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
    </main>
  )
}

export default App