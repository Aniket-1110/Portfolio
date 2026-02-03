import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Lock, ArrowRight, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const completedCert = {
  code: 'CEH',
  name: 'Certified Ethical Hacker',
  year: '2025',
  icon: Shield,
  description: 'EC-Council certified expertise in ethical hacking methodologies and tools.'
};

const nextCert = {
  code: 'OSCP',
  name: 'Offensive Security Certified Professional',
  icon: Lock,
  description: 'Advanced penetration testing certification with hands-on lab challenges.'
};

export default function CredentialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Detect mobile for responsive scroll behavior
      const isMobile = window.innerWidth < 768;
      
      // On mobile, make it a static section with no scroll effects
      if (isMobile) {
        // No animations or pinning on mobile - static section
        gsap.set([headlineRef.current], { opacity: 1 });
        if (badgesRef.current) {
          const badges = badgesRef.current.querySelectorAll('.cert-badge');
          gsap.set(badges, { opacity: 1 });
        }
        return; // Exit early, no ScrollTrigger on mobile
      }
      
      // Desktop animations
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Phase 1 - ENTRANCE (desktop only)
      // Full animations on desktop
      scrollTl.fromTo(
          bgRef.current,
          { scale: 1.10, opacity: 0.6, x: '-6vw' },
          { scale: 1.00, opacity: 1, x: 0, ease: 'none' },
          0
        );


        scrollTl.fromTo(
          headlineRef.current,
          { x: '-55vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0
        );

        // Badges entrance
        if (badgesRef.current) {
          const badges = badgesRef.current.querySelectorAll('.cert-badge');
          scrollTl.fromTo(
            badges,
            { y: '40vh', opacity: 0, rotateX: 25 },
            { y: 0, opacity: 1, rotateX: 0, stagger: 0.03, ease: 'none' },
            0.1
          );
        }

      // Phase 3 - EXIT (desktop only)
      scrollTl.fromTo(
          headlineRef.current,
          { x: 0, opacity: 1 },
          { x: '-28vw', opacity: 0, ease: 'power2.in' },
          0.7
        );

        if (badgesRef.current) {
          const badges = badgesRef.current.querySelectorAll('.cert-badge');
          scrollTl.fromTo(
            badges,
            { y: 0, opacity: 1 },
            { y: '22vh', opacity: 0, stagger: 0.02, ease: 'power2.in' },
            0.7
          );
        }

        scrollTl.fromTo(
          bgRef.current,
          { opacity: 1 },
          { opacity: 0.6, ease: 'power2.in' },
          0.75
        );
    }, section);

    return () => ctx.revert();
  }, []);

  const CompletedIcon = completedCert.icon;
  const NextIcon = nextCert.icon;

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-50 md:min-h-screen min-h-[100vh] pt-[12vh] md:pt-0"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/hooded_server.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(5,6,11,0.85) 0%, rgba(5,6,11,0.5) 50%, rgba(5,6,11,0.75) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-[6vw] pb-[8vh] md:pb-0">
        {/* Left Headline */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 md:gap-8 mb-8 md:mb-12 mt-[9vh] md:mt-0">
          <h2
            ref={headlineRef}
            className="text-[clamp(28px,4vw,56px)] font-bold text-[#F4F6FF] leading-[1.05] max-w-full lg:max-w-[46vw]"
          >
            Certified. Proven. Trusted.
          </h2>
        </div>

        {/* Certification Badges */}
        <div
          ref={badgesRef}
          className="flex flex-col md:flex-row gap-6 mt-4 md:mt-8 max-w-4xl mb-20 md:mb-0"
        >
          {/* Completed Certification - CEH */}
          <a
            href="/ceh_certificate.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="cert-badge cyber-border badge-pulse p-6 bg-[rgba(5,6,11,0.7)] backdrop-blur-sm flex-1 hover:border-[rgba(0,240,255,0.6)] transition-all cursor-pointer group"
            style={{ perspective: '1000px' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 border border-[rgba(0,240,255,0.25)] group-hover:border-[rgba(0,240,255,0.6)] transition-colors">
                <CompletedIcon size={24} className="text-[#00F0FF]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#00F0FF]">
                  {completedCert.year}
                </span>
                <ExternalLink size={14} className="text-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <h3 className="text-[#00F0FF] font-mono text-2xl font-bold mb-1">
              {completedCert.code}
            </h3>
            <p className="text-[#F4F6FF] font-semibold mb-2">
              {completedCert.name}
            </p>
            <p className="text-[#A7ACB8] text-sm leading-relaxed">
              {completedCert.description}
            </p>
            <p className="text-[#00F0FF] text-xs font-mono mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
              Click to view certificate →
            </p>
          </a>

          {/* Separator with "Next" and Arrow */}
          <div className="hidden md:flex flex-col items-center justify-center px-4">
            <div className="flex items-center gap-2 text-[#00F0FF] font-mono text-sm tracking-wider uppercase mb-2">
              <span>Next</span>
              <ArrowRight size={16} />
            </div>
            <div className="w-px h-full bg-[rgba(0,240,255,0.25)] flex-1" />
          </div>
          
          {/* Mobile Separator */}
          <div className="md:hidden flex items-center justify-center py-4">
            <div className="flex items-center gap-2 text-[#00F0FF] font-mono text-sm tracking-wider uppercase">
              <span>Next</span>
              <ArrowRight size={16} />
            </div>
            <div className="flex-1 h-px bg-[rgba(0,240,255,0.25)] ml-4" />
          </div>

          {/* Next Goal - OSCP */}
          <div className="cert-badge cyber-border p-6 bg-[rgba(5,6,11,0.5)] backdrop-blur-sm flex-1 opacity-75 border-[rgba(0,240,255,0.15)]" style={{ perspective: '1000px' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 border border-[rgba(0,240,255,0.15)]">
                <NextIcon size={24} className="text-[#00F0FF] opacity-75" />
              </div>
              <span className="font-mono text-xs text-[#00F0FF] opacity-75">
                Next Goal
              </span>
            </div>
            <h3 className="text-[#00F0FF] font-mono text-2xl font-bold mb-1 opacity-90">
              {nextCert.code}
            </h3>
            <p className="text-[#F4F6FF] font-semibold mb-2 opacity-90">
              {nextCert.name}
            </p>
            <p className="text-[#A7ACB8] text-sm leading-relaxed opacity-80">
              {nextCert.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}