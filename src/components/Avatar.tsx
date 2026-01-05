import React from 'react'

export const Avatar: React.FC<{ src?: string; alt?: string }> = ({ src, alt }) => (
  <img src={src} alt={alt || 'avatar'} style={{ width: 32, height: 32, borderRadius: '50%' }} />
)
