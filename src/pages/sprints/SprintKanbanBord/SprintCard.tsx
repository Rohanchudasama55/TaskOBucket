import { MoreHorizontal, CalendarRange } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Sprint } from '../types';

interface SprintCardProps {
  sprint: Sprint;
  onClick?: (sprint: Sprint) => void;
}

const statusBadge = {
  upcoming: 'bg-slate-100 text-slate-700 ring-slate-200/50',
  ongoing: 'bg-blue-100 text-blue-700 ring-blue-200/50',
  completed: 'bg-emerald-100 text-emerald-700 ring-emerald-200/50',
};

export function SprintCard({ sprint, onClick }: SprintCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: sprint.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      return;
    }
    onClick?.(sprint);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      className={`bg-white/90 rounded-xl ring-1 ring-black/5 p-4 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group ${
        isDragging ? 'opacity-60 scale-105 rotate-1 shadow-xl' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <h4 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2">
          {sprint.name}
        </h4>
        <MoreHorizontal className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition" />
      </div>

      {/* Project */}
      <p className="text-xs text-slate-500 mb-2">
        Project: <span className="font-medium">{sprint.projectName}</span>
      </p>

      {/* Dates */}
      <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-3">
        <CalendarRange className="h-4 w-4 text-slate-400" />
        <span>
          {sprint.startDate} → {sprint.endDate}
        </span>
      </div>

      {/* Description */}
      {sprint.description && (
        <p className="text-xs text-slate-600 line-clamp-2 mb-3">
          {sprint.description}
        </p>
      )}

      {/* Status */}
      <span
        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ring-1 ${
          statusBadge[sprint.status]
        }`}
      >
        {sprint.status.toUpperCase()}
      </span>
    </div>
  );
}
