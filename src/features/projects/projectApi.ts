import type { Project } from '../../types/project'

export interface CreateProjectRequest {
  name: string
  description?: string
  ownerId?: string
  key?: string
}

export interface UpdateProjectRequest {
  name?: string
  description?: string
}

// Projects API functions
export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    // TODO: Replace with actual API call
    return Promise.resolve([])
  },

  getById: async (id: string): Promise<Project> => {
    // TODO: Replace with actual API call
    return Promise.resolve({
      id,
      name: 'Sample Project',
      description: 'This is a sample project',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  },

  create: async (project: CreateProjectRequest): Promise<Project> => {
    // TODO: Replace with actual API call
    return Promise.resolve({
      id: `project-${Date.now()}`,
      ...project,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  },

  update: async (id: string, updates: UpdateProjectRequest): Promise<Project> => {
    // TODO: Replace with actual API call
    return Promise.resolve({
      id,
      name: updates.name || 'Updated Project',
      description: updates.description,
      updatedAt: new Date().toISOString(),
    } as Project)
  },

  delete: async (id: string): Promise<void> => {
    // TODO: Replace with actual API call
    console.log('Deleting project:', id)
    return Promise.resolve()
  }
}

// Legacy exports for backward compatibility
export const fetchProjects = projectsApi.getAll
export const createProject = projectsApi.create
export const updateProject = projectsApi.update
