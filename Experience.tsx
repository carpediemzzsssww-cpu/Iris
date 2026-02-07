import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { RevealOnScroll, StaggerContainer, StaggerItem } from '@/components/RevealOnScroll';

interface ExperienceItem {
  role: string;
  org: string;
  date: string;
  impact: string;
  details: string[];
}

const experiences: ExperienceItem[] = [
  {
    role: 'Product Design Intern',
    org: 'TechCorp',
    date: '2024.06 - Present',
    impact: 'Led redesign of core user flow, increasing conversion by 35%',
    details: [
      'Conducted user research with 50+ participants to identify pain points',
      'Designed and prototyped new onboarding experience',
      'Collaborated with engineering to ensure design fidelity',
      'Presented findings to executive team and stakeholders',
    ],
  },
  {
    role: 'UX Research Assistant',
    org: 'University Lab',
    date: '2023.09 - 2024.05',
    impact: 'Published 2 papers on human-AI interaction',
    details: [
      'Designed and ran usability studies for AI-powered tools',
      'Analyzed qualitative data from 100+ user sessions',
      'Developed new methods for evaluating AI transparency',
      'Co-authored research papers submitted to CHI and UIST',
    ],
  },
  {
    role: 'Freelance Designer',
    org: 'Self-employed',
    date: '2022.06 - 2023.08',
    impact: 'Delivered 15+ projects with 100% client satisfaction',
    details: [
      'Designed websites and mobile apps for startups',
      'Created brand identities and design systems',
      'Managed client relationships and project timelines',
      'Built portfolio showcasing diverse design skills',
    ],
  },
  {
    role: 'Teaching Assistant',
    org: 'Design School',
    date: '2022.01 - 2022.12',
    impact: 'Mentored 80+ students in UX design courses',
    details: [
      'Led weekly studio sessions and design critiques',
      'Developed course materials and assignments',
      'Provided one-on-one mentorship to students',
      'Received 4.9/5 average student evaluation',
    ],
  },
];

function ExperienceCard({ experience }: { experience: ExperienceItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative pl-8 pb-8 last:pb-0">
      {/* Timeline line */}
      <div className="absolute left-0 top-2 bottom-0 w-px bg-[var(--border-color)]" />
      
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--accent-teal)]" />
      
      {/* Content */}
      <div 
        className="cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-[var(--text)] group-hover:text-[var(--accent-teal)] transition-colors">
              {experience.role}
            </h3>
            <p className="text-sm text-[var(--text-muted)] mt-0.5">
              {experience.org} · {experience.date}
            </p>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
          </motion.div>
        </div>
        
        <p className="text-sm text-[var(--text)] mt-2">
          {experience.impact}
        </p>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <ul className="mt-4 space-y-2">
                {experience.details.map((detail, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="text-sm text-[var(--text-muted)] flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--accent-teal)] mt-2 flex-shrink-0" />
                    {detail}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <section className="py-16">
      <div className="max-w-content mx-auto px-6">
        <RevealOnScroll>
          <h2 className="text-2xl font-bold text-[var(--text)] mb-8">
            Experience
          </h2>
        </RevealOnScroll>

        <StaggerContainer className="max-w-2xl">
          {experiences.map((exp) => (
            <StaggerItem key={exp.role + exp.org}>
              <ExperienceCard experience={exp} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
