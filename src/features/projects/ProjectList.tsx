import { useState, useEffect } from 'react'
import { projectsApi } from './projectApi'
import { CreateProjectModal } from './CreateProjectModal'
import type { Project } from '../../types/project'
import type { CreateProjectRequest } from './projectApi'

export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const data = await projectsApi.getAll()
      setProjects(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateProject = async (data: CreateProjectRequest) => {
    try {
      setIsCreating(true)
      const newProject = await projectsApi.create(data)
      setProjects(prev => [...prev, newProject])
      setIsCreateModalOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project')
    } finally {
      setIsCreating(false)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return
    }

    try {
      await projectsApi.delete(id)
      setProjects(prev => prev.filter(p => p.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete project')
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-gray-600">Loading projects...</div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Create Project
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

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">No projects found</div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="text-blue-600 hover:text-blue-800"
          >
            Create your first project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900 truncate flex-1">
                  {project.name}
                </h3>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="text-gray-400 hover:text-red-600 p-1"
                  title="Delete project"
                >
                  🗑️
                </button>
              </div>
              
              {project.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
              )}
              
              <div className="text-xs text-gray-500">
                {project.createdAt && (
                  <div>Created: {new Date(project.createdAt).toLocaleDateString()}</div>
                )}
                {project.ownerId && (
                  <div>Owner: {project.ownerId}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateProject}
        isLoading={isCreating}
      />
    </div>
  )
}
