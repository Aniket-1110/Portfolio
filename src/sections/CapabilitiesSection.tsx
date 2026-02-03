import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CapabilitiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const crosshairRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // Phase 1 - ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.10, opacity: 0.6, x: '6vw' },
        { scale: 1.00, opacity: 1, x: 0, ease: 'none' },
        0
      );

      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll('.char');
        scrollTl.fromTo(
          chars,
          { opacity: 0, y: 60, rotateY: 35 },
          { opacity: 1, y: 0, rotateY: 0, stagger: 0.005, ease: 'none' },
          0
        );
      }

      const hLine = crosshairRef.current?.querySelector('.h-line');
      const vLine = crosshairRef.current?.querySelector('.v-line');
      
      if (hLine) {
        scrollTl.fromTo(
          hLine,
          { scaleX: 0 },
          { scaleX: 1, ease: 'none' },
          0.05
        );
      }

      if (vLine) {
        scrollTl.fromTo(
          vLine,
          { scaleY: 0 },
          { scaleY: 1, ease: 'none' },
          0.05
        );
      }

      scrollTl.fromTo(
        labelRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        bodyRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: 'none' },
        0.1
      );

      // Phase 2 - SETTLE (30% - 70%): Hold position

      // Phase 3 - EXIT (70% - 100%)
      scrollTl.fromTo(
        headlineRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, x: 0, opacity: 1 },
        { scale: 1.08, x: '-6vw', opacity: 0.6, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        crosshairRef.current,
        { opacity: 0.4, scale: 1 },
        { opacity: 0, scale: 1.15, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        bodyRef.current,
        { y: 0, opacity: 1 },
        { y: '18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        labelRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const headlineText = 'Identifying Threats. Securing Systems.';
  const chars = headlineText.split('');

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-20"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/hooded_hands.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(5,6,11,0.7) 0%, rgba(5,6,11,0.4) 50%, rgba(5,6,11,0.7) 100%)'
          }}
        />
      </div>

      {/* Crosshair Decoration */}
      <div
        ref={crosshairRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div 
          className="h-line absolute w-[60vw] h-px bg-[rgba(0,240,255,0.15)]"
          style={{ transformOrigin: 'center' }}
        />
        <div 
          className="v-line absolute h-[40vh] w-px bg-[rgba(0,240,255,0.15)]"
          style={{ transformOrigin: 'center' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {/* Top Label */}
        <p
          ref={labelRef}
          className="absolute top-[10vh] left-1/2 -translate-x-1/2 font-mono text-xs tracking-[0.12em] text-[#00F0FF] uppercase"
        >
          CAPABILITIES
        </p>

        {/* Center Headline */}
        <h2
          ref={headlineRef}
          className="text-[clamp(34px,5vw,72px)] font-bold text-[#F4F6FF] text-center px-[7vw] leading-[1.05]"
          style={{ perspective: '1000px' }}
        >
          {chars.map((char, i) => (
            <span 
              key={i} 
              className="char inline-block"
              style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h2>

        {/* Bottom Body */}
        <p
          ref={bodyRef}
          className="absolute bottom-[12vh] left-1/2 -translate-x-1/2 w-[64vw] max-w-3xl text-[#A7ACB8] text-center text-base md:text-lg leading-relaxed"
        >
          From external network tests to internal red-team simulations— I deliver findings that are actionable and prioritized by real risk.
        </p>
      </div>
    </section>
  );
}