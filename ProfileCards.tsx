import { motion } from 'framer-motion';
import { Layers, Brain, Search, Code } from 'lucide-react';
import { RevealOnScroll, StaggerContainer, StaggerItem } from '@/components/RevealOnScroll';

const profiles = [
  {
    icon: Layers,
    title: 'Product',
    description: 'Product design & strategy',
    color: 'from-blue-500/20 to-indigo-500/20',
  },
  {
    icon: Brain,
    title: 'AI',
    description: 'AI/ML applications',
    color: 'from-teal-500/20 to-emerald-500/20',
  },
  {
    icon: Search,
    title: 'Research',
    description: 'User research & insights',
    color: 'from-purple-500/20 to-pink-500/20',
  },
  {
    icon: Code,
    title: 'Build',
    description: 'Full-stack development',
    color: 'from-orange-500/20 to-amber-500/20',
  },
];

export function ProfileCards() {
  return (
    <section className="py-16">
      <div className="max-w-content mx-auto px-6">
        <RevealOnScroll>
          <h2 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-8 text-center">
            What I Do
          </h2>
        </RevealOnScroll>

        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {profiles.map((profile) => (
            <StaggerItem key={profile.title}>
              <motion.div
                className="group relative p-5 rounded-xl bg-[var(--surface)] border border-[var(--border-color)] cursor-default"
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Gradient glow on hover */}
                <motion.div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-br ${profile.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
                
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-lg bg-[var(--bg)] border border-[var(--border-color)] flex items-center justify-center mb-4 group-hover:border-[rgba(15,118,110,0.3)] transition-colors">
                    <profile.icon className="w-5 h-5 text-[var(--accent-teal)]" />
                  </div>
                  
                  <h3 className="font-semibold text-[var(--text)] mb-1">
                    {profile.title}
                  </h3>
                  
                  <p className="text-sm text-[var(--text-muted)]">
                    {profile.description}
                  </p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
