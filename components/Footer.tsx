'use client';

import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#02050A] border-t border-brand-border/40 pt-16 pb-12 text-slate-400 font-sans text-xs relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Col 1: Brand & ABN (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-brand-navy border border-brand-gold/40 flex items-center justify-center p-1.5">
                <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
                  <path d="M8 8L32 32M32 8L8 32" stroke="#D4AF37" strokeWidth="4.5" strokeLinecap="round"/>
                  <circle cx="20" cy="20" r="4" fill="#FFFFFF" />
                </svg>
              </div>
              <span className="font-display font-extrabold text-lg text-white">GRADE <span className="text-brand-gold">X</span></span>
            </div>
            <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
              Grade X Commercial Solutions Pty Ltd is Western Australia's specialized commercial decontamination firm operating cutting-edge robotic exhaust cleaning and compliance certification.
            </p>
            <div className="font-mono text-[11px] text-slate-500 space-y-1">
              <p>Grade X Commercial Solutions Pty Ltd</p>
              <p>ABN: 45 684 073 345</p>
              <p>5 Elward Way, Balga WA 6061</p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h5 className="text-xs font-mono uppercase tracking-widest text-brand-gold font-bold mb-4">Navigation</h5>
            <ul className="space-y-2.5">
              <li><a href="#heroSection" className="hover:text-brand-gold transition-colors">Home</a></li>
              <li><a href="#technology" className="hover:text-brand-gold transition-colors">Robotic Technology</a></li>
              <li><a href="#methodology" className="hover:text-brand-gold transition-colors">8-Step Methodology</a></li>
              <li><a href="#evidence" className="hover:text-brand-gold transition-colors">Digital Evidence</a></li>
              <li><a href="#services" className="hover:text-brand-gold transition-colors">Commercial Services</a></li>
            </ul>
          </div>

          {/* Col 3: Compliance & Standards */}
          <div>
            <h5 className="text-xs font-mono uppercase tracking-widest text-brand-gold font-bold mb-4">Compliance</h5>
            <ul className="space-y-2.5">
              <li><a href="#compliance" className="hover:text-brand-gold transition-colors">AS 1851-2012 Compliance</a></li>
              <li><a href="#compliance" className="hover:text-brand-gold transition-colors">Safe Work Confined Space</a></li>
              <li><a href="#compliance" className="hover:text-brand-gold transition-colors">HACCP & Food Safety</a></li>
              <li><a href="#compliance" className="hover:text-brand-gold transition-colors">Certificate Verification</a></li>
              <li><a href="#compliance" className="hover:text-brand-gold transition-colors">Insurance Auditing</a></li>
            </ul>
          </div>

          {/* Col 4: Service Coverage */}
          <div>
            <h5 className="text-xs font-mono uppercase tracking-widest text-brand-gold font-bold mb-4">WA Service Area</h5>
            <ul className="space-y-2.5 text-slate-400">
              <li>Perth CBD & Northbridge</li>
              <li>Fremantle & South Metro</li>
              <li>Joondalup & Northern Corridor</li>
              <li>Midland & Eastern Hills</li>
              <li>Mandurah & Regional WA</li>
            </ul>
          </div>

        </div>

        {/* Bottom Micro Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono text-slate-500">
          <div>
            © 2026 Grade X Commercial Solutions Pty Ltd. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-gold transition-colors">WHS Statement</a>
            <button onClick={scrollToTop} className="hover:text-brand-gold transition-colors flex items-center gap-1">
              Back to Top <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
