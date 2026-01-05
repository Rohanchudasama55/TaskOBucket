interface AvatarProps {
  src?: string
  alt?: string
  size?: number
  fallback?: string
  className?: string
}

export function Avatar({ 
  src, 
  alt, 
  size = 32, 
  fallback,
  className = ''
}: AvatarProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (fallback) {
      e.currentTarget.src = fallback
    }
  }

  return (
    <img 
      src={src} 
      alt={alt || 'User avatar'} 
      onError={handleImageError}
      className={`rounded-full object-cover ${className}`}
      style={{ 
        width: size, 
        height: size
      }} 
    />
  )
}
