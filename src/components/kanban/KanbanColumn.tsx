import { Plus, MoreHorizontal } from 'lucide-react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { KanbanColumn as KanbanColumnType, KanbanIssue } from '../../types/kanban';
import { KanbanCard } from './KanbanCard';

interface KanbanColumnProps {
  column: KanbanColumnType;
  onAddIssue?: (columnId: string) => void;
  onCardClick?: (issue: KanbanIssue) => void;
}

const columnColors = {
  backlog: 'from-slate-50 to-slate-100/50',
  selected: 'from-blue-50/50 to-indigo-50/30',
  'in-progress': 'from-amber-50/50 to-orange-50/30',
  completed: 'from-emerald-50/50 to-green-50/30',
};

const columnAccents = {
  backlog: 'ring-slate-200/50',
  selected: 'ring-blue-200/50',
  'in-progress': 'ring-amber-200/50',
  completed: 'ring-emerald-200/50',
};

const countBadgeColors = {
  backlog: 'bg-slate-100 text-slate-700 ring-slate-200/50',
  selected: 'bg-blue-100 text-blue-700 ring-blue-200/50',
  'in-progress': 'bg-amber-100 text-amber-700 ring-amber-200/50',
  completed: 'bg-emerald-100 text-emerald-700 ring-emerald-200/50',
};

export function KanbanColumn({ column, onAddIssue, onCardClick }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column.id,
  });

  const gradientClass = columnColors[column.status] || columnColors.backlog;
  const accentClass = columnAccents[column.status] || columnAccents.backlog;
  const badgeClass = countBadgeColors[column.status] || countBadgeColors.backlog;

  return (
    <div className={`bg-gradient-to-b ${gradientClass} backdrop-blur-sm ring-1 ${accentClass} rounded-xl p-5 min-h-[600px] w-80 transition-all duration-200 ease-out hover:shadow-lg hover:ring-2 hover:-translate-y-0.5`}>
      {/* Column Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-slate-800 text-sm uppercase tracking-wide">
            {column.title}
          </h3>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ring-1 shadow-sm ${badgeClass} transition-all duration-200 hover:scale-105`}>
            {column.issues.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onAddIssue?.(column.id)}
            className="p-2 hover:bg-white/60 rounded-lg transition-all duration-200 ease-out hover:shadow-sm group"
            title="Add issue"
          >
            <Plus className="h-4 w-4 text-slate-500 group-hover:text-slate-700 group-hover:scale-110 transition-all duration-200" />
          </button>
          <button className="p-2 hover:bg-white/60 rounded-lg transition-all duration-200 ease-out hover:shadow-sm group">
            <MoreHorizontal className="h-4 w-4 text-slate-500 group-hover:text-slate-700 transition-colors duration-200" />
          </button>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        ref={setNodeRef}
        className={`min-h-[500px] transition-all duration-300 ease-in-out rounded-lg ${
          isOver ? 'bg-blue-50/80 backdrop-blur-sm ring-2 ring-blue-300/50 ring-dashed p-3 shadow-inner' : 'p-3'
        }`}
      >
        <SortableContext items={column.issues.map(issue => issue.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4 transition-all duration-300 ease-out">
            {column.issues.map((issue) => (
              <KanbanCard
                key={issue.id}
                issue={issue}
                onCardClick={onCardClick}
              />
            ))}
            {isOver && column.issues.length === 0 && (
              <div className="flex items-center justify-center h-24 text-blue-600 text-sm font-medium animate-pulse bg-white/50 rounded-lg ring-1 ring-blue-200/50">
                <div className="text-center">
                  <div className="w-8 h-8 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                    <Plus className="h-4 w-4 text-blue-600" />
                  </div>
                  Drop issue here
                </div>
              </div>
            )}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}