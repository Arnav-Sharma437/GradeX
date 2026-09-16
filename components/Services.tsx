'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Layers, Bot, ChefHat, Building, Sparkles, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Parallax scroll effects - each card moves at a different offset
      gsap.utils.toArray<HTMLElement>('.service-card').forEach((card, index) => {
        gsap.from(card, {
          y: 70 + (index % 2) * 35,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-28 bg-[#070E1A] border-y border-brand-border/30 relative overflow-hidden" id="services">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div>
            <span className="text-xs font-mono text-brand-gold uppercase tracking-widest font-semibold flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4" /> Complete Commercial Solutions
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
              Specialised Commercial <span className="text-gold-gradient">Capabilities</span>
            </h2>
          </div>
          <p className="text-slate-300 max-w-md font-normal text-sm sm:text-base leading-relaxed">
            While robotic kitchen exhaust cleaning is our flagship core capability, Grade X provides end-to-end commercial property decontamination across Western Australia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          
          {/* Category 1: Flagship */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="service-card gold-glass-card rounded-2xl p-8 flex flex-col justify-between relative group border-t-4 border-t-brand-gold cursor-pointer"
          >
            <div className="absolute top-3 right-3">
              <span className="bg-brand-gold text-brand-obsidian text-[9px] font-mono font-extrabold uppercase px-2.5 py-1 rounded shadow-lg">FLAGSHIP TECH</span>
            </div>
            <div>
              <div className="w-14 h-14 rounded-xl bg-brand-navy-light border border-brand-gold/40 flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 group-hover:bg-brand-gold group-hover:text-brand-obsidian transition-all duration-300">
                <Bot className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-3">Kitchen Exhaust & Duct Hygiene</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Robotic duct decontamination, exhaust hood degreasing, fan housing extraction, electrostatic precipitator (ESP) cleaning & AS 1851 certification.
              </p>
            </div>
            <div className="space-y-2.5 border-t border-white/10 pt-5 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-gold" /> Full-length robotic crawling</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-gold" /> Filter exchange program</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-gold" /> Fire damper inspection</div>
            </div>
          </motion.div>

          {/* Category 2: Kitchen Deep Cleaning */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="service-card gold-glass-card rounded-2xl p-8 flex flex-col justify-between relative group cursor-pointer"
          >
            <div>
              <div className="w-14 h-14 rounded-xl bg-brand-navy-light border border-brand-border/60 flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 group-hover:bg-brand-gold group-hover:text-brand-obsidian transition-all duration-300">
                <ChefHat className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-3">Commercial Kitchen Deep Clean</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Full culinary line sanitization. High-temperature steam strip-down of fryers, combi-ovens, ranges, cool rooms, grease traps, and food-prep surfaces.
              </p>
            </div>
            <div className="space-y-2.5 border-t border-white/10 pt-5 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-gold" /> Non-toxic food-safe chemicals</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-gold" /> Coolroom mould remediation</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-gold" /> Health dept. audit readiness</div>
            </div>
          </motion.div>

          {/* Category 3: Lobby & Front of House */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="service-card gold-glass-card rounded-2xl p-8 flex flex-col justify-between relative group cursor-pointer"
          >
            <div>
              <div className="w-14 h-14 rounded-xl bg-brand-navy-light border border-brand-border/60 flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 group-hover:bg-brand-gold group-hover:text-brand-obsidian transition-all duration-300">
                <Building className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-3">Lobby & Front-of-House</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                High-traffic commercial floor scrubbing, terrazzo and marble polishing, architectural glass sanitization, and premium facility presentation.
              </p>
            </div>
            <div className="space-y-2.5 border-t border-white/10 pt-5 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-gold" /> Heavy machine rotary scrub</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-gold" /> High-level atrium dusting</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-gold" /> Slip-coefficient compliance</div>
            </div>
          </motion.div>

          {/* Category 4: Exterior */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="service-card gold-glass-card rounded-2xl p-8 flex flex-col justify-between relative group cursor-pointer"
          >
            <div>
              <div className="w-14 h-14 rounded-xl bg-brand-navy-light border border-brand-border/60 flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 group-hover:bg-brand-gold group-hover:text-brand-obsidian transition-all duration-300">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-3">Exterior & Building Care</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                Industrial hot-water pressure washing, bin coral degreasing, loading dock washdowns, carpark oil extraction, and facade maintenance.
              </p>
            </div>
            <div className="space-y-2.5 border-t border-white/10 pt-5 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-gold" /> 4,000 PSI hot wash units</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-gold" /> Wastewater recapture protocols</div>
              <div className="flex items-center gap-2"><Check className="w-4 h-4 text-brand-gold" /> Commercial window cleaning</div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
