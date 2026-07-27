import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  dark?: boolean
}

export function Card({ children, className, dark = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-md p-6 shadow-sm transition-shadow duration-200 hover:shadow-md',
        dark
          ? 'bg-navy text-white border border-white/10'
          : 'bg-white text-black border border-gray-300',
        className,
      )}
    >
      {children}
    </div>
  )
}
