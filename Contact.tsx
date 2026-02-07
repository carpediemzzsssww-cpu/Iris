import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { Button } from '@/components/ui/button';

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: 'iris@example.com',
    href: 'mailto:iris@example.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/iriszhou',
    href: 'https://linkedin.com',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/iriszhou',
    href: 'https://github.com',
  },
];

export function Contact() {
  return (
    <section className="py-16">
      <div className="max-w-content mx-auto px-6">
        <RevealOnScroll>
          <div className="relative p-8 md:p-12 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] overflow-hidden">
            {/* Background gradient */}
            <div 
              className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none"
              style={{ background: 'var(--grad)' }}
            />
            
            <div className="relative z-10">
              {/* Status badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[rgba(15,118,110,0.1)] border border-[rgba(15,118,110,0.2)] mb-6">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-teal)] animate-pulse" />
                <span className="text-sm font-medium text-[var(--accent-teal)]">
                  Open to internship opportunities
                </span>
              </div>
              
              <h2 className="text-3xl font-bold text-[var(--text)] mb-4">
                Let's work together
              </h2>
              
              <p className="text-[var(--text-muted)] max-w-lg mb-8">
                I'm always interested in hearing about new projects and opportunities. 
                Whether you have a question or just want to say hi, feel free to reach out.
              </p>
              
              {/* Contact links */}
              <div className="flex flex-wrap gap-4 mb-8">
                {contactLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <motion.div
                      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[var(--bg)] border border-[var(--border-color)] hover:border-[rgba(15,118,110,0.3)] transition-colors"
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.15 }}
                    >
                      <link.icon className="w-5 h-5 text-[var(--accent-teal)]" />
                      <div>
                        <div className="text-xs text-[var(--text-muted)]">{link.label}</div>
                        <div className="text-sm font-medium text-[var(--text)]">{link.value}</div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] ml-2" />
                    </motion.div>
                  </a>
                ))}
              </div>
              
              {/* CTA */}
              <a href="mailto:iris@example.com">
                <Button 
                  size="lg"
                  className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white"
                >
                  Get in Touch
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
