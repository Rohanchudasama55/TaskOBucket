import { IssueCard } from '../issues/IssueCard'
import type { Issue } from '../../types/issue'

interface ColumnProps {
  title: string
  issues: Issue[]
  onEditIssue?: (issue: Issue) => void
  onDeleteIssue?: (id: string) => void
}

export function Column({ title, issues, onEditIssue, onDeleteIssue }: ColumnProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <span className="bg-gray-200 text-gray-700 text-sm px-2 py-1 rounded-full">
          {issues.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {issues.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-sm">
            No issues in {title.toLowerCase()}
          </div>
        ) : (
          issues.map((issue) => (
            <IssueCard
              key={issue.id}
              issue={issue}
              onEdit={onEditIssue}
              onDelete={onDeleteIssue}
            />
          ))
        )}
      </div>
    </div>
  )
}
