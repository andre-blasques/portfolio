interface TagProps {
  children: React.ReactNode
  variant?: 'default' | 'accent'
}

export function Tag({ children, variant = 'default' }: TagProps) {
  const base = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium'
  const variants = {
    default: 'bg-[var(--surface)] text-[var(--text-muted)]',
    accent: 'bg-[#09f]/10 text-[#09f]',
  }
  return <span className={`${base} ${variants[variant]}`}>{children}</span>
}
