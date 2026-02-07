import { motion } from 'framer-motion';
import { Play, Figma, FileText, ExternalLink } from 'lucide-react';
import { RevealOnScroll, StaggerContainer, StaggerItem } from '@/components/RevealOnScroll';
import { Button } from '@/components/ui/button';

const presentations = [
  {
    icon: Play,
    title: 'AI in Design Workflow',
    description: 'Demo of integrating AI tools into the design process for faster iteration and better outcomes.',
    link: 'https://youtube.com',
    linkText: 'Watch Demo',
    color: 'bg-red-500/10 text-red-500',
  },
  {
    icon: Figma,
    title: 'Design System Case Study',
    description: 'Complete Figma file showing the creation of an enterprise design system from scratch.',
    link: 'https://figma.com',
    linkText: 'View in Figma',
    color: 'bg-purple-500/10 text-purple-500',
  },
  {
    icon: FileText,
    title: 'Research-Driven Design',
    description: 'Article on using user research to inform design decisions and measure impact.',
    link: 'https://medium.com',
    linkText: 'Read Article',
    color: 'bg-blue-500/10 text-blue-500',
  },
];

export function Presentation() {
  return (
    <section className="py-16">
      <div className="max-w-content mx-auto px-6">
        <RevealOnScroll>
          <h2 className="text-2xl font-bold text-[var(--text)] mb-8">
            Featured
          </h2>
        </RevealOnScroll>

        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {presentations.map((item) => (
            <StaggerItem key={item.title}>
              <motion.div
                className="group p-6 rounded-xl bg-[var(--surface)] border border-[var(--border-color)] h-full flex flex-col"
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.2 }
                }}
              >
                <div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center mb-4`}>
                  <item.icon className="w-6 h-6" />
                </div>
                
                <h3 className="font-semibold text-[var(--text)] mb-2">
                  {item.title}
                </h3>
                
                <p className="text-sm text-[var(--text-muted)] mb-4 flex-grow">
                  {item.description}
                </p>
                
                <a 
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-[var(--accent-teal)] hover:text-[var(--accent-teal)] hover:bg-[rgba(15,118,110,0.1)] px-0"
                  >
                    {item.linkText}
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </a>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
