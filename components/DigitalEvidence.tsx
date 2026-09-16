'use client';

import { useRef, useState, useCallback } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Binary, SlidersHorizontal, ChevronsLeftRight, Ruler, Video, Award } from 'lucide-react';
import Image from 'next/image';

export default function DigitalEvidence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  useGSAP(
    () => {
      gsap.from('.evidence-panel', {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });
    },
    { scope: containerRef }
  );

  const handleMove = useCallback((clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let pos = ((clientX - rect.left) / rect.width) * 100;
    pos = Math.max(0, Math.min(100, pos));
    setSliderPos(pos);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden" id="evidence">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-brand-gold uppercase tracking-widest font-semibold flex items-center justify-center gap-2 mb-3">
            <Binary className="w-4 h-4" /> Empirical Fire Safety
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
            Undeniable Proof of <span className="text-gold-gradient">Compliance</span>
          </h2>
          <p className="mt-4 text-slate-300 font-light text-base sm:text-lg">
            In an insurance audit or post-fire investigation, opinions mean nothing. Grade X delivers quantitative, calibrated proof of compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Interactive Before/After Comparison Slider (7 Cols) */}
          <div className="evidence-panel lg:col-span-7 gold-glass-card rounded-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 text-xs font-mono text-brand-steel">
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-brand-gold" />
                DRAG SLIDER TO VERIFY DECONTAMINATION
              </span>
              <span className="text-brand-gold-light bg-brand-navy-light px-2 py-0.5 rounded border border-brand-border/30">
                DUCT SECTION 14B // WA RESORT
              </span>
            </div>

            {/* Slider Container */}
            <div
              ref={sliderRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseUp}
              onTouchMove={handleTouchMove}
              className="relative rounded-xl overflow-hidden aspect-[16/10] sm:h-[400px] border border-brand-border/40 cursor-ew-resize select-none"
            >
              {/* BEFORE Image (Underneath) */}
              <div className="absolute inset-0 w-full h-full bg-slate-900">
                <Image
                  src="https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1200&q=80"
                  alt="Dangerous grease buildup inside kitchen exhaust duct before Grade X robotic cleaning"
                  fill
                  className="object-cover filter contrast-125 brightness-75 sepia-[0.35]"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                <div className="absolute top-4 left-4 bg-red-950/80 border border-red-500/50 text-red-200 text-xs font-mono px-3 py-1.5 rounded backdrop-blur-md">
                  <span>BEFORE: 2,400 μm FAT/GREASE (CRITICAL RISK)</span>
                </div>
              </div>

              {/* AFTER Image (Clipped Overlay) */}
              <div
                className="absolute top-0 left-0 h-full overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <div className="relative w-[700px] h-[400px] sm:h-[400px]">
                  <Image
                    src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80"
                    alt="Spotless metallic bare-metal kitchen exhaust duct after Grade X robotic decontamination"
                    fill
                    className="object-cover filter brightness-110 contrast-105"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                  <div className="absolute top-4 right-4 bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-mono px-3 py-1.5 rounded backdrop-blur-md">
                    <span>AFTER: &lt; 20 μm BARE METAL (AS 1851 CERTIFIED)</span>
                  </div>
                </div>
              </div>

              {/* Slider Divider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-brand-gold shadow-[0_0_12px_#D4AF37] z-30 pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-9 h-9 rounded-full bg-brand-navy border-2 border-brand-gold text-brand-gold flex items-center justify-center shadow-lg">
                  <ChevronsLeftRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-3 text-[11px] font-mono text-slate-400">
              <span>◄ Heavy Solidified Grease (Fire Hazard)</span>
              <span className="text-brand-gold">Bare Stainless Steel (Insured) ►</span>
            </div>
          </div>

          {/* 3 Core Proof Points (5 Cols) */}
          <div className="evidence-panel lg:col-span-5 space-y-4">
            
            <div className="gold-glass-card rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-navy-light border border-brand-border/60 flex-shrink-0 flex items-center justify-center text-brand-gold">
                <Ruler className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-display font-bold text-white mb-1">1. Micron-Level Grease Thickness</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We measure grease before and after in microns using calibrated magnetic gauges according to AS 1851-2012 / NFPA 96 standards.
                </p>
              </div>
            </div>

            <div className="gold-glass-card rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-navy-light border border-brand-border/60 flex-shrink-0 flex items-center justify-center text-brand-gold">
                <Video className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-display font-bold text-white mb-1">2. Unedited 4K Video Log</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Access full continuous endoscopic video footage of internal plenums, risers, and bends that human inspectors can never see.
                </p>
              </div>
            </div>

            <div className="gold-glass-card rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-navy-light border border-brand-border/60 flex-shrink-0 flex items-center justify-center text-brand-gold">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-display font-bold text-white mb-1">3. Insurer-Accepted Compliance Pack</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Includes Certificate of Cleanliness, risk assessment, photographic audit log, and sign-off recognized by all Australian insurers.
                </p>
              </div>
            </div>

            {/* Compliance Pack CTA */}
            <div className="bg-gradient-to-r from-brand-navy-light to-brand-navy border border-brand-gold/40 rounded-xl p-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-brand-gold uppercase tracking-widest font-semibold block">Sample Compliance Pack</span>
                <p className="text-sm font-bold text-white">Grade X Sample Audit Dossier (PDF)</p>
              </div>
              <a href="#quote" className="px-4 py-2 bg-brand-navy border border-brand-gold/50 text-brand-gold-light hover:bg-brand-gold hover:text-brand-obsidian rounded font-mono text-xs font-semibold transition-all duration-200">
                View Sample
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
