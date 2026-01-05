import type { Issue } from '../../types/issue'

export interface CreateIssueRequest {
  title: string
  description?: string
  status?: Issue['status']
  assigneeId?: string
  projectId?: string
}

export interface UpdateIssueRequest {
  title?: string
  description?: string
  status?: Issue['status']
  assigneeId?: string
}

// Issues API functions
export const issuesApi = {
  getAll: async (): Promise<Issue[]> => {
    // TODO: Replace with actual API call
    return Promise.resolve([])
  },

  getById: async (id: string): Promise<Issue> => {
    // TODO: Replace with actual API call
    return Promise.resolve({
      id,
      title: 'Sample Issue',
      description: 'This is a sample issue',
      status: 'todo',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  },

  create: async (issue: CreateIssueRequest): Promise<Issue> => {
    // TODO: Replace with actual API call
    return Promise.resolve({
      id: `issue-${Date.now()}`,
      ...issue,
      status: issue.status || 'todo',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  },

  update: async (id: string, updates: UpdateIssueRequest): Promise<Issue> => {
    // TODO: Replace with actual API call
    return Promise.resolve({
      id,
      title: updates.title || 'Updated Issue',
      description: updates.description,
      status: updates.status || 'todo',
      assigneeId: updates.assigneeId,
      updatedAt: new Date(),
    } as Issue)
  },

  delete: async (id: string): Promise<void> => {
    // TODO: Replace with actual API call
    console.log('Deleting issue:', id)
    return Promise.resolve()
  }
}

// Legacy exports for backward compatibility
export const fetchIssues = issuesApi.getAll
export const createIssue = issuesApi.create
export const updateIssue = issuesApi.update
