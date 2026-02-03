import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const frameRef = useRef<SVGSVGElement>(null);
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
        { scale: 1.12, opacity: 0.5, y: '-6vh' },
        { scale: 1.00, opacity: 1, y: 0, ease: 'none' },
        0
      );

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        scrollTl.fromTo(
          words,
          { opacity: 0, y: 80, rotateX: 45 },
          { opacity: 1, y: 0, rotateX: 0, stagger: 0.02, ease: 'none' },
          0
        );
      }

      // Frame stroke animation
      const framePath = frameRef.current?.querySelector('rect');
      if (framePath) {
        const pathLength = framePath.getTotalLength?.() || 2000;
        gsap.set(framePath, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
        scrollTl.to(
          framePath,
          { strokeDashoffset: 0, opacity: 0.35, ease: 'none' },
          0.05
        );
      }

      scrollTl.fromTo(
        labelRef.current,
        { opacity: 0, y: -18 },
        { opacity: 1, y: 0, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        bodyRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, ease: 'none' },
        0.1
      );

      // Phase 3 - EXIT (70% - 100%)
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-26vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      if (frameRef.current) {
        scrollTl.fromTo(
          frameRef.current,
          { scale: 1, opacity: 0.35 },
          { scale: 1.12, opacity: 0, ease: 'power2.in' },
          0.7
        );
      }

      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0.6, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [labelRef.current, bodyRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const headlineText = 'Security You Can Trust';
  const words = headlineText.split(' ');

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-30"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/hooded_code.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(5,6,11,0.75) 0%, rgba(5,6,11,0.35) 50%, rgba(5,6,11,0.75) 100%)'
          }}
        />
      </div>

      {/* Frame Rectangle */}
      <svg
        ref={frameRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0 }}
      >
        <rect
          x="10%"
          y="25%"
          width="80%"
          height="50%"
          fill="none"
          stroke="rgba(0,240,255,0.35)"
          strokeWidth="1"
        />
      </svg>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {/* Top Label */}
        <p
          ref={labelRef}
          className="absolute top-[10vh] left-1/2 -translate-x-1/2 font-mono text-xs tracking-[0.12em] text-[#00F0FF] uppercase"
        >
          PHILOSOPHY
        </p>

        {/* Center Headline */}
        <h2
          ref={headlineRef}
          className="text-[clamp(34px,5vw,72px)] font-bold text-[#F4F6FF] text-center px-[6vw] leading-[1.05]"
          style={{ perspective: '1000px' }}
        >
          {words.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.25em]">
              {word}
            </span>
          ))}
        </h2>

        {/* Bottom Body */}
        <p
          ref={bodyRef}
          className="absolute bottom-[12vh] left-1/2 -translate-x-1/2 w-[62vw] max-w-3xl text-[#A7ACB8] text-center text-base md:text-lg leading-relaxed"
        >
          No jargon, no fear-mongering—just honest assessments, reproducible evidence, and fixes that stick.
        </p>
      </div>
    </section>
  );
}