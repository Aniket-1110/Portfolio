import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Network, 
  Globe, 
  Target, 
  Cpu, 
  Code2, 
  Terminal, 
  Shield, 
  FileText 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    icon: Network,
    title: 'Network Security',
    description: 'Nmap, Wireshark, TCP/IP stack analysis, packet inspection, and network vulnerability assessment.',
    tools: ['Nmap', 'Wireshark', 'TCP/IP']
  },
  {
    icon: Globe,
    title: 'Web App Testing',
    description: 'Comprehensive web application security testing using industry-standard frameworks and methodologies.',
    tools: ['Burp Suite', 'OWASP Top 10']
  },
  {
    icon: Target,
    title: 'Exploitation',
    description: 'Hands-on exploitation techniques with proof-of-concept development and responsible disclosure.',
    tools: ['Metasploit', 'SQLi', 'XSS']
  },
  {
    icon: Cpu,
    title: 'Reverse Engineering',
    description: 'Binary analysis, malware dissection, and low-level system understanding for threat research.',
    tools: ['Ghidra', 'Binary Analysis']
  },
  {
    icon: Code2,
    title: 'Scripting',
    description: 'Automation of security tasks, custom tool development, and workflow optimization.',
    tools: ['Bash', 'Python']
  },
  {
    icon: Terminal,
    title: 'Penetration Testing',
    description: 'Full-scope penetration testing from reconnaissance to post-exploitation and reporting.',
    tools: ['Kali Linux', 'Custom Tools']
  },
  {
    icon: Shield,
    title: 'Incident Response',
    description: 'Detection, containment, and forensics for security incidents and breach investigations.',
    tools: ['SIEM', 'Forensics']
  },
  {
    icon: FileText,
    title: 'Reporting',
    description: 'Clear, actionable security reports with prioritized remediation recommendations.',
    tools: ['Documentation', 'CVSS']
  }
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridLinesRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { x: '-10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 45%',
            scrub: true,
          }
        }
      );

      // Grid lines draw-on
      gsap.fromTo(
        gridLinesRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 50%',
            scrub: true,
          }
        }
      );

      // Skill cards animation
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.skill-card');
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 60, opacity: 0, rotateX: 12 },
            {
              y: 0,
              opacity: 1,
              rotateX: 0,
              duration: 0.6,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 60%',
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
      className="relative z-40 py-[8vh] px-[6vw] min-h-screen"
      style={{
        background: '#05060B',
      }}
    >
      {/* Radial gradient background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(0,240,255,0.06) 0%, transparent 50%)'
        }}
      />

      {/* Grid lines background */}
      <div
        ref={gridLinesRef}
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Header */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-[6vh]">
        <h2
          ref={headlineRef}
          className="text-[clamp(34px,4vw,56px)] font-bold text-[#F4F6FF] leading-[1.05]"
        >
          Skill Matrix
        </h2>
      </div>

      {/* Skills Grid */}
      <div
        ref={gridRef}
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <div
              key={index}
              className="skill-card cyber-border cyber-border-hover p-6 bg-[rgba(11,13,20,0.5)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
              style={{ perspective: '1000px' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 border border-[rgba(0,240,255,0.25)]">
                  <Icon size={20} className="text-[#00F0FF]" />
                </div>
                <h3 className="text-[#F4F6FF] font-semibold text-lg">
                  {skill.title}
                </h3>
              </div>
              <p className="text-[#A7ACB8] text-sm leading-relaxed mb-4">
                {skill.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {skill.tools.map((tool, i) => (
                  <span
                    key={i}
                    className="font-mono text-[10px] tracking-wider uppercase px-2 py-1 border border-[rgba(0,240,255,0.2)] text-[#00F0FF]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}