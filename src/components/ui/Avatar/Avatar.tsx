import React from 'react';
import type { AvatarProps } from './Avatar.types';
import { DEFAULT_SIZE, DEFAULT_ALT, DEFAULT_CLASS_NAME } from './Avatar.constants';
import { getAvatarStyles } from './Avatar.styles';

export function Avatar({ 
  src, 
  alt, 
  size = DEFAULT_SIZE, 
  fallback,
  className = DEFAULT_CLASS_NAME
}: AvatarProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (fallback) {
      e.currentTarget.src = fallback;
    }
  };

  const avatarStyles = getAvatarStyles(className);

  return (
    <img 
      src={src} 
      alt={alt || DEFAULT_ALT} 
      onError={handleImageError}
      className={avatarStyles}
      style={{ 
        width: size, 
        height: size
      }} 
    />
  );
}