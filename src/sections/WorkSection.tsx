import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Database, Cloud, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Network Vulnerability Assessment',
    description: 'Conducted comprehensive network scans and vulnerability assessments for a mid-sized organization, identifying 15 critical vulnerabilities and providing actionable remediation steps.',
    icon: Database,
    tags: ['Nmap', 'Wireshark', 'Metasploit'],
    impact: '15 vulnerabilities patched'
  },
  {
    title: 'Web Application Security Audit',
    description: 'Performed in-depth security testing on a customer-facing web application, discovering SQL injection and XSS vulnerabilities before production deployment.',
    icon: Cloud,
    tags: ['Burp Suite', 'OWASP', 'SQLi'],
    impact: 'Zero-day prevented'
  },
  {
    title: 'Security Awareness Training',
    description: 'Designed and executed phishing simulation campaigns to test employee security awareness, followed by targeted training sessions based on results.',
    icon: Mail,
    tags: ['Social Engineering', 'Training'],
    impact: '40% improvement'
  }
];

export default function WorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline + intro animation
      gsap.fromTo(
        [headlineRef.current, introRef.current],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          }
        }
      );

      // Cards animation
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.work-card');
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { x: '-12vw', opacity: 0, rotateY: 10 },
            {
              x: 0,
              opacity: 1,
              rotateY: 0,
              duration: 0.7,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 55%',
                scrub: true,
              }
            }
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-60 py-[8vh] px-[6vw] min-h-screen"
      style={{
        background: '#0B0D14',
      }}
    >
      {/* Grid background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-[6vh]">
        <h2
          ref={headlineRef}
          className="text-[clamp(34px,4vw,56px)] font-bold text-[#F4F6FF] leading-[1.05]"
        >
          Selected Engagements
        </h2>
        <p
          ref={introRef}
          className="text-[#A7ACB8] text-base lg:text-lg leading-relaxed max-w-[34vw] lg:text-right"
        >
          A few recent tests—scoped, executed, and documented with reproducible evidence.
        </p>
      </div>

      {/* Project Cards */}
      <div
        ref={cardsRef}
        className="relative z-10 flex flex-col gap-6"
      >
        {projects.map((project, index) => {
          const Icon = project.icon;
          return (
            <div
              key={index}
              className="work-card cyber-border cyber-border-hover p-6 lg:p-8 bg-[rgba(5,6,11,0.6)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
              style={{ perspective: '1000px' }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                {/* Left content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 border border-[rgba(0,240,255,0.25)]">
                      <Icon size={20} className="text-[#00F0FF]" />
                    </div>
                    <h3 className="text-[#F4F6FF] font-semibold text-xl">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-[#A7ACB8] text-base leading-relaxed mb-4 max-w-2xl">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="font-mono text-[10px] tracking-wider uppercase px-2 py-1 border border-[rgba(0,240,255,0.2)] text-[#00F0FF]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right impact block */}
                <div className="lg:w-[200px] lg:text-right">
                  <p className="font-mono text-xs tracking-wider uppercase text-[#A7ACB8] mb-2">
                    Impact
                  </p>
                  <p className="text-[#00F0FF] font-semibold text-lg">
                    {project.impact}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View More CTA */}
      <div className="relative z-10 mt-10 text-center">
        <button className="btn-cyber inline-flex items-center gap-2">
          View all projects
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}