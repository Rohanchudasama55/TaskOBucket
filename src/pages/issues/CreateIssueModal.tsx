import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

import {
  assignees,
  availableLabels,
  issueTypes,
  priorityTypes,
} from "./Constants";

import type { CreateIssueFormData, CreateIssueModalProps } from "./types";
import Dropdown from "../../components/common/DropDown/DropDown";

export function CreateIssueModal({
  isOpen,
  onClose,
  onCreateIssue,
  defaultStatus = "backlog",
}: CreateIssueModalProps) {
  const [formData, setFormData] = useState<CreateIssueFormData>({
    title: "",
    description: "",
    type: "story",
    priority: "medium",
    status: defaultStatus,
    assigneeIds: [],
    labels: [],
    epic: "",
    image: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setErrors({ title: "Title is required" });
      return;
    }

    const issueKey = `PROJ-${Math.floor(Math.random() * 900 + 100)}`;

    onCreateIssue({
      key: issueKey,
      title: formData.title.trim(),
      type: formData.type,
      priority: formData.priority,
      status: formData.status,
      assignee:
        formData.assigneeIds.length > 0
          ? assignees.find((a) => a.id === formData.assigneeIds[0])
          : undefined,
      labels: formData.labels.length ? formData.labels : undefined,
      epic: formData.epic || undefined,
      image: formData.image || undefined,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl  w-[550px] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-bold">Create New Issue</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <Input
            label="Issue Title *"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            error={errors.title}
            placeholder="Enter issue title"
          />

          {/* Description */}
          <Input
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Enter description"
          />

          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <div className="flex gap-2">
              {issueTypes.map((t) => (
                <button
                  key={t.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, type: t.value })}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    formData.type === t.value
                      ? t.color
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium mb-2">Priority</label>
            <div className="flex gap-2">
              {priorityTypes.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() =>
                    setFormData({ ...formData, priority: p.value })
                  }
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    formData.priority === p.value
                      ? p.color
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Project (Single dropdown) */}
          <div>
            <label className="block text-sm font-medium mb-2">Project</label>
            <Dropdown
              options={[
                { id: "sprint-1", name: "Sprint 1" },
                { id: "sprint-2", name: "Sprint 2" },
                { id: "sprint-3", name: "Sprint 3" },
              ]}
              labelKey="name"
              valueKey="id"
              selectedValues={formData.epic ? [formData.epic] : []}
              onChange={(val) =>
                setFormData({ ...formData, epic: String(val[0] || "") })
              }
            />
          </div>

          {/* Sprint (Single dropdown) */}
          <div>
            <label className="block text-sm font-medium mb-2">Sprint</label>
            <Dropdown
              options={[
                { id: "sprint-1", name: "Sprint 1" },
                { id: "sprint-2", name: "Sprint 2" },
                { id: "sprint-3", name: "Sprint 3" },
              ]}
              labelKey="name"
              valueKey="id"
              selectedValues={formData.epic ? [formData.epic] : []}
              onChange={(val) =>
                setFormData({ ...formData, epic: String(val[0] || "") })
              }
            />
          </div>

          {/* Status (Single dropdown) */}
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <Dropdown
              options={[
                { id: "sprint-1", name: "Sprint 1" },
                { id: "sprint-2", name: "Sprint 2" },
                { id: "sprint-3", name: "Sprint 3" },
              ]}
              labelKey="name"
              valueKey="id"
              selectedValues={formData.epic ? [formData.epic] : []}
              onChange={(val) =>
                setFormData({ ...formData, epic: String(val[0] || "") })
              }
            />
          </div>

          {/* Assignees (MULTI SELECT) */}
          <div>
            <label className="block text-sm font-medium mb-2">Assignees</label>
            <Dropdown
              options={assignees.map((a) => ({
                id: a.id,
                name: a.name,
              }))}
              labelKey="name"
              valueKey="id"
              multiple
              selectedValues={formData.assigneeIds}
              onChange={(vals) =>
                setFormData({ ...formData, assigneeIds: vals as string[] })
              }
              placeholder="Select assignees"
            />
          </div>

          {/* Labels (MULTI SELECT) */}
          <div>
            <label className="block text-sm font-medium mb-2">Labels</label>
            <Dropdown
              options={availableLabels.map((l) => ({
                id: l,
                name: l,
              }))}
              labelKey="name"
              valueKey="id"
              multiple
              selectedValues={formData.labels}
              onChange={(vals) =>
                setFormData({ ...formData, labels: vals as string[] })
              }
              placeholder="Select labels"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-6">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create Issue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
