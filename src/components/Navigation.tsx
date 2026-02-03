import { useState, useEffect, useRef } from 'react';
import { Menu, X, FileText, Lock, AlertTriangle, X as CloseIcon } from 'lucide-react';
import { toast } from 'sonner';

const navLinks = [
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isWriteupModalOpen, setIsWriteupModalOpen] = useState(false);
  const [flagInput, setFlagInput] = useState('');
  const [isWriteupUnlocked, setIsWriteupUnlocked] = useState(false);
  const writeupRef = useRef<HTMLDivElement>(null);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Get navbar height to offset scroll position
      const nav = document.querySelector('nav');
      const navHeight = nav ? nav.offsetHeight : 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      // Add extra offset for contact section to show scroll indicator and CONTACT label
      // Position it so the CONTACT label and scroll indicator are both visible
      const extraOffset = href === '#contact' ? 100 : 0;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight - extraOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleWriteupClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsWriteupModalOpen(true);
    setIsWriteupUnlocked(false);
    setFlagInput('');
  };

  const handleFlagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctFlag = 'flag{input_validation_required}';
    if (flagInput.trim() === correctFlag) {
      setIsWriteupUnlocked(true);
      toast.success('Writeup unlocked!');
    } else {
      toast.error('Invalid flag');
    }
  };

  const handleCloseModal = () => {
    setIsWriteupModalOpen(false);
    setIsWriteupUnlocked(false);
    setFlagInput('');
  };

  // Protection against viewing source/inspect for writeup
  useEffect(() => {
    if (!isWriteupUnlocked) return;

    const handleContextMenu = (e: MouseEvent) => {
      if (writeupRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        toast.error('Nice try!');
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === 'F12') ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'U')
      ) {
        if (writeupRef.current) {
          toast.error('Nice try!');
        }
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isWriteupUnlocked]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-[100] bg-[rgba(5,6,11,0.9)] backdrop-blur-md border-b border-[rgba(0,240,255,0.1)]"
      >
        <div className="flex items-center justify-between px-[6vw] py-4">
          {/* Logo */}
          <a 
            href="#" 
            className="font-mono text-sm tracking-[0.12em] text-[#00F0FF] uppercase hover:text-[#F4F6FF] transition-colors -ml-18 md:-ml-16"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            CYBERSEC
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[#A7ACB8] hover:text-[#00F0FF] transition-colors text-sm font-medium relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00F0FF] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <button
              onClick={handleWriteupClick}
              className="text-[#A7ACB8] hover:text-[#00F0FF] transition-colors text-sm font-medium relative group flex items-center gap-2"
            >
              <FileText size={16} />
              SQLi Writeup
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00F0FF] transition-all duration-300 group-hover:w-full" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#F4F6FF] p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[99] bg-[#05060B] transition-transform duration-500 md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, i) => (
            <a
              key={i}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-[#F4F6FF] hover:text-[#00F0FF] transition-colors text-2xl font-semibold"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={handleWriteupClick}
            className="text-[#F4F6FF] hover:text-[#00F0FF] transition-colors text-2xl font-semibold flex items-center gap-3"
          >
            <FileText size={24} />
            SQLi Writeup
          </button>
        </div>
      </div>

      {/* SQLi Writeup Modal */}
      {isWriteupModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(5,6,11,0.95)] backdrop-blur-sm p-4">
          <div className="cyber-border bg-[#0B0D14] max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-[#A7ACB8] hover:text-[#00F0FF] transition-colors z-10"
            >
              <CloseIcon size={24} />
            </button>

            <div className="p-8">
              {!isWriteupUnlocked ? (
                /* Flag Input Form */
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Lock size={32} className="text-[#00F0FF]" />
                    <h2 className="text-2xl font-bold text-[#F4F6FF]">
                      SQLi Writeup
                    </h2>
                  </div>
                  <p className="text-[#A7ACB8] mb-6">
                    Enter the flag to unlock the SQL injection writeup.
                  </p>
                  <form onSubmit={handleFlagSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[#A7ACB8] text-sm font-mono mb-2 uppercase tracking-wider">
                        Flag
                      </label>
                      <input
                        type="text"
                        value={flagInput}
                        onChange={(e) => setFlagInput(e.target.value)}
                        onPaste={(e) => {
                          // Allow pasting on mobile
                          const pastedText = e.clipboardData.getData('text');
                          setFlagInput(pastedText);
                        }}
                        className="w-full px-4 py-3 bg-[#05060B] border border-[rgba(0,240,255,0.25)] text-[#F4F6FF] font-mono focus:outline-none focus:border-[#00F0FF] transition-colors"
                        placeholder="flag{...}"
                        required
                        autoFocus
                        autoComplete="off"
                        inputMode="text"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn-cyber-filled w-full flex items-center justify-center gap-2"
                    >
                      <Lock size={16} />
                      Unlock Writeup
                    </button>
                  </form>
                </div>
              ) : (
                /* Writeup Content */
                <div ref={writeupRef}>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <AlertTriangle size={32} className="text-[#00F0FF]" />
                      <h2 className="text-2xl font-bold text-[#F4F6FF]">
                        SQL Injection Writeup
                      </h2>
                    </div>
                  </div>
                  
                  <div className="space-y-6 text-[#A7ACB8] leading-relaxed">
                    <div>
                      <h4 className="text-[#00F0FF] font-semibold mb-2">What is SQL Injection?</h4>
                      <p>
                        SQL Injection (SQLi) is a code injection technique that exploits security vulnerabilities in an application's database layer. 
                        Attackers can manipulate SQL queries by injecting malicious SQL code through user inputs, potentially gaining unauthorized access 
                        to sensitive data or even taking control of the database server.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[#00F0FF] font-semibold mb-2">How It Works</h4>
                      <p>
                        In this challenge, the vulnerable query would look something like:
                      </p>
                      <pre className="bg-[#05060B] p-4 border border-[rgba(0,240,255,0.25)] mt-2 overflow-x-auto">
                        <code className="text-[#00F0FF] font-mono text-sm">
{`SELECT * FROM users 
WHERE username = 'admin' 
AND password = '' OR 1=1`}
                        </code>
                      </pre>
                      <p className="mt-2">
                        By entering <code className="text-[#00F0FF] font-mono bg-[#05060B] px-1">' or 1=1</code> as the password, 
                        the query becomes:
                      </p>
                      <pre className="bg-[#05060B] p-4 border border-[rgba(0,240,255,0.25)] mt-2 overflow-x-auto">
                        <code className="text-[#00F0FF] font-mono text-sm">
{`SELECT * FROM users 
WHERE username = 'admin' 
AND password = '' OR 1=1`}
                        </code>
                      </pre>
                      <p className="mt-2">
                        Since <code className="text-[#00F0FF] font-mono bg-[#05060B] px-1">1=1</code> is always true, 
                        the entire condition evaluates to true, bypassing authentication.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[#00F0FF] font-semibold mb-2">Input Validation & Prevention</h4>
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        <li>
                          <strong className="text-[#F4F6FF]">Parameterized Queries:</strong> Use prepared statements with parameter binding 
                          instead of string concatenation.
                        </li>
                        <li>
                          <strong className="text-[#F4F6FF]">Input Validation:</strong> Validate and sanitize all user inputs on both client 
                          and server side.
                        </li>
                        <li>
                          <strong className="text-[#F4F6FF]">Least Privilege:</strong> Database accounts should have minimal necessary permissions.
                        </li>
                        <li>
                          <strong className="text-[#F4F6FF]">Error Handling:</strong> Don't expose database errors to users; use generic error messages.
                        </li>
                        <li>
                          <strong className="text-[#F4F6FF]">WAF:</strong> Implement Web Application Firewalls to filter malicious requests.
                        </li>
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-[rgba(0,240,255,0.1)]">
                      <p className="text-sm italic text-[#00F0FF]">
                        Remember: This is a demonstration. Always practice ethical hacking with proper authorization.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}