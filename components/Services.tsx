'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Layers, Bot, ChefHat, Building, Sparkles, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Parallax and staggered reveal for service cards
      gsap.utils.toArray<HTMLElement>('.service-card').forEach((card, index) => {
        gsap.from(card, {
          y: 60 + (index % 2) * 20,
          opacity: 0,
          duration: 0.8,
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
    <section ref={containerRef} className="py-24 bg-[#070E1A] border-y border-brand-border/30 relative" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono text-brand-gold uppercase tracking-widest font-semibold flex items-center gap-2 mb-3">
              <Layers className="w-4 h-4" /> Complete Commercial Solutions
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
              Specialised Commercial <span className="text-gold-gradient">Capabilities</span>
            </h2>
          </div>
          <p className="text-slate-300 max-w-md font-light text-sm">
            While robotic kitchen exhaust cleaning is our flagship core capability, Grade X provides end-to-end commercial property decontamination across Western Australia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Category 1: Flagship */}
          <motion.div
            whileHover={{ y: -6 }}
            className="service-card gold-glass-card rounded-2xl p-7 flex flex-col justify-between relative group border-t-4 border-t-brand-gold"
          >
            <div className="absolute top-3 right-3">
              <span className="bg-brand-gold text-brand-obsidian text-[9px] font-mono font-extrabold uppercase px-2 py-0.5 rounded shadow">FLAGSHIP TECH</span>
            </div>
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-navy-light border border-brand-gold/40 flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">Kitchen Exhaust & Duct Hygiene</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Robotic duct decontamination, exhaust hood degreasing, fan housing extraction, electrostatic precipitator (ESP) cleaning & AS 1851 certification.
              </p>
            </div>
            <div className="space-y-2 border-t border-white/10 pt-4 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-gold" /> Full-length robotic crawling</div>
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-gold" /> Filter exchange program</div>
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-gold" /> Fire damper inspection</div>
            </div>
          </motion.div>

          {/* Category 2: Kitchen Deep Cleaning */}
          <motion.div
            whileHover={{ y: -6 }}
            className="service-card gold-glass-card rounded-2xl p-7 flex flex-col justify-between relative group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-navy-light border border-brand-border/60 flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform">
                <ChefHat className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">Commercial Kitchen Deep Cleaning</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Full culinary line sanitization. High-temperature steam strip-down of fryers, combi-ovens, ranges, cool rooms, grease traps, and food-prep surfaces.
              </p>
            </div>
            <div className="space-y-2 border-t border-white/10 pt-4 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-gold" /> Non-toxic food-safe chemicals</div>
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-gold" /> Coolroom mould remediation</div>
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-gold" /> Health dept. audit readiness</div>
            </div>
          </motion.div>

          {/* Category 3: Lobby & Front of House */}
          <motion.div
            whileHover={{ y: -6 }}
            className="service-card gold-glass-card rounded-2xl p-7 flex flex-col justify-between relative group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-navy-light border border-brand-border/60 flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">Lobby & Front-of-House</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                High-traffic commercial floor scrubbing, terrazzo and marble polishing, architectural glass sanitization, and premium facility presentation.
              </p>
            </div>
            <div className="space-y-2 border-t border-white/10 pt-4 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-gold" /> Heavy machine rotary scrub</div>
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-gold" /> High-level atrium dusting</div>
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-gold" /> Slip-coefficient compliance</div>
            </div>
          </motion.div>

          {/* Category 4: Exterior */}
          <motion.div
            whileHover={{ y: -6 }}
            className="service-card gold-glass-card rounded-2xl p-7 flex flex-col justify-between relative group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-brand-navy-light border border-brand-border/60 flex items-center justify-center text-brand-gold mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3">Exterior & Building Maintenance</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                Industrial hot-water pressure washing, bin coral degreasing, loading dock washdowns, carpark oil extraction, and facade maintenance.
              </p>
            </div>
            <div className="space-y-2 border-t border-white/10 pt-4 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-gold" /> 4,000 PSI hot wash units</div>
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-gold" /> Wastewater recapture protocols</div>
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-brand-gold" /> Commercial window cleaning</div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
