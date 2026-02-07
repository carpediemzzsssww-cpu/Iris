import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { ProjectCard } from '@/components/ProjectCard';
import { TagPill } from '@/components/TagPill';
import type { Project } from '@/types';

type SortOption = 'latest' | 'impact' | 'technical';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('latest');

  useEffect(() => {
    fetch('/data/projects.json')
      .then(res => res.json())
      .then((data: Project[]) => setProjects(data));
  }, []);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(p => p.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [projects]);

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let result = [...projects];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.oneLiner.toLowerCase().includes(query)
      );
    }

    // Tag filter
    if (selectedTags.length > 0) {
      result = result.filter(p => 
        selectedTags.some(tag => p.tags.includes(tag))
      );
    }

    // Sort
    switch (sortBy) {
      case 'latest':
        // Assume projects are already sorted by date
        break;
      case 'impact':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      case 'technical':
        result.sort((a, b) => b.tags.length - a.tags.length);
        break;
    }

    return result;
  }, [projects, searchQuery, selectedTags, sortBy]);

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const regularProjects = filteredProjects.filter(p => !p.featured);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <main className="pt-24 pb-16">
      <div className="max-w-content mx-auto px-6">
        {/* Page Header */}
        <RevealOnScroll>
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-[var(--text)] mb-3">
              Projects
            </h1>
            <p className="text-[var(--text-muted)] max-w-xl">
              A collection of my work spanning product design, AI research, and full-stack development. 
              Each project represents a unique challenge and learning opportunity.
            </p>
          </div>
        </RevealOnScroll>

        {/* Toolbar */}
        <RevealOnScroll delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[var(--surface)] border-[var(--border-color)]"
              />
            </div>

            {/* Sort */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="border-[var(--border-color)] hover:bg-[var(--surface)]"
                >
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSortBy('latest')}>
                  Latest
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('impact')}>
                  Most Impact
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('technical')}>
                  Most Technical
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </RevealOnScroll>

        {/* Tags */}
        <RevealOnScroll delay={0.15}>
          <div className="flex flex-wrap gap-2 mb-10">
            {allTags.map(tag => (
              <TagPill
                key={tag}
                onClick={() => toggleTag(tag)}
                active={selectedTags.includes(tag)}
              >
                {tag}
              </TagPill>
            ))}
          </div>
        </RevealOnScroll>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-12">
            <h2 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-4">
              Featured
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProjectCard
                    slug={project.slug}
                    title={project.title}
                    oneLiner={project.oneLiner}
                    outcome={project.outcome}
                    tags={project.tags}
                    featured={true}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Projects */}
        {regularProjects.length > 0 && (
          <div>
            {featuredProjects.length > 0 && (
              <h2 className="text-sm font-medium text-[var(--text-muted)] uppercase tracking-wider mb-4">
                All Projects
              </h2>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularProjects.map((project, index) => (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProjectCard
                    slug={project.slug}
                    title={project.title}
                    oneLiner={project.oneLiner}
                    outcome={project.outcome}
                    tags={project.tags}
                    featured={false}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-[var(--text-muted)]">No projects found matching your criteria.</p>
            <Button 
              variant="ghost" 
              onClick={() => {
                setSearchQuery('');
                setSelectedTags([]);
              }}
              className="mt-4"
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
