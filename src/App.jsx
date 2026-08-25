import React, { useState, useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

import bgImage from './assets/mask.png'
import logoImg from './assets/logo.png'
import aboutImg from './assets/aboutus.png'
import aboutMeImg from './assets/about.png'
import chapter2Img from './assets/chapter2.png'
import signatureImg from './assets/signature.png'
import vibeSong from './assets/Luz Roja.mp3'
import Button from './components/Button'
import SkillsMarquee from './components/SkillsMarquee'
import LocationRoleSection from './components/LocationRoleSection'
import ProjectsSection from './components/ProjectsSection'
import ManifestoSection from './components/ManifestoSection'
import ConnectSection from './components/ConnectSection'
import TextAnimationCollection from './components/TextAnimationCollection'

gsap.registerPlugin(ScrollTrigger)

// ------------------------------------------------------------
// SCROLL RESTORATION FIX
// ------------------------------------------------------------
if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

const HEADLINE_WORDS = ['CAN', 'DESIGN', 'SHAPE', 'HOW', 'WE', 'FEEL?']

const ROLES = [
  'FULLSTACK DEVELOPER',
  'FRONTEND DEVELOPER',
  'BACKEND DEVELOPER',
  'CREATIVE DESIGNER',
]

const ABOUT_PARAGRAPHS = [
  {
    text: 'Rahul Moharana is a globally recognized multidisciplinary creative developer whose work spans full-stack architecture, creative engineering, and interactive design. With an obsessive focus on craft, he brings a rare synthesis of clarity, culture, and code.',
    opacity: 'text-white',
  },
  {
    text: 'His approach is rooted in spatial storytelling — designing environments that are not only functional, but emotionally resonant.',
    opacity: 'text-white/80',
  },
  {
    text: "Based in India with global reach, he leads projects that reinterpret minimalism with soul. Rahul's digital spaces are immersive yet intuitively engineered.",
    opacity: 'text-white/70',
  },
]

const ABOUT_HEADLINE = [
  { word: 'FULL', isAccent: false, weight: 'font-[100]' },
  { word: 'STACK', isAccent: false, weight: 'font-[100]' },
  { word: 'DEVELOPER', isAccent: true, weight: 'font-[400]' },
]

const App = () => {
  const [cookieAccepted, setCookieAccepted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [introTextActive, setIntroTextActive] = useState(true)

  const containerRef = useRef(null)
  const loaderRef = useRef(null)
  const bgRef = useRef(null)
  const darkOverlayRef = useRef(null)

  const logoRef = useRef(null)
  const logoWrapperRef = useRef(null)
  const nameRef = useRef(null)
  const ctaWrapperRef = useRef(null)
  const scrollPromptRef = useRef(null)
  const cookieRef = useRef(null)
  const audioToggleRef = useRef(null)
  const audioRef = useRef(null)

  const aboutSectionRef = useRef(null)
  const aboutMeSectionRef = useRef(null)
  const chapter2ContainerRef = useRef(null)
  const chapter2SectionRef = useRef(null)

  const lenisRef = useRef(null)
  const introCompleteRef = useRef(false)
  const masterTlRef = useRef(null)

  useLayoutEffect(() => {
    if (!containerRef.current) return undefined

    window.scrollTo(0, 0)

    const lenis = new Lenis({
      duration: 2.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.65,
      touchMultiplier: 1.2,
    })

    lenisRef.current = lenis
    introCompleteRef.current = false

    lenis.scrollTo(0, { immediate: true })

    const updateLenis = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateLenis)
    gsap.ticker.lagSmoothing(0)
    lenis.on('scroll', ScrollTrigger.update)

    lenis.stop()

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      const setInitialState = () => {
        gsap.set(loaderRef.current, {
          autoAlpha: 1,
          display: 'block',
        })

        gsap.set('.intro-mask-rect', {
          attr: { width: 0, height: 0, rx: 0.6 },
        })

        gsap.set(bgRef.current, {
          scale: 1,
          x: 0,
          y: 0,
          autoAlpha: 0.95,
        })

        gsap.set(logoRef.current, {
          scale: 0.6,
          autoAlpha: 0,
        })

        gsap.set(nameRef.current, {
          x: -20,
          autoAlpha: 0,
          filter: 'blur(12px)',
        })

        gsap.set('.hero-role-item', {
          x: 25,
          autoAlpha: 0,
        })

        gsap.set(ctaWrapperRef.current, {
          scale: 0.85,
          autoAlpha: 0,
        })

        gsap.set(scrollPromptRef.current, {
          y: 20,
          autoAlpha: 0,
        })

        gsap.set(cookieRef.current, {
          y: 40,
          autoAlpha: 0,
        })

        gsap.set(audioToggleRef.current, {
          y: 15,
          autoAlpha: 0,
        })

        gsap.set(aboutSectionRef.current, {
          autoAlpha: 0,
          visibility: 'hidden',
          '--mask-size': 'max(300px, 35vw)',
          '--mask-x': '20%',
          '--mask-y': '50%',
        })

        gsap.set('.about-img', {
          scale: 1,
        })

        gsap.set(chapter2SectionRef.current, {
          autoAlpha: 0,
          visibility: 'hidden',
          '--ch2-mask-size': 'max(300px, 35vw)',
          '--ch2-mask-x': '20%',
          '--ch2-mask-y': '50%',
        })

        gsap.set('.chapter2-img', {
          scale: 1,
        })

        gsap.set('#projects', {
          autoAlpha: 0,
          y: 0,
        })

        gsap.set('.project-headline-char', {
          autoAlpha: 0,
          rotateY: 90,
          transformOrigin: 'center center',
          filter: 'blur(8px)',
        })

        gsap.set('.project-scatter-card', {
          autoAlpha: 0,
          rotateY: 45,
          x: -25,
          scale: 0.96,
          transformOrigin: 'left center',
          transformPerspective: 1000,
          filter: 'blur(8px)',
        })

        gsap.set('.projects-meta-tag', {
          autoAlpha: 0,
          y: 15,
          filter: 'blur(4px)',
        })

        gsap.set('.headline-item', {
          autoAlpha: 0,
          rotateX: 85,
          scale: 0.95,
          y: 15,
          transformOrigin: '50% 50% -10px',
          transformPerspective: 1000,
        })

        gsap.set(aboutMeSectionRef.current, {
          autoAlpha: 0,
          y: 40,
        })

        gsap.set('.about-headline-char', {
          autoAlpha: 0,
          rotateY: 90,
          transformOrigin: 'center center',
          filter: 'blur(8px)',
        })

        gsap.set('.about-editorial-word', {
          autoAlpha: 0,
          y: 14,
          filter: 'blur(6px)',
        })

        gsap.set('.about-signature', {
          autoAlpha: 0,
          y: 15,
          filter: 'blur(4px)',
        })

        gsap.set('.about-me-portrait', {
          scale: 0.92,
          autoAlpha: 0,
        })
      }

      setInitialState()

      const masterTl = gsap.timeline({
        defaults: {
          ease: 'power4.out',
        },
        paused: true,
      })

      masterTlRef.current = masterTl

      // ------------------------------------------------------------
      // INTRO / LOADER
      // ------------------------------------------------------------

      const maskRects = gsap.utils.toArray('.intro-mask-rect')

      const rectMidStates = [
        { x: 38, y: 10, width: 22, height: 52 },
        { x: 38, y: 22, width: 22, height: 52 },
        { x: 38, y: 36, width: 22, height: 52 },
      ]

      const rectCenters = [
        { cx: 18, cy: 36 },
        { cx: 49, cy: 48 },
        { cx: 81, cy: 62 },
      ]

      maskRects.forEach((rect, i) => {
        gsap.set(rect, {
          attr: {
            x: rectCenters[i].cx,
            y: rectCenters[i].cy,
            width: 0,
            height: 0,
            rx: 0.6,
          },
        })
      })

      maskRects.forEach((rect, i) => {
        masterTl.to(
          rect,
          {
            attr: rectMidStates[i],
            duration: 1.0,
            ease: 'power2.out',
          },
          0.15 + i * 0.12,
        )
      })

      const rectFinals = [
        { x: -1, y: -1, width: 36, height: 102, rx: 0 },
        { x: 33, y: -1, width: 36, height: 102, rx: 0 },
        { x: 65, y: -1, width: 37, height: 102, rx: 0 },
      ]

      maskRects.forEach((rect, i) => {
        masterTl.to(
          rect,
          {
            attr: rectFinals[i],
            duration: 1.2,
            ease: 'power3.inOut',
          },
          1.3 + i * 0.08,
        )
      })

      masterTl
        .to(
          loaderRef.current,
          {
            autoAlpha: 0,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => {
              if (loaderRef.current) {
                loaderRef.current.style.display = 'none'
              }
            },
          },
          '-=0.35',
        )
        .to(
          '.headline-item',
          {
            autoAlpha: 1,
            rotateX: 0,
            scale: 1,
            y: 0,
            duration: 1.25,
            stagger: {
              from: 'center',
              each: 0.08,
            },
            ease: 'power3.out',
          },
          '-=0.2',
        )
        .to(
          logoRef.current,
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.9,
            ease: 'back.out(1.5)',
          },
          '-=0.9',
        )
        .to(
          nameRef.current,
          {
            x: 0,
            autoAlpha: 1,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power2.out',
          },
          '-=0.7',
        )
        .to(
          '.hero-role-item',
          {
            x: 0,
            autoAlpha: 1,
            duration: 0.7,
            stagger: 0.05,
            ease: 'power2.out',
          },
          '-=0.7',
        )
        .to(
          ctaWrapperRef.current,
          {
            scale: 1,
            autoAlpha: 1,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.6',
        )
        .to(
          scrollPromptRef.current,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
          },
          '-=0.4',
        )
        .to(
          cookieRef.current,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
          },
          '-=0.3',
        )
        .to(
          audioToggleRef.current,
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
          },
          '-=0.2',
        )

      // ------------------------------------------------------------
      // MOUSE PARALLAX
      // ------------------------------------------------------------

      const xSetBg = gsap.quickTo(bgRef.current, 'x', {
        duration: 0.8,
        ease: 'power2.out',
      })

      const ySetBg = gsap.quickTo(bgRef.current, 'y', {
        duration: 0.8,
        ease: 'power2.out',
      })

      const handleMouseMove = (event) => {
        if (window.matchMedia('(pointer: coarse)').matches) return

        const { innerWidth, innerHeight } = window
        if (!innerWidth || !innerHeight) return

        const normX = (event.clientX / innerWidth - 0.5) * 20
        const normY = (event.clientY / innerHeight - 0.5) * 20

        xSetBg(-normX)
        ySetBg(-normY)
      }

      window.addEventListener('mousemove', handleMouseMove, {
        passive: true,
      })

      // ------------------------------------------------------------
      // HERO SCROLL TRANSITION
      // ------------------------------------------------------------

      const scrollScrubTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * 0.7}`,
          scrub: 0.3,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      })

      scrollScrubTl
        .to(
          darkOverlayRef.current,
          {
            autoAlpha: 1,
            ease: 'none',
          },
          0,
        )
        .to(
          '.headline-item',
          {
            autoAlpha: 0,
            rotateX: 85,
            scale: 0.95,
            y: 15,
            stagger: {
              from: 'center',
              each: 0.04,
            },
            ease: 'none',
          },
          0,
        )
        .to(
          scrollPromptRef.current,
          {
            autoAlpha: 0,
            y: 20,
            ease: 'none',
          },
          0,
        )
        .to(
          nameRef.current,
          {
            autoAlpha: 0,
            x: -20,
            filter: 'blur(12px)',
            ease: 'none',
          },
          0,
        )
        .to(
          '.hero-role-item',
          {
            autoAlpha: 0,
            x: 25,
            stagger: 0.03,
            ease: 'none',
          },
          0,
        )

      // ------------------------------------------------------------
      // RESPONSIVE LOGO & CTA SCROLL BEHAVIOR
      // ------------------------------------------------------------

      mm.add('(min-width: 1024px)', () => {
        gsap.set(
          [logoWrapperRef.current, ctaWrapperRef.current],
          {
            top: '50%',
            yPercent: -50,
          },
        )

        scrollScrubTl.to(
          [logoWrapperRef.current, ctaWrapperRef.current],
          {
            top: '24px',
            yPercent: 0,
            ease: 'none',
          },
          0,
        )
      })

      mm.add('(max-width: 1023px)', () => {
        gsap.set(
          [logoWrapperRef.current, ctaWrapperRef.current],
          {
            top: '24px',
            yPercent: 0,
          },
        )
      })

      // ------------------------------------------------------------
      // CHAPTER / ABOUT REVEAL
      // ------------------------------------------------------------

      const aboutRevealTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: () => `top+=${window.innerHeight * 0.7} top`,
          end: () => `+=${window.innerHeight * 2.3}`,
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
      })

      aboutRevealTl
        .to(
          aboutSectionRef.current,
          {
            autoAlpha: 1,
            visibility: 'visible',
            duration: 0.3,
            ease: 'none',
          },
          0,
        )
        .to(
          aboutSectionRef.current,
          {
            '--mask-size': 'max(450px, 50vw)',
            '--mask-x': '80%',
            duration: 1.8,
            ease: 'power1.inOut',
          },
          0,
        )
        .to(
          '.about-img',
          {
            scale: 1.06,
            duration: 1.8,
            ease: 'none',
          },
          0,
        )
        .to(
          aboutSectionRef.current,
          {
            autoAlpha: 0,
            duration: 0.6,
            ease: 'power1.in',
          },
          2.4,
        )

      // ------------------------------------------------------------
      // ABOUT-ME SECTION
      // ------------------------------------------------------------

      const aboutMeSection = aboutMeSectionRef.current

      if (aboutMeSection) {
        gsap.fromTo(
          '.about-me-portrait',
          {
            yPercent: -12,
            force3D: true,
          },
          {
            yPercent: 14,
            ease: 'none',
            scrollTrigger: {
              trigger: aboutMeSection,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
              invalidateOnRefresh: true,
            },
          },
        )

        const aboutMeTl = gsap.timeline({
          scrollTrigger: {
            trigger: aboutMeSection,
            start: 'top 85%',
            end: 'center 40%',
            scrub: 1,
            invalidateOnRefresh: true,
          },
          defaults: {
            ease: 'power2.out',
          },
        })

        aboutMeTl
          .to(
            aboutMeSection,
            {
              autoAlpha: 1,
              y: 0,
              duration: 1.0,
            },
            0,
          )
          .to(
            '.about-me-portrait',
            {
              scale: 1,
              autoAlpha: 1,
              duration: 1.2,
            },
            0.1,
          )
          .to(
            '.about-headline-char',
            {
              autoAlpha: 1,
              rotateY: 0,
              filter: 'blur(0px)',
              duration: 1.0,
              stagger: {
                from: 'end',
                each: 0.035,
              },
            },
            0.15,
          )
          .to(
            '.about-editorial-word',
            {
              y: 0,
              autoAlpha: 1,
              filter: 'blur(0px)',
              stagger: 0.015,
              duration: 0.8,
            },
            0.25,
          )
          .to(
            '.about-signature',
            {
              autoAlpha: 0.85,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.6,
            },
            0.6,
          )
      }

      // ------------------------------------------------------------
      // CHAPTER II / REVEAL (PINNED SOLID BLACK VIEWPORT)
      // ------------------------------------------------------------

      if (
        chapter2ContainerRef.current &&
        chapter2SectionRef.current
      ) {
        const chapter2RevealTl = gsap.timeline({
          scrollTrigger: {
            trigger: chapter2ContainerRef.current,
            start: 'top top',
            end: '+=120%',
            pin: true,
            pinSpacing: true,
            scrub: 0.4,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        chapter2RevealTl
          .to(
            chapter2SectionRef.current,
            {
              autoAlpha: 1,
              visibility: 'visible',
              duration: 0.15,
              ease: 'none',
            },
            0,
          )
          .to(
            chapter2SectionRef.current,
            {
              '--ch2-mask-size': 'max(450px, 50vw)',
              '--ch2-mask-x': '80%',
              duration: 1.0,
              ease: 'power1.inOut',
            },
            0,
          )
          .to(
            '.chapter2-img',
            {
              scale: 1.05,
              duration: 1.0,
              ease: 'none',
            },
            0,
          )
          .to(
            chapter2SectionRef.current,
            {
              autoAlpha: 0,
              duration: 0.35,
              ease: 'power1.in',
            },
            1.1,
          )

        // ------------------------------------------------------------
        // PROJECTS SECTION (ABOUT-US STYLE CONTENT REVEAL)
        // ------------------------------------------------------------
        const projectsSection = document.getElementById('projects')

        if (projectsSection) {
          const projectsTl = gsap.timeline({
            scrollTrigger: {
              trigger: projectsSection,
              start: 'top 90%',
              end: 'top 45%',
              scrub: 1,
              invalidateOnRefresh: true,
            },
            defaults: {
              ease: 'power2.out',
            },
          })

          projectsTl
            .to(
              projectsSection,
              {
                autoAlpha: 1,
                y: 0,
                duration: 1.0,
              },
              0,
            )
            .to(
              '.project-headline-char',
              {
                autoAlpha: 1,
                rotateY: 0,
                filter: 'blur(0px)',
                duration: 1.0,
                stagger: {
                  from: 'center',
                  each: 0.03,
                },
              },
              0.15,
            )
            .to(
              '.projects-meta-tag',
              {
                autoAlpha: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.8,
              },
              0.3,
            )

          // Individual scroll-triggered reveals for each interlocking project card
          const cards = gsap.utils.toArray('.project-scatter-card')
          cards.forEach((card) => {
            const isRight = card.getAttribute('data-align') === 'right'
            const origin = isRight ? 'right center' : 'left center'
            const rotY = isRight ? -35 : 35
            const xOffset = isRight ? 25 : -25

            gsap.fromTo(
              card,
              {
                autoAlpha: 0,
                rotateY: rotY,
                x: xOffset,
                scale: 0.96,
                transformOrigin: origin,
                transformPerspective: 1000,
                filter: 'blur(8px)',
              },
              {
                autoAlpha: 1,
                rotateY: 0,
                x: 0,
                scale: 1,
                filter: 'blur(0px)',
                duration: 1.0,
                ease: 'power2.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 85%',
                  end: 'top 50%',
                  scrub: 0.8,
                  invalidateOnRefresh: true,
                },
              },
            )
          })

          // Smooth internal image parallax scrub
          const projectImgs = gsap.utils.toArray('.project-parallax-img')
          projectImgs.forEach((img) => {
            gsap.fromTo(
              img,
              {
                yPercent: -10,
                scale: 1.14,
              },
              {
                yPercent: 10,
                scale: 1.05,
                ease: 'none',
                scrollTrigger: {
                  trigger: img.closest('.project-scatter-card'),
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.2,
                  invalidateOnRefresh: true,
                },
              },
            )
          })

          // Floating background monumental number parallax drift
          const floatingNums = gsap.utils.toArray('.project-floating-num')
          floatingNums.forEach((num) => {
            gsap.fromTo(
              num,
              {
                yPercent: -15,
              },
              {
                yPercent: 15,
                ease: 'none',
                scrollTrigger: {
                  trigger: num.closest('.project-scatter-card'),
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.4,
                  invalidateOnRefresh: true,
                },
              },
            )
          })
        }
      }

      // ------------------------------------------------------------
      // RESPONSIVE / ACCESSIBILITY
      // ------------------------------------------------------------

      mm.add(
        '(prefers-reduced-motion: reduce)',
        () => {
          masterTl.progress(1)

          gsap.set(loaderRef.current, {
            autoAlpha: 0,
            display: 'none',
          })

          gsap.set(
            [
              logoRef.current,
              nameRef.current,
              ctaWrapperRef.current,
              scrollPromptRef.current,
              audioToggleRef.current,
              ...gsap.utils.toArray('.hero-role-item'),
              ...gsap.utils.toArray('.headline-item'),
            ],
            {
              clearProps: 'all',
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              rotateX: 0,
              filter: 'none',
            },
          )

          lenis.start()
          introCompleteRef.current = true
        },
        () => {
          introCompleteRef.current = false
          lenis.stop()
        },
      )

      // ------------------------------------------------------------
      // START INTRO
      // ------------------------------------------------------------

      const startIntro = () => {
        if (introCompleteRef.current) return

        const reducedMotion = window.matchMedia(
          '(prefers-reduced-motion: reduce)',
        ).matches

        if (reducedMotion) {
          setIntroTextActive(false)
          introCompleteRef.current = true
          lenis.start()
          ScrollTrigger.refresh()
          return
        }

        if (!introTextActive) {
          masterTl.restart()
        }
      }

      masterTl.eventCallback('onComplete', () => {
        introCompleteRef.current = true
        lenis.start()

        requestAnimationFrame(() => {
          ScrollTrigger.refresh()
        })
      })

      startIntro()

      ScrollTrigger.refresh()

      const refreshAfterLoad = () => {
        requestAnimationFrame(() => ScrollTrigger.refresh())
      }

      window.addEventListener('load', refreshAfterLoad)

      const handleResize = () => {
        ScrollTrigger.refresh()
      }

      window.addEventListener('resize', handleResize, {
        passive: true,
      })

      const handlePageShow = (event) => {
        if (event.persisted) {
          window.scrollTo(0, 0)
          lenis.scrollTo(0, { immediate: true })

          requestAnimationFrame(() => {
            ScrollTrigger.refresh()
          })
        }
      }

      window.addEventListener('pageshow', handlePageShow)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('load', refreshAfterLoad)
        window.removeEventListener('resize', handleResize)
        window.removeEventListener('pageshow', handlePageShow)

        masterTl.kill()
        xSetBg.kill?.()
        ySetBg.kill?.()

        mm.revert()
      }
    }, containerRef)

    return () => {
      ctx.revert()

      ScrollTrigger.getAll().forEach((trigger) => {
        if (
          trigger.trigger === containerRef.current ||
          trigger.trigger === aboutMeSectionRef.current ||
          trigger.trigger === chapter2ContainerRef.current
        ) {
          trigger.kill()
        }
      })

      gsap.ticker.remove(updateLenis)
      lenis.off('scroll', ScrollTrigger.update)
      lenis.stop()
      lenis.destroy()

      lenisRef.current = null
      introCompleteRef.current = false
    }
  }, [])

  const handleDismissCookie = () => {
    if (!cookieRef.current) {
      setCookieAccepted(true)
      return
    }

    gsap.killTweensOf(cookieRef.current)

    gsap.to(cookieRef.current, {
      y: 40,
      autoAlpha: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => setCookieAccepted(true),
    })
  }

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (audio.paused) {
        await audio.play()
        setIsPlaying(true)
      } else {
        audio.pause()
        setIsPlaying(false)
      }
    } catch (error) {
      setIsPlaying(false)
      console.warn(
        'Audio playback was blocked by the browser:',
        error,
      )
    }
  }

  const handleIntroAnimationComplete = () => {
    setIntroTextActive(false)

    if (
      masterTlRef.current &&
      !introCompleteRef.current
    ) {
      masterTlRef.current.restart()
    }
  }

  const scrollToStory = () => {
    const target = window.innerHeight

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        duration: 1.4,
        lock: true,
      })
    } else {
      window.scrollTo({
        top: target,
        behavior: 'smooth',
      })
    }
  }

  return (
    <main
      ref={containerRef}
      className="relative w-full min-h-[200vh] bg-black text-white select-none font-inter overflow-x-hidden"
    >
      <audio
        ref={audioRef}
        src={vibeSong}
        loop
        preload="auto"
      />

      {introTextActive && (
        <TextAnimationCollection
          variant="threeui-intro"
          logoSrc={logoImg}
          title="Rahul Moharana"
          endTime={1.7}
          holdTime={0.6}
          onComplete={handleIntroAnimationComplete}
        />
      )}

      <div
        ref={loaderRef}
        className="fixed inset-0 w-full h-full z-[100] pointer-events-none"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <mask id="intro-rect-mask">
              <rect
                width="100"
                height="100"
                fill="white"
              />

              <rect
                className="intro-mask-rect"
                x="18"
                y="36"
                width="0"
                height="0"
                rx="0.6"
                fill="black"
              />

              <rect
                className="intro-mask-rect"
                x="49"
                y="48"
                width="0"
                height="0"
                rx="0.6"
                fill="black"
              />

              <rect
                className="intro-mask-rect"
                x="81"
                y="62"
                width="0"
                height="0"
                rx="0.6"
                fill="black"
              />
            </mask>
          </defs>

          <rect
            width="100"
            height="100"
            fill="#0a0a0a"
            mask="url(#intro-rect-mask)"
          />
        </svg>
      </div>

      <div
        ref={bgRef}
        className="fixed inset-0 z-0 pointer-events-none will-change-transform flex items-center justify-center lg:justify-end lg:pr-[8vw] xl:pr-[12vw]"
      >
        <div className="relative h-full flex items-center justify-center overflow-visible">
          <img
            src={bgImage}
            alt="Rahul Moharana"
            className="h-[60vh] sm:h-[66vh] md:h-[70vh] lg:h-[76vh] xl:h-[80vh] w-auto max-w-[85vw] object-contain select-none opacity-90 filter contrast-[1.05] brightness-95"
            style={{
              maskImage:
                'radial-gradient(ellipse 70% 70% at 50% 50%, black 50%, transparent 98%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 70% 70% at 50% 50%, black 50%, transparent 98%)',
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 z-10 pointer-events-none" />
        </div>
      </div>

      <div
        ref={darkOverlayRef}
        className="fixed inset-0 bg-black z-20 pointer-events-none opacity-0 will-change-[opacity]"
      />

      <div
        ref={logoWrapperRef}
        className="fixed left-6 md:left-10 lg:left-[4vw] z-50 pointer-events-auto will-change-transform"
      >
        <div
          ref={logoRef}
          className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
        >
          <img
            src={logoImg}
            alt="Rahul Moharana logo"
            className="w-full h-full object-contain filter drop-shadow"
          />
        </div>
      </div>

      <div
        ref={ctaWrapperRef}
        className="fixed right-6 md:right-10 lg:right-[5vw] z-50 pointer-events-auto will-change-transform"
      >
        <Button href="mailto:dev.rahulmoharana@gmail.com">
          GET IN TOUCH
        </Button>
      </div>

      <div className="hidden sm:block fixed top-1/2 -translate-y-1/2 left-20 sm:left-24 md:left-32 lg:left-[13vw] xl:left-[14vw] z-40 pointer-events-auto will-change-[opacity,transform]">
        <span
          ref={nameRef}
          className="font-inter text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase text-white hover:text-zinc-300 transition-colors whitespace-nowrap block will-change-[filter,opacity,transform]"
        >
          RAHUL MOHARANA
        </span>
      </div>

      <div className="hidden lg:block fixed top-1/2 -translate-y-1/2 left-[71.5vw] xl:left-[72vw] z-40 pointer-events-auto will-change-[opacity,transform]">
        <div className="flex font-montserrat flex-col text-left text-[9px] xl:text-[10px] font-medium leading-[1.3] tracking-[0.14em] text-zinc-300 uppercase whitespace-nowrap">
          {ROLES.map((role) => (
            <span
              key={role}
              className="hero-role-item hover:text-white transition-colors"
            >
              {role}
            </span>
          ))}
        </div>
      </div>

      <div className="fixed inset-y-0 left-4 right-4 sm:left-12 md:left-24 lg:left-[28vw] xl:left-[30vw] z-30 flex flex-col justify-center pointer-events-none [perspective:1000px] will-change-[opacity,transform]">
        <div className="flex flex-col select-none gap-[2px] md:gap-[4px]">
          {HEADLINE_WORDS.map((word) => (
            <div
              key={word}
              className="overflow-visible [transform-style:preserve-3d]"
            >
              <h1 className="headline-item font-montserrat text-[8vh] sm:text-[11vh] md:text-[12.5vh] lg:text-[13.5vh] xl:text-[14vh] font-[100] tracking-[0.04em] md:tracking-[0.06em] leading-[0.84] uppercase text-white/95 drop-shadow-sm pointer-events-auto will-change-transform">
                {word}
              </h1>
            </div>
          ))}
        </div>

        <button
          type="button"
          ref={scrollPromptRef}
          onClick={scrollToStory}
          className="mt-3 md:mt-4 flex flex-col text-[9px] md:text-[9.5px] font-semibold tracking-[0.2em] text-zinc-300 uppercase leading-[1.25] cursor-pointer group w-fit pointer-events-auto text-left bg-transparent border-0 p-0"
          aria-label="Scroll down to begin the story"
        >
          <span className="group-hover:text-white transition-colors">
            SCROLL DOWN
          </span>

          <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors">
            TO BEGIN THE STORY
          </span>
        </button>
      </div>

      {/* CHAPTER I */}
      <div
        ref={aboutSectionRef}
        className="fixed inset-0 z-25 pointer-events-none will-change-[opacity]"
        style={{
          opacity: 0,
          visibility: 'hidden',
          maskImage:
            'radial-gradient(circle var(--mask-size, max(300px, 35vw)) at var(--mask-x, 20%) var(--mask-y, 50%), black 0%, black 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--mask-size, max(300px, 35vw)) at var(--mask-x, 20%) var(--mask-y, 50%), black 0%, black 30%, transparent 100%)',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={aboutImg}
            alt="Rahul Moharana"
            className="about-img h-[70vh] md:h-[80vh] lg:h-[90vh] w-auto object-contain will-change-transform"
            style={{
              filter: 'brightness(0.85) contrast(1.1)',
            }}
          />

          <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black via-black/70 to-transparent" />

          <div className="absolute top-0 left-0 right-0 h-[15%] bg-gradient-to-b from-black/40 to-transparent" />

          <div className="absolute top-0 bottom-0 left-0 w-[25%] bg-gradient-to-r from-black/60 to-transparent" />

          <div className="absolute top-0 bottom-0 right-0 w-[25%] bg-gradient-to-l from-black/60 to-transparent" />
        </div>

        <div className="absolute left-[6vw] md:left-[8vw] lg:left-[10vw] top-1/2 -translate-y-1/2 z-20 flex items-center gap-3">
          <span className="w-[6px] h-[6px] border border-zinc-500 block flex-shrink-0" />

          <span className="font-inter text-[10px] md:text-[11px] lg:text-[12px] font-medium tracking-[0.2em] uppercase text-zinc-300 whitespace-nowrap">
            RAHUL <span className="font-bold text-white">MOHARANA</span>
          </span>
        </div>

        <div className="absolute right-[6vw] md:right-[8vw] lg:right-[10vw] top-1/2 -translate-y-1/2 z-20 flex items-center gap-3">
          <span className="font-inter text-[10px] md:text-[11px] lg:text-[12px] font-medium tracking-[0.2em] uppercase text-zinc-300 whitespace-nowrap">
            CHAPTER <span className="font-bold text-white">I</span>
          </span>

          <span className="w-[6px] h-[6px] border border-zinc-500 block flex-shrink-0" />
        </div>
      </div>

      <div
        className="relative w-full"
        style={{ height: '300vh' }}
        aria-hidden="true"
      />

      {/* ABOUT ME */}
      <section
        ref={aboutMeSectionRef}
        style={{ opacity: 0 }}
        className="relative z-30 w-full min-h-[150vh] bg-[#111111] text-white overflow-hidden font-inter flex flex-col justify-between will-change-[opacity,transform]"
      >
        <div className="relative w-full flex-1 flex flex-col lg:flex-row min-h-[150vh]">
          <div className="w-full lg:w-[65%] relative bg-gradient-to-br from-[#404040] via-[#1a1a1a] to-[#0a0a0a] flex items-center overflow-hidden min-h-[75vh] lg:min-h-full">
            <div className="absolute inset-0 flex items-center justify-start pointer-events-none">
              <img
                src={aboutMeImg}
                alt="Rahul Moharana"
                className="about-me-portrait h-[95%] lg:h-[105%] w-auto max-w-[90%] object-cover object-left-top opacity-90 will-change-transform"
                style={{
                  filter: 'grayscale(100%) contrast(1.25) brightness(0.9)',
                  maskImage:
                    'linear-gradient(to right, black 60%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to right, black 60%, transparent 100%)',
                }}
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

            <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/70 pointer-events-none" />

            <div className="relative z-10 ml-auto mr-6 md:mr-10 lg:mr-10 xl:mr-12 text-right select-none [perspective:1200px]">
              {ABOUT_HEADLINE.map(({ word, isAccent, weight }) => (
                <div
                  key={word}
                  className="overflow-visible [transform-style:preserve-3d] flex justify-end"
                >
                  <h2
                    className={`font-montserrat text-[36px] sm:text-[52px] md:text-[70px] lg:text-[52px] xl:text-[68px] 2xl:text-[80px] ${weight} leading-[0.88] tracking-[0.04em] uppercase drop-shadow-sm flex [transform-style:preserve-3d]`}
                  >
                    {word.split('').map((char, charIdx) => {
                      const totalChars = Math.max(word.length - 1, 1)
                      const offset = `${(charIdx / totalChars) * 100}%`

                      return (
                        <span
                          key={`${word}-${charIdx}`}
                          style={
                            isAccent
                              ? { '--char-offset': offset }
                              : undefined
                          }
                          className={`about-headline-char inline-block will-change-transform ${
                            isAccent
                              ? 'char-glass-shine'
                              : 'text-white/95'
                          }`}
                        >
                          {char}
                        </span>
                      )
                    })}
                  </h2>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[35%] relative bg-gradient-to-b from-[#6b6b6b] via-[#484848] to-[#252525] flex flex-col justify-between p-8 md:p-14 lg:p-14 xl:p-16 z-10 min-h-[75vh] lg:min-h-full">
            <div className="hidden lg:block h-8" />

            <div className="flex flex-col gap-8 my-auto max-w-[340px] mx-auto lg:mx-0">
              {ABOUT_PARAGRAPHS.map((para, pIdx) => (
                <p
                  key={pIdx}
                  className={`text-[13.5px] md:text-[14.5px] lg:text-[15px] font-normal leading-[1.5] ${para.opacity} font-[200] tracking-[0.01em]`}
                >
                  {para.text.split(' ').map((word, wIdx) => (
                    <span
                      key={`${pIdx}-${wIdx}`}
                      className="about-editorial-word inline-block mr-[0.28em] will-change-[opacity,transform,filter]"
                    >
                      {word}
                    </span>
                  ))}
                </p>
              ))}

              <div className="pt-4 flex justify-center w-full">
                <img
                  src={signatureImg}
                  alt="Rahul Moharana Signature"
                  className="about-signature h-24 sm:h-28 md:h-32 lg:h-36 w-auto max-w-full object-contain select-none mix-blend-screen opacity-90 will-change-[opacity,transform,filter]"
                />
              </div>
            </div>

            <div className="hidden lg:block h-8" />
          </div>
        </div>
      </section>

      <SkillsMarquee />

      <LocationRoleSection />

      {/* ============================================================
          CHAPTER II / REVEAL (PINNED SOLID BLACK VIEWPORT)
          ============================================================ */}
      <section
        ref={chapter2ContainerRef}
        className="relative w-full h-screen bg-black z-30 overflow-hidden flex items-center justify-center"
      >
        <div
          ref={chapter2SectionRef}
          className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none will-change-[opacity]"
          style={{
            opacity: 0,
            visibility: 'hidden',
            maskImage:
              'radial-gradient(circle var(--ch2-mask-size, max(300px, 35vw)) at var(--ch2-mask-x, 20%) var(--ch2-mask-y, 50%), black 0%, black 30%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(circle var(--ch2-mask-size, max(300px, 35vw)) at var(--ch2-mask-x, 20%) var(--ch2-mask-y, 50%), black 0%, black 30%, transparent 100%)',
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center will-change-[opacity,transform]">
            <img
              src={chapter2Img}
              alt="Rahul Moharana - Chapter II"
              className="chapter2-img h-[70vh] md:h-[80vh] lg:h-[90vh] w-auto object-contain"
              style={{
                filter: 'brightness(0.85) contrast(1.1)',
              }}
            />

            <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black via-black/70 to-transparent" />
            <div className="absolute top-0 left-0 right-0 h-[15%] bg-gradient-to-b from-black/40 to-transparent" />
            <div className="absolute top-0 bottom-0 left-0 w-[25%] bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute top-0 bottom-0 right-0 w-[25%] bg-gradient-to-l from-black/60 to-transparent" />
          </div>

          <div className="absolute left-[6vw] md:left-[8vw] lg:left-[10vw] top-1/2 -translate-y-1/2 z-20 flex items-center gap-3">
            <span className="w-[6px] h-[6px] border border-zinc-500 block flex-shrink-0" />
            <span className="font-inter text-[10px] md:text-[11px] lg:text-[12px] font-medium tracking-[0.2em] uppercase text-zinc-300 whitespace-nowrap">
              RAHUL <span className="font-bold text-white">MOHARANA</span>
            </span>
          </div>

          <div className="absolute right-[6vw] md:right-[8vw] lg:right-[10vw] top-1/2 -translate-y-1/2 z-20 flex items-center gap-3">
            <span className="font-inter text-[10px] md:text-[11px] lg:text-[12px] font-medium tracking-[0.2em] uppercase text-zinc-300 whitespace-nowrap">
              CHAPTER <span className="font-bold text-white">II</span>
            </span>
            <span className="w-[6px] h-[6px] border border-zinc-500 block flex-shrink-0" />
          </div>
        </div>
      </section>

      {/* ============================================================
          PROJECTS SECTION (STICKY REVEAL AT SCREEN HALF)
          ============================================================ */}
      <ProjectsSection />

      {/* ============================================================
          MANIFESTO STATEMENT SECTION (SCROLL-TRIGGERED TEXT ILLUMINATION)
          ============================================================ */}
      <ManifestoSection />

      {/* ============================================================
          CINEMATIC CONNECT / CONTACT SECTION
          ============================================================ */}
      <ConnectSection />

      {!cookieAccepted && (
        <div
          ref={cookieRef}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-10 z-50 flex items-center bg-[#f4f4f5] text-black text-[9px] md:text-[9.5px] tracking-[0.14em] uppercase font-mono shadow-2xl overflow-hidden"
        >
          <div className="px-4 md:px-5 py-2.5 md:py-3 font-normal text-zinc-800">
            WE USE <span className="font-bold text-black">COOKIES</span> FOR
            ANALYTICS.
          </div>

          <button
            type="button"
            onClick={handleDismissCookie}
            className="bg-black text-white hover:bg-zinc-800 transition-colors px-4 md:px-5 py-2.5 md:py-3 font-bold tracking-[0.18em]"
          >
            OK
          </button>
        </div>
      )}

      <div
        ref={audioToggleRef}
        className="fixed bottom-6 left-6 md:bottom-8 md:left-10 z-40"
      >
        <button
          type="button"
          onClick={toggleMusic}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-md text-[9px] font-mono tracking-widest text-zinc-400 hover:text-white hover:border-white/30 transition-all duration-300"
          title="Toggle Vibe Audio"
          aria-label={
            isPlaying
              ? 'Turn audio off'
              : 'Turn audio on'
          }
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isPlaying
                ? 'bg-emerald-400 animate-pulse'
                : 'bg-zinc-600'
            }`}
          />

          <span>
            {isPlaying ? 'AUDIO: ON' : 'AUDIO: OFF'}
          </span>
        </button>
      </div>
    </main>
  )
}

export default App