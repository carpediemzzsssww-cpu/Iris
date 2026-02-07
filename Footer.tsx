import { Link } from 'react-router-dom';
import { Mail, FileText, Github, Linkedin, Heart } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Learning', href: '/learning' },
  { label: 'AI Lab', href: '/ai-lab' },
  { label: 'About', href: '/about' },
];

const socialLinks = [
  { icon: Mail, href: 'mailto:iris@example.com', label: 'Email' },
  { icon: FileText, href: '/resume.pdf', label: 'Resume' },
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-[var(--border-color)]">
      {/* Gradient background */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ background: 'var(--grad)' }}
      />
      
      <div className="relative max-w-content mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block">
              <span className="text-xl font-bold text-[var(--text)]">Iris Zhou</span>
            </Link>
            <p className="mt-3 text-sm text-[var(--text-muted)] max-w-xs">
              Product Designer & AI Researcher. Building meaningful experiences through design and technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text)] mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--accent-teal)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text)] mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="p-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--accent-teal)] hover:border-[rgba(15,118,110,0.3)] transition-all"
                  aria-label={link.label}
                >
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm text-[var(--text-muted)]">
              Open to internship opportunities
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} Iris Zhou. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
