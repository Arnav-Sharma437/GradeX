'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Sparkles, ShieldCheck, Gauge, Video, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhyRobotic() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.why-card', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.18,
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
    <section ref={containerRef} className="py-24 relative overflow-hidden" id="technology">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-brand-gold uppercase tracking-widest font-semibold flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-4 h-4" /> Engineering Superiority
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
            Why Robotic Cleaning <span className="text-gold-gradient">Outperforms Manual</span>
          </h2>
          <p className="mt-4 text-slate-300 font-light text-base sm:text-lg">
            Facility managers are legally liable for fire hazards under Australian Standards. Here is how automation removes human error and liability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Safety */}
          <motion.div
            whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="why-card gold-glass-card rounded-2xl p-8 flex flex-col justify-between relative group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-bl-full pointer-events-none"></div>
            <div>
              <div className="w-14 h-14 rounded-xl bg-brand-navy-light border border-brand-border/60 flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono text-brand-gold font-semibold uppercase tracking-wider">01 // Zero Harm WHS</span>
              <h3 className="text-2xl font-display font-bold text-white mt-1 mb-4">Confined Space Safety</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Manual cleaning forces workers into hazardous, narrow, non-load-bearing ceiling ducts. Grade X deploys remote crawlers — eliminating high-risk confined space permits and catastrophic fall hazards completely.
              </p>
            </div>
            <ul className="space-y-2.5 text-xs font-mono text-slate-400 border-t border-white/10 pt-4">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-gold" /> No human entry into vertical risers</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-gold" /> Zero structural duct ceiling damage</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-gold" /> Fully compliant with Safe Work Australia</li>
            </ul>
          </motion.div>

          {/* Card 2: Consistency */}
          <motion.div
            whileHover={{ y: -6, rotateX: 2, rotateY: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="why-card gold-glass-card rounded-2xl p-8 flex flex-col justify-between relative group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-bl-full pointer-events-none"></div>
            <div>
              <div className="w-14 h-14 rounded-xl bg-brand-navy-light border border-brand-border/60 flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                <Gauge className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono text-brand-gold font-semibold uppercase tracking-wider">02 // 360° Mechanical Precision</span>
              <h3 className="text-2xl font-display font-bold text-white mt-1 mb-4">Continuous Full-Run Extraction</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Manual scraping misses blind bends, damper valves, and mid-duct junctions. Our robotic units maintain constant 3,000 PSI thermal rotary scouring across 100% of the internal duct surface.
              </p>
            </div>
            <ul className="space-y-2.5 text-xs font-mono text-slate-400 border-t border-white/10 pt-4">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-gold" /> 140°C saturated dry steam jetting</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-gold" /> Carbonized grease liquidation</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-gold" /> Penetrates 45m from single access point</li>
            </ul>
          </motion.div>

          {/* Card 3: Evidence */}
          <motion.div
            whileHover={{ y: -6, rotateX: 2, rotateY: 2 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="why-card gold-glass-card rounded-2xl p-8 flex flex-col justify-between relative group"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 rounded-bl-full pointer-events-none"></div>
            <div>
              <div className="w-14 h-14 rounded-xl bg-brand-navy-light border border-brand-border/60 flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform duration-300">
                <Video className="w-7 h-7" />
              </div>
              <span className="text-xs font-mono text-brand-gold font-semibold uppercase tracking-wider">03 // Empirical Verification</span>
              <h3 className="text-2xl font-display font-bold text-white mt-1 mb-4">Live 4K Inspection & Microns</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Traditional contractors give you vague photos taken at access doors. Grade X provides time-stamped full-run HD video and calibrated magnetic DFT grease-depth metrics before and after the clean.
              </p>
            </div>
            <ul className="space-y-2.5 text-xs font-mono text-slate-400 border-t border-white/10 pt-4">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-gold" /> Objective grease depth measurement (μm)</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-gold" /> Uncut endoscopic video audit trail</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-gold" /> Insurer & Department of Health approved</li>
            </ul>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
