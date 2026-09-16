import type { Metadata } from 'next';
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SmoothScrollProvider } from '@/lib/smooth-scroll';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700', '800'],
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Grade X Commercial Solutions | WA's Premier Robotic Kitchen Exhaust Cleaning",
  description: "Grade X operates Western Australia's only robotic kitchen exhaust cleaning technology. Precision duct inspection, grease thickness measurement, and verified fire compliance reporting.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="bg-brand-obsidian text-slate-100 selection:bg-brand-gold/30 selection:text-brand-gold-light blueprint-grid relative">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
