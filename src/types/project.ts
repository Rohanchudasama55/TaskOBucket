export interface Project {
  id: string
  name: string
  description?: string
  ownerId?: string
  createdAt?: string
  updatedAt?: string
  image?: string
  type?: string
  key?: string
  openIssuesCount?: number
  completedIssuesCount?: number
}
