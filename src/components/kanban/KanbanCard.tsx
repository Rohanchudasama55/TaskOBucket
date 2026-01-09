import { MoreHorizontal, CheckCircle2, Circle,  Loader2, Clock } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { KanbanIssue } from '../../types/kanban';

interface KanbanCardProps {
  issue: KanbanIssue;
  onCardClick?: (issue: KanbanIssue) => void;
}

const issueTypeConfig = {
  story: { 
    color: 'bg-gradient-to-r from-emerald-500/10 to-green-500/10 text-emerald-700 ring-1 ring-emerald-500/20', 
    label: 'Story' 
  },
  task: { 
    color: 'bg-gradient-to-r from-blue-500/10 to-indigo-500/10 text-blue-700 ring-1 ring-blue-500/20', 
    label: 'Task' 
  },
  bug: { 
    color: 'bg-gradient-to-r from-red-500/10 to-rose-500/10 text-red-700 ring-1 ring-red-500/20', 
    label: 'Bug' 
  }
};

const statusIcons = {
  backlog: Circle,
  selected: Clock,
  'in-progress': Loader2,
  completed:CheckCircle2
};

export function KanbanCard({ issue, onCardClick }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: issue.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const typeConfig = issueTypeConfig[issue.type];
  const StatusIcon = statusIcons[issue.status];

  const handleClick = (e: React.MouseEvent) => {
    // Prevent click when dragging
    if (isDragging) {
      e.preventDefault();
      return;
    }
    onCardClick?.(issue);
  };

  return (
    <div 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white/80 backdrop-blur-md rounded-xl ring-1 ring-black/5 p-4 shadow-sm hover:shadow-lg hover:ring-blue-400/30 hover:-translate-y-0.5 transition-all duration-200 ease-out cursor-pointer group ${
        isDragging ? 'opacity-60 rotate-2 scale-105 z-50 shadow-2xl ring-blue-300/50' : ''
      }`}
      onClick={handleClick}
    >
      {/* Header with status icon and menu */}
      <div className="flex items-start justify-between mb-3">
        <div className="relative">
          <StatusIcon className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors duration-200" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </div>
        <MoreHorizontal className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-slate-600 transition-all duration-200" />
      </div>

      {/* Image preview if available */}
      {issue.image && (
        <div className="mb-4 relative overflow-hidden rounded-lg">
          <img 
            src={issue.image} 
            alt={issue.title}
            className="w-full h-20 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </div>
      )}

      {/* Issue key */}
      <div className="text-xs font-medium text-slate-500 mb-2 tracking-tight">{issue.key}</div>

      {/* Title */}
      <h4 className="font-semibold text-slate-900 text-sm mb-4 leading-snug tracking-tight overflow-hidden" style={{ 
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical'
      }}>
        {issue.title}
      </h4>

      {/* Issue type badge and assignee */}
      <div className="flex items-center justify-between mb-3">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium shadow-sm ${typeConfig.color}`}>
          {typeConfig.label}
        </span>

        {/* Assignee avatar */}
        {issue.assignee && (
          <div className="relative">
            <img
              src={issue.assignee.avatar}
              alt={issue.assignee.name}
              className="h-7 w-7 rounded-full ring-2 ring-white shadow-sm hover:ring-blue-400/50 transition-all duration-200"
              title={issue.assignee.name}
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full ring-2 ring-white"></div>
          </div>
        )}
      </div>

      {/* Labels */}
      {issue.labels && issue.labels.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {issue.labels.map((label, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100/80 text-slate-600 ring-1 ring-slate-200/50 hover:bg-slate-200/80 transition-colors duration-200"
            >
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}