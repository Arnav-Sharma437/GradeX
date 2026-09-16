'use client';

import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Scan, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.innerWidth < 768;

      // HUD elements entrance animation on load
      const tl = gsap.timeline();
      tl.from('.hero-badge', { y: -30, opacity: 0, duration: 0.8, ease: 'power3.out' })
        .from('.hero-headline', { y: 40, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
        .from('.hero-subline', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
        .from('.hero-cta', { scale: 0.9, opacity: 0, duration: 0.7, ease: 'back.out(1.7)' }, '-=0.5')
        .from('.hero-hud-frame', { y: 60, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.5');

      if (prefersReducedMotion || isMobile) {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
        return;
      }

      const video = videoRef.current;
      if (!video) return;

      // 1. Scroll-scrub the video playback directly
      video.pause();
      const scrub = { time: 0 };

      const handleLoadedMetadata = () => {
        gsap.to(scrub, {
          time: video.duration || 10,
          ease: 'none',
          onUpdate: () => {
            if (video.readyState >= 2) {
              video.currentTime = scrub.time;
            }
          },
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=150%',
            scrub: 1,
          },
        });
      };

      if (video.readyState >= 1) {
        handleLoadedMetadata();
      } else {
        video.addEventListener('loadedmetadata', handleLoadedMetadata);
      }

      // 2. Pin and scale the video viewport frame
      gsap.to(frameRef.current, {
        scale: 0.85,
        borderRadius: '24px',
        borderColor: 'rgba(212, 175, 55, 0.65)',
        boxShadow: '0 25px 60px -15px rgba(212, 175, 55, 0.25)',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
          pin: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-start pt-10 pb-20 overflow-hidden" id="heroSection">
      
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-navy-light/40 rounded-full blur-[140px]"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[450px] h-[300px] bg-brand-gold/10 rounded-full blur-[100px]"></div>
      </div>

      <div ref={hudRef} className="max-w-7xl mx-auto px-4 sm:px-8 w-full relative z-10 flex flex-col items-center text-center">
        
        {/* WA Exclusivity Badge */}
        <div className="hero-badge inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-brand-gold/40 bg-brand-navy/80 backdrop-blur-md mb-8 shadow-xl shadow-black/50">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-gold"></span>
          </span>
          <span className="text-xs font-mono uppercase tracking-widest text-brand-gold-light font-semibold">
            Western Australia's Sole Robotic Exhaust Cleaning Fleet
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="hero-headline text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.08] max-w-5xl mb-6">
          Precision. Technology. <br className="hidden sm:inline" />
          <span className="text-gold-gradient">Absolute Compliance.</span>
        </h1>

        {/* Subline */}
        <p className="hero-subline text-lg sm:text-xl text-slate-300 max-w-3xl font-light leading-relaxed mb-10">
          Advanced remote-inspection robotics, micron-grade grease measurement, and high-pressure thermal decontamination for commercial kitchen exhaust systems.
        </p>

        {/* CTA Hub */}
        <div className="hero-cta flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#quote"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-md text-sm font-mono uppercase tracking-wider font-bold bg-gold-gradient text-brand-obsidian shadow-xl shadow-brand-gold/25 hover:shadow-brand-gold/40 transition-all duration-300"
          >
            <span>Request Facility Quote</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#technology"
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-4 rounded-md text-sm font-mono uppercase tracking-wider font-semibold border border-brand-border/60 hover:border-brand-gold text-slate-200 hover:text-white bg-brand-navy/60 hover:bg-brand-navy-light/60 backdrop-blur-md transition-all duration-300"
          >
            <Scan className="w-4 h-4 mr-2 text-brand-gold" />
            <span>See The Technology</span>
          </motion.a>
        </div>

        {/* Signature Hero Video Viewport */}
        <div className="w-full max-w-5xl mx-auto relative perspective-1000 hero-hud-frame">
          <div ref={frameRef} className="relative rounded-2xl overflow-hidden border-2 border-brand-gold/30 bg-brand-obsidian shadow-2xl shadow-black/80 transition-all">
            
            {/* Top Video HUD Bar */}
            <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/85 to-transparent p-4 z-20 flex justify-between items-center text-xs font-mono text-brand-gold-light/90 pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>ROBOTIC CAM_01 // LIVE FEED 4K</span>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-slate-400">
                <span>DUCT SECTION: WA-MTR-08</span>
                <span>THERMAL STEAM: 140°C</span>
                <span className="text-brand-gold">CALIBRATED</span>
              </div>
            </div>

            {/* Video Container */}
            <div className="relative w-full aspect-video sm:h-[480px] bg-slate-950 flex items-center justify-center overflow-hidden">
              <video
                ref={videoRef}
                src="/videos/hero-robot-clean.mp4"
                poster="/images/hero-poster.jpg"
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover opacity-90 scale-105"
              />

              {/* Blueprint Target Reticle */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-48 h-48 border border-brand-gold/30 rounded-full flex items-center justify-center relative">
                  <div className="absolute w-full h-[1px] bg-brand-gold/20"></div>
                  <div className="absolute h-full w-[1px] bg-brand-gold/20"></div>
                  <div className="w-24 h-24 border border-dashed border-brand-gold/50 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
                  <div className="w-3 h-3 bg-brand-gold/80 rounded-full"></div>
                </div>
              </div>

              {/* Bottom Video HUD Info Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 sm:p-6 z-20 flex flex-wrap justify-between items-end gap-4 pointer-events-none">
                <div className="text-left">
                  <p className="text-[11px] font-mono text-brand-gold uppercase tracking-widest">Inspection & Scrape Unit</p>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white">Continuous Duct Penetration: Up to 45 Metres</h4>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-black/70 border border-brand-gold/30 px-3 py-1.5 rounded font-mono text-xs text-brand-gold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-gold" />
                    <span>Zero Confined Space Hazard</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Corner Brackets */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-brand-gold z-30 pointer-events-none"></div>
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-brand-gold z-30 pointer-events-none"></div>
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-brand-gold z-30 pointer-events-none"></div>
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-brand-gold z-30 pointer-events-none"></div>
          </div>

          {/* Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-brand-navy/60 border border-brand-border/40 rounded-lg p-3 text-left">
              <span className="text-[10px] font-mono text-brand-steel uppercase block">Duct Reach</span>
              <span className="text-lg font-bold font-mono text-brand-gold-light">45m Continuous</span>
            </div>
            <div className="bg-brand-navy/60 border border-brand-border/40 rounded-lg p-3 text-left">
              <span className="text-[10px] font-mono text-brand-steel uppercase block">Grease Tolerance</span>
              <span className="text-lg font-bold font-mono text-brand-gold-light">&lt; 50 Microns</span>
            </div>
            <div className="bg-brand-navy/60 border border-brand-border/40 rounded-lg p-3 text-left">
              <span className="text-[10px] font-mono text-brand-steel uppercase block">Resolution</span>
              <span className="text-lg font-bold font-mono text-brand-gold-light">4K Ultra-HD Optic</span>
            </div>
            <div className="bg-brand-navy/60 border border-brand-border/40 rounded-lg p-3 text-left">
              <span className="text-[10px] font-mono text-brand-steel uppercase block">Safety Protocol</span>
              <span className="text-lg font-bold font-mono text-brand-gold-light">100% Remote WHS</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
