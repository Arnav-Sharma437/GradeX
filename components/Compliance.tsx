'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ShieldCheck, BadgeDollarSign, HardHat, Award, HeartPulse, Flame, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Compliance() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from('.compliance-badge', {
        scale: 0.85,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });

      gsap.from('.emergency-banner', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.emergency-banner',
          start: 'top 85%',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      {/* Compliance Strip */}
      <section className="py-20 bg-brand-obsidian relative" id="compliance">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono text-brand-gold uppercase tracking-widest font-semibold flex items-center justify-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4" /> Corporate Risk Mitigation
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
              Accredited, Insured & <span className="text-brand-gold">Fully Compliant</span>
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              We protect facility managers, landlords, and franchise executives from regulatory fines and insurance repudiation.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            
            <motion.div whileHover={{ y: -3 }} className="compliance-badge gold-glass-card rounded-xl p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-brand-navy-light border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-3">
                <BadgeDollarSign className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white font-display mb-1">$20M Public Liability</h4>
              <p className="text-[11px] font-mono text-slate-400">Comprehensive coverage across all commercial sites.</p>
            </motion.div>

            <motion.div whileHover={{ y: -3 }} className="compliance-badge gold-glass-card rounded-xl p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-brand-navy-light border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-3">
                <HardHat className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white font-display mb-1">Strict WHS Protocols</h4>
              <p className="text-[11px] font-mono text-slate-400">SWMS, JSA documentation and zero-confined space risk.</p>
            </motion.div>

            <motion.div whileHover={{ y: -3 }} className="compliance-badge gold-glass-card rounded-xl p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-brand-navy-light border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-3">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white font-display mb-1">AS 1851-2012 Standard</h4>
              <p className="text-[11px] font-mono text-slate-400">Australian Standard routine service of fire protection systems.</p>
            </motion.div>

            <motion.div whileHover={{ y: -3 }} className="compliance-badge gold-glass-card rounded-xl p-6 text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-brand-navy-light border border-brand-gold/30 flex items-center justify-center text-brand-gold mb-3">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-white font-display mb-1">Food-Safe Certified</h4>
              <p className="text-[11px] font-mono text-slate-400">HACCP-aligned non-toxic biodegradables and containment.</p>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 24/7 Rapid Emergency Response Callout */}
      <section className="emergency-banner py-12 bg-gradient-to-r from-red-950/40 via-brand-navy-surface to-brand-obsidian border-y border-red-500/20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5 text-left">
            <div className="w-14 h-14 rounded-xl bg-red-900/30 border border-red-500/40 flex items-center justify-center text-red-400 flex-shrink-0 animate-pulse">
              <Flame className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/20 text-red-300 border border-red-500/30 font-bold uppercase">
                  Emergency Rapid Dispatch
                </span>
                <span className="text-xs font-mono text-slate-400">Perth Metro & Surrounds</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
                Council Notice, Fire Marshall Audit or Kitchen Flare-Up?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Emergency overnight and same-day robotic deployment to restore compliance without business shutdown.
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href="tel:0430360162"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-md bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-sm tracking-wider shadow-lg shadow-red-900/40 transition-all duration-200"
            >
              <PhoneCall className="w-4 h-4" />
              <span>CALL 0430 360 162 NOW</span>
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}
