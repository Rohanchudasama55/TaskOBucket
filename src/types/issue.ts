export interface Issue {
  id: string
  title: string
  description?: string
  status?: 'todo' | 'in-progress' | 'done'
  assigneeId?: string
  projectId?: string
  createdAt?: Date
  updatedAt?: Date
}
