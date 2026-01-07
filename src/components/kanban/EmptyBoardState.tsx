import { Plus, Upload, Kanban } from 'lucide-react';

interface EmptyBoardStateProps {
  onCreateIssue?: () => void;
  onImportIssues?: () => void;
}

export function EmptyBoardState({ onCreateIssue, onImportIssues }: EmptyBoardStateProps) {
  return (
    <div className="flex items-center justify-center min-h-[500px]">
      <div className="text-center max-w-md">
        {/* Illustration */}
        <div className="mx-auto mb-8 w-32 h-32 bg-gradient-to-br from-slate-100 to-slate-200 rounded-3xl flex items-center justify-center shadow-sm ring-1 ring-slate-200/50 animate-pulse">
          <Kanban className="h-16 w-16 text-slate-400" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
          Visualize your work with a Board
        </h3>

        {/* Subtitle */}
        <p className="text-slate-600 mb-8 leading-relaxed">
          Create issues and organize them in columns to track progress. Use drag & drop to move issues between workflow stages.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onCreateIssue}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all duration-200 ease-out ring-1 ring-blue-600/20"
          >
            <Plus className="h-4 w-4" />
            Create your first issue
          </button>
          
          <button
            onClick={onImportIssues}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm ring-1 ring-slate-200/50 text-slate-700 text-sm font-semibold rounded-xl hover:bg-white hover:ring-slate-300/50 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 ease-out"
          >
            <Upload className="h-4 w-4" />
            Import issues
          </button>
        </div>
      </div>
    </div>
  );
}