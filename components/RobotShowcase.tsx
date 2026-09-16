'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Bot, Camera, Crosshair, Shield, Zap, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const hotspots = [
  {
    id: 1,
    title: 'Dual High-Pressure Thermal Nozzles',
    desc: 'Operates at 3,000 PSI with 140°C saturated steam to emulsify carbonized grease instantly.',
    x: '48%',
    y: '22%'
  },
  {
    id: 2,
    title: '4K Pan-Tilt Optical Sensor + LED Array',
    desc: 'Uncut video recording of internal duct walls, dampers, and corners with zero shadow zones.',
    x: '30%',
    y: '70%'
  },
  {
    id: 3,
    title: 'Magnetic Multi-Terrain Caterpillar Tracks',
    desc: 'High-torque tank treads designed to climb vertical risers, 90° bends, and slick grease layers.',
    x: '75%',
    y: '68%'
  },
  {
    id: 4,
    title: 'Integrated Vacuum Extraction Collar',
    desc: 'Heavy-duty suction port capturing loosened slurry directly to prevent kitchen contamination.',
    x: '18%',
    y: '72%'
  }
];

export default function RobotShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<1 | 2>(1);
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(1);

  useGSAP(
    () => {
      gsap.from('.robot-showcase-panel', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });

      gsap.from('.robot-spec-item', {
        x: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.robot-spec-item',
          start: 'top 85%',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-28 bg-[#040811] border-y border-brand-border/30 relative overflow-hidden" id="crawler">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-brand-gold/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono text-brand-gold uppercase tracking-widest font-semibold flex items-center gap-2 mb-3">
              <Bot className="w-4 h-4" /> WA Exclusive Fleet Architecture
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
              The Grade X <span className="text-gold-gradient">Robotic Platform</span>
            </h2>
          </div>
          <p className="text-slate-300 max-w-md font-normal text-sm sm:text-base leading-relaxed">
            Engineered exclusively for heavy-duty commercial kitchen exhaust decontamination. Zero human entry. 100% mechanical precision.
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Actual Robot Photography with Interactive Hotspots (7 Cols) */}
          <div className="robot-showcase-panel lg:col-span-7 gold-glass-card rounded-3xl p-6 sm:p-8 relative border-2 border-brand-gold/40 shadow-2xl">
            
            {/* View Switcher Controls */}
            <div className="flex justify-between items-center mb-6 text-xs font-mono text-brand-steel">
              <span className="flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-brand-gold" />
                GRADE X MTR-01 CRAWLER // SCHEMATIC
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveImage(1)}
                  className={`px-3 py-1 rounded border text-[11px] font-bold transition-all ${activeImage === 1 ? 'bg-brand-gold text-brand-obsidian border-brand-gold shadow-lg shadow-brand-gold/20' : 'bg-brand-navy border-brand-border/60 text-slate-300 hover:text-white'}`}
                >
                  FRONT OPTIC VIEW
                </button>
                <button
                  onClick={() => setActiveImage(2)}
                  className={`px-3 py-1 rounded border text-[11px] font-bold transition-all ${activeImage === 2 ? 'bg-brand-gold text-brand-obsidian border-brand-gold shadow-lg shadow-brand-gold/20' : 'bg-brand-navy border-brand-border/60 text-slate-300 hover:text-white'}`}
                >
                  VACUUM MANIFOLD
                </button>
              </div>
            </div>

            {/* Robot Image Container */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-[#060D1A] to-slate-950 border border-brand-border/40 p-4 flex items-center justify-center">
              
              <Image
                src={activeImage === 1 ? '/images/robot-crawler-1.jpg' : '/images/robot-crawler-2.jpg'}
                alt="Grade X robotic commercial kitchen exhaust cleaning crawler"
                fill
                className="object-contain p-4 drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] transition-all duration-500"
                sizes="(max-width: 768px) 100vw, 55vw"
                priority
              />

              {/* Interactive Telemetry Hotspots */}
              {hotspots.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setSelectedHotspot(spot.id)}
                  style={{ top: spot.y, left: spot.x }}
                  aria-label={spot.title}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                >
                  <span className="relative flex h-6 w-6 items-center justify-center">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${selectedHotspot === spot.id ? 'bg-brand-gold' : 'bg-emerald-400'}`}></span>
                    <span className={`relative inline-flex rounded-full h-4 w-4 border-2 border-white items-center justify-center text-[9px] font-mono font-bold text-brand-obsidian ${selectedHotspot === spot.id ? 'bg-brand-gold' : 'bg-white'}`}>
                      {spot.id}
                    </span>
                  </span>
                </button>
              ))}

              {/* Reticle grid overlay */}
              <div className="absolute top-4 left-4 text-[10px] font-mono text-brand-gold/70 pointer-events-none">
                CHASSIS: AUSTENITIC STAINLESS 316L
              </div>
              <div className="absolute bottom-4 right-4 text-[10px] font-mono text-slate-400 pointer-events-none">
                45M TETHER // IP68 SUBMERSIBLE
              </div>
            </div>

            {/* Active Hotspot Description Card */}
            {selectedHotspot && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={selectedHotspot}
                className="mt-5 p-4 rounded-xl bg-brand-navy-light/90 border border-brand-gold/40 text-left"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
                  <h4 className="text-sm font-bold text-white font-display">
                    {hotspots.find(h => h.id === selectedHotspot)?.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {hotspots.find(h => h.id === selectedHotspot)?.desc}
                </p>
              </motion.div>
            )}

          </div>

          {/* Right: Technical Engineering Specs (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="robot-spec-item gold-glass-card rounded-2xl p-6 border-l-4 border-l-brand-gold">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-lg bg-brand-navy-light text-brand-gold border border-brand-border/40">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-steel">Rotary Hydro-Scour</span>
                  <h4 className="text-lg font-bold text-white font-display">3,000 PSI @ 140°C</h4>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Breaks down vulcanized grease and carbon polymers that manual scraping tools physically cannot scratch.
              </p>
            </div>

            <div className="robot-spec-item gold-glass-card rounded-2xl p-6 border-l-4 border-l-brand-gold">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-lg bg-brand-navy-light text-brand-gold border border-brand-border/40">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-steel">Optical Verification</span>
                  <h4 className="text-lg font-bold text-white font-display">4K Ultra-HD Endoscopic Cam</h4>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Streamed live to the technician's console and recorded in full for your post-clean insurance compliance dossier.
              </p>
            </div>

            <div className="robot-spec-item gold-glass-card rounded-2xl p-6 border-l-4 border-l-brand-gold">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2.5 rounded-lg bg-brand-navy-light text-brand-gold border border-brand-border/40">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-brand-steel">WHS Safety Standard</span>
                  <h4 className="text-lg font-bold text-white font-display">Zero Confined-Space Entry</h4>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Eliminates occupational hazards for venue managers and prevents catastrophic duct ceiling collapses.
              </p>
            </div>

            {/* Quote Action */}
            <div className="pt-2">
              <a
                href="#quote"
                className="w-full inline-flex items-center justify-center py-4 rounded-xl bg-gold-gradient text-brand-obsidian font-mono font-bold text-xs uppercase tracking-wider shadow-xl shadow-brand-gold/20 hover:shadow-brand-gold/40 transition-all gap-2"
              >
                <span>Book Robotic Crawler For Your Facility</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
