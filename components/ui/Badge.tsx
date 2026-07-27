import { cn } from '@/lib/utils'

type BadgeVariant = 'blue' | 'navy' | 'white' | 'outline'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  blue: 'bg-blue text-white',
  navy: 'bg-navy text-white',
  white: 'bg-white text-black',
  outline: 'border border-gray-300 text-black bg-transparent',
}

export function Badge({ children, variant = 'blue', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide font-body',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
