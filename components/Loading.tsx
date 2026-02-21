import { Loader2 } from 'lucide-react'

interface LoadingProps {
  text?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function Loading({ text = 'Loading...', size = 'md' }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className={`${sizeClasses[size]} animate-spin text-[#3AA17E] mb-2`} />
      <p className="text-gray-600 text-sm">{text}</p>
    </div>
  )
}
