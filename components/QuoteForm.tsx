'use client';

import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Send, MapPin, Phone, Mail, ShieldAlert, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuoteForm() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useGSAP(
    () => {
      gsap.from('.quote-section-content', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });
    },
    { scope: containerRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section ref={containerRef} className="py-24 relative overflow-hidden bg-brand-navy" id="quote">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10 quote-section-content">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Direct Credentials (5 Cols) */}
          <div className="lg:col-span-5 text-left">
            <span className="text-xs font-mono text-brand-gold uppercase tracking-widest font-semibold flex items-center gap-2 mb-3">
              <Send className="w-4 h-4" /> Rapid Facility Onboarding
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-tight">
              Schedule Your <br /><span className="text-gold-gradient">Robotic Audit</span>
            </h2>
            <p className="mt-4 text-slate-300 font-light text-sm sm:text-base leading-relaxed">
              Protect your commercial premises with Western Australia's only robotic exhaust cleaning fleet. Contact our engineering team for a customized site quote.
            </p>

            <div className="mt-8 space-y-4 font-mono text-xs text-slate-300">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-brand-obsidian/60 border border-brand-border/30">
                <MapPin className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <span>5 Elward Way, Balga WA 6061</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-brand-obsidian/60 border border-brand-border/30">
                <Phone className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <a href="tel:0430360162" className="hover:text-brand-gold transition-colors">0430 360 162 (Direct WA Line)</a>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-brand-obsidian/60 border border-brand-border/30">
                <Mail className="w-5 h-5 text-brand-gold flex-shrink-0" />
                <a href="mailto:gradex.perth@gmail.com" className="hover:text-brand-gold transition-colors">gradex.perth@gmail.com</a>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl border border-brand-gold/30 bg-brand-gold/5 flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 text-brand-gold flex-shrink-0" />
              <p className="text-xs font-sans text-slate-300">
                <strong className="text-brand-gold-light">Insurance Guarantee:</strong> All audits guaranteed compliant with AS 1851-2012 Table 13.4.4.
              </p>
            </div>
          </div>

          {/* Interactive Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="gold-glass-card rounded-2xl p-6 sm:p-10 border border-brand-gold/30">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white">Quote Request Received</h3>
                  <p className="text-sm font-mono text-slate-300 max-w-md mx-auto">
                    Grade X technical dispatch has logged your facility details. An engineer will contact you within 2 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                        Full Name <span className="text-brand-gold">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        required
                        placeholder="e.g. Marcus Vance"
                        className="w-full bg-brand-obsidian/90 border border-brand-border/60 focus:border-brand-gold text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="companyName" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                        Company / Venue Name <span className="text-brand-gold">*</span>
                      </label>
                      <input
                        type="text"
                        id="companyName"
                        required
                        placeholder="e.g. Crown Perth / Franchise Hub"
                        className="w-full bg-brand-obsidian/90 border border-brand-border/60 focus:border-brand-gold text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                        Phone Number <span className="text-brand-gold">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        placeholder="04XX XXX XXX"
                        className="w-full bg-brand-obsidian/90 border border-brand-border/60 focus:border-brand-gold text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                        Corporate Email <span className="text-brand-gold">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        placeholder="manager@venue.com.au"
                        className="w-full bg-brand-obsidian/90 border border-brand-border/60 focus:border-brand-gold text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="serviceType" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Primary Service Requirement <span className="text-brand-gold">*</span>
                    </label>
                    <select
                      id="serviceType"
                      required
                      className="w-full bg-brand-obsidian/90 border border-brand-border/60 focus:border-brand-gold text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors"
                    >
                      <option value="Robotic Kitchen Exhaust & Duct Cleaning">Robotic Kitchen Exhaust & Duct Cleaning (Flagship)</option>
                      <option value="Complete Commercial Kitchen Sanitization">Complete Commercial Kitchen Strip-Down & Sanitization</option>
                      <option value="Compliance Pre-Audit & Grease Thickness Gauge">Compliance Pre-Audit & Grease Thickness Gauge</option>
                      <option value="Lobby, Floor Scrubbing & Front-of-House">Lobby, Floor Scrubbing & Front-of-House</option>
                      <option value="Exterior Hot-Wash & Facility Maintenance">Exterior Hot-Wash & Facility Maintenance</option>
                      <option value="Urgent 24/7 Emergency Response">Urgent 24/7 Emergency Response</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="siteNotes" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Site Details (Location, Duct Height, Canopy Count)
                    </label>
                    <textarea
                      id="siteNotes"
                      rows={3}
                      placeholder="e.g. 2 x 6-metre canopies, roof exhaust fan access, Perth CBD location..."
                      className="w-full bg-brand-obsidian/90 border border-brand-border/60 focus:border-brand-gold text-white text-sm rounded-lg px-4 py-3 outline-none transition-colors"
                    ></textarea>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-md text-sm font-mono uppercase tracking-wider font-bold bg-gold-gradient text-brand-obsidian shadow-xl shadow-brand-gold/30 hover:shadow-brand-gold/50 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Processing Protocol...' : 'Submit For Priority Engineering Quote'}</span>
                  </motion.button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
