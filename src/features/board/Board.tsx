import { useState, useEffect } from 'react'
import { Column } from './Column'
import { issuesApi } from '../issues/issueApi'
import { IssueModal } from '../issues/IssueModal'
import type { Issue } from '../../types/issue'
import type { CreateIssueRequest, UpdateIssueRequest } from '../issues/issueApi'

export function Board() {
  const [issues, setIssues] = useState<Issue[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadIssues()
  }, [])

  const loadIssues = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await issuesApi.getAll()
      setIssues(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load issues')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateIssue = () => {
    setSelectedIssue(null)
    setIsModalOpen(true)
  }

  const handleEditIssue = (issue: Issue) => {
    setSelectedIssue(issue)
    setIsModalOpen(true)
  }

  const handleSaveIssue = async (data: CreateIssueRequest | UpdateIssueRequest) => {
    try {
      setIsCreating(true)
      
      if (selectedIssue) {
        // Update existing issue
        const updatedIssue = await issuesApi.update(selectedIssue.id, data as UpdateIssueRequest)
        setIssues(prev => prev.map(issue => 
          issue.id === selectedIssue.id ? updatedIssue : issue
        ))
      } else {
        // Create new issue
        const newIssue = await issuesApi.create(data as CreateIssueRequest)
        setIssues(prev => [...prev, newIssue])
      }
      
      setIsModalOpen(false)
      setSelectedIssue(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save issue')
    } finally {
      setIsCreating(false)
    }
  }

  const handleDeleteIssue = async (id: string) => {
    try {
      await issuesApi.delete(id)
      setIssues(prev => prev.filter(issue => issue.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete issue')
    }
  }

  const getIssuesByStatus = (status: Issue['status']) => {
    return issues.filter(issue => issue.status === status)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-gray-600">Loading board...</div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Project Board</h1>
        <button
          onClick={handleCreateIssue}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Issue
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-2 text-sm text-red-600 hover:text-red-800"
          >
            Dismiss
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Column
          title="To Do"
          issues={getIssuesByStatus('todo')}
          onEditIssue={handleEditIssue}
          onDeleteIssue={handleDeleteIssue}
        />
        <Column
          title="In Progress"
          issues={getIssuesByStatus('in-progress')}
          onEditIssue={handleEditIssue}
          onDeleteIssue={handleDeleteIssue}
        />
        <Column
          title="Done"
          issues={getIssuesByStatus('done')}
          onEditIssue={handleEditIssue}
          onDeleteIssue={handleDeleteIssue}
        />
      </div>

      <IssueModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedIssue(null)
        }}
        issue={selectedIssue || undefined}
        onSave={handleSaveIssue}
        isLoading={isCreating}
      />
    </div>
  )
}
