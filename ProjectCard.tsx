import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { TagPill } from './TagPill';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  slug: string;
  title: string;
  oneLiner: string;
  outcome: string;
  tags: string[];
  featured?: boolean;
}

export function ProjectCard({ 
  slug, 
  title, 
  oneLiner, 
  outcome, 
  tags,
  featured = false 
}: ProjectCardProps) {
  return (
    <Link to={`/projects/${slug}`}>
      <motion.div
        className={`
          relative group p-5 rounded-xl 
          bg-[var(--surface)] 
          border border-[var(--border-color)]
          transition-colors duration-200
          overflow-hidden
          ${featured ? 'gradient-border' : ''}
        `}
        whileHover={{ 
          y: -4,
          transition: { duration: 0.2, ease: 'easeOut' }
        }}
        style={{
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {/* Hover shadow overlay */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          style={{
            boxShadow: 'var(--shadow-hover)',
          }}
        />

        {/* Trajectory line animation */}
        <svg
          className="absolute bottom-0 left-0 w-full h-full pointer-events-none overflow-visible"
          style={{ zIndex: 1 }}
        >
          <motion.path
            d="M 0 120 Q 80 80 160 20"
            fill="none"
            stroke="rgba(15, 118, 110, 0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            whileHover={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </svg>

        {/* Content */}
        <div className="relative z-10">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {tags.slice(0, 3).map((tag) => (
              <TagPill key={tag} variant="filled">{tag}</TagPill>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-[var(--text)] mb-2 group-hover:text-[var(--accent-teal)] transition-colors">
            {title}
          </h3>

          {/* One-liner */}
          <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">
            {oneLiner}
          </p>

          {/* Outcome */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--accent)]">
              {outcome}
            </span>
            <motion.span
              className="flex items-center text-xs text-[var(--text-muted)] group-hover:text-[var(--accent-teal)] transition-colors"
              whileHover={{ x: 2 }}
            >
              View <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </motion.span>
          </div>
        </div>

        {/* Border highlight on hover */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none border border-[rgba(15,118,110,0.3)]"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </Link>
  );
}
