import { Plus } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { SprintColumn as SprintColumnType, Sprint } from '../types';
import { SprintCard } from './SprintCard';

interface SprintColumnProps {
  column: SprintColumnType;
  onAddSprint?: (columnId: string) => void;
  onCardClick?: (sprint: Sprint) => void;
}

const columnColors = {
  upcoming: 'from-slate-50 to-slate-100/50',
  ongoing: 'from-blue-50/50 to-indigo-50/30',
  completed: 'from-emerald-50/50 to-green-50/30',
};

const columnAccents = {
  upcoming: 'ring-slate-200/50',
  ongoing: 'ring-blue-200/50',
  completed: 'ring-emerald-200/50',
};

const countBadgeColors = {
  upcoming: 'bg-slate-100 text-slate-700 ring-slate-200/50',
  ongoing: 'bg-blue-100 text-blue-700 ring-blue-200/50',
  completed: 'bg-emerald-100 text-emerald-700 ring-emerald-200/50',
};

export function SprintColumn({ column, onAddSprint, onCardClick }: SprintColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const gradientClass = columnColors[column.status];
  const accentClass = columnAccents[column.status];
  const badgeClass = countBadgeColors[column.status];

  return (
    <div className={`bg-gradient-to-b ${gradientClass} ring-1 ${accentClass} rounded-xl p-5 min-h-[600px] w-80 transition-all`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-slate-800 text-sm uppercase tracking-wide">
            {column.title}
          </h3>
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ring-1 ${badgeClass}`}>
            {column.sprints.length}
          </span>
        </div>

        <button
          onClick={() => onAddSprint?.(column.id)}
          className="p-2 hover:bg-white/60 rounded-lg"
          title="Add sprint"
        >
          <Plus className="h-4 w-4 text-slate-600" />
        </button>
      </div>

      {/* Drop zone */}
      <div
        ref={setNodeRef}
        className={`min-h-[500px] rounded-lg transition ${
          isOver ? 'bg-blue-50/70 ring-2 ring-blue-300/50 p-3' : 'p-3'
        }`}
      >
        <SortableContext
          items={column.sprints.map(s => s.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {column.sprints.map((sprint) => (
              <SprintCard
                key={sprint.id}
                sprint={sprint}
                onClick={onCardClick}
              />
            ))}

            {isOver && column.sprints.length === 0 && (
              <div className="h-24 flex items-center justify-center text-sm text-blue-600 font-medium">
                Drop sprint here
              </div>
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}
