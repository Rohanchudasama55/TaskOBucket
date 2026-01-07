import { MainLayout } from '../../layouts/MainLayout';
import { KanbanBoard } from '../../components/kanban';

export function IssuesPage() {
  return (
    <MainLayout>
      <KanbanBoard />
    </MainLayout>
  );
}