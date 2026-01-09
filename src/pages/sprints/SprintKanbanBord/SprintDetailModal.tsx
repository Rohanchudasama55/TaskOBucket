import { useState } from 'react';
import { X, Edit2, Trash2, Save } from 'lucide-react';
import type { Sprint, SprintStatus } from '../types';

interface SprintDetailModalProps {
  sprint: Sprint | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateSprint: (sprint: Sprint) => void;
  onDeleteSprint: (sprintId: string) => void;
}

/** Mock projects – replace with API later */
const projects = [
  { id: 'p1', name: 'Project Alpha' },
  { id: 'p2', name: 'Project Beta' },
  { id: 'p3', name: 'Project Gamma' },
];

export function SprintDetailModal({
  sprint,
  isOpen,
  onClose,
  onUpdateSprint,
  onDeleteSprint,
}: SprintDetailModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Sprint | null>(null);

  if (!isOpen || !sprint) return null;

  const current = isEditing ? editData! : sprint;

  const handleEdit = () => {
    setEditData({ ...sprint });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editData) {
      onUpdateSprint(editData);
      setIsEditing(false);
      setEditData(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(null);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this sprint?')) {
      onDeleteSprint(sprint.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-bold text-slate-900">
            Sprint Details
          </h2>

          <div className="flex items-center gap-2">
            {!isEditing ? (
              <>
                <button
                  onClick={handleEdit}
                  className="p-2 rounded-lg hover:bg-slate-100"
                  title="Edit sprint"
                >
                  <Edit2 className="h-4 w-4 text-slate-600" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-2 rounded-lg hover:bg-red-50"
                  title="Delete sprint"
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </>
            ) : (
              <button
                onClick={handleSave}
                className="p-2 rounded-lg hover:bg-green-50"
                title="Save changes"
              >
                <Save className="h-4 w-4 text-green-600" />
              </button>
            )}

            <button
              onClick={isEditing ? handleCancel : onClose}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              <X className="h-5 w-5 text-slate-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Sprint Name</label>
            {isEditing ? (
              <input
                value={editData?.name || ''}
                onChange={e =>
                  setEditData(p => (p ? { ...p, name: e.target.value } : null))
                }
                className="w-full px-3 py-2 rounded-lg ring-1 ring-slate-300"
              />
            ) : (
              <p className="font-semibold text-slate-900">{current.name}</p>
            )}
          </div>

          {/* Project */}
          <div>
            <label className="block text-sm font-medium mb-1">Project</label>
            {isEditing ? (
              <select
                value={editData?.projectId || ''}
                onChange={e => {
                  const project = projects.find(p => p.id === e.target.value);
                  setEditData(p =>
                    p
                      ? {
                          ...p,
                          projectId: project?.id || '',
                          projectName: project?.name || '',
                        }
                      : null
                  );
                }}
                className="w-full px-3 py-2 rounded-lg ring-1 ring-slate-300"
              >
                <option value="">Select project</option>
                {projects.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-slate-700">{current.projectName}</p>
            )}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              {isEditing ? (
                <input
                  type="date"
                  value={editData?.startDate || ''}
                  onChange={e =>
                    setEditData(p => (p ? { ...p, startDate: e.target.value } : null))
                  }
                  className="w-full px-3 py-2 rounded-lg ring-1 ring-slate-300"
                />
              ) : (
                <p>{current.startDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              {isEditing ? (
                <input
                  type="date"
                  value={editData?.endDate || ''}
                  onChange={e =>
                    setEditData(p => (p ? { ...p, endDate: e.target.value } : null))
                  }
                  className="w-full px-3 py-2 rounded-lg ring-1 ring-slate-300"
                />
              ) : (
                <p>{current.endDate}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            {isEditing ? (
              <textarea
                rows={3}
                value={editData?.description || ''}
                onChange={e =>
                  setEditData(p => (p ? { ...p, description: e.target.value } : null))
                }
                className="w-full px-3 py-2 rounded-lg ring-1 ring-slate-300"
              />
            ) : (
              <p className="text-slate-700">
                {current.description || '—'}
              </p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            {isEditing ? (
              <select
                value={editData?.status || ''}
                onChange={e =>
                  setEditData(p =>
                    p ? { ...p, status: e.target.value as SprintStatus } : null
                  )
                }
                className="w-full px-3 py-2 rounded-lg ring-1 ring-slate-300"
              >
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            ) : (
              <p className="capitalize">{current.status}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
