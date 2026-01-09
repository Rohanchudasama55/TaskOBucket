import { Plus } from 'lucide-react';
import type { ViewMode } from '../../../types/kanban';

interface SprintBoardHeaderProps {
  title: string;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onCreateSprint?: () => void;
}

const viewModes: { key: ViewMode; label: string }[] = [
  { key: 'kanban', label: 'Kanban' },
  { key: 'list', label: 'List' },
  { key: 'timeline', label: 'Timeline' },
];

export function SprintBoardHeader({
  title,
  viewMode,
  onViewModeChange,
  onCreateSprint,
}: SprintBoardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {/* Left */}
      <div className="flex items-center gap-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
          {title}
        </h1>

        {/* View toggle */}
        <div className="flex bg-slate-100/80 rounded-xl p-1 ring-1 ring-slate-200/50">
          {viewModes.map(mode => (
            <button
              key={mode.key}
              onClick={() => onViewModeChange(mode.key)}
              className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition ${
                viewMode === mode.key
                  ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              {mode.label}
              {viewMode === mode.key && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-lg" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        {/* Team Avatars (same as Issues) */}
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map(i => (
            <img
              key={i}
              className="h-9 w-9 rounded-full ring-2 ring-white shadow-sm hover:ring-blue-400/50 hover:scale-105 transition"
              src={`https://i.pravatar.cc/100?img=${i}`}
              alt={`Member ${i}`}
            />
          ))}
          <div className="h-9 w-9 flex items-center justify-center rounded-full bg-slate-200 ring-2 ring-white text-xs font-semibold text-slate-600">
            +5
          </div>
        </div>

        {/* Create Sprint */}
        <button
          onClick={onCreateSprint}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition ring-1 ring-blue-600/20"
        >
          <Plus className="h-4 w-4" />
          Create Sprint
        </button>
      </div>
    </div>
  );
}
