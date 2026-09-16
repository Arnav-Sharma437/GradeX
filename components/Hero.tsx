'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Scan, ShieldCheck, ChevronDown, CheckCircle2, Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayContentRef = useRef<HTMLDivElement>(null);
  const hudMetricsRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  // Mode: true = Autoplay Video, false = 100% Scroll-Locked Driven (default)
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState('00:00');
  const [durationFormatted, setDurationFormatted] = useState('00:57');
  const [progressPct, setProgressPct] = useState(0);

  // Target time and current scrub values
  const targetTimeRef = useRef(0);
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);

  // Fast smooth video time update loop (LERP) without black screens
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isAutoplay) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }

    let rafId: number;

    const updateLoop = () => {
      if (!video) return;

      if (isAutoplay) {
        // Mode 1: Normal Autoplay
        const cur = video.currentTime || 0;
        const dur = video.duration || 57;
        const pct = Math.min(100, Math.round((cur / dur) * 100));
        setProgressPct(pct);

        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${pct}%`;
        }

        const curM = Math.floor(cur / 60);
        const curS = Math.floor(cur % 60);
        setCurrentTimeFormatted(`${curM.toString().padStart(2, '0')}:${curS.toString().padStart(2, '0')}`);
      } else {
        // Mode 2: 100% Scroll-Driven
        // Silky smooth interpolation to avoid browser decoder black frames
        if (video.duration && !isNaN(video.duration)) {
          const diff = targetTimeRef.current - video.currentTime;
          if (Math.abs(diff) > 0.04) {
            video.currentTime += diff * 0.35;
          } else {
            video.currentTime = targetTimeRef.current;
          }

          const cur = video.currentTime;
          const dur = video.duration;
          const pct = Math.min(100, Math.round((cur / dur) * 100));
          setProgressPct(pct);

          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${pct}%`;
          }

          const curM = Math.floor(cur / 60);
          const curS = Math.floor(cur % 60);
          setCurrentTimeFormatted(`${curM.toString().padStart(2, '0')}:${curS.toString().padStart(2, '0')}`);
        }
      }

      if (video.duration) {
        const durM = Math.floor(video.duration / 60);
        const durS = Math.floor(video.duration % 60);
        setDurationFormatted(`${durM.toString().padStart(2, '0')}:${durS.toString().padStart(2, '0')}`);
      }

      rafId = requestAnimationFrame(updateLoop);
    };

    rafId = requestAnimationFrame(updateLoop);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [isAutoplay]);

  useGSAP(
    () => {
      const video = videoRef.current;
      if (!video) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.innerWidth < 768;

      if (prefersReducedMotion || isMobile) {
        video.play().catch(() => {});
        setIsAutoplay(true);
        return;
      }

      // PIN HERO SECTION STRICTLY UNTIL 100% OF THE 57-SECOND VIDEO IS SCROLLED
      // Total scroll distance: 500vh (giving smooth precision to scrub all 57s)
      const pinTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=500%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          if (!isAutoplay && video.duration && !isNaN(video.duration)) {
            // Video progress is locked directly to scroll progress
            targetTimeRef.current = self.progress * video.duration;
          }
        },
      });

      scrollTriggerInstance.current = pinTrigger;

      // Overlay text transitions synced with scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=500%',
          scrub: 1,
        },
      });

      // 1. Initial headline smoothly fades and lifts out in the first 15%
      tl.to(
        overlayContentRef.current,
        {
          y: -120,
          opacity: 0,
          scale: 0.94,
          ease: 'power1.in',
        },
        0
      );

      // 2. Telemetry HUD card smoothly emerges during mid-duct extraction (25% to 75%)
      tl.fromTo(
        hudMetricsRef.current,
        {
          opacity: 0,
          scale: 0.88,
          y: 60,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          ease: 'power2.out',
        },
        0.2
      );

      tl.to(
        hudMetricsRef.current,
        {
          opacity: 0,
          y: -50,
          scale: 0.95,
          ease: 'power2.in',
        },
        0.8
      );

      return () => {
        pinTrigger.kill();
      };
    },
    { scope: containerRef, dependencies: [isAutoplay] }
  );

  const toggleAutoplayMode = () => {
    if (!videoRef.current) return;
    if (isAutoplay) {
      // Switch back to Scroll-Locked Mode
      videoRef.current.pause();
      setIsAutoplay(false);
    } else {
      // Switch to Autoplay Loop Mode
      videoRef.current.play().catch(() => {});
      setIsAutoplay(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black" id="heroSection">
      
      {/* 1. FULL WIDTH / FULL VIEWPORT BACKGROUND VIDEO */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#03070E]">
        <video
          ref={videoRef}
          src="/videos/hero-robot-clean.mp4"
          poster="/images/hero-poster.jpg"
          loop={isAutoplay}
          muted={isMuted}
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-95 transition-opacity duration-300"
        />
        
        {/* Subtle Vignette & Blueprint Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian/90 via-black/20 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 blueprint-grid opacity-20 pointer-events-none" />
      </div>

      {/* 2. TOP HUD TELEMETRY BAR & DUAL-MODE CONTROLS */}
      <div className="absolute top-20 inset-x-0 z-20 px-6 sm:px-12 flex justify-between items-center text-xs font-mono text-brand-gold-light">
        <div className="flex items-center gap-2.5 bg-black/75 border border-brand-border/40 px-3.5 py-1.5 rounded-full backdrop-blur-md shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>ROBOTIC CRAWLER // LIVE DUCT SCANNER</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-4 bg-black/75 border border-brand-border/40 px-4 py-1.5 rounded-full backdrop-blur-md shadow-lg">
            <span className="text-slate-300">
              TIMECODE: <strong className="text-white font-bold">{currentTimeFormatted} / {durationFormatted}</strong>
            </span>
            <span className="text-slate-300">
              MODE: <strong className="text-brand-gold font-bold">{isAutoplay ? 'AUTOPLAY LOOP' : 'SCROLL-DRIVEN'}</strong>
            </span>
            <span className="text-slate-300">
              PROGRESS: <strong className="text-brand-gold-light font-bold">{progressPct}%</strong>
            </span>
          </div>

          {/* Audio Mute/Unmute */}
          <button
            onClick={toggleMute}
            aria-label="Toggle Audio"
            className="bg-black/80 hover:bg-brand-gold hover:text-brand-obsidian border border-brand-gold/50 p-2 rounded-full transition-all shadow-lg text-brand-gold"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Autoplay vs Scroll-Lock Mode Button */}
          <button
            onClick={toggleAutoplayMode}
            className={`px-4 py-1.5 rounded-full text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all shadow-lg border ${
              isAutoplay
                ? 'bg-brand-gold text-brand-obsidian border-brand-gold shadow-brand-gold/20'
                : 'bg-black/80 text-brand-gold border-brand-gold/50 hover:bg-brand-gold hover:text-brand-obsidian'
            }`}
          >
            {isAutoplay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isAutoplay ? 'SWITCH TO SCROLL-LOCK' : 'ENABLE AUTOPLAY'}</span>
          </button>
        </div>
      </div>

      {/* 3. HERO HEADLINE & CTA (Fades seamlessly on scroll) */}
      <div
        ref={overlayContentRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 sm:px-8 pointer-events-auto"
      >
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-brand-gold/50 bg-brand-navy/90 backdrop-blur-xl mb-6 shadow-2xl shadow-black/80">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-gold"></span>
          </span>
          <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-brand-gold-light font-bold">
            Western Australia's Sole Robotic Exhaust Cleaning Fleet
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold tracking-tight text-white leading-[1.05] max-w-6xl mb-6 drop-shadow-2xl">
          Precision. Technology. <br />
          <span className="text-gold-gradient">Absolute Compliance.</span>
        </h1>

        <p className="text-base sm:text-xl text-slate-200 max-w-3xl font-normal leading-relaxed mb-10 drop-shadow-md">
          Scroll down to pilot our 4K robotic crawler live through the exhaust system — eliminating fuel load down to bare metal with zero confined-space hazard.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(212,175,55,0.45)' }}
            whileTap={{ scale: 0.96 }}
            href="#quote"
            className="w-full sm:w-auto inline-flex items-center justify-center px-9 py-4 rounded-lg text-sm font-mono uppercase tracking-wider font-bold bg-gold-gradient text-brand-obsidian shadow-2xl transition-all"
          >
            <span>Request Facility Quote</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            href="#crawler"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-lg text-sm font-mono uppercase tracking-wider font-semibold border border-brand-gold/60 text-white bg-black/60 backdrop-blur-md hover:bg-brand-gold/20 transition-all"
          >
            <Scan className="w-4 h-4 mr-2 text-brand-gold" />
            <span>Inspect The Crawler</span>
          </motion.a>
        </div>
      </div>

      {/* 4. MID-SCROLL DUCT TELEMETRY HUD (Appears over continuous video) */}
      <div
        ref={hudMetricsRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 sm:px-8 pointer-events-none opacity-0"
      >
        <div className="gold-glass-card rounded-2xl p-8 max-w-2xl border-2 border-brand-gold/60 shadow-2xl shadow-brand-gold/25 text-center backdrop-blur-2xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/20 text-brand-gold font-mono text-xs font-bold mb-4 uppercase">
            <CheckCircle2 className="w-4 h-4" /> Live Decontamination in Progress
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-3">
            100% Internal Surface Coverage
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed mb-6">
            Our continuous rotary thermal jetting system maintains 140°C pressurized extraction across every centimetre of horizontal runs, vertical risers, and fire dampers.
          </p>
          <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4 text-left font-mono">
            <div>
              <span className="text-[10px] text-brand-steel uppercase block">Pre-Clean Fuel</span>
              <span className="text-red-400 font-bold text-base">2,400 μm</span>
            </div>
            <div>
              <span className="text-[10px] text-brand-steel uppercase block">Post-Clean Finish</span>
              <span className="text-emerald-400 font-bold text-base">&lt; 20 μm Bare</span>
            </div>
            <div>
              <span className="text-[10px] text-brand-steel uppercase block">Certification</span>
              <span className="text-brand-gold font-bold text-base">AS 1851-2012</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM 57-SECOND VIDEO PROGRESS BAR (Strict Scroll Lock Feedback) */}
      <div className="absolute bottom-6 inset-x-0 z-20 px-6 sm:px-12 flex flex-col items-center pointer-events-none">
        <div className="flex items-center gap-2 text-xs font-mono text-brand-gold uppercase tracking-widest mb-2 font-semibold">
          <span>{isAutoplay ? 'Autoplaying video run' : 'Scroll down to pilot full 57s duct run'}</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
        
        {/* Full-width responsive progress bar */}
        <div className="w-full max-w-2xl h-2.5 bg-white/15 rounded-full overflow-hidden backdrop-blur-md border border-brand-gold/30 shadow-[0_0_15px_rgba(0,0,0,0.8)]">
          <div
            ref={progressBarRef}
            className="h-full bg-gold-gradient shadow-[0_0_15px_#D4AF37] transition-all duration-75"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

    </section>
  );
}
