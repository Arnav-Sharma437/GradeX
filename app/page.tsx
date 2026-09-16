import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Differentiator from '@/components/Differentiator';
import WhyRobotic from '@/components/WhyRobotic';
import Methodology from '@/components/Methodology';
import DigitalEvidence from '@/components/DigitalEvidence';
import Services from '@/components/Services';
import Compliance from '@/components/Compliance';
import QuoteForm from '@/components/QuoteForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-obsidian relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <Differentiator />
      <WhyRobotic />
      <Methodology />
      <DigitalEvidence />
      <Services />
      <Compliance />
      <QuoteForm />
      <Footer />
    </main>
  );
}
