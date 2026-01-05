import React from 'react'

export const Column: React.FC<{ title?: string }> = ({ title }) => {
  return <div>{title || 'Column'}</div>
}
