import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Github, Check, Mail, Eye, Download } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  
  const [copied, setCopied] = useState(false);

  // Update these with your actual links
  const email = 'aniketchoudhury55@gmail.com';
  const linkedinUrl = 'https://www.linkedin.com/in/aniket-choudhury-193421267/';
  const githubUrl = 'https://github.com/Aniket-1110';
  const resumeUrl = '/resume.pdf'; // Place your resume.pdf file in the public/ folder

  const handleResumeDownload = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Aniket_Choudhury_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          end: isMobile ? '+=70%' : '+=120%', // Shorter scroll distance on mobile
          pin: true,
          scrub: isMobile ? 0.3 : 0.6, // Faster scrub on mobile
        }
      });

      // Phase 1 - ENTRANCE (0% - 30%)
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.10, opacity: 0.6, y: '6vh' },
        { scale: 1.00, opacity: 1, y: 0, ease: 'none' },
        0
      );

      if (headlineRef.current) {
        const chars = headlineRef.current.querySelectorAll('.char');
        scrollTl.fromTo(
          chars,
          { opacity: 0, y: 70, rotateX: 55 },
          { opacity: 1, y: 0, rotateX: 0, stagger: 0.003, ease: 'none' },
          0
        );
      }

      scrollTl.fromTo(
        labelRef.current,
        { opacity: 0, y: -18 },
        { opacity: 1, y: 0, ease: 'none' },
        0.1
      );

      // Show scroll indicator immediately and keep it visible
      scrollTl.fromTo(
        bodyRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        ctaRef.current,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, ease: 'none' },
        0.15
      );

      // Phase 3 - EXIT (70% - 100%)
      scrollTl.fromTo(
        headlineRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: '-10vh', ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        ctaRef.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: '10vh', ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        [labelRef.current, bodyRef.current],
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        bgRef.current,
        { opacity: 1, scale: 1 },
        { opacity: 0.6, scale: 1.05, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = async () => {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        toast.success('Email copied to clipboard');
        setTimeout(() => setCopied(false), 2000);
      } else {
        // Fallback for older browsers or mobile
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          setCopied(true);
          toast.success('Email copied to clipboard');
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          toast.error('Failed to copy. Please copy manually: ' + email);
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      // If clipboard API fails, show the email so user can copy manually
      toast.error('Copy failed. Email: ' + email);
    }
  };

  const headlineText = "Let's Connect";
  const chars = headlineText.split('');

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-70"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: 'url(/contact_hooded.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(5,6,11,0.75) 0%, rgba(5,6,11,0.4) 50%, rgba(5,6,11,0.75) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {/* Top Label */}
        <p
          ref={labelRef}
          className="absolute top-[10vh] left-1/2 -translate-x-1/2 font-mono text-xs tracking-[0.12em] text-[#00F0FF] uppercase"
        >
          CONTACT
        </p>

        {/* Center Headline */}
        <h2
          ref={headlineRef}
          className="text-[clamp(34px,5vw,72px)] font-bold text-[#F4F6FF] text-center px-[7vw] leading-[1.05] mb-4"
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
          <span ref={cursorRef} className="typing-cursor text-[#00F0FF]" />
        </h2>

        {/* Body */}
        <p
          ref={bodyRef}
          className="text-[#A7ACB8] text-center text-base md:text-lg leading-relaxed max-w-2xl px-6 mb-10"
        >
          Connect with me on LinkedIn, check out my projects on GitHub, or download my resume.
        </p>

        {/* Social Links & Resume */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center gap-4 flex-wrap justify-center"
        >
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cyber-filled flex items-center gap-2"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cyber-filled flex items-center gap-2"
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cyber flex items-center gap-2"
          >
            <Eye size={16} />
            View Resume
          </a>
          <a
            href={resumeUrl}
            onClick={handleResumeDownload}
            className="btn-cyber flex items-center gap-2"
          >
            <Download size={16} />
            Download Resume
          </a>
          <button
            onClick={handleCopyEmail}
            className="btn-cyber flex items-center gap-2"
          >
            {copied ? <Check size={16} /> : <Mail size={16} />}
            {copied ? 'Copied!' : email}
          </button>
        </div>
      </div>

    </section>
  );
}