import { cn } from '@/lib/utils';

interface TagPillProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'filled';
  onClick?: () => void;
  active?: boolean;
}

export function TagPill({ 
  children, 
  className = '', 
  variant = 'default',
  onClick,
  active = false
}: TagPillProps) {
  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center px-3 py-1 text-xs font-medium rounded-full transition-all duration-200',
        'select-none',
        onClick && 'cursor-pointer hover:scale-105',
        variant === 'default' && [
          'bg-[var(--surface)] text-[var(--text-muted)]',
          'border border-[var(--border-color)]',
          'hover:border-[rgba(15,118,110,0.3)] hover:text-[var(--accent-teal)]',
          active && 'border-[rgba(15,118,110,0.5)] text-[var(--accent-teal)] bg-[rgba(15,118,110,0.08)]'
        ],
        variant === 'outline' && [
          'bg-transparent text-[var(--text-muted)]',
          'border border-[var(--border-color)]',
          'hover:border-[var(--accent-teal)] hover:text-[var(--accent-teal)]'
        ],
        variant === 'filled' && [
          'bg-[rgba(15,118,110,0.1)] text-[var(--accent-teal)]',
          'border border-transparent'
        ],
        className
      )}
    >
      {children}
    </span>
  );
}
