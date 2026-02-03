import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Lock, Flag, Shield, AlertTriangle, HelpCircle, X, Copy, Check, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

export default function SQLiChallengeSection() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showNiceTry, setShowNiceTry] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSuperHint, setShowSuperHint] = useState(false);
  const [flagCopied, setFlagCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const flagRef = useRef<HTMLDivElement>(null);

  // Protection against viewing source/inspect (only when flag is unlocked)
  useEffect(() => {
    if (!isUnlocked) return;

    // Check for right-click context menu on flag
    const handleContextMenu = (e: MouseEvent) => {
      if (flagRef.current?.contains(e.target as Node)) {
        e.preventDefault();
        setShowNiceTry(true);
        setTimeout(() => setShowNiceTry(false), 2000);
      }
    };

    // Check for common DevTools keyboard shortcuts (only on flag section)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger if user is trying to inspect the flag area
      if (
        (e.key === 'F12' && flagRef.current) ||
        ((e.ctrlKey && e.shiftKey && e.key === 'I') && flagRef.current) ||
        ((e.ctrlKey && e.shiftKey && e.key === 'J') && flagRef.current) ||
        ((e.ctrlKey && e.key === 'U') && flagRef.current)
      ) {
        // Small delay to check if they're actually inspecting the flag
        setTimeout(() => {
          if (flagRef.current && document.activeElement === document.body) {
            setShowNiceTry(true);
            setTimeout(() => setShowNiceTry(false), 2000);
          }
        }, 100);
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isUnlocked]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for SQL injection payload - accepts variations like "xyz' or 1=1--"
    const sqlPayload = "' or 1=1--";
    const normalizedPassword = password.trim().toLowerCase();
    const normalizedPayload = sqlPayload.toLowerCase();
    
    // Check if password contains the SQL injection pattern (allows text before it)
    const containsSQLi = normalizedPassword.includes(normalizedPayload);
    
    if (username.toLowerCase() === 'admin' && containsSQLi) {
      setIsUnlocked(true);
      toast.success('Flag unlocked! SQL injection detected.');
    } else {
      toast.error('Invalid credentials');
    }
  };

  // Obfuscate flag content in source
  const getFlag = () => {
    const parts = ['flag', '{', 'input', '_', 'validation', '_', 'required', '}'];
    return parts.join('');
  };

  const handleCopyFlag = async () => {
    const flag = getFlag();
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(flag);
        setFlagCopied(true);
        toast.success('Flag copied to clipboard!');
        setTimeout(() => setFlagCopied(false), 2000);
      } else {
        // Fallback for older browsers or mobile
        const textArea = document.createElement('textarea');
        textArea.value = flag;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          setFlagCopied(true);
          toast.success('Flag copied to clipboard!');
          setTimeout(() => setFlagCopied(false), 2000);
        } catch (err) {
          toast.error('Failed to copy. Please copy manually: ' + flag);
        }
        document.body.removeChild(textArea);
      }
    } catch (err) {
      // If clipboard API fails, show the flag so user can copy manually
      toast.error('Copy failed. Flag: ' + flag);
    }
  };

  return (
    <section className="relative z-60 py-[8vh] px-[6vw] min-h-screen" style={{ background: '#05060B' }}>
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

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lock size={32} className="text-[#00F0FF]" />
            <h2 className="text-[clamp(28px,4vw,48px)] font-bold text-[#F4F6FF]">
              Fun Challenge!
            </h2>
          </div>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <p className="text-[#A7ACB8] text-sm font-mono">
              Find the Flag.
            </p>
            <button
              onClick={() => setShowHint(true)}
              className="flex items-center gap-2 text-[#00F0FF] hover:text-[#F4F6FF] transition-colors text-sm font-mono"
            >
              <HelpCircle size={18} />
              Hint
            </button>
            <button
              onClick={() => setShowSuperHint(true)}
              className="flex items-center gap-2 text-[#00F0FF] hover:text-[#F4F6FF] transition-colors text-sm font-mono border border-[rgba(0,240,255,0.3)] px-3 py-1 rounded"
            >
              <HelpCircle size={18} />
              View Answer
            </button>
          </div>
        </div>

        {/* Login Form */}
        <div className="cyber-border p-8 bg-[rgba(5,6,11,0.6)] backdrop-blur-sm mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#A7ACB8] text-sm font-mono mb-2 uppercase tracking-wider">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-[#0B0D14] border border-[rgba(0,240,255,0.25)] text-[#F4F6FF] font-mono focus:outline-none focus:border-[#00F0FF] transition-colors"
                placeholder="Enter username"
                required
              />
            </div>
            <div>
              <label className="block text-[#A7ACB8] text-sm font-mono mb-2 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-[#0B0D14] border border-[rgba(0,240,255,0.25)] text-[#F4F6FF] font-mono focus:outline-none focus:border-[#00F0FF] transition-colors"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A7ACB8] hover:text-[#00F0FF] transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="btn-cyber-filled w-full flex items-center justify-center gap-2"
            >
              <Shield size={16} />
              Authenticate
            </button>
          </form>
        </div>

        {/* Flag Section - Only visible when unlocked */}
        {isUnlocked && (
          <div ref={flagRef} className="cyber-border p-8 bg-[rgba(0,240,255,0.05)] border-[rgba(0,240,255,0.3)] mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Flag size={24} className="text-[#00F0FF]" />
              <h3 className="text-xl font-bold text-[#00F0FF] font-mono">
                Flag Unlocked!
              </h3>
            </div>
            <div className="bg-[#0B0D14] p-4 border border-[rgba(0,240,255,0.25)] flex items-center justify-between gap-4">
              <p 
                className="text-[#F4F6FF] font-mono text-lg break-all flex-1 select-text"
                style={{ userSelect: 'text', WebkitUserSelect: 'text' }}
              >
                {getFlag()}
              </p>
              <button
                onClick={handleCopyFlag}
                className="flex items-center gap-2 text-[#00F0FF] hover:text-[#F4F6FF] transition-colors font-mono text-sm px-3 py-2 border border-[rgba(0,240,255,0.25)] hover:border-[rgba(0,240,255,0.5)] touch-manipulation"
                title="Copy flag"
                type="button"
              >
                {flagCopied ? <Check size={16} /> : <Copy size={16} />}
                {flagCopied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="text-[#A7ACB8] text-sm mt-4 italic">
              Use this flag to unlock the SQLi writeup in the navbar.
            </p>
          </div>
        )}

        {/* Hint Modal */}
        {showHint && createPortal(
          <div 
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-[rgba(5,6,11,0.95)] backdrop-blur-sm p-4"
            onClick={() => setShowHint(false)}
            style={{ isolation: 'isolate' }}
          >
            <div 
              className="cyber-border p-8 bg-[#0B0D14] border-[rgba(0,240,255,0.5)] max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6 sticky top-0 bg-[#0B0D14] pb-4 -mt-2 pt-2">
                <div className="flex items-center gap-3">
                  <HelpCircle size={32} className="text-[#00F0FF]" />
                  <h3 className="text-2xl font-bold text-[#F4F6FF]">
                    SQL Injection Hint
                  </h3>
                </div>
                <button
                  onClick={() => setShowHint(false)}
                  className="text-[#A7ACB8] hover:text-[#00F0FF] transition-colors z-10"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="space-y-4 text-[#A7ACB8]">
                <div>
                  <h4 className="text-[#00F0FF] font-semibold mb-2">What to Look For</h4>
                  <p>
                    This is an authentication form. The challenge is about finding a way to bypass the login without knowing the actual password.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-[#00F0FF] font-semibold mb-2">The Vulnerability</h4>
                  <p>
                    The form might be vulnerable to <strong className="text-[#F4F6FF]">SQL Injection</strong>. 
                    This happens when user input is directly inserted into a SQL query without proper sanitization.
                  </p>
                </div>
                
                <div>
                  <h4 className="text-[#00F0FF] font-semibold mb-2">How SQL Injection Works</h4>
                  <p>
                    If the backend query looks like: <code className="text-[#00F0FF] font-mono bg-[#05060B] px-1">WHERE username = 'username' AND password = 'password'</code>
                  </p>
                  <p className="mt-2">
                    You can try to break out of the password string and add a condition that's always true.
                  </p>
                </div>
                
                <div className="bg-[#05060B] p-4 border border-[rgba(0,240,255,0.25)] mt-4">
                  <p className="text-[#00F0FF] font-mono text-sm">
                    💡 Try entering something in the password field that would make the SQL condition always evaluate to true.
                  </p>
                </div>
                
                <div className="pt-4 border-t border-[rgba(0,240,255,0.1)]">
                  <p className="text-sm italic text-[#A7ACB8]">
                    Username hint: Try "admin"
                  </p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

        {/* Super Hint Modal */}
        {showSuperHint && createPortal(
          <div 
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-[rgba(5,6,11,0.95)] backdrop-blur-sm p-4"
            onClick={() => setShowSuperHint(false)}
            style={{ isolation: 'isolate' }}
          >
            <div 
              className="cyber-border p-8 bg-[#0B0D14] border-[rgba(0,240,255,0.5)] max-w-lg w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowSuperHint(false)}
                className="absolute top-4 right-4 text-[#A7ACB8] hover:text-[#00F0FF] transition-colors z-10 bg-[#0B0D14] p-1 rounded"
              >
                <X size={24} />
              </button>
              
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle size={32} className="text-[#00F0FF]" />
                <h3 className="text-2xl font-bold text-[#F4F6FF]">
                  Answer
                </h3>
              </div>
              
              <div className="space-y-4 text-[#A7ACB8]">
                <p>
                  If you're completely stuck, here's the exact password payload:
                </p>
                <div className="bg-[#05060B] p-4 border border-[rgba(0,240,255,0.25)]">
                  <p className="text-[#00F0FF] font-mono text-lg text-center">
                    ' or 1=1--
                  </p>
                </div>
                <p className="text-sm italic text-[#A7ACB8]">
                  Username: <span className="text-[#00F0FF] font-mono">admin</span>
                </p>
                <p className="text-xs text-[#A7ACB8] pt-2 border-t border-[rgba(0,240,255,0.1)]">
                  Note: You can also add text before the payload, like "xyz' or 1=1--"
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}

        {/* "Nice Try" Message */}
        {showNiceTry && createPortal(
          <div 
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-[rgba(5,6,11,0.95)] backdrop-blur-sm"
            onClick={() => setShowNiceTry(false)}
            style={{ isolation: 'isolate' }}
          >
            <div 
              className="cyber-border p-8 bg-[rgba(0,240,255,0.1)] border-[rgba(0,240,255,0.5)] text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <AlertTriangle size={48} className="text-[#00F0FF] mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-[#F4F6FF] mb-2">Nice Try</h3>
              <p className="text-[#A7ACB8] mb-4">Try solving it the proper way!</p>
              <button
                onClick={() => setShowNiceTry(false)}
                className="btn-cyber text-sm"
              >
                Close
              </button>
            </div>
          </div>,
          document.body
        )}
      </div>
    </section>
  );
}
