interface LoaderProps {
  size?: 'small' | 'medium' | 'large'
  text?: string
  className?: string
}

export function Loader({ 
  size = 'medium', 
  text = 'Loading...',
  className = ''
}: LoaderProps) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <div 
        className={`${sizeClasses[size]} border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <span className="mt-2 text-sm text-gray-600" aria-live="polite">
          {text}
        </span>
      )}
    </div>
  )
}
