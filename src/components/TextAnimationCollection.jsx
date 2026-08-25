import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * TextAnimationCollection
 *
 * Smooth GSAP-powered intro animation.
 * GPU-friendly transforms + opacity.
 */
function rng(seed) {
  let a = seed >>> 0

  return function () {
    a += 0x6d2b79f5

    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const clamp = (v, a, b) =>
  v < a ? a : v > b ? b : v

export function TextAnimationCollection({
  variant = 'threeui-intro',
  logoSrc,
  title = 'Rahul Moharana',
  onComplete,
  endTime = 1.6,
  holdTime = 0.4,
}) {
  const containerRef = useRef(null)
  const stageRef = useRef(null)
  const compRef = useRef(null)
  const rulerRef = useRef(null)
  const txRef = useRef(null)
  const markRef = useRef(null)
  const charRefs = useRef([])

  const onCompleteRef = useRef(onComplete)

  onCompleteRef.current = onComplete

  const chars = Array.from(title)

  useLayoutEffect(() => {
    const container = containerRef.current
    const stage = stageRef.current
    const comp = compRef.current
    const ruler = rulerRef.current
    const tx = txRef.current
    const mark = markRef.current

    if (!container || !stage || !comp || !ruler || !tx) {
      return
    }

    const charsElements = charRefs.current.filter(Boolean)

    /*
     * ------------------------------------------------------------
     * GSAP CONTEXT
     * ------------------------------------------------------------
     */

    const ctx = gsap.context(() => {
      /*
       * ----------------------------------------------------------
       * INITIAL SETUP
       * ----------------------------------------------------------
       */

      gsap.set(container, {
        opacity: 1,
        scale: 1,
        force3D: true,
      })

      gsap.set(comp, {
        force3D: true,
      })

      gsap.set(mark, {
        opacity: 0,
        scale: 0.55,
        transformOrigin: '50% 50%',
        force3D: true,
      })

      gsap.set(charsElements, {
        opacity: 0,
        x: 0,
        y: 0,
        scale: 1.22,
        force3D: true,
      })

      /*
       * ----------------------------------------------------------
       * AUTO FIT FONT
       * ----------------------------------------------------------
       */

      ruler.style.fontWeight = '600'
      ruler.style.fontSize = '100px'
      ruler.style.letterSpacing = '-0.012em'
      ruler.textContent = title

      const measuredW =
        ruler.getBoundingClientRect().width || 100

      const targetW = 760

      const fs = (100 * targetW) / measuredW

      tx.style.fontSize = `${fs.toFixed(2)}px`

      /*
       * ----------------------------------------------------------
       * RESPONSIVE SCALE
       * ----------------------------------------------------------
       */

      const DESIGN_WIDTH = 1280
      const DESIGN_HEIGHT = 720

      const updateScale = () => {
        const width = stage.clientWidth || DESIGN_WIDTH
        const height = stage.clientHeight || DESIGN_HEIGHT

        const scale = Math.min(
          width / DESIGN_WIDTH,
          height / DESIGN_HEIGHT
        )

        gsap.set(comp, {
          scale,
        })
      }

      updateScale()

      window.addEventListener(
        'resize',
        updateScale,
        { passive: true }
      )

      /*
       * ----------------------------------------------------------
       * RANDOM CHARACTER OFFSETS
       * ----------------------------------------------------------
       */

      const random = rng(7719)

      const jitterMap = charsElements.map(() => ({
        x: random() * 2 - 1,
        y: random() * 2 - 1,
        delay: random(),
      }))

      /*
       * ----------------------------------------------------------
       * REDUCED MOTION
       * ----------------------------------------------------------
       */

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches

      /*
       * ----------------------------------------------------------
       * MAIN TIMELINE
       * ----------------------------------------------------------
       */

      const timeline = gsap.timeline({
        paused: true,
      })

      /*
       * ----------------------------------------------------------
       * LOGO
       * ----------------------------------------------------------
       */

      if (mark) {
        timeline.to(
          mark,
          {
            opacity: 1,
            scale: 1,
            duration: prefersReducedMotion ? 0 : 0.65,
            ease: 'power3.out',
          },
          0.22
        )
      }

      /*
       * ----------------------------------------------------------
       * CHARACTER ANIMATION
       * ----------------------------------------------------------
       */

      charsElements.forEach((el, index) => {
        const jitter = jitterMap[index]

        const startX = jitter.x * 58
        const startY = jitter.y * 32

        /*
         * Initial RGB chromatic separation
         */
        gsap.set(el, {
          x: startX,
          y: startY,
          scale: 1.22,
          opacity: 0,
          textShadow:
            '-10px 0 rgba(255,64,72,.85), ' +
            '10px 0 rgba(64,255,190,.8), ' +
            '0 5.5px rgba(96,124,255,.8)',
        })

        const startTime =
          0.02 +
          jitter.delay * 0.25

        timeline.to(
          el,
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            textShadow: '0px 0px 0px rgba(0,0,0,0)',
            duration: prefersReducedMotion ? 0 : 0.75,
            ease: 'power3.out',
          },
          startTime
        )
      })

      /*
       * ----------------------------------------------------------
       * EXIT ANIMATION
       * ----------------------------------------------------------
       */

      const exitStart =
        endTime + holdTime

      timeline.to(
        container,
        {
          opacity: 0,
          scale: 1.02,
          duration: prefersReducedMotion ? 0 : 0.4,
          ease: 'power3.out',
          onComplete: () => {
            if (onCompleteRef.current) {
              onCompleteRef.current()
            }
          },
        },
        exitStart
      )

      /*
       * ----------------------------------------------------------
       * PLAY
       * ----------------------------------------------------------
       */

      if (prefersReducedMotion) {
        gsap.set(mark, {
          opacity: 1,
          scale: 1,
        })

        gsap.set(charsElements, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          textShadow: 'none',
        })

        gsap.set(container, {
          opacity: 0,
          scale: 1.02,
        })

        if (onCompleteRef.current) {
          onCompleteRef.current()
        }
      } else {
        timeline.play()
      }

      /*
       * ----------------------------------------------------------
       * KEYBOARD SKIP
       * ----------------------------------------------------------
       */

      const skipAnimation = () => {
        timeline.progress(1)
      }

      const handleKeyDown = (event) => {
        if (
          event.key === 'Escape' ||
          event.key === ' ' ||
          event.key === 'Enter'
        ) {
          event.preventDefault()
          skipAnimation()
        }
      }

      window.addEventListener(
        'keydown',
        handleKeyDown
      )

      /*
       * ----------------------------------------------------------
       * CLEANUP
       * ----------------------------------------------------------
       */

      return () => {
        window.removeEventListener(
          'resize',
          updateScale
        )

        window.removeEventListener(
          'keydown',
          handleKeyDown
        )
      }
    }, containerRef)

    return () => {
      ctx.revert()
    }
  }, [title, endTime, holdTime, logoSrc])

  return (
    <div
      ref={containerRef}
      className="
        fixed
        inset-0
        z-[120]
        w-full
        h-full
        bg-black
        text-[#f5f5f7]
        flex
        items-center
        justify-center
        overflow-hidden
        select-none
      "
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Helvetica, Arial, sans-serif',
        willChange: 'opacity, transform',
      }}
      aria-label="ThreeUI Intro Text Animation"
    >
      {/* Hidden text ruler */}
      <span
        ref={rulerRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: 0,
          visibility: 'hidden',
          whiteSpace: 'pre',
          fontWeight: 600,
          letterSpacing: '-0.012em',
          lineHeight: 1,
          fontSize: '100px',
        }}
      />

      {/* 16:9 Stage */}
      <div
        ref={stageRef}
        id="stage"
        style={{
          position: 'relative',
          width: 'min(100vw, 177.78vh)',
          aspectRatio: '16 / 9',
          overflow: 'hidden',
          background: '#000',
        }}
      >
        {/* 1280x720 composition */}
        <div
          ref={compRef}
          id="comp"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '1280px',
            height: '720px',
            margin: '-360px 0 0 -640px',
            transformOrigin: '50% 50%',
            willChange: 'transform',
          }}
        >
          <div
            className="scene"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              className="line"
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                ref={txRef}
                className="tx"
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  fontWeight: 600,
                  letterSpacing: '-0.012em',
                  lineHeight: 1,
                  color: '#f5f5f7',
                  willChange: 'transform, opacity',
                }}
              >
                {/* Logo */}
                <span
                  ref={markRef}
                  className="mark"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '0.86em',
                    height: '0.86em',
                    marginRight: '0.24em',
                    flexShrink: 0,
                    opacity: 0,
                    willChange: 'transform, opacity',
                  }}
                >
                  {logoSrc ? (
                    <img
                      src={logoSrc}
                      alt="Logo"
                      style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        objectFit: 'contain',
                        filter:
                          'drop-shadow(0 0 8px rgba(255,255,255,0.4))',
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        display: 'block',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        background: '#f5f5f7',
                      }}
                    />
                  )}
                </span>

                {/* Characters */}
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                >
                  {chars.map((char, index) => (
                    <span
                      key={`${char}-${index}`}
                      ref={(el) => {
                        charRefs.current[index] = el
                      }}
                      style={{
                        display: 'inline-block',
                        willChange:
                          'transform, opacity, text-shadow',
                        opacity: 0,
                        lineHeight: 1,
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextAnimationCollection