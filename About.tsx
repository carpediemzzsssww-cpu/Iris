import { ArrowUpRight } from 'lucide-react';
import { RevealOnScroll, StaggerContainer, StaggerItem } from '@/components/RevealOnScroll';
import { Button } from '@/components/ui/button';
import { Sparkles, Users, Zap, Target } from 'lucide-react';

const strengths = [
  {
    icon: Sparkles,
    title: 'Design Thinking',
    description: 'Approach problems with empathy and creativity, balancing user needs with business goals.',
  },
  {
    icon: Users,
    title: 'User-Centered',
    description: 'Deep commitment to understanding users through research and iterative testing.',
  },
  {
    icon: Zap,
    title: 'Rapid Prototyping',
    description: 'Quickly translate ideas into testable prototypes to validate assumptions.',
  },
  {
    icon: Target,
    title: 'Data-Driven',
    description: 'Use metrics and insights to inform decisions and measure impact.',
  },
];

const workingStyle = [
  'Collaborative and communicative',
  'Detail-oriented with big-picture thinking',
  'Continuous learner and experimenter',
];

const education = [
  {
    degree: 'M.S. in Human-Computer Interaction',
    school: 'Carnegie Mellon University',
    year: '2023 - 2025',
  },
  {
    degree: 'B.S. in Computer Science',
    school: 'University of California, Berkeley',
    year: '2019 - 2023',
  },
];

export function About() {
  return (
    <main className="pt-24 pb-16">
      <div className="max-w-content mx-auto px-6">
        {/* Header */}
        <RevealOnScroll>
          <div className="mb-12">
            <h1 className="text-3xl font-bold text-[var(--text)] mb-6">
              About Me
            </h1>
          </div>
        </RevealOnScroll>

        {/* Bio */}
        <RevealOnScroll delay={0.05}>
          <section className="mb-16">
            <div className="max-w-2xl">
              <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-6">
                I'm Iris Zhou, a product designer and AI researcher passionate about creating 
                intelligent products that truly serve people's needs. With a background in both 
                design and engineering, I bridge the gap between user experience and technical implementation.
              </p>
              <p className="text-lg text-[var(--text-muted)] leading-relaxed">
                My work focuses on the intersection of AI and human-centered design—exploring how 
                emerging technologies can enhance rather than replace human capabilities. I believe 
                in the power of research-driven design and iterative validation.
              </p>
            </div>
          </section>
        </RevealOnScroll>

        {/* Strengths */}
        <RevealOnScroll delay={0.1}>
          <section className="mb-16">
            <h2 className="text-xl font-semibold text-[var(--text)] mb-6">
              Key Strengths
            </h2>
            <StaggerContainer className="grid md:grid-cols-2 gap-4">
              {strengths.map((strength) => (
                <StaggerItem key={strength.title}>
                  <div className="p-5 rounded-xl bg-[var(--surface)] border border-[var(--border-color)]">
                    <div className="w-10 h-10 rounded-lg bg-[rgba(15,118,110,0.1)] flex items-center justify-center mb-4">
                      <strength.icon className="w-5 h-5 text-[var(--accent-teal)]" />
                    </div>
                    <h3 className="font-semibold text-[var(--text)] mb-2">{strength.title}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{strength.description}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </section>
        </RevealOnScroll>

        {/* Working Style */}
        <RevealOnScroll delay={0.15}>
          <section className="mb-16">
            <h2 className="text-xl font-semibold text-[var(--text)] mb-6">
              Working Style
            </h2>
            <div className="flex flex-wrap gap-3">
              {workingStyle.map((style) => (
                <div 
                  key={style}
                  className="px-4 py-2 rounded-full bg-[var(--surface)] border border-[var(--border-color)] text-sm text-[var(--text)]"
                >
                  {style}
                </div>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        {/* Education */}
        <RevealOnScroll delay={0.2}>
          <section className="mb-16">
            <h2 className="text-xl font-semibold text-[var(--text)] mb-6">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div 
                  key={edu.degree}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-[var(--surface)] border border-[var(--border-color)]"
                >
                  <div>
                    <h3 className="font-medium text-[var(--text)]">{edu.degree}</h3>
                    <p className="text-sm text-[var(--text-muted)]">{edu.school}</p>
                  </div>
                  <span className="text-sm text-[var(--text-muted)] mt-2 sm:mt-0">{edu.year}</span>
                </div>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        {/* Contact CTA */}
        <RevealOnScroll delay={0.25}>
          <section>
            <div className="p-8 rounded-2xl bg-[var(--surface)] border border-[var(--border-color)] text-center">
              <h2 className="text-2xl font-bold text-[var(--text)] mb-3">
                Let's connect
              </h2>
              <p className="text-[var(--text-muted)] mb-6 max-w-md mx-auto">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
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
          </section>
        </RevealOnScroll>
      </div>
    </main>
  );
}
