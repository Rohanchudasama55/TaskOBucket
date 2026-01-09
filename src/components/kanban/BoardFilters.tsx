import { ChevronDown } from 'lucide-react';
import type { BoardFilters as BoardFiltersType } from '../../types/kanban';

interface BoardFiltersProps {
  filters: BoardFiltersType;
  onFiltersChange: (filters: BoardFiltersType) => void;
}

export function BoardFilters({ filters, onFiltersChange }: BoardFiltersProps) {
  const hasActiveFilters = Object.values(filters).some(value => value);

  const clearFilters = () => {
    onFiltersChange({});
  };

  return (
    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-200/60">
      {/* Assignee Filter */}
      <div className="relative">
        <select
          value={filters.assignee || ''}
          onChange={(e) => onFiltersChange({ ...filters, assignee: e.target.value || undefined })}
          className="appearance-none bg-white/80 backdrop-blur-sm ring-1 ring-slate-200/50 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white hover:bg-white hover:ring-slate-300/50 transition-all duration-200 cursor-pointer"
        >
          <option value="">Assignee</option>
          <option value="john-doe">John Doe</option>
          <option value="jane-smith">Jane Smith</option>
          <option value="mike-johnson">Mike Johnson</option>
          <option value="sarah-wilson">Sarah Wilson</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none transition-transform duration-200" />
      </div>

      {/* Epic Filter */}
      <div className="relative">
        <select
          value={filters.epic || ''}
          onChange={(e) => onFiltersChange({ ...filters, epic: e.target.value || undefined })}
          className="appearance-none bg-white/80 backdrop-blur-sm ring-1 ring-slate-200/50 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white hover:bg-white hover:ring-slate-300/50 transition-all duration-200 cursor-pointer"
        >
          <option value="">Epic</option>
          <option value="user-authentication">User Authentication</option>
          <option value="dashboard-redesign">Dashboard Redesign</option>
          <option value="mobile-app">Mobile App</option>
          <option value="api-integration">API Integration</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none transition-transform duration-200" />
      </div>

      {/* Label Filter */}
      <div className="relative">
        <select
          value={filters.label || ''}
          onChange={(e) => onFiltersChange({ ...filters, label: e.target.value || undefined })}
          className="appearance-none bg-white/80 backdrop-blur-sm ring-1 ring-slate-200/50 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white hover:bg-white hover:ring-slate-300/50 transition-all duration-200 cursor-pointer"
        >
          <option value="">Label</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="ui-ux">UI/UX</option>
          <option value="bug-fix">Bug Fix</option>
          <option value="enhancement">Enhancement</option>
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none transition-transform duration-200" />
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200 relative group"
        >
          Clear filters
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-slate-400 group-hover:w-full transition-all duration-200"></span>
        </button>
      )}
    </div>
  );
}