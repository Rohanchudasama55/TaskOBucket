import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import type { KanbanIssue } from '../../types/kanban';

interface CreateIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateIssue: (issue: Omit<KanbanIssue, 'id' | 'order'>) => void;
  defaultStatus?: 'backlog' | 'selected' | 'in-progress' | 'completed';
}

const issueTypes = [
  { value: 'story', label: 'Story', color: 'bg-green-100 text-green-800' },
  { value: 'task', label: 'Task', color: 'bg-blue-100 text-blue-800' },
  { value: 'bug', label: 'Bug', color: 'bg-red-100 text-red-800' }
] as const;

const assignees = [
  { id: '1', name: 'John Doe', avatar: 'https://i.pravatar.cc/100?img=1' },
  { id: '2', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/100?img=2' },
  { id: '3', name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/100?img=3' },
  { id: '4', name: 'Sarah Wilson', avatar: 'https://i.pravatar.cc/100?img=4' }
];

const availableLabels = ['frontend', 'backend', 'ui-ux', 'mobile', 'bug-fix', 'enhancement', 'security', 'performance', 'documentation', 'analytics'];

export function CreateIssueModal({ isOpen, onClose, onCreateIssue, defaultStatus = 'backlog' }: CreateIssueModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'story' as 'story' | 'task' | 'bug',
    status: defaultStatus,
    assigneeId: '',
    labels: [] as string[],
    epic: '',
    image: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Generate issue key
    const issueKey = `PROJ-${Math.floor(Math.random() * 1000) + 100}`;
    
    // Find assignee
    const assignee = assignees.find(a => a.id === formData.assigneeId);

    const newIssue: Omit<KanbanIssue, 'id' | 'order'> = {
      key: issueKey,
      title: formData.title.trim(),
      type: formData.type,
      status: formData.status,
      assignee,
      labels: formData.labels.length > 0 ? formData.labels : undefined,
      epic: formData.epic || undefined,
      image: formData.image || undefined
    };

    onCreateIssue(newIssue);
    
    // Reset form
    setFormData({
      title: '',
      type: 'story' as 'story' | 'task' | 'bug',
      status: defaultStatus,
      assigneeId: '',
      labels: [],
      epic: '',
      image: ''
    });
    setErrors({});
    onClose();
  };

  const handleLabelToggle = (label: string) => {
    setFormData(prev => ({
      ...prev,
      labels: prev.labels.includes(label)
        ? prev.labels.filter(l => l !== label)
        : [...prev.labels, label]
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl ring-1 ring-black/5 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200/60">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Create New Issue</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100/80 rounded-xl transition-all duration-200 group"
          >
            <X className="h-5 w-5 text-slate-500 group-hover:text-slate-700 transition-colors duration-200" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className={`w-full px-4 py-3 bg-white/80 backdrop-blur-sm ring-1 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 ${
                errors.title ? 'ring-red-300/50 focus:ring-red-500/50' : 'ring-slate-200/50'
              }`}
              placeholder="Enter issue title..."
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-2 font-medium">{errors.title}</p>
            )}
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <div className="flex gap-2">
              {issueTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: type.value }))}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    formData.type === type.value
                      ? type.color
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as any }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="backlog">Backlog</option>
              <option value="selected">Selected for Dev</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assignee
            </label>
            <select
              value={formData.assigneeId}
              onChange={(e) => setFormData(prev => ({ ...prev, assigneeId: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Unassigned</option>
              {assignees.map((assignee) => (
                <option key={assignee.id} value={assignee.id}>
                  {assignee.name}
                </option>
              ))}
            </select>
          </div>

          {/* Labels */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Labels
            </label>
            <div className="flex flex-wrap gap-1">
              {availableLabels.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleLabelToggle(label)}
                  className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                    formData.labels.includes(label)
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Epic */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Epic
            </label>
            <input
              type="text"
              value={formData.epic}
              onChange={(e) => setFormData(prev => ({ ...prev, epic: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter epic name..."
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL (optional)
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Issue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}