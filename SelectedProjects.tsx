import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { ProjectCard } from '@/components/ProjectCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { Project } from '@/types';

export function SelectedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/data/projects.json')
      .then(res => res.json())
      .then((data: Project[]) => {
        setProjects(data.filter(p => p.featured));
      });
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-content mx-auto px-6">
        <RevealOnScroll>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[var(--text)]">
              Selected Projects
            </h2>
            <Link to="/projects">
              <Button 
                variant="ghost" 
                className="text-[var(--accent-teal)] hover:text-[var(--accent-teal)] hover:bg-[rgba(15,118,110,0.1)]"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <RevealOnScroll key={project.slug} delay={index * 0.08}>
              <ProjectCard
                slug={project.slug}
                title={project.title}
                oneLiner={project.oneLiner}
                outcome={project.outcome}
                tags={project.tags}
                featured={project.featured}
              />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
