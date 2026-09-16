'use client';

import { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Scan, ShieldCheck, ChevronDown, CheckCircle2, Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayContentRef = useRef<HTMLDivElement>(null);
  const hudMetricsRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [scrubProgress, setScrubProgress] = useState(0);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState('00:00');
  const [isManualPlaying, setIsManualPlaying] = useState(false);

  // Target and current time for high-performance rAF interpolation
  const targetTimeRef = useRef(0);
  const isScrubbingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Fast-decode & buffer setup for instant responsive scrubbing
    video.pause();
    video.currentTime = 0;

    // Continuous 60fps / 120fps smooth linear interpolation loop (LERP)
    let animationFrameId: number;

    const smoothVideoPlayback = () => {
      if (video && !video.paused && isManualPlaying) {
        // Normal video playing
        const mins = Math.floor(video.currentTime / 60);
        const secs = Math.floor(video.currentTime % 60);
        setCurrentTimeFormatted(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
      } else if (video && !isManualPlaying && video.duration && !isNaN(video.duration)) {
        // Ultra-smooth lerp: smoothly glide video.currentTime towards targetTimeRef
        const diff = targetTimeRef.current - video.currentTime;
        if (Math.abs(diff) > 0.02) {
          // 0.25 LERP coefficient gives silky fluid response without stutter or tearing
          video.currentTime += diff * 0.25;
        } else {
          video.currentTime = targetTimeRef.current;
        }

        const current = video.currentTime;
        const mins = Math.floor(current / 60);
        const secs = Math.floor(current % 60);
        setCurrentTimeFormatted(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
      }

      animationFrameId = requestAnimationFrame(smoothVideoPlayback);
    };

    animationFrameId = requestAnimationFrame(smoothVideoPlayback);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isManualPlaying]);

  useGSAP(
    () => {
      const video = videoRef.current;
      if (!video) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.innerWidth < 768;

      if (prefersReducedMotion || isMobile) {
        video.play().catch(() => {});
        setIsManualPlaying(true);
        return;
      }

      // PIN HERO SECTION FOR 450% OF VIEWPORT HEIGHT
      // Giving the user plenty of smooth scrolling room to traverse the entire 57-second video seamlessly
      const pinTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=450%',
        pin: true,
        scrub: 0.8, // Smooth damping scrub
        anticipatePin: 1,
        onUpdate: (self) => {
          if (isManualPlaying) return;
          const progress = self.progress;
          setScrubProgress(Math.round(progress * 100));

          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${progress * 100}%`;
          }

          if (video.duration && !isNaN(video.duration)) {
            // Update target time for the rAF lerp engine
            targetTimeRef.current = progress * video.duration;
          }
        },
      });

      // Overlay text transitions tied to video progression
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=450%',
          scrub: 1,
        },
      });

      // 1. Initial headline smoothly fades and lifts out in the first 20%
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

      // 2. Telemetry HUD card smoothly emerges during mid-duct extraction (30% to 75%)
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
        0.25
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
    { scope: containerRef, dependencies: [isManualPlaying] }
  );

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsManualPlaying(true);
    } else {
      videoRef.current.pause();
      setIsManualPlaying(false);
    }
  };

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black" id="heroSection">
      
      {/* 1. FULL WIDTH / FULL VIEWPORT BACKGROUND VIDEO */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#03070E]">
        <video
          ref={videoRef}
          src="/videos/hero-robot-clean.mp4"
          poster="/images/hero-poster.jpg"
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-90"
        />
        
        {/* Subtle Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-black/30 to-black/70 pointer-events-none" />
        <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />
      </div>

      {/* 2. TOP HUD TELEMETRY BAR */}
      <div className="absolute top-20 inset-x-0 z-20 px-6 sm:px-12 flex justify-between items-center text-xs font-mono text-brand-gold-light">
        <div className="flex items-center gap-2.5 bg-black/70 border border-brand-border/40 px-3.5 py-1.5 rounded-full backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>ROBOTIC CRAWLER // LIVE DUCT PENETRATION</span>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-4 bg-black/70 border border-brand-border/40 px-4 py-1.5 rounded-full backdrop-blur-md">
            <span className="text-slate-400">TIMECODE: <strong className="text-white font-bold">{currentTimeFormatted} / 00:57</strong></span>
            <span className="text-slate-400">DUCT REACH: <strong className="text-brand-gold font-bold">45M</strong></span>
            <span className="text-slate-400">SCRUB: <strong className="text-brand-gold-light font-bold">{scrubProgress}%</strong></span>
          </div>

          {/* Manual Play/Pause override */}
          <button
            onClick={togglePlay}
            className="bg-black/80 hover:bg-brand-gold hover:text-brand-obsidian border border-brand-gold/50 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-black/60"
          >
            {isManualPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isManualPlaying ? 'PAUSE AUTO' : 'AUTOPLAY'}</span>
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

      {/* 4. MID-SCROLL DUCT TELEMETRY HUD (Appears throughout video scrub) */}
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

      {/* 5. BOTTOM 57-SECOND VIDEO PROGRESS SCRUB BAR */}
      <div className="absolute bottom-6 inset-x-0 z-20 px-6 sm:px-12 flex flex-col items-center pointer-events-none">
        <div className="flex items-center gap-2 text-xs font-mono text-brand-gold uppercase tracking-widest mb-2 font-semibold">
          <span className="animate-pulse">Scroll down to pilot 57s duct run</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
        
        {/* Full-width responsive progress bar with gold shimmer */}
        <div className="w-full max-w-2xl h-2 bg-white/15 rounded-full overflow-hidden backdrop-blur-md border border-white/10 shadow-inner">
          <div
            ref={progressBarRef}
            className="h-full bg-gold-gradient shadow-[0_0_15px_#D4AF37] transition-all"
            style={{ width: '0%' }}
          />
        </div>
      </div>

    </section>
  );
}
