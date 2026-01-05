import React from 'react'
import type { Issue } from '../../types/issue'

interface IssueCardProps {
  issue: Issue
  onEdit?: (issue: Issue) => void
  onDelete?: (id: string) => void
  onClick?: (issue: Issue) => void
}

export function IssueCard({ issue, onEdit, onDelete, onClick }: IssueCardProps) {
  const statusColors = {
    todo: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    done: 'bg-green-100 text-green-800'
  }

  const handleCardClick = () => {
    onClick?.(issue)
  }

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit?.(issue)
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (window.confirm('Are you sure you want to delete this issue?')) {
      onDelete?.(issue.id)
    }
  }

  return (
    <div 
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-gray-900 truncate flex-1">
          {issue.title}
        </h3>
        <div className="flex space-x-1 ml-2">
          {onEdit && (
            <button
              onClick={handleEditClick}
              className="text-gray-400 hover:text-gray-600 p-1"
              title="Edit issue"
            >
              ✏️
            </button>
          )}
          {onDelete && (
            <button
              onClick={handleDeleteClick}
              className="text-gray-400 hover:text-red-600 p-1"
              title="Delete issue"
            >
              🗑️
            </button>
          )}
        </div>
      </div>
      
      {issue.description && (
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {issue.description}
        </p>
      )}
      
      <div className="flex justify-between items-center">
        {issue.status && (
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColors[issue.status]}`}>
            {issue.status.replace('-', ' ')}
          </span>
        )}
        
        {issue.assigneeId && (
          <div className="text-xs text-gray-500">
            Assigned to: {issue.assigneeId}
          </div>
        )}
      </div>
    </div>
  )
}
