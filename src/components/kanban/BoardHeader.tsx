import { Plus } from 'lucide-react';
import type { ViewMode } from '../../types/kanban';

interface BoardHeaderProps {
  title: string;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onCreateIssue?: () => void;
}

const viewModes: { key: ViewMode; label: string }[] = [
  { key: 'kanban', label: 'Kanban' },
  { key: 'list', label: 'List' },
  { key: 'timeline', label: 'Timeline' }
];

export function BoardHeader({ title, viewMode, onViewModeChange, onCreateIssue }: BoardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {/* Left side - Title and View Toggle */}
      <div className="flex items-center gap-8">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{title}</h1>
        
        {/* View Toggle */}
        <div className="flex bg-slate-100/80 backdrop-blur-sm rounded-xl p-1 ring-1 ring-slate-200/50">
          {viewModes.map((mode) => (
            <button
              key={mode.key}
              onClick={() => onViewModeChange(mode.key)}
              className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ease-out ${
                viewMode === mode.key
                  ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200/50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              {mode.label}
              {viewMode === mode.key && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-lg"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Right side - Avatar Group and Create Button */}
      <div className="flex items-center gap-6">
        {/* Avatar Group */}
        <div className="flex items-center">
          <div className="flex -space-x-2">
            <img
              className="h-9 w-9 rounded-full ring-2 ring-white shadow-sm hover:ring-blue-400/50 hover:scale-105 transition-all duration-200 cursor-pointer"
              src="https://i.pravatar.cc/100?img=1"
              alt="Team member 1"
            />
            <img
              className="h-9 w-9 rounded-full ring-2 ring-white shadow-sm hover:ring-blue-400/50 hover:scale-105 transition-all duration-200 cursor-pointer"
              src="https://i.pravatar.cc/100?img=2"
              alt="Team member 2"
            />
            <img
              className="h-9 w-9 rounded-full ring-2 ring-white shadow-sm hover:ring-blue-400/50 hover:scale-105 transition-all duration-200 cursor-pointer"
              src="https://i.pravatar.cc/100?img=3"
              alt="Team member 3"
            />
            <img
              className="h-9 w-9 rounded-full ring-2 ring-white shadow-sm hover:ring-blue-400/50 hover:scale-105 transition-all duration-200 cursor-pointer"
              src="https://i.pravatar.cc/100?img=4"
              alt="Team member 4"
            />
            <div className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 ring-2 ring-white text-xs font-semibold text-slate-600 shadow-sm hover:from-slate-200 hover:to-slate-300 hover:scale-105 transition-all duration-200 cursor-pointer">
              +5
            </div>
          </div>
        </div>

        {/* Create Issue Button */}
        <button
          onClick={onCreateIssue}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-200 ease-out ring-1 ring-blue-600/20"
        >
          <Plus className="h-4 w-4" />
          Create Issue
        </button>
      </div>
    </div>
  );
}