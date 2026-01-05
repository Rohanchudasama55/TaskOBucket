import { MainLayout } from '../layouts/MainLayout'
import { ProjectList } from '../features/projects/ProjectList'

export function DashboardPage() {
  return (
    <MainLayout>
      <ProjectList />
    </MainLayout>
  )
}
