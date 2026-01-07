import { MainLayout } from '../../layouts/MainLayout'
import { Board } from '../../features/board/Board'

export function BoardPage() {
  return (
    <MainLayout>
      <Board />
    </MainLayout>
  )
}