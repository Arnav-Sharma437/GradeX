'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Cpu, Clock, FileCheck2, ShieldAlert, Award, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Differentiator() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Split text word stagger animation
      const words = containerRef.current?.querySelectorAll('.diff-word');
      if (words && words.length > 0) {
        gsap.from(words, {
          opacity: 0,
          y: 30,
          rotateX: -45,
          stagger: 0.04,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        });
      }

      // Parallax card floating effect on scroll
      gsap.utils.toArray<HTMLElement>('.diff-card').forEach((card, i) => {
        gsap.from(card, {
          y: 60 + i * 20,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          },
        });
      });

      // Animated Stat Counters
      const counters = containerRef.current?.querySelectorAll('.counter-val');
      counters?.forEach((counter) => {
        const target = parseFloat(counter.getAttribute('data-target') || '0');
        const isDecimal = target % 1 !== 0;

        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2.5,
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
    <section ref={containerRef} className="py-28 border-y border-brand-border/30 bg-gradient-to-b from-[#081220] via-brand-navy to-[#050B14] relative z-20 overflow-hidden">
      
      {/* Background Parallax Orb */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-brand-gold/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 text-left">
            <span className="text-xs font-mono text-brand-gold uppercase tracking-widest font-semibold flex items-center gap-2 mb-3">
              <Cpu className="w-4 h-4" /> The Grade X Differentiator
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight">
              {statement.split(' ').map((word, i) => (
                <span key={i} className={`diff-word inline-block mr-2 ${word === 'robots' || word === 'do.' ? 'text-brand-gold font-black' : ''}`}>
                  {word}
                </span>
              ))}
            </h2>
          </div>
          <div className="lg:col-span-6 text-slate-300 text-base sm:text-lg font-normal leading-relaxed border-l-0 lg:border-l-2 border-brand-gold/30 lg:pl-8">
            Traditional commercial cleaning relies on manual arm-reach from access panels — leaving up to 70% of internal horizontal ducting untouched. Grade X operates crawler robots equipped with high-pressure rotary thermal nozzles and 360° pan-tilt cameras, delivering 100% full-run extraction and unquestionable compliance certificates.
          </div>
        </div>

        {/* 4 Animated Counter Cards with 3D Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Stat 1 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.03, rotateX: 3, rotateY: -3 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="diff-card gold-glass-card rounded-2xl p-7 relative overflow-hidden group cursor-pointer"
          >
            <div className="text-brand-gold/10 group-hover:text-brand-gold/25 absolute -right-2 -bottom-2 transition-all duration-300">
              <Clock className="w-28 h-28" />
            </div>
            <span className="text-xs font-mono text-brand-steel uppercase tracking-wider block mb-3 font-semibold">Service Downtime</span>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-5xl font-extrabold font-display text-white counter-val" data-target="50">0</span>
              <span className="text-3xl font-display text-brand-gold font-bold">%</span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">Faster completion than manual labor with zero kitchen downtime.</p>
          </motion.div>

          {/* Stat 2 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.03, rotateX: 3, rotateY: -1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="diff-card gold-glass-card rounded-2xl p-7 relative overflow-hidden group cursor-pointer"
          >
            <div className="text-brand-gold/10 group-hover:text-brand-gold/25 absolute -right-2 -bottom-2 transition-all duration-300">
              <FileCheck2 className="w-28 h-28" />
            </div>
            <span className="text-xs font-mono text-brand-steel uppercase tracking-wider block mb-3 font-semibold">Compliance Turnaround</span>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-5xl font-extrabold font-display text-white counter-val" data-target="24">0</span>
              <span className="text-2xl font-display text-brand-gold font-bold">HRS</span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">Comprehensive digital audit package delivered to your portal within 24h.</p>
          </motion.div>

          {/* Stat 3 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.03, rotateX: 3, rotateY: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="diff-card gold-glass-card rounded-2xl p-7 relative overflow-hidden group cursor-pointer"
          >
            <div className="text-brand-gold/10 group-hover:text-brand-gold/25 absolute -right-2 -bottom-2 transition-all duration-300">
              <ShieldAlert className="w-28 h-28" />
            </div>
            <span className="text-xs font-mono text-brand-steel uppercase tracking-wider block mb-3 font-semibold">Fire Risk Reduction</span>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-5xl font-extrabold font-display text-white counter-val" data-target="99.8">0</span>
              <span className="text-3xl font-display text-brand-gold font-bold">%</span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">Verified fuel load extraction across plenums, risers and fan housings.</p>
          </motion.div>

          {/* Stat 4 */}
          <motion.div
            whileHover={{ y: -8, scale: 1.03, rotateX: 3, rotateY: 3 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className="diff-card gold-glass-card rounded-2xl p-7 relative overflow-hidden group cursor-pointer"
          >
            <div className="text-brand-gold/10 group-hover:text-brand-gold/25 absolute -right-2 -bottom-2 transition-all duration-300">
              <Award className="w-28 h-28" />
            </div>
            <span className="text-xs font-mono text-brand-steel uppercase tracking-wider block mb-3 font-semibold">WA Venues Serviced</span>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-5xl font-extrabold font-display text-white counter-val" data-target="350">0</span>
              <span className="text-3xl font-display text-brand-gold font-bold">+</span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">Trusted by premier hospitality groups, QSR chains & mining hubs.</p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
