'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Workflow, Camera, Gauge, Shield, Flame, RefreshCw, CheckCircle2, Check, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    num: "01",
    tag: "PRE-AUDIT",
    title: "Robotic Video Inspection",
    desc: "Crawler robot navigates the entire duct system, mapping geometry, bends, damper positions, and high-risk grease buildup zones.",
    icon: Camera,
    metric: "4K Video Telemetry"
  },
  {
    num: "02",
    tag: "METRICS",
    title: "Grease Depth Measurement",
    desc: "Calibrated ultrasonic & wet film gauges record baseline grease layer thickness in microns (μm) across key fire danger points.",
    icon: Gauge,
    metric: "AS 1851 Fuel Baseline"
  },
  {
    num: "03",
    tag: "ISOLATION",
    title: "Cleanroom Containment",
    desc: "Kitchen cooktops, appliances, and preparation zones are hermetically sealed with heavy-duty poly-sheeting and negative-pressure extractors.",
    icon: Shield,
    metric: "Food-Grade Hygiene"
  },
  {
    num: "04",
    tag: "THERMAL",
    title: "High-Pressure Thermal Jetting",
    desc: "High-temp eco-safe degreasers softened by 140°C pressurized dry steam break the chemical bonds of hardened carbon deposits.",
    icon: Flame,
    metric: "140°C Rotary Decon"
  },
  {
    num: "05",
    tag: "SCOURING",
    title: "Robotic Brush & Extraction",
    desc: "Bi-directional motorized steel and nylon head attachments scrape the internal duct walls to bare sheet metal with vacuum capture.",
    icon: RefreshCw,
    metric: "Bare-Metal Finish"
  },
  {
    num: "06",
    tag: "AUDIT",
    title: "Final Optical Verification",
    desc: "Secondary robotic run with high-lumen illumination to capture unbroken post-clean footage of every metre from hood to exhaust discharge.",
    icon: CheckCircle2,
    metric: "Zero Shadow Zones"
  },
  {
    num: "07",
    tag: "QUANTIFY",
    title: "Post-Clean Gauge Verification",
    desc: "Grease thickness is re-measured across identical coordinate points, mathematically proving reduction to below 50 microns (<50μm).",
    icon: Check,
    metric: "100% AS 1851 Compliance"
  },
  {
    num: "08",
    tag: "DELIVERY",
    title: "Digital Certificate & Portal",
    desc: "Issuance of your legal Certificate of Compliance, raw video evidence files, and quantitative report for insurance underwriters.",
    icon: FileText,
    metric: "Insurer-Ready PDF + MP4"
  }
];

export default function Methodology() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useGSAP(
    () => {
      // Dynamic Progress Line
      gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: 0.4,
        },
      });

      // Staggered Step Cards Reveal
      gsap.utils.toArray<HTMLElement>('.methodology-step-card').forEach((card, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
            onEnter: () => setActiveStep(i),
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="py-24 bg-brand-navy/60 border-y border-brand-border/30 relative" id="methodology">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono text-brand-gold uppercase tracking-widest font-semibold flex items-center gap-2 mb-3">
              <Workflow className="w-4 h-4" /> Engineered Protocol
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
              Our 8-Step <span className="text-gold-gradient">Methodology</span>
            </h2>
          </div>
          <p className="text-slate-300 max-w-md font-light text-sm">
            A systematic, certified workflow guaranteeing AS 1851-2012 compliance and full fire-risk insulation for facility stakeholders.
          </p>
        </div>

        {/* Scroll Progress Line Indicator */}
        <div className="w-full h-1.5 bg-brand-navy-light rounded-full mb-10 overflow-hidden relative shadow-inner">
          <div
            ref={progressBarRef}
            className="h-full w-full bg-gold-gradient origin-left scale-x-0 transition-transform shadow-[0_0_12px_#D4AF37]"
          />
        </div>

        {/* 8-Step Grid with Framer Motion hover elevation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isLast = idx === 7;
            const isActive = activeStep === idx;
            return (
              <motion.div
                key={step.num}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className={`methodology-step-card gold-glass-card rounded-xl p-6 relative border-l-2 flex flex-col justify-between cursor-pointer ${isLast ? 'border-l-brand-gold shadow-lg shadow-brand-gold/15' : isActive ? 'border-l-brand-gold' : 'border-l-brand-gold/40'}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-display font-black text-brand-gold font-mono">{step.num}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${isLast ? 'bg-brand-gold/20 text-brand-gold border-brand-gold/40 font-bold' : 'bg-brand-navy-light text-brand-gold-light border-brand-border/40'}`}>
                      {step.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white font-display mb-2">{step.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-brand-steel flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{step.metric}</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-brand-gold/60" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
