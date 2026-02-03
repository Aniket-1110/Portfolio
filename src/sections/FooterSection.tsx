import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, FileText, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { label: 'GitHub', href: 'https://github.com', icon: Github },
];

const resourceLinks = [
  { label: 'CV (PDF)', href: '#', icon: FileText },
  { label: 'Disclosure Policy', href: '#', icon: Shield },
];

export default function FooterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLHeadingElement>(null);
  const columnsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Wordmark animation
      gsap.fromTo(
        wordmarkRef.current,
        { x: '-10vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          }
        }
      );

      // Columns animation
      if (columnsRef.current) {
        const columns = columnsRef.current.querySelectorAll('.footer-column');
        gsap.fromTo(
          columns,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              end: 'top 45%',
              scrub: true,
            }
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      className="relative z-80 py-[8vh] px-[6vw]"
      style={{
        background: '#05060B',
      }}
    >
      <div className="flex flex-col lg:flex-row lg:justify-between gap-12">
        {/* Large Wordmark */}
        <div className="lg:w-1/2">
          <h2
            ref={wordmarkRef}
            className="text-[clamp(48px,10vw,140px)] font-bold text-outline leading-none"
          >
            CYBERSEC
          </h2>
          <p className="text-[#A7ACB8] text-sm mt-4 max-w-md">
            Cybersecurity student passionate about ethical hacking, penetration testing, and building secure systems.
          </p>
        </div>

        {/* Link Columns */}
        <div
          ref={columnsRef}
          className="lg:w-1/2 grid grid-cols-2 md:grid-cols-3 gap-8"
        >
          {/* Navigate */}
          <div className="footer-column">
            <h3 className="font-mono text-xs tracking-[0.12em] text-[#00F0FF] uppercase mb-4">
              Navigate
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-[#A7ACB8] hover:text-[#F4F6FF] transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="footer-column">
            <h3 className="font-mono text-xs tracking-[0.12em] text-[#00F0FF] uppercase mb-4">
              Connect
            </h3>
            <ul className="space-y-3">
              {socialLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <li key={i}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#A7ACB8] hover:text-[#F4F6FF] transition-colors text-sm flex items-center gap-2"
                    >
                      <Icon size={14} />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Resources */}
          <div className="footer-column">
            <h3 className="font-mono text-xs tracking-[0.12em] text-[#00F0FF] uppercase mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link, i) => {
                const Icon = link.icon;
                return (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-[#A7ACB8] hover:text-[#F4F6FF] transition-colors text-sm flex items-center gap-2"
                    >
                      <Icon size={14} />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-16 pt-8 border-t border-[rgba(0,240,255,0.1)] flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <p className="text-[#A7ACB8] text-xs font-mono">
          © 2026 CyberSec Portfolio. All rights reserved.
        </p>
        <p className="text-[#00F0FF] text-xs font-mono flex items-center gap-2">
          <span className="w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse" />
          No cookies. No tracking.
        </p>
      </div>
    </footer>
  );
}