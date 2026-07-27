import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  kicker?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  light?: boolean
  className?: string
}

export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = 'center',
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {kicker && (
        <p
          className={cn(
            'mb-3 text-sm font-semibold uppercase tracking-widest font-body',
            light ? 'text-blue-bright' : 'text-blue',
          )}
        >
          {kicker}
        </p>
      )}
      <h2
        className={cn(
          'font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl',
          light ? 'text-white' : 'text-black',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-lg leading-relaxed font-body',
            light ? 'text-gray-300' : 'text-gray-300',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
