import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { TagPill } from '@/components/TagPill';

const skillCategories = [
  {
    name: 'AI / ML',
    skills: ['Machine Learning', 'Prompt Engineering', 'LLM Integration', 'Data Analysis', 'Python'],
  },
  {
    name: 'Product',
    skills: ['Product Strategy', 'User Research', 'A/B Testing', 'Metrics', 'Roadmapping'],
  },
  {
    name: 'Design',
    skills: ['UI/UX Design', 'Design Systems', 'Figma', 'Prototyping', 'Visual Design'],
  },
  {
    name: 'Data',
    skills: ['SQL', 'Python', 'Data Visualization', 'Statistical Analysis', 'A/B Testing'],
  },
  {
    name: 'Build',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Git'],
  },
];

export function Skills() {
  return (
    <section className="py-16">
      <div className="max-w-content mx-auto px-6">
        <RevealOnScroll>
          <h2 className="text-2xl font-bold text-[var(--text)] mb-8">
            Skills
          </h2>
        </RevealOnScroll>

        <div className="space-y-6">
          {skillCategories.map((category, categoryIndex) => (
            <RevealOnScroll key={category.name} delay={categoryIndex * 0.08}>
              <div className="group">
                <h3 className="text-sm font-medium text-[var(--text-muted)] mb-3">
                  {category.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.15 }}
                    >
                      <TagPill 
                        variant="outline"
                        className="group-hover:border-[rgba(15,118,110,0.3)] transition-colors"
                      >
                        {skill}
                      </TagPill>
                    </motion.div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
