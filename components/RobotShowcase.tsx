'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Bot, Crosshair, Shield, Zap, ChevronRight, Activity, Disc3, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

const hotspots = [
  {
    id: 1,
    title: 'Dual 3,000 PSI High-Temp Thermal Jetters',
    desc: 'Hydraulic articulating turret with dual high-pressure nozzles spraying 140°C saturated dry steam to instantly liquefy hardened carbon and grease deposits.',
    x: '45%',
    y: '26%'
  },
  {
    id: 2,
    title: 'Optical Guidance Array & LED Illumination',
    desc: 'Dual forward 4K endoscopic optics and high-lumen LED clusters providing unbroken live inspection telemetry directly to the technician console.',
    x: '46%',
    y: '68%'
  },
  {
    id: 3,
    title: 'Magnetic High-Torque Caterpillar Tracks',
    desc: 'Industrial heavy-duty tank treads with magnetic wheel grips designed to navigate horizontal duct runs, 90° bends, and 45° vertical risers.',
    x: '78%',
    y: '74%'
  },
  {
    id: 4,
    title: 'Reinforced 316L Stainless Steel Chassis',
    desc: 'Acid-resistant, IP68 water-tight structural body protecting internal micro-controllers and high-pressure fluid valves.',
    x: '38%',
    y: '58%'
  }
];

export default function RobotShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<number>(1);
  const [viewAngle, setViewAngle] = useState<'transparent' | 'vacuum'>('transparent');

  // 3D Tilt calculations
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useGSAP(
    () => {
      // Floating glowing blueprint rings
      gsap.to('.schematic-ring', {
        rotate: 360,
        duration: 30,
        repeat: -1,
        ease: 'none',
      });

      gsap.from('.robot-showcase-panel', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-28 bg-[#03070E] border-y border-brand-border/30 relative overflow-hidden" id="crawler">
      
      {/* Background Ambient Glow & Circular Engineering Grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-brand-gold/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono text-brand-gold uppercase tracking-widest font-semibold flex items-center gap-2 mb-3">
              <Bot className="w-4 h-4" /> WA Exclusive Fleet Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight">
              Grade X <span className="text-gold-gradient">Crawler Platform</span>
            </h2>
          </div>
          <p className="text-slate-300 max-w-md font-normal text-sm sm:text-base leading-relaxed">
            The precise robotic rover deployed in your facility ducts. Cleanroom-safe, remotely operated, and eliminating all human confined-space hazards.
          </p>
        </div>

        {/* 3D Holographic Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: 3D Holographic Stage with Transparent Robot Cutout (7 Cols) */}
          <div className="robot-showcase-panel lg:col-span-7 gold-glass-card rounded-3xl p-6 sm:p-10 relative border-2 border-brand-gold/40 shadow-[0_0_50px_rgba(212,175,55,0.15)]">
            
            {/* Viewport Control Bar */}
            <div className="flex justify-between items-center mb-6 text-xs font-mono text-brand-steel">
              <div className="flex items-center gap-2 text-brand-gold-light font-semibold">
                <Crosshair className="w-4 h-4 text-brand-gold animate-spin" style={{ animationDuration: '8s' }} />
                <span>GRADE X MTR-01 CRAWLER // 3D SCHEMATIC</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewAngle('transparent')}
                  className={`px-3 py-1 rounded text-[11px] font-mono font-bold transition-all ${viewAngle === 'transparent' ? 'bg-brand-gold text-brand-obsidian shadow-lg shadow-brand-gold/25' : 'bg-brand-navy border border-brand-border/60 text-slate-300'}`}
                >
                  3D HOLO ISOMETRIC
                </button>
                <button
                  onClick={() => setViewAngle('vacuum')}
                  className={`px-3 py-1 rounded text-[11px] font-mono font-bold transition-all ${viewAngle === 'vacuum' ? 'bg-brand-gold text-brand-obsidian shadow-lg shadow-brand-gold/25' : 'bg-brand-navy border border-brand-border/60 text-slate-300'}`}
                >
                  VACUUM MANIFOLD
                </button>
              </div>
            </div>

            {/* 3D Interactive Stage */}
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-gradient-to-b from-[#091528] via-[#050C17] to-black border border-brand-gold/30 p-4 flex items-center justify-center cursor-crosshair group"
            >
              {/* Background Circular Tech Radar */}
              <div className="schematic-ring absolute w-[420px] h-[420px] rounded-full border border-dashed border-brand-gold/20 pointer-events-none flex items-center justify-center">
                <div className="w-[300px] h-[300px] rounded-full border border-brand-gold/15"></div>
              </div>

              {/* Light beam sweeps from below */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-gold/15 to-transparent pointer-events-none blur-xl" />

              {/* Actual Transparent Cutout Image with 3D Pop */}
              <div className="relative w-full h-full flex items-center justify-center" style={{ transform: 'translateZ(35px)' }}>
                <Image
                  src={viewAngle === 'transparent' ? '/images/robot-transparent.png' : '/images/robot-crawler-2.jpg'}
                  alt="Grade X robotic commercial kitchen exhaust crawler"
                  fill
                  className="object-contain p-2 filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.95)] transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 55vw"
                  priority
                />
              </div>

              {/* Interactive Telemetry Hotspots */}
              {hotspots.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setSelectedHotspot(spot.id)}
                  style={{ top: spot.y, left: spot.x, transform: 'translateZ(60px)' }}
                  aria-label={spot.title}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                >
                  <span className="relative flex h-7 w-7 items-center justify-center">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${selectedHotspot === spot.id ? 'bg-brand-gold' : 'bg-emerald-400'}`}></span>
                    <span className={`relative inline-flex rounded-full h-5 w-5 border-2 border-white items-center justify-center text-[10px] font-mono font-bold ${selectedHotspot === spot.id ? 'bg-brand-gold text-brand-obsidian shadow-[0_0_12px_#D4AF37]' : 'bg-brand-navy text-white'}`}>
                      {spot.id}
                    </span>
                  </span>
                </button>
              ))}

              {/* Corner Coordinate Badges */}
              <div className="absolute top-4 left-4 text-[10px] font-mono text-brand-gold/80 pointer-events-none flex items-center gap-1.5">
                <Disc3 className="w-3.5 h-3.5 text-brand-gold" />
                <span>CHASSIS: 316L STAINLESS STEEL</span>
              </div>
              <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-400 pointer-events-none">
                45M TETHER // 140°C STEAM
              </div>
            </motion.div>

            {/* Dynamic Hotspot Information Panel */}
            <motion.div
              key={selectedHotspot}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 sm:p-5 rounded-xl bg-brand-navy-light/95 border border-brand-gold/40 text-left shadow-lg"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-pulse"></span>
                <h4 className="text-base font-bold text-white font-display">
                  {hotspots.find((h) => h.id === selectedHotspot)?.title}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                {hotspots.find((h) => h.id === selectedHotspot)?.desc}
              </p>
            </motion.div>

          </div>

          {/* Right: Technical Engineering Specs (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <motion.div whileHover={{ x: 6 }} className="gold-glass-card rounded-2xl p-6 border-l-4 border-l-brand-gold cursor-pointer">
              <div className="flex items-center gap-3.5 mb-2">
                <div className="p-3 rounded-xl bg-brand-navy-light text-brand-gold border border-brand-border/40 shadow">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-steel">Rotary Hydro-Scour</span>
                  <h4 className="text-xl font-bold text-white font-display">3,000 PSI @ 140°C</h4>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Breaks down vulcanized grease and carbon polymers that manual scraping tools physically cannot scratch.
              </p>
            </motion.div>

            <motion.div whileHover={{ x: 6 }} className="gold-glass-card rounded-2xl p-6 border-l-4 border-l-brand-gold cursor-pointer">
              <div className="flex items-center gap-3.5 mb-2">
                <div className="p-3 rounded-xl bg-brand-navy-light text-brand-gold border border-brand-border/40 shadow">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-steel">Optical Verification</span>
                  <h4 className="text-xl font-bold text-white font-display">4K Ultra-HD Endoscopic Cam</h4>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Streamed live to the technician's console and recorded in full for your post-clean insurance compliance dossier.
              </p>
            </motion.div>

            <motion.div whileHover={{ x: 6 }} className="gold-glass-card rounded-2xl p-6 border-l-4 border-l-brand-gold cursor-pointer">
              <div className="flex items-center gap-3.5 mb-2">
                <div className="p-3 rounded-xl bg-brand-navy-light text-brand-gold border border-brand-border/40 shadow">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-steel">WHS Safety Standard</span>
                  <h4 className="text-xl font-bold text-white font-display">Zero Confined-Space Entry</h4>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Eliminates occupational hazards for venue managers and prevents catastrophic duct ceiling collapses.
              </p>
            </motion.div>

            {/* Direct CTA */}
            <div className="pt-2">
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#quote"
                className="w-full inline-flex items-center justify-center py-4 rounded-xl bg-gold-gradient text-brand-obsidian font-mono font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl shadow-brand-gold/25 hover:shadow-brand-gold/45 transition-all gap-2"
              >
                <span>Deploy Robotic Fleet to Your Venue</span>
                <ChevronRight className="w-4 h-4" />
              </motion.a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
