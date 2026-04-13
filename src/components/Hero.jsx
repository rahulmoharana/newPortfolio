import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import bgImage from '../assets/backgorund.png'
import maskImage from '../assets/mask.png'

gsap.registerPlugin(ScrollTrigger)

const ORBS = [
  { id: 1, left: '8%',  top: '15%', size: 520, color: '#FF4D00', opacity: 0.18, blur: 100, px: -22, py: -12, dur: 20 },
  { id: 2, left: '75%', top: '8%',  size: 440, color: '#EAD7CC', opacity: 0.14, blur: 85,  px:  18, py:  16, dur: 25 },
  { id: 3, left: '42%', top: '65%', size: 580, color: '#FF4D00', opacity: 0.13, blur: 115, px: -16, py: -22, dur: 30 },
  { id: 4, left: '82%', top: '58%', size: 360, color: '#EAD7CC', opacity: 0.12, blur: 75,  px:  28, py: -14, dur: 22 },
  { id: 5, left: '-2%', top: '68%', size: 300, color: '#FF4D00', opacity: 0.10, blur: 65,  px: -20, py:  24, dur: 26 },
]

const STREAKS = [
  { id: 1, left: '15%', top: '30%', w: 280, rot: -36, opacity: 0.07, dur: 15 },
  { id: 2, left: '60%', top: '50%', w: 200, rot:  20, opacity: 0.05, dur: 20 },
  { id: 3, left: '35%', top: '75%', w: 340, rot: -16, opacity: 0.045, dur: 24 },
]

const BLOB_GRADIENT_VERTEX = `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const BLOB_GRADIENT_FRAGMENT = `
  varying vec3 vPos;
  void main() {
    vec3 c1 = vec3(0.0, 0.0, 0.0);
    vec3 c2 = vec3(1.0, 0.30, 0.0);
    vec3 c3 = vec3(0.92, 0.84, 0.80);
    vec3 c4 = vec3(1.0, 1.0, 1.0);
    float xMix = smoothstep(-1.1, 1.1, vPos.x);
    float yMix = smoothstep(-1.0, 1.0, vPos.y);
    vec3 horizontal = mix(c1, c2, xMix);
    vec3 topBlend = mix(c3, c4, xMix * 0.65 + yMix * 0.35);
    vec3 color = mix(horizontal, topBlend, yMix * 0.75);
    gl_FragColor = vec4(color, 1.0);
  }
`

const ParallaxOrb = ({ orb, mouseX, mouseY, reducedMotion }) => {
  const x = useTransform(mouseX, [-0.5, 0.5], [-orb.px, orb.px])
  const y = useTransform(mouseY, [-0.5, 0.5], [-orb.py, orb.py])
  const sx = useSpring(x, { stiffness: 70, damping: 20 })
  const sy = useSpring(y, { stiffness: 70, damping: 20 })
  return (
    <motion.div
      className="pointer-events-none absolute rounded-full"
      style={{
        left: orb.left, top: orb.top,
        width: orb.size, height: orb.size,
        background: orb.color,
        opacity: orb.opacity,
        filter: `blur(${orb.blur}px)`,
        translateX: sx, translateY: sy,
        willChange: 'transform',
      }}
      animate={reducedMotion ? undefined : { y: [0, -24, 0], x: [0, 12, 0] }}
      transition={reducedMotion ? undefined : { duration: orb.dur, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

function useBlobCursor({ canvasRef, onPosChange, enabled = true }) {
  const threeRef = useRef({})
  const SPEED_THRESHOLD = 0.70
  const SPEED_MAX = 2.8
  const SPEED_BOOST_MAX = 0.6

  useEffect(() => {
    if (!enabled) return

    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    const W = canvas.offsetWidth, H = canvas.offsetHeight
    renderer.setSize(W, H)
    const cam = new THREE.OrthographicCamera(-W/2, W/2, H/2, -H/2, 0.1, 100)
    cam.position.z = 10

    const geo = new THREE.SphereGeometry(1, 64, 64)
    const posAttr = geo.attributes.position
    const origPos = new Float32Array(posAttr.array)

    const mat = new THREE.ShaderMaterial({
      vertexShader: BLOB_GRADIENT_VERTEX,
      fragmentShader: BLOB_GRADIENT_FRAGMENT,
      side: THREE.DoubleSide,
    })
    const mesh = new THREE.Mesh(geo, mat)
    scene.add(mesh)

    const PARTICLE_COUNT = 120
    const particleGeo = new THREE.BufferGeometry()
    const pPositions = new Float32Array(PARTICLE_COUNT * 3)
    const pSeeds = Array.from({ length: PARTICLE_COUNT }, () => ({
      r: 0.3 + Math.random() * 0.65,
      theta: Math.random() * Math.PI * 2,
      phi: Math.random() * Math.PI,
      speed: 0.4 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2,
      size: 1.5 + Math.random() * 3.5,
    }))
    particleGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3))
    const pSizes = new Float32Array(PARTICLE_COUNT)
    pSeeds.forEach((s, i) => { pSizes[i] = s.size })
    particleGeo.setAttribute('size', new THREE.BufferAttribute(pSizes, 1))

    const pMat = new THREE.PointsMaterial({
      color: 0xffffff, size: 2.8, sizeAttenuation: false,
      transparent: true, opacity: 0.7, depthWrite: false,
    })
    const particles = new THREE.Points(particleGeo, pMat)
    scene.add(particles)

    const state = {
      mouseX: -9999, mouseY: -9999,
      targetX: -9999, targetY: -9999,
      scale: 0, targetScale: 0,
      speedBoost: 0, targetSpeedBoost: 0,
      hasPrevSample: false,
      lastMouseX: 0, lastMouseY: 0, lastMoveTime: 0,
      idleTimer: null, time: 0, animId: null, W, H,
    }
    threeRef.current = state

    function noise(x, y, z) {
      return (
        Math.sin(x * 1.7 + z) * 0.5 +
        Math.sin(y * 2.3 - z * 0.9) * 0.35 +
        Math.sin((x + y) * 1.1 + z * 1.3) * 0.25 +
        Math.sin(x * 3.1 - y * 1.5 + z * 0.7) * 0.15
      )
    }

    function distort(t) {
      for (let i = 0; i < posAttr.count; i++) {
        const ox = origPos[i*3], oy = origPos[i*3+1], oz = origPos[i*3+2]
        const len = Math.sqrt(ox*ox + oy*oy + oz*oz)
        const nx = ox/len, ny = oy/len, nz = oz/len
        const d = 1 + noise(nx*1.6, ny*1.6, t*0.55) * 0.38
        posAttr.setXYZ(i, nx*d, ny*d, nz*d)
      }
      posAttr.needsUpdate = true
      geo.computeVertexNormals()
    }

    function render() {
      state.animId = requestAnimationFrame(render)
      state.time += 0.016
      state.targetX += (state.mouseX - state.targetX) * 0.12
      state.targetY += (state.mouseY - state.targetY) * 0.12
      state.scale += (state.targetScale - state.scale) * 0.10
      state.speedBoost += (state.targetSpeedBoost - state.speedBoost) * 0.16

      mesh.position.set(state.targetX - state.W/2, -(state.targetY - state.H/2), 0)
      const s = state.scale * (1 + state.speedBoost)
      mesh.scale.set(s, s, s)
      distort(state.time)

      const pPos = particleGeo.attributes.position
      pSeeds.forEach((sd, i) => {
        const ns = noise(
          Math.sin(sd.theta + state.time * sd.speed * 0.3),
          Math.cos(sd.phi + state.time * sd.speed * 0.2),
          state.time * 0.4 + sd.phase
        ) * 0.4
        const r = (sd.r + ns) * state.scale
        const theta = sd.theta + state.time * sd.speed * 0.18
        const phi = sd.phi + state.time * sd.speed * 0.11
        pPos.setXYZ(i,
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
      })
      pPos.needsUpdate = true
      particles.position.copy(mesh.position)
      particles.scale.copy(mesh.scale)
      renderer.render(scene, cam)
      onPosChange({ x: state.targetX, y: state.targetY, scale: state.scale * (1 + state.speedBoost) })
    }
    render()

    function onResize() {
      const W2 = canvas.offsetWidth, H2 = canvas.offsetHeight
      renderer.setSize(W2, H2)
      cam.left = -W2/2; cam.right = W2/2
      cam.top = H2/2; cam.bottom = -H2/2
      cam.updateProjectionMatrix()
      state.W = W2; state.H = H2
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(state.animId)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
    }
  }, [enabled]) // ← runs when enabled state changes

  const setMouse = useCallback((x, y) => {
    const s = threeRef.current
    if (!s) return
    const now = performance.now()
    if (s.hasPrevSample) {
      const dt = Math.max(now - s.lastMoveTime, 1)
      const speed = Math.hypot(x - s.lastMouseX, y - s.lastMouseY) / dt
      if (speed > SPEED_THRESHOLD) {
        const norm = (Math.min(speed, SPEED_MAX) - SPEED_THRESHOLD) / (SPEED_MAX - SPEED_THRESHOLD)
        s.targetSpeedBoost = norm * SPEED_BOOST_MAX
      } else {
        s.targetSpeedBoost = 0
      }
    }
    s.lastMouseX = x; s.lastMouseY = y
    s.lastMoveTime = now; s.hasPrevSample = true
    s.mouseX = x; s.mouseY = y
    s.targetScale = 1
    clearTimeout(s.idleTimer)
    s.idleTimer = setTimeout(() => { s.targetScale = 0; s.targetSpeedBoost = 0 }, 120)
  }, [])

  const hide = useCallback(() => {
    const s = threeRef.current
    if (!s) return
    s.targetScale = 0; s.targetSpeedBoost = 0
    s.hasPrevSample = false
    clearTimeout(s.idleTimer)
  }, [])

  return { setMouse, hide }
}

const Hero = () => {
  const sectionRef = useRef(null)
  const blobCanvasRef = useRef(null)
  const bgImageRef = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const [isReducedMotion, setIsReducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [maskPos, setMaskPos] = useState({ x: -9999, y: -9999, scale: 0 })
  const [inside, setInside] = useState(false)

  const onPosChange = useCallback((pos) => setMaskPos(pos), [])

  const { setMouse, hide } = useBlobCursor({
    canvasRef: blobCanvasRef,
    onPosChange,
    enabled: !isMobile,
  })

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotionChange = () => setIsReducedMotion(media.matches)

    window.addEventListener('resize', onResize)
    media.addEventListener('change', onMotionChange)

    return () => {
      window.removeEventListener('resize', onResize)
      media.removeEventListener('change', onMotionChange)
    }
  }, [])

  // ── Mouse move handler — stable ref, never changes
  const onMove = useCallback((e) => {
    rawX.set(e.clientX / window.innerWidth - 0.5)
    rawY.set(e.clientY / window.innerHeight - 0.5)
    const rect = sectionRef.current?.getBoundingClientRect()
    if (rect) setMouse(e.clientX - rect.left, e.clientY - rect.top)
  }, []) // ← rawX/rawY are stable MotionValues, setMouse is stable useCallback

  // ── GSAP animations — run once on mount only
  useEffect(() => {
    if (!isMobile && !isReducedMotion) {
      window.addEventListener('mousemove', onMove)
    }

    const ctx = gsap.context(() => {
      if (isReducedMotion) {
        if (bgImageRef.current) gsap.set(bgImageRef.current, { opacity: 1, y: 0, scale: 1 })
        gsap.set('.hero-word', { y: '0%', opacity: 1 })
        return
      }

      // 1. Background image reveal (fade up to original position)
      if (bgImageRef.current) {
        gsap.fromTo(bgImageRef.current,
          { opacity: 0, y: 80, scale: 1.04 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 2,
            ease: 'power3.out',
            delay: 0.4,
          }
        )
      }

      // 2. Hero text staggered reveal
      gsap.fromTo('.hero-word',
        { y: '110%', opacity: 0 },
        { y: '0%', opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out', delay: 0.6 }
      )

      // 3. Hero text scroll parallax (after reveal settles)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          gsap.set('.hero-word', { y: `${self.progress * (isMobile ? -20 : -40)}%` })
        }
      })

    }, sectionRef) // scoped to section — finds .hero-word inside it

    return () => {
      if (!isMobile && !isReducedMotion) {
        window.removeEventListener('mousemove', onMove)
      }
      ctx.revert()
    }
  }, [isMobile, isReducedMotion])

  const blobR = Math.round(96 * 2 * maskPos.scale)
  const revealStyle = !isMobile && blobR > 2 ? {
    WebkitMaskImage: `radial-gradient(ellipse ${blobR * 1.05}px ${blobR * 0.88}px at ${maskPos.x}px ${maskPos.y}px, transparent ${blobR * 0.82}px, black ${blobR}px)`,
    maskImage: `radial-gradient(ellipse ${blobR * 1.05}px ${blobR * 0.88}px at ${maskPos.x}px ${maskPos.y}px, transparent ${blobR * 0.82}px, black ${blobR}px)`,
  } : { WebkitMaskImage: 'none', maskImage: 'none' }

  return (
    <>
      <section
        ref={sectionRef}
        className="relative h-screen w-full bg-black overflow-hidden md:cursor-none"
        onMouseEnter={() => { if (!isMobile) setInside(true) }}
        onMouseLeave={() => {
          if (!isMobile) {
            setInside(false)
            hide()
          }
        }}
        aria-label="Welcome section featuring Rahul Moharana, Full Stack Developer"
      >
        {/* L0 — background image */}
        <img
         
          src={bgImage}
          alt="Abstract dark background with warm orange accents"
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-cover"
        />

        {/* L1 — parallax orbs */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: isReducedMotion ? 0 : 1.4, ease: 'easeOut' }}
        >
          {ORBS.map((orb) => (
            <ParallaxOrb key={orb.id} orb={orb} mouseX={rawX} mouseY={rawY} reducedMotion={isReducedMotion} />
          ))}
        </motion.div>

        {/* L2 — light streaks */}
        {STREAKS.map((s) => (
          <motion.div
            key={s.id}
            className="pointer-events-none absolute h-px"
            style={{
              left: s.left, top: s.top, width: s.w, rotate: s.rot,
              background: 'linear-gradient(90deg, transparent, #ffffff, transparent)',
              filter: 'blur(1.5px)', willChange: 'transform',
            }}
            initial={{ opacity: 0 }}
            animate={isReducedMotion ? { opacity: s.opacity } : { x: [0, 28, 0], opacity: [s.opacity, s.opacity * 2, s.opacity] }}
            transition={isReducedMotion ? { duration: 0 } : { duration: s.dur, repeat: Infinity, ease: 'easeInOut', delay: s.id * 2 }}
          />
        ))}

        {/* L3 — mask image with blob reveal */}
        <img
          src={maskImage}
          ref={bgImageRef}
          alt="Creative developer mask reveal background"
          draggable={false}
          className="absolute inset-0 h-full w-full select-none object-cover hidden md:block"
          style={revealStyle}
        />

        {/* Three.js blob canvas */}
        <canvas
          ref={blobCanvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full hidden md:block"
          style={{
            zIndex: 20,
            mixBlendMode: 'screen',
            opacity: inside ? 0.3 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />

        {/* Hero heading — opacity controlled by GSAP, not Tailwind */}
        <div className="absolute top-[42%] left-4 sm:left-6 md:left-16 lg:left-24 -translate-y-1/2 z-30 pointer-events-none">
          <div className="overflow-hidden">
            <h1 className="hero-word font-anton text-[14vw] sm:text-[12vw] md:text-[8vw] leading-[0.95] text-[#EAD7CC] uppercase select-none"
              style={{ opacity: 0 }} // GSAP will animate this to 1
            >
              Full Stack
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="hero-word font-anton text-[14vw] sm:text-[12vw] md:text-[8vw] leading-[0.95] text-[#EAD7CC] uppercase select-none"
              style={{ opacity: 0 }} // GSAP will animate this to 1
            >
              Developer
            </h1>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero