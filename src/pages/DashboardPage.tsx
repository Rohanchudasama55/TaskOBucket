import { ProjectList } from '../features/projects/ProjectList'

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <ProjectList />
      </div>
    </div>
  )
}
