import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight, Download, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const hairlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bracketRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  // Entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background entrance
      tl.fromTo(
        bgRef.current,
        { scale: 1.08, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1 }
      );

      // Headline words entrance
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { y: 40, opacity: 0, rotateX: 25 },
          { y: 0, opacity: 1, rotateX: 0, duration: 0.6, stagger: 0.06 },
          '-=0.5'
        );
      }

      // Subheadline
      tl.fromTo(
        subheadlineRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        '-=0.3'
      );

      // Hairline draw
      tl.fromTo(
        hairlineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.5, transformOrigin: 'left' },
        '-=0.2'
      );

      // Body text
      tl.fromTo(
        bodyRef.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      );

      // CTA
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.2'
      );

      // Bracket frame
      tl.fromTo(
        bracketRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.3'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Detect mobile for responsive scroll behavior
      const isMobile = window.innerWidth < 768;
      
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: isMobile ? '+=80%' : '+=130%', // Shorter scroll distance on mobile
          pin: true,
          scrub: isMobile ? 0.2 : 0.3, // Faster scrub for more responsive feel
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back
            gsap.set([headlineRef.current, subheadlineRef.current, hairlineRef.current, bodyRef.current, ctaRef.current, bracketRef.current], {
              opacity: 1, x: 0, y: 0
            });
            gsap.set(bgRef.current, { scale: 1, opacity: 1 });
          }
        }
      });

      // Phase 1 (0-30%): Hold - no changes
      // Phase 2 (30-70%): Hold - no changes
      
      // Phase 3 (70-100%): Exit - faster animation
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-55vw', opacity: 0, ease: 'power3.in' },
        0.7
      );

      scrollTl.fromTo(
        [subheadlineRef.current, hairlineRef.current],
        { x: 0, opacity: 1 },
        { x: '-40vw', opacity: 0, ease: 'power3.in' },
        0.7
      );

      scrollTl.fromTo(
        bodyRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power3.in' },
        0.7
      );

      scrollTl.fromTo(
        bracketRef.current,
        { y: 0, opacity: 1 },
        { y: '18vh', opacity: 0, ease: 'power3.in' },
        0.7
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power3.in' },
        0.75
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0.6, ease: 'power3.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const headlineText = 'Cybersec Enthusiast';
  const words = headlineText.split(' ');

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-10"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/hero_hooded.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, rgba(5,6,11,0.85) 0%, rgba(5,6,11,0.45) 55%, rgba(5,6,11,0.65) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center px-[6vw]">
        {/* Left Headline Block */}
        <div className="max-w-[62vw]">
          <h1
            ref={headlineRef}
            className="text-[clamp(44px,6vw,84px)] font-bold text-[#F4F6FF] leading-[0.95] mb-4"
            style={{ perspective: '1000px' }}
          >
            {words.map((word, i) => (
              <span key={i} className="word inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
          </h1>
          
          <p
            ref={subheadlineRef}
            className="font-mono text-xs tracking-[0.12em] text-[#00F0FF] uppercase mb-3"
          >
            ANIKET CHOUDHURY • CYBERSECURITY STUDENT
          </p>
          
          <div
            ref={hairlineRef}
            className="w-[40%] h-px bg-[rgba(0,240,255,0.35)] mb-4"
          />
          
          {/* Challenge Hint - Below hairline */}
          <p className="text-[#00F0FF] text-xs md:text-sm font-mono tracking-wider animate-pulse">
            🔍 Find the flag in this page
          </p>
        </div>

        {/* Right Body Text */}
        <p
          ref={bodyRef}
          className="absolute right-[6vw] top-[22vh] w-[22vw] text-[#A7ACB8] text-base leading-relaxed hidden lg:block"
        >
          Aspiring cybersecurity professional passionate about ethical hacking, penetration testing, and building secure systems.
        </p>

        {/* Bottom CTA */}
        <div
          ref={ctaRef}
          className="absolute left-[6vw] bottom-[10vh] flex items-center gap-6 flex-wrap"
        >
          <a href="#skills" className="btn-cyber-filled flex items-center gap-2">
            Explore my skills
            <ChevronRight size={16} />
          </a>
          <a 
            href="/resume.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#A7ACB8] hover:text-[#00F0FF] transition-colors flex items-center gap-2 font-mono text-sm"
          >
            <Eye size={16} />
            View Resume
          </a>
          <a 
            href="/resume.pdf" 
            download="Aniket_Choudhury_Resume.pdf"
            className="text-[#A7ACB8] hover:text-[#00F0FF] transition-colors flex items-center gap-2 font-mono text-sm"
          >
            <Download size={16} />
            Download CV
          </a>
        </div>

        {/* Decorative Bracket Frame */}
        <div
          ref={bracketRef}
          className="absolute right-[6vw] bottom-[10vh] w-[34vw] h-[22vh] hidden lg:block"
        >
          <svg className="w-full h-full" viewBox="0 0 340 220" fill="none">
            {/* Top-left corner */}
            <path
              d="M0 40 L0 0 L40 0"
              stroke="rgba(0,240,255,0.35)"
              strokeWidth="1"
              fill="none"
            />
            {/* Top-right corner */}
            <path
              d="M300 0 L340 0 L340 40"
              stroke="rgba(0,240,255,0.35)"
              strokeWidth="1"
              fill="none"
            />
            {/* Bottom-right corner */}
            <path
              d="M340 180 L340 220 L300 220"
              stroke="rgba(0,240,255,0.35)"
              strokeWidth="1"
              fill="none"
            />
            {/* Bottom-left corner */}
            <path
              d="M40 220 L0 220 L0 180"
              stroke="rgba(0,240,255,0.35)"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}