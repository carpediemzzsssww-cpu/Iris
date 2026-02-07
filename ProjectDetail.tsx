import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Figma, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { ProjectCard } from '@/components/ProjectCard';
import type { Project } from '@/types';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('/data/projects.json')
      .then(res => res.json())
      .then((data: Project[]) => {
        const current = data.find(p => p.slug === slug);
        setProject(current || null);
        
        // Find related projects (same tags, excluding current)
        if (current) {
          const related = data
            .filter(p => p.slug !== slug && p.tags.some(t => current.tags.includes(t)))
            .slice(0, 3);
          setRelatedProjects(related);
        }
      });
  }, [slug]);

  if (!project) {
    return (
      <main className="pt-24 pb-16">
        <div className="max-w-content mx-auto px-6 text-center">
          <p className="text-[var(--text-muted)]">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-content mx-auto px-6">
        {/* Back button */}
        <RevealOnScroll>
          <Button
            variant="ghost"
            onClick={() => navigate('/projects')}
            className="mb-6 -ml-2 text-[var(--text-muted)] hover:text-[var(--text)]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </RevealOnScroll>

        {/* Header */}
        <RevealOnScroll>
          <div className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map(tag => (
                <Badge 
                  key={tag}
                  variant="secondary"
                  className="bg-[rgba(15,118,110,0.1)] text-[var(--accent-teal)] hover:bg-[rgba(15,118,110,0.15)]"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-[var(--text-muted)] max-w-2xl">
              {project.oneLiner}
            </p>
          </div>
        </RevealOnScroll>

        {/* Meta */}
        <RevealOnScroll delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 p-6 rounded-xl bg-[var(--surface)] border border-[var(--border-color)]">
            <div>
              <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Role</div>
              <div className="text-sm font-medium text-[var(--text)]">{project.role}</div>
            </div>
            <div>
              <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Timeline</div>
              <div className="text-sm font-medium text-[var(--text)]">{project.time}</div>
            </div>
            <div>
              <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Outcome</div>
              <div className="text-sm font-medium text-[var(--accent)]">{project.outcome}</div>
            </div>
            <div>
              <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-1">Links</div>
              <div className="flex gap-2">
                {project.links.demo && (
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                    <Play className="w-4 h-4 text-[var(--text-muted)] hover:text-[var(--accent-teal)]" />
                  </a>
                )}
                {project.links.figma && (
                  <a href={project.links.figma} target="_blank" rel="noopener noreferrer">
                    <Figma className="w-4 h-4 text-[var(--text-muted)] hover:text-[var(--accent-teal)]" />
                  </a>
                )}
                {project.links.repo && (
                  <a href={project.links.repo} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 text-[var(--text-muted)] hover:text-[var(--accent-teal)]" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Content */}
        <div className="space-y-12">
          {/* Problem */}
          <RevealOnScroll>
            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">Problem</h2>
              <p className="text-[var(--text-muted)] leading-relaxed">
                {project.sections.problem}
              </p>
            </section>
          </RevealOnScroll>

          {/* Insights */}
          <RevealOnScroll>
            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">Key Insights</h2>
              <ul className="space-y-3">
                {project.sections.insight.map((insight, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-3 text-[var(--text-muted)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-teal)] mt-2 flex-shrink-0" />
                    {insight}
                  </li>
                ))}
              </ul>
            </section>
          </RevealOnScroll>

          {/* Solution */}
          <RevealOnScroll>
            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">Solution</h2>
              <p className="text-[var(--text-muted)] leading-relaxed">
                {project.sections.solution}
              </p>
            </section>
          </RevealOnScroll>

          {/* Results */}
          <RevealOnScroll>
            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">Results</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.sections.result.map((result, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg bg-[var(--surface)] border border-[var(--border-color)]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-[rgba(15,118,110,0.1)] text-[var(--accent-teal)] flex items-center justify-center text-xs font-medium flex-shrink-0">
                        {index + 1}
                      </span>
                      <span className="text-[var(--text-muted)]">{result}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </RevealOnScroll>

          {/* Learnings */}
          <RevealOnScroll>
            <section>
              <h2 className="text-xl font-semibold text-[var(--text)] mb-4">Key Learnings</h2>
              <ul className="space-y-3">
                {project.sections.learnings.map((learning, index) => (
                  <li 
                    key={index}
                    className="flex items-start gap-3 text-[var(--text-muted)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 flex-shrink-0" />
                    {learning}
                  </li>
                ))}
              </ul>
            </section>
          </RevealOnScroll>
        </div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <RevealOnScroll>
            <section className="mt-16 pt-10 border-t border-[var(--border-color)]">
              <h2 className="text-xl font-semibold text-[var(--text)] mb-6">
                Related Projects
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedProjects.map(p => (
                  <ProjectCard
                    key={p.slug}
                    slug={p.slug}
                    title={p.title}
                    oneLiner={p.oneLiner}
                    outcome={p.outcome}
                    tags={p.tags}
                    featured={p.featured}
                  />
                ))}
              </div>
            </section>
          </RevealOnScroll>
        )}
      </div>
    </main>
  );
}
