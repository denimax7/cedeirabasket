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
            'mb-3 text-xs font-semibold uppercase tracking-[0.2em] font-body',
            light ? 'text-blue' : 'text-blue',
          )}
        >
          {kicker}
        </p>
      )}
      <h2
        className={cn(
          'font-display font-black text-4xl sm:text-5xl uppercase tracking-tight leading-none',
          light ? 'text-white' : 'text-black',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed font-body',
            light ? 'text-gray-300' : 'text-gray-300',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
