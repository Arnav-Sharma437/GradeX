'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Scan, ShieldCheck, Play, Pause, ChevronDown, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayContentRef = useRef<HTMLDivElement>(null);
  const hudMetricsRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrubProgress, setScrubProgress] = useState(0);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.innerWidth < 768;
      const video = videoRef.current;
      if (!video) return;

      // Ensure video is paused so user scroll drives 100% of the playback
      video.pause();

      if (prefersReducedMotion || isMobile) {
        video.play().catch(() => {});
        setIsPlaying(true);
        return;
      }

      // PIN ENTIRE HERO FOR 300% OF VIEWPORT SCROLL (video must finish scrub before releasing)
      const pinTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=300%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          setScrubProgress(Math.round(self.progress * 100));
          if (progressBarRef.current) {
            progressBarRef.current.style.width = `${self.progress * 100}%`;
          }
          if (video && video.duration && !isNaN(video.duration)) {
            video.currentTime = self.progress * video.duration;
          }
        },
      });

      // Overlay text transitions as user scrolls through the duct
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
        },
      });

      // Phase 1: Headline fades & lifts out
      tl.to(overlayContentRef.current, {
        y: -100,
        opacity: 0,
        scale: 0.95,
        ease: 'power1.in',
      }, 0);

      // Phase 2: Show Duct Telemetry Callouts mid-way through video
      tl.fromTo(hudMetricsRef.current, {
        opacity: 0,
        scale: 0.85,
        y: 60,
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        ease: 'power2.out',
      }, 0.3);

      tl.to(hudMetricsRef.current, {
        opacity: 0,
        y: -40,
        ease: 'power2.in',
      }, 0.8);

      return () => {
        pinTrigger.kill();
      };
    },
    { scope: containerRef }
  );

  const toggleManualPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
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
          className="w-full h-full object-cover opacity-80"
        />
        
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-black/40 to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/50 to-brand-obsidian pointer-events-none" />
        
        {/* Futuristic Blueprint Coordinate Grid Lines */}
        <div className="absolute inset-0 pointer-events-none blueprint-grid opacity-30" />
      </div>

      {/* 2. TOP HUD BAR (TELEMETRY) */}
      <div className="absolute top-20 inset-x-0 z-20 px-6 sm:px-12 flex justify-between items-center text-xs font-mono text-brand-gold-light pointer-events-none">
        <div className="flex items-center gap-2 bg-black/60 border border-brand-border/40 px-3 py-1.5 rounded-full backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>ROBOTIC CRAWLER // LIVE DUCT PENETRATION</span>
        </div>
        <div className="hidden sm:flex items-center gap-4 bg-black/60 border border-brand-border/40 px-4 py-1.5 rounded-full backdrop-blur-md">
          <span className="text-slate-400">DUCT REACH: <strong className="text-white">45M</strong></span>
          <span className="text-slate-400">DEGREASE TEMP: <strong className="text-brand-gold">140°C</strong></span>
          <span className="text-slate-400">SCRUB: <strong className="text-brand-gold-light">{scrubProgress}%</strong></span>
        </div>
      </div>

      {/* 3. CENTER HERO HEADLINE & ACTIONS (Fades on scroll) */}
      <div
        ref={overlayContentRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 sm:px-8 pointer-events-auto"
      >
        {/* WA Exclusivity Badge */}
        <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-brand-gold/50 bg-brand-navy/90 backdrop-blur-xl mb-6 shadow-2xl shadow-black/80">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-gold"></span>
          </span>
          <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-brand-gold-light font-bold">
            Western Australia's Sole Robotic Exhaust Cleaning Fleet
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold tracking-tight text-white leading-[1.05] max-w-6xl mb-6 drop-shadow-2xl">
          Precision. Technology. <br />
          <span className="text-gold-gradient">Absolute Compliance.</span>
        </h1>

        {/* Subline */}
        <p className="text-base sm:text-xl text-slate-200 max-w-3xl font-normal leading-relaxed mb-10 drop-shadow-md">
          Scroll down to drive our robotic crawler through the kitchen exhaust system — extracting grease down to bare metal with 4K camera evidence.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(212,175,55,0.4)" }}
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
            href="#technology"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-lg text-sm font-mono uppercase tracking-wider font-semibold border border-brand-gold/60 text-white bg-black/60 backdrop-blur-md hover:bg-brand-gold/20 transition-all"
          >
            <Scan className="w-4 h-4 mr-2 text-brand-gold" />
            <span>See The Technology</span>
          </motion.a>
        </div>
      </div>

      {/* 4. MID-SCROLL DUCT TELEMETRY HUD (Appears during the video scrub) */}
      <div
        ref={hudMetricsRef}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 sm:px-8 pointer-events-none opacity-0"
      >
        <div className="gold-glass-card rounded-2xl p-8 max-w-2xl border-2 border-brand-gold/60 shadow-2xl shadow-brand-gold/20 text-center backdrop-blur-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-brand-gold/20 text-brand-gold font-mono text-xs font-bold mb-4 uppercase">
            <CheckCircle2 className="w-4 h-4" /> Live Decontamination in Progress
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mb-3">
            Scouring 100% of Internal Ducting
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed mb-6">
            Unlike human cleaners who can only reach 1 metre from access panels, Grade X robotic crawlers liquidate hardened grease across the entire length of vertical risers and blind turns.
          </p>
          <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4 text-left font-mono">
            <div>
              <span className="text-[10px] text-brand-steel uppercase block">Pre-Clean Fuel</span>
              <span className="text-red-400 font-bold text-base">2,400 μm</span>
            </div>
            <div>
              <span className="text-[10px] text-brand-steel uppercase block">Post-Clean Target</span>
              <span className="text-emerald-400 font-bold text-base">&lt; 20 μm</span>
            </div>
            <div>
              <span className="text-[10px] text-brand-steel uppercase block">Safety Standard</span>
              <span className="text-brand-gold font-bold text-base">AS 1851-2012</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. BOTTOM SCROLL-DRIVE INSTRUCTION BAR */}
      <div className="absolute bottom-6 inset-x-0 z-20 px-6 sm:px-12 flex flex-col items-center pointer-events-none">
        <div className="flex items-center gap-2 text-xs font-mono text-brand-gold uppercase tracking-widest animate-bounce mb-2">
          <span>Scroll down to navigate duct</span>
          <ChevronDown className="w-4 h-4" />
        </div>
        {/* Full-width interactive scrubbing progress bar */}
        <div className="w-full max-w-xl h-1.5 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            ref={progressBarRef}
            className="h-full bg-gold-gradient shadow-[0_0_12px_#D4AF37] transition-all"
            style={{ width: '0%' }}
          />
        </div>
      </div>

    </section>
  );
}
