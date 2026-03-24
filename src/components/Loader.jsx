import { useEffect, useState } from "react";

export default function RightNowLoader({ onFinished }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading | reveal | done
  const [counter, setCounter] = useState(0);
  const [activeCategory, setActiveCategory] = useState(0);

  const categories = ["RESPECTING", "DEALING", "LEADING", "RULING"];

  useEffect(() => {
    // Progress bar animation
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = p < 60 ? Math.random() * 4 + 1 : Math.random() * 2 + 0.5;
        return Math.min(p + increment, 100);
      });
      setCounter((c) => Math.min(c + Math.floor(Math.random() * 4 + 1), 100));
    }, 40);

    // Cycle categories
    const catInterval = setInterval(() => {
      setActiveCategory((a) => (a + 1) % categories.length);
    }, 600);

    return () => {
      clearInterval(interval);
      clearInterval(catInterval);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => setPhase("reveal"), 200);
      setTimeout(() => setPhase("done"), 1400);
    }
  }, [progress]);

  useEffect(() => {
    if (phase === "done") {
      const timer = setTimeout(() => {
        onFinished?.();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, onFinished]);

  return (
    <div
      className="relative w-full h-screen overflow-hidden flex flex-col"
      style={{ background: "#1a1a1a", fontFamily: "'Anton', sans-serif" }}
    >
      {/* Google Font import via style tag */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Space+Mono:wght@400;700&display=swap');

        @keyframes flicker {
          0%, 100% { opacity: 1; }
          92% { opacity: 1; }
          93% { opacity: 0.4; }
          94% { opacity: 1; }
          96% { opacity: 0.6; }
          97% { opacity: 1; }
        }
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes glitch-right {
          0%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
          20% { clip-path: inset(10% 0 70% 0); transform: translate(6px, 0); }
          40% { clip-path: inset(50% 0 30% 0); transform: translate(-4px, 0); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(3px, 0); }
          80% { clip-path: inset(30% 0 55% 0); transform: translate(-6px, 0); }
        }
        @keyframes glitch-left {
          0%, 100% { clip-path: inset(0 0 100% 0); transform: translate(0); }
          20% { clip-path: inset(15% 0 65% 0); transform: translate(-5px, 0); }
          40% { clip-path: inset(55% 0 25% 0); transform: translate(3px, 0); }
          60% { clip-path: inset(75% 0 10% 0); transform: translate(-2px, 0); }
          80% { clip-path: inset(25% 0 60% 0); transform: translate(5px, 0); }
        }
        @keyframes wipe-up {
          0% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        @keyframes noise {
          0% { background-position: 0 0; }
          10% { background-position: -5% -10%; }
          20% { background-position: -15% 5%; }
          30% { background-position: 7% -25%; }
          40% { background-position: 20% 25%; }
          50% { background-position: -25% 10%; }
          60% { background-position: 15% 5%; }
          70% { background-position: 0% 15%; }
          80% { background-position: 25% 35%; }
          90% { background-position: -10% 10%; }
          100% { background-position: 0 0; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes dot-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.6); opacity: 0.6; }
        }
        @keyframes progress-glow {
          0%, 100% { box-shadow: 0 0 8px 2px rgba(255,0,0,0.6); }
          50% { box-shadow: 0 0 18px 4px rgba(255,0,0,0.9); }
        }

        .flicker { animation: flicker 4s infinite; }
        .scanline-bar {
          position: absolute;
          left: 0; right: 0;
          height: 80px;
          background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.03), transparent);
          animation: scanline 3s linear infinite;
          pointer-events: none;
        }
        .glitch-layer-r {
          position: absolute; inset: 0;
          color: #ff0000;
          animation: glitch-right 3s steps(1) infinite;
          pointer-events: none;
        }
        .glitch-layer-l {
          position: absolute; inset: 0;
          color: #000000;
          animation: glitch-left 3s steps(1) infinite 0.1s;
          pointer-events: none;
        }
        .wipe-overlay {
          animation: wipe-up 0.8s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        .progress-bar-fill {
          animation: progress-glow 1s ease-in-out infinite;
        }
        .cat-item { animation: fadeSlideUp 0.3s ease forwards; }
        .cursor-blink { animation: blink 1s step-end infinite; }
        .dot-pulse { animation: dot-pulse 1.2s ease-in-out infinite; }
      `}</style>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          animation: "noise 0.5s steps(1) infinite",
        }}
      />

      {/* Scan line */}
      <div className="scanline-bar z-20" />

      {/* Wipe transition overlay */}
      {phase === "reveal" && (
        <div
          className="absolute inset-0 z-50 wipe-overlay"
          style={{ background: "#ff0000" }}
        />
      )}

      {/* Top label */}
      <div className="absolute top-4 left-4 md:top-5 md:left-7 z-30" style={{ fontFamily: "'Space Mono', monospace" }}>
        <span className="text-xs tracking-widest" style={{ color: "rgba(255,0,0,0.6)" }}>
          / OPERATION / P. 005
        </span>
      </div>

      {/* Top-right status */}
      <div className="absolute top-4 right-4 md:top-5 md:right-7 z-30 flex items-center gap-2" style={{ fontFamily: "'Space Mono', monospace" }}>
        <span
          className="dot-pulse w-2 h-2 rounded-full"
          style={{ background: "#ff0000", display: "inline-block" }}
        />
        <span className="text-xs tracking-widest" style={{ color: "rgba(255,0,0,0.5)" }}>
          LOADING
        </span>
      </div>

      {/* ── MAIN HERO TEXT ── */}
      <div className="flex-1 flex flex-col justify-center pl-4 sm:pl-6 md:pl-16 pr-4 z-30 relative">
        {/* SERIOUS */}
        <div className="relative inline-block" style={{ lineHeight: 0.88 }}>
          <h1
            className="flicker select-none"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(54px, 18vw, 200px)",
              color: "#ffffff",
              letterSpacing: "0.02em",
            }}
          >
            SERIOUS
          </h1>
          {/* Glitch layers */}
          <div
            className="glitch-layer-r"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(54px, 18vw, 200px)",
              letterSpacing: "0.02em",
              color: "#ff0000 !important"
            }}
          >
            SERIOUS
          </div>
          <div
            className="glitch-layer-l"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(54px, 18vw, 200px)",
              letterSpacing: "0.02em",
              color: "#000000 !important"
            }}
          >
            SERIOUS
          </div>
        </div>

        {/* BUSINESS */}
        <div className="relative inline-block -mt-2" style={{ lineHeight: 0.88 }}>
          <h1
            className="select-none"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(54px, 18vw, 200px)",
              color: "#ff0000",
              letterSpacing: "0.02em",
            }}
          >
            BUSINESS
          </h1>
          {/* Red accent dot */}
          <span
            className="absolute dot-pulse"
            style={{
              width: 12,
              height: 12,
              background: "#ff0000",
              borderRadius: "50%",
              top: "40%",
              right: "-18px",
            }}
          />
        </div>

        {/* Counter */}
        <div
          className="mt-6 flex items-baseline gap-3"
          style={{ fontFamily: "'Space Mono', monospace" }}
        >
          <span
            style={{
              fontSize: "clamp(32px, 5vw, 60px)",
              fontWeight: 700,
              color: "#e8e4dc",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {String(counter).padStart(3, "0")}
            <span className="cursor-blink" style={{ color: "#ff0000" }}>_</span>
          </span>
          <span className="text-xs tracking-widest" style={{ color: "rgba(232,228,220,0.3)" }}>
            %
          </span>
        </div>
      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="z-30 pb-6 md:pb-8 px-4 sm:px-6 md:px-16">
        {/* Horizontal rule */}
        <div className="w-full h-px mb-6" style={{ background: "rgba(232,228,220,0.12)" }} />

        {/* Progress track */}
        <div className="relative w-full h-0.5 mb-8" style={{ background: "rgba(232,228,220,0.1)" }}>
          <div
            className="absolute top-0 left-0 h-full progress-bar-fill"
            style={{
              width: `${progress}%`,
              background: "#ff0000",
              transition: "width 0.04s linear",
            }}
          />
          {/* Progress head dot */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
            style={{
              left: `calc(${progress}% - 4px)`,
              background: "#ff0000",
              transition: "left 0.04s linear",
            }}
          />
        </div>

        {/* Categories row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4" style={{ fontFamily: "'Space Mono', monospace" }}>
          {categories.map((cat, i) => (
            <div key={cat} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{
                    background: i === activeCategory ? "#ff0000" : "rgba(255,0,0,0.2)",
                    transition: "background 0.3s",
                  }}
                />
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{
                    color: i === activeCategory ? "#e8e4dc" : "rgba(232,228,220,0.3)",
                    transition: "color 0.3s",
                    fontSize: 10,
                  }}
                >
                  {cat}
                </span>
              </div>
              {/* Animated placeholder lines */}
              <div
                className="h-px mt-1"
                style={{
                  background:
                    i === activeCategory
                      ? `linear-gradient(to right, #ff0000 ${progress}%, rgba(255,0,0,0.08) ${progress}%)`
                      : "rgba(50,50,50,0.3)",
                  transition: "background 0.3s",
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Done state – fade out */}
      {phase === "done" && (
        <div
          className="absolute inset-0 z-50 flex items-center justify-center"
          style={{ background: "#0a0a0a", animation: "fadeSlideUp 0.6s ease forwards" }}
        >
          <p
            className="tracking-widest text-sm"
            style={{ fontFamily: "'Space Mono', monospace", color: "rgba(232,228,220,0.5)" }}
          >
            LOADED
          </p>
        </div>
      )}
    </div>
  );
}