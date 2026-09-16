'use client';

import { useState, useEffect } from 'react';
import { PhoneCall, Mail, Menu, X, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#03070E]/95 backdrop-blur-md shadow-2xl border-b border-brand-border/40' : 'bg-[#03070E]/80 backdrop-blur-sm border-b border-white/5'}`}>
      {/* Micro Status Bar */}
      <div className="border-b border-white/5 py-1.5 px-4 sm:px-8 text-xs font-mono text-brand-steel flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center space-x-4">
          <span className="inline-flex items-center text-brand-gold-light gap-1.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-brand-gold status-pulse"></span>
            WA DISPATCH ACTIVE: PERTH METRO & REGIONAL
          </span>
          <span className="hidden md:inline text-white/30">|</span>
          <span className="hidden md:inline text-[11px]">ABN: 45 684 073 345</span>
        </div>
        <div className="flex items-center space-x-6 text-brand-silver">
          <a href="tel:0430360162" className="hover:text-brand-gold flex items-center gap-1.5 transition-colors">
            <PhoneCall className="w-3.5 h-3.5 text-brand-gold" />
            <span>0430 360 162</span>
          </a>
          <a href="mailto:gradex.perth@gmail.com" className="hidden sm:flex items-center gap-1.5 hover:text-brand-gold transition-colors">
            <Mail className="w-3.5 h-3.5 text-brand-gold" />
            <span>gradex.perth@gmail.com</span>
          </a>
          <span className="bg-brand-gold/10 border border-brand-gold/30 text-brand-gold-light px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase">
            AS 1851-2012 Certified
          </span>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-navy-light to-brand-obsidian border border-brand-gold/40 flex items-center justify-center p-2 relative shadow-lg shadow-black/40 group-hover:border-brand-gold transition-all duration-300">
            <svg viewBox="0 0 40 40" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 8L32 32M32 8L8 32" stroke="#D4AF37" strokeWidth="4.5" strokeLinecap="round"/>
              <circle cx="20" cy="20" r="4" fill="#FFFFFF" />
              <circle cx="20" cy="20" r="8" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="2 2"/>
            </svg>
          </div>
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-extrabold text-xl tracking-wider text-white">GRADE</span>
              <span className="font-display font-extrabold text-xl tracking-wider text-brand-gold">X</span>
            </div>
            <p className="text-[9px] font-mono uppercase tracking-[0.22em] text-brand-steel -mt-1">Commercial Solutions</p>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <a href="#technology" className="hover:text-brand-gold transition-colors duration-200 flex items-center gap-1">
            <span className="text-brand-gold text-xs font-mono">01.</span> Technology
          </a>
          <a href="#methodology" className="hover:text-brand-gold transition-colors duration-200 flex items-center gap-1">
            <span className="text-brand-gold text-xs font-mono">02.</span> 8-Step Methodology
          </a>
          <a href="#evidence" className="hover:text-brand-gold transition-colors duration-200 flex items-center gap-1">
            <span className="text-brand-gold text-xs font-mono">03.</span> Digital Evidence
          </a>
          <a href="#services" className="hover:text-brand-gold transition-colors duration-200 flex items-center gap-1">
            <span className="text-brand-gold text-xs font-mono">04.</span> Services
          </a>
          <a href="#compliance" className="hover:text-brand-gold transition-colors duration-200 flex items-center gap-1">
            <span className="text-brand-gold text-xs font-mono">05.</span> Compliance & WHS
          </a>
        </div>

        {/* CTA */}
        <div className="flex items-center space-x-4">
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#quote"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-md text-xs font-mono uppercase tracking-widest font-bold bg-gold-gradient text-brand-obsidian shadow-lg shadow-brand-gold/20 hover:shadow-brand-gold/40 transition-all duration-300"
          >
            Request a Quote
          </motion.a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 rounded-lg border border-brand-border text-brand-gold hover:bg-brand-navy-light"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-brand-border/40 bg-brand-navy/95 backdrop-blur-xl px-6 py-6 space-y-4 font-mono text-sm">
          <a onClick={() => setMobileMenuOpen(false)} href="#technology" className="block py-2 text-slate-200 hover:text-brand-gold flex items-center gap-2">
            <span className="text-brand-gold">01.</span> Robotic Technology
          </a>
          <a onClick={() => setMobileMenuOpen(false)} href="#methodology" className="block py-2 text-slate-200 hover:text-brand-gold flex items-center gap-2">
            <span className="text-brand-gold">02.</span> 8-Step Process
          </a>
          <a onClick={() => setMobileMenuOpen(false)} href="#evidence" className="block py-2 text-slate-200 hover:text-brand-gold flex items-center gap-2">
            <span className="text-brand-gold">03.</span> Evidence & Reporting
          </a>
          <a onClick={() => setMobileMenuOpen(false)} href="#services" className="block py-2 text-slate-200 hover:text-brand-gold flex items-center gap-2">
            <span className="text-brand-gold">04.</span> Commercial Services
          </a>
          <a onClick={() => setMobileMenuOpen(false)} href="#compliance" className="block py-2 text-slate-200 hover:text-brand-gold flex items-center gap-2">
            <span className="text-brand-gold">05.</span> Compliance & Insurance
          </a>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <a onClick={() => setMobileMenuOpen(false)} href="#quote" className="w-full text-center py-3 rounded bg-gold-gradient text-brand-obsidian font-bold uppercase tracking-wider text-xs">
              Request Immediate Quote
            </a>
            <a href="tel:0430360162" className="w-full text-center py-2.5 rounded border border-brand-gold/40 text-brand-gold font-mono text-xs flex items-center justify-center gap-2">
              <PhoneCall className="w-4 h-4" /> Call Emergency 24/7
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
