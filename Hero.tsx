import { motion } from 'framer-motion';
import { ArrowRight, Mail, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(ellipse at 70% 30%, rgba(15, 118, 110, 0.08) 0%, transparent 50%)',
        }}
      />
      
      {/* Particle background */}
      <div className="absolute right-0 top-1/4 w-1/2 h-1/2 opacity-60">
        <ParticleBackground particleCount={25} />
      </div>

      <div className="relative max-w-content mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[rgba(15,118,110,0.1)] text-[var(--accent-teal)]">
                Open to internship opportunities
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text)] leading-tight mb-6"
            >
              Iris Zhou
              <span className="block text-2xl sm:text-3xl lg:text-4xl font-medium text-[var(--text-muted)] mt-2">
                Product Designer & AI Researcher
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-[var(--text-muted)] max-w-lg mb-8"
            >
              I design intelligent products that bridge human needs with AI capabilities. 
              Passionate about creating meaningful experiences through research-driven design.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <Link to="/projects">
                <Button 
                  size="lg"
                  className="bg-[var(--accent)] hover:bg-[var(--accent)]/90 text-white group"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <a href="mailto:iris@example.com">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-[var(--border-color)] hover:bg-[var(--surface)]"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Me
                </Button>
              </a>
              
              <a href="/resume.pdf">
                <Button 
                  variant="ghost" 
                  size="lg"
                  className="hover:bg-[var(--surface)]"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              </a>
            </motion.div>
          </motion.div>

          {/* Right content - Visual element */}
          <motion.div
            className="hidden lg:flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="relative w-80 h-80">
              {/* Animated gradient orb */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'var(--grad)',
                  filter: 'blur(40px)',
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              
              {/* Inner content */}
              <div className="absolute inset-8 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] flex items-center justify-center backdrop-blur-sm">
                <div className="text-center">
                  <div className="text-5xl font-bold gradient-text mb-2">5+</div>
                  <div className="text-sm text-[var(--text-muted)]">Years Experience</div>
                  <div className="mt-6 flex justify-center gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-[var(--text)]">20+</div>
                      <div className="text-xs text-[var(--text-muted)]">Projects</div>
                    </div>
                    <div className="w-px bg-[var(--border-color)]" />
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-[var(--text)]">10+</div>
                      <div className="text-xs text-[var(--text-muted)]">Awards</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
