import { useState } from 'react';
import { X, Edit2, Trash2, Save } from 'lucide-react';
import type { KanbanIssue } from '../../types/kanban';

interface IssueDetailModalProps {
  issue: KanbanIssue | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateIssue: (issue: KanbanIssue) => void;
  onDeleteIssue: (issueId: string) => void;
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

export function IssueDetailModal({ issue, isOpen, onClose, onUpdateIssue, onDeleteIssue }: IssueDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<KanbanIssue | null>(null);

  if (!isOpen || !issue) return null;

  const handleEdit = () => {
    setEditData({ ...issue });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editData) {
      onUpdateIssue(editData);
      setIsEditing(false);
      setEditData(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(null);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this issue?')) {
      onDeleteIssue(issue.id);
      onClose();
    }
  };

  const handleLabelToggle = (label: string) => {
    if (!editData) return;
    
    const currentLabels = editData.labels || [];
    const newLabels = currentLabels.includes(label)
      ? currentLabels.filter(l => l !== label)
      : [...currentLabels, label];
    
    setEditData({
      ...editData,
      labels: newLabels.length > 0 ? newLabels : undefined
    });
  };

  const currentIssue = isEditing ? editData! : issue;
  const typeConfig = issueTypes.find(t => t.value === currentIssue.type);

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl ring-1 ring-black/5 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200/60">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${typeConfig?.color}`}>
              {typeConfig?.label}
            </span>
            <span className="text-sm font-medium text-slate-500">{currentIssue.key}</span>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <>
                <button
                  onClick={handleEdit}
                  className="p-2 hover:bg-slate-100/80 rounded-xl transition-all duration-200 group"
                  title="Edit issue"
                >
                  <Edit2 className="h-4 w-4 text-slate-500 group-hover:text-slate-700 transition-colors duration-200" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 hover:bg-red-50/80 rounded-xl transition-all duration-200 group"
                  title="Delete issue"
                >
                  <Trash2 className="h-4 w-4 text-red-500 group-hover:text-red-600 transition-colors duration-200" />
                </button>
              </>
            ) : (
              <button
                onClick={handleSave}
                className="p-2 hover:bg-green-50/80 rounded-xl transition-all duration-200 group"
                title="Save changes"
              >
                <Save className="h-4 w-4 text-green-600 group-hover:text-green-700 transition-colors duration-200" />
              </button>
            )}
            <button
              onClick={isEditing ? handleCancel : onClose}
              className="p-2 hover:bg-slate-100/80 rounded-xl transition-all duration-200 group"
            >
              <X className="h-5 w-5 text-slate-500 group-hover:text-slate-700 transition-colors duration-200" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            {isEditing ? (
              <input
                type="text"
                value={editData?.title || ''}
                onChange={(e) => setEditData(prev => prev ? { ...prev, title: e.target.value } : null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <h3 className="text-lg font-semibold text-gray-900">{currentIssue.title}</h3>
            )}
          </div>

          {/* Image */}
          {(currentIssue.image || isEditing) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image
              </label>
              {isEditing ? (
                <input
                  type="url"
                  value={editData?.image || ''}
                  onChange={(e) => setEditData(prev => prev ? { ...prev, image: e.target.value } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              ) : currentIssue.image ? (
                <img
                  src={currentIssue.image}
                  alt={currentIssue.title}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ) : null}
            </div>
          )}

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            {isEditing ? (
              <div className="flex gap-2">
                {issueTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setEditData(prev => prev ? { ...prev, type: type.value } : null)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      editData?.type === type.value
                        ? type.color
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            ) : (
              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${typeConfig?.color}`}>
                {typeConfig?.label}
              </span>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            {isEditing ? (
              <select
                value={editData?.status || ''}
                onChange={(e) => setEditData(prev => prev ? { ...prev, status: e.target.value as any } : null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="backlog">Backlog</option>
                <option value="selected">Selected for Dev</option>
                <option value="in-progress">In Progress</option>
              </select>
            ) : (
              <span className="capitalize text-gray-900">
                {currentIssue.status.replace('-', ' ')}
              </span>
            )}
          </div>

          {/* Assignee */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assignee
            </label>
            {isEditing ? (
              <select
                value={editData?.assignee?.id || ''}
                onChange={(e) => {
                  const assignee = assignees.find(a => a.id === e.target.value);
                  setEditData(prev => prev ? { ...prev, assignee } : null);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Unassigned</option>
                {assignees.map((assignee) => (
                  <option key={assignee.id} value={assignee.id}>
                    {assignee.name}
                  </option>
                ))}
              </select>
            ) : currentIssue.assignee ? (
              <div className="flex items-center gap-2">
                <img
                  src={currentIssue.assignee.avatar}
                  alt={currentIssue.assignee.name}
                  className="h-6 w-6 rounded-full"
                />
                <span className="text-gray-900">{currentIssue.assignee.name}</span>
              </div>
            ) : (
              <span className="text-gray-500">Unassigned</span>
            )}
          </div>

          {/* Labels */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Labels
            </label>
            {isEditing ? (
              <div className="flex flex-wrap gap-1">
                {availableLabels.map((label) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => handleLabelToggle(label)}
                    className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                      editData?.labels?.includes(label)
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            ) : currentIssue.labels && currentIssue.labels.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {currentIssue.labels.map((label, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
                  >
                    {label}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-gray-500">No labels</span>
            )}
          </div>

          {/* Epic */}
          {(currentIssue.epic || isEditing) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Epic
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData?.epic || ''}
                  onChange={(e) => setEditData(prev => prev ? { ...prev, epic: e.target.value } : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter epic name..."
                />
              ) : (
                <span className="text-gray-900">{currentIssue.epic}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}