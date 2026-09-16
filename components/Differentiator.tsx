'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Clock, FileCheck2, ShieldAlert, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Differentiator() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Split text word stagger animation
      const statementWords = containerRef.current?.querySelectorAll('.diff-word');
      if (statementWords && statementWords.length > 0) {
        gsap.from(statementWords, {
          opacity: 0,
          y: 20,
          stagger: 0.03,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          },
        });
      }

      // Animated Stat Counters
      const counters = containerRef.current?.querySelectorAll('.counter-val');
      counters?.forEach((counter) => {
        const target = parseFloat(counter.getAttribute('data-target') || '0');
        const isDecimal = target % 1 !== 0;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: counter,
            start: 'top 85%',
          },
          onUpdate: () => {
            counter.textContent = isDecimal ? obj.val.toFixed(1) : Math.floor(obj.val).toString();
          },
        });
      });
    },
    { scope: containerRef }
  );

  const statement = "Manual cleaning cannot reach where grease accumulates. Our robots do.";

  return (
    <section ref={containerRef} className="py-20 border-y border-brand-border/30 bg-gradient-to-b from-[#081220] via-brand-navy to-[#050B14] relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-5 text-left">
            <span className="text-xs font-mono text-brand-gold uppercase tracking-widest font-semibold flex items-center gap-2 mb-2">
              <Cpu className="w-4 h-4" /> The Grade X Differentiator
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight">
              {statement.split(' ').map((word, i) => (
                <span key={i} className={`diff-word inline-block mr-1.5 ${word === 'robots' || word === 'do.' ? 'text-brand-gold' : ''}`}>
                  {word}
                </span>
              ))}
            </h2>
          </div>
          <div className="lg:col-span-7 text-slate-300 text-base sm:text-lg font-light leading-relaxed border-l-0 lg:border-l border-brand-border/40 lg:pl-8">
            Traditional commercial cleaning relies on manual arm-reach from access panels — leaving up to 70% of internal horizontal ducting untouched. Grade X operates crawler robots equipped with high-pressure rotary thermal nozzles and 360° pan-tilt cameras, delivering 100% full-run extraction and unquestionable compliance certificates.
          </div>
        </div>

        {/* 4 Animated Counter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Stat 1 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="gold-glass-card rounded-xl p-6 relative overflow-hidden group"
          >
            <div className="text-brand-gold/10 group-hover:text-brand-gold/20 absolute -right-2 -bottom-2 transition-all duration-300">
              <Clock className="w-24 h-24" />
            </div>
            <span className="text-xs font-mono text-brand-steel uppercase tracking-wider block mb-2">Service Downtime</span>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl sm:text-5xl font-extrabold font-display text-white counter-val" data-target="50">0</span>
              <span className="text-3xl font-display text-brand-gold font-bold">%</span>
            </div>
            <p className="text-xs text-slate-400 font-sans">Faster completion than manual labor with zero kitchen disruption.</p>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="gold-glass-card rounded-xl p-6 relative overflow-hidden group"
          >
            <div className="text-brand-gold/10 group-hover:text-brand-gold/20 absolute -right-2 -bottom-2 transition-all duration-300">
              <FileCheck2 className="w-24 h-24" />
            </div>
            <span className="text-xs font-mono text-brand-steel uppercase tracking-wider block mb-2">Compliance Turnaround</span>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl sm:text-5xl font-extrabold font-display text-white counter-val" data-target="24">0</span>
              <span className="text-xl font-display text-brand-gold font-bold">HRS</span>
            </div>
            <p className="text-xs text-slate-400 font-sans">Comprehensive digital audit package delivered to your portal within 24h.</p>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="gold-glass-card rounded-xl p-6 relative overflow-hidden group"
          >
            <div className="text-brand-gold/10 group-hover:text-brand-gold/20 absolute -right-2 -bottom-2 transition-all duration-300">
              <ShieldAlert className="w-24 h-24" />
            </div>
            <span className="text-xs font-mono text-brand-steel uppercase tracking-wider block mb-2">Fire Risk Reduction</span>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl sm:text-5xl font-extrabold font-display text-white counter-val" data-target="99.8">0</span>
              <span className="text-3xl font-display text-brand-gold font-bold">%</span>
            </div>
            <p className="text-xs text-slate-400 font-sans">Verified fuel load extraction across plenums, risers and fan housings.</p>
          </motion.div>

          {/* Stat 4 */}
          <motion.div
            whileHover={{ y: -4 }}
            className="gold-glass-card rounded-xl p-6 relative overflow-hidden group"
          >
            <div className="text-brand-gold/10 group-hover:text-brand-gold/20 absolute -right-2 -bottom-2 transition-all duration-300">
              <Award className="w-24 h-24" />
            </div>
            <span className="text-xs font-mono text-brand-steel uppercase tracking-wider block mb-2">WA Venues Serviced</span>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl sm:text-5xl font-extrabold font-display text-white counter-val" data-target="350">0</span>
              <span className="text-3xl font-display text-brand-gold font-bold">+</span>
            </div>
            <p className="text-xs text-slate-400 font-sans">Trusted by premier hospitality groups, QSR chains & mining hubs.</p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
