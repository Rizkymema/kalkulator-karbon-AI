import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

export default function Card({ 
  children, 
  className = '', 
  padding = 'md',
  hover = false 
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  }

  return (
    <div
      className={`
        bg-slate-900/40 backdrop-blur-md rounded-xl shadow-sm border border-white/5
        ${paddingClasses[padding]}
        ${hover ? 'hover:shadow-md hover:border-emerald-500/20 hover:bg-slate-900/60 transition-all duration-200' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
