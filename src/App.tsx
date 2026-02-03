import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Toaster } from '@/components/ui/sonner';

import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import SkillsSection from './sections/SkillsSection';
import CredentialsSection from './sections/CredentialsSection';
import SQLiChallengeSection from './sections/SQLiChallengeSection';
import ContactSection from './sections/ContactSection';
import FooterSection from './sections/FooterSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLElement>(null);

  // Cleanup all ScrollTriggers on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <>
      {/* Noise Overlay */}
      <div className="noise-overlay" />
      
      {/* Scanlines Overlay */}
      <div className="scanlines" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main ref={mainRef} className="relative">
        {/* Section 1: Hero - pin: true */}
        <div id="hero">
          <HeroSection />
        </div>

        {/* Section 2: Skills - pin: false */}
        <div id="skills">
          <SkillsSection />
        </div>

        {/* Section 4: Credentials - pin: true */}
        <div id="certs">
          <CredentialsSection />
        </div>

        {/* Section 5: SQLi Challenge - pin: false */}
        <div id="challenge">
          <SQLiChallengeSection />
        </div>

        {/* Section 6: Contact - pin: true */}
        <div id="contact">
          <ContactSection />
        </div>

        {/* Section 6: Footer - pin: false */}
        <FooterSection />
      </main>

      {/* Toast notifications */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0B0D14',
            border: '1px solid rgba(0, 240, 255, 0.25)',
            color: '#F4F6FF',
          },
        }}
      />
    </>
  );
}

export default App;