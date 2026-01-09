import { useEffect, useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import type { ViewMode } from '../../types/kanban';

import { SprintColumn as SprintColumnComponent } from './SprintKanbanBord/SprintColumn';
import { SprintBoardHeader } from './SprintKanbanBord/SprintBoardHeader';
import { SprintCard } from './SprintKanbanBord/SprintCard';
import { SprintDetailModal } from './SprintKanbanBord/SprintDetailModal';
import { CreateSprintModal } from './SprintKanbanBord/CreateSprintModal';
import type { Sprint, SprintColumn, SprintStatus } from './types';

/* ---------------- Mock Sprint Data ---------------- */
const mockSprints: Sprint[] = [
  {
    id: '1',
    name: 'Sprint 1',
    projectId: 'p1',
    projectName: 'Project Alpha',
    startDate: '2026-01-01',
    endDate: '2026-01-14',
    description: 'Initial setup and core features',
    status: 'upcoming',
    order: 0,
  },
  {
    id: '2',
    name: 'Sprint 2',
    projectId: 'p1',
    projectName: 'Project Alpha',
    startDate: '2026-01-15',
    endDate: '2026-01-28',
    description: 'Feature development',
    status: 'ongoing',
    order: 0,
  },
  {
    id: '3',
    name: 'Sprint 0',
    projectId: 'p2',
    projectName: 'Project Beta',
    startDate: '2025-12-01',
    endDate: '2025-12-15',
    description: 'Planning sprint',
    status: 'completed',
    order: 0,
  },
];

interface SprintKanbanBoardProps {
  title?: string;
}

export function SprintKanbanBoard({
  title = 'Sprints',
}: SprintKanbanBoardProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [activeSprint, setActiveSprint] = useState<Sprint | null>(null);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedSprint, setSelectedSprint] = useState<Sprint | null>(null);
  const [defaultStatus, setDefaultStatus] =
    useState<SprintStatus>('upcoming');

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  /* Load demo data */
  useEffect(() => {
    setSprints(mockSprints);
  }, []);

  /* Columns */
  const columns: SprintColumn[] = [
    {
      id: 'upcoming',
      title: 'UPCOMING',
      status: 'upcoming',
      sprints: sprints
        .filter(s => s.status === 'upcoming')
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    },
    {
      id: 'ongoing',
      title: 'ONGOING',
      status: 'ongoing',
      sprints: sprints
        .filter(s => s.status === 'ongoing')
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    },
    {
      id: 'completed',
      title: 'COMPLETED',
      status: 'completed',
      sprints: sprints
        .filter(s => s.status === 'completed')
        .sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    },
  ];

  /* ---------------- Drag Handlers ---------------- */
  const handleDragStart = (e: DragStartEvent) => {
    const sprint = sprints.find(s => s.id === e.active.id);
    setActiveSprint(sprint || null);
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    if (!over) return;

    const activeSprint = sprints.find(s => s.id === active.id);
    if (!activeSprint) return;

    const overColumn = columns.find(c => c.id === over.id);
    if (overColumn && activeSprint.status !== overColumn.status) {
      setSprints(prev =>
        prev.map(s =>
          s.id === active.id
            ? {
                ...s,
                status: overColumn.status,
                order: overColumn.sprints.length,
              }
            : s
        )
      );
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    setActiveSprint(null);
    if (!over) return;

    const activeSprint = sprints.find(s => s.id === active.id);
    const overSprint = sprints.find(s => s.id === over.id);

    if (
      activeSprint &&
      overSprint &&
      activeSprint.status === overSprint.status
    ) {
      const column = columns.find(c => c.status === activeSprint.status);
      if (!column) return;

      const oldIndex = column.sprints.findIndex(s => s.id === active.id);
      const newIndex = column.sprints.findIndex(s => s.id === over.id);

      const reordered = arrayMove(column.sprints, oldIndex, newIndex);

      setSprints(prev =>
        prev.map(s => {
          const r = reordered.find(r => r.id === s.id);
          return r ? { ...s, order: reordered.indexOf(r) } : s;
        })
      );
    }
  };

  /* ---------------- CRUD ---------------- */
  const handleAddSprint = (columnId: string) => {
    setDefaultStatus(columnId as SprintStatus);
    setIsCreateOpen(true);
  };

  const handleCreateSprint = (data: Omit<Sprint, 'id' | 'order'>) => {
    setSprints(prev => [
      ...prev,
      {
        ...data,
        id: Date.now().toString(),
        order: prev.filter(s => s.status === data.status).length,
      },
    ]);
  };

  const handleUpdateSprint = (updated: Sprint) => {
    setSprints(prev =>
      prev.map(s => (s.id === updated.id ? updated : s))
    );
    setSelectedSprint(null);
  };

  const handleDeleteSprint = (id: string) => {
    setSprints(prev => prev.filter(s => s.id !== id));
    setSelectedSprint(null);
  };

  /* ---------------- Render ---------------- */
  return (
    <div className="p-8 bg-gradient-to-br from-slate-50/50 to-white min-h-screen">
      <SprintBoardHeader
        title={title}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onCreateSprint={() => setIsCreateOpen(true)}
      />

      {viewMode === 'kanban' && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 overflow-x-auto pb-8">
            {columns.map(col => (
              <SprintColumnComponent
                key={col.id}
                column={col}
                onAddSprint={handleAddSprint}
                onCardClick={setSelectedSprint}
              />
            ))}
          </div>

          <DragOverlay>
            {activeSprint && (
              <div className="rotate-2 scale-105">
                <SprintCard sprint={activeSprint} />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      )}

      <CreateSprintModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreateSprint={handleCreateSprint}
        defaultStatus={defaultStatus}
      />

      <SprintDetailModal
        sprint={selectedSprint}
        isOpen={!!selectedSprint}
        onClose={() => setSelectedSprint(null)}
        onUpdateSprint={handleUpdateSprint}
        onDeleteSprint={handleDeleteSprint}
      />
    </div>
  );
}
