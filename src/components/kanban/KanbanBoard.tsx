import { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import type {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import type {
  KanbanColumn,
  KanbanIssue,
  BoardFilters,
  ViewMode,
} from "../../types/kanban";
import { BoardHeader } from "./BoardHeader";
import { BoardFilters as BoardFiltersComponent } from "./BoardFilters";
import { KanbanColumn as KanbanColumnComponent } from "./KanbanColumn";
import { EmptyBoardState } from "./EmptyBoardState";
import { KanbanCard } from "./KanbanCard";
// import { CreateIssueModal } from './CreateIssueModal';
import { IssueDetailModal } from "./IssueDetailModal";
import { CreateIssueModal } from "../../pages/issues/CreateIssueModal";

// Mock data
const mockIssues: KanbanIssue[] = [
  {
    id: "1",
    key: "PROJ-105",
    title: "Implement user authentication system",
    type: "story",
    status: "backlog",
    assignee: {
      id: "1",
      name: "John Doe",
      avatar: "https://i.pravatar.cc/100?img=1",
    },
    labels: ["frontend", "security"],
    epic: "user-authentication",
    order: 0,
  },
  {
    id: "2",
    key: "PROJ-106",
    title: "Design login page mockups",
    type: "task",
    status: "backlog",
    assignee: {
      id: "2",
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/100?img=2",
    },
    labels: ["ui-ux"],
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=200&fit=crop",
    order: 1,
  },
  {
    id: "3",
    key: "PROJ-107",
    title: "Fix navigation menu bug on mobile",
    type: "bug",
    status: "backlog",
    assignee: {
      id: "3",
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/100?img=3",
    },
    labels: ["mobile", "bug-fix"],
    order: 2,
  },
  {
    id: "4",
    key: "PROJ-108",
    title: "Add password reset functionality",
    type: "story",
    status: "backlog",
    assignee: {
      id: "1",
      name: "John Doe",
      avatar: "https://i.pravatar.cc/100?img=1",
    },
    labels: ["backend"],
    order: 3,
  },
  {
    id: "5",
    key: "PROJ-109",
    title: "Update API documentation",
    type: "task",
    status: "selected",
    assignee: {
      id: "4",
      name: "Sarah Wilson",
      avatar: "https://i.pravatar.cc/100?img=4",
    },
    labels: ["documentation"],
    order: 0,
  },
  {
    id: "6",
    key: "PROJ-110",
    title: "Implement dashboard analytics",
    type: "story",
    status: "selected",
    assignee: {
      id: "2",
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/100?img=2",
    },
    labels: ["frontend", "analytics"],
    order: 1,
  },
  {
    id: "7",
    key: "PROJ-111",
    title: "Optimize database queries",
    type: "task",
    status: "in-progress",
    assignee: {
      id: "3",
      name: "Mike Johnson",
      avatar: "https://i.pravatar.cc/100?img=3",
    },
    labels: ["backend", "performance"],
    order: 0,
  },
];

interface KanbanBoardProps {
  projectTitle?: string;
}

export function KanbanBoard({
  projectTitle = "Project Alpha Board",
}: KanbanBoardProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("kanban");
  const [filters, setFilters] = useState<BoardFilters>({});
  const [issues, setIssues] = useState<KanbanIssue[]>([]);
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [activeIssue, setActiveIssue] = useState<KanbanIssue | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<KanbanIssue | null>(null);
  const [createModalDefaultStatus, setCreateModalDefaultStatus] = useState<'backlog' | 'selected' | 'in-progress' | 'completed'>('backlog');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Load demo data on component mount
  useEffect(() => {
    if (!showEmptyState) {
      setIssues(mockIssues);
    } else {
      setIssues([]);
    }
  }, [showEmptyState]);

  // Filter issues based on current filters
  const filteredIssues = (showEmptyState ? [] : issues).filter((issue) => {
    if (filters.assignee && issue.assignee?.id !== filters.assignee)
      return false;
    if (filters.epic && issue.epic !== filters.epic) return false;
    if (filters.label && !issue.labels?.includes(filters.label)) return false;
    return true;
  });

  // Group issues by status
  const columns: KanbanColumn[] = [
    {
      id: "backlog",
      title: "BACKLOG",
      status: "backlog",
      issues: filteredIssues
        .filter((issue) => issue.status === "backlog")
        .sort((a, b) => (a.order || 0) - (b.order || 0)),
    },
    {
      id: "selected",
      title: "SELECTED FOR DEV",
      status: "selected",
      issues: filteredIssues
        .filter((issue) => issue.status === "selected")
        .sort((a, b) => (a.order || 0) - (b.order || 0)),
    },
    {
      id: 'in-progress',
      title: 'IN PROGRESS',
      status: 'in-progress',
      issues: filteredIssues.filter(issue => issue.status === 'in-progress').sort((a, b) => (a.order || 0) - (b.order || 0))
    },
    {
      id: 'completed',
      title: 'COMPLETED',
      status: 'completed',
      issues: filteredIssues.filter(issue => issue.status === 'completed').sort((a, b) => (a.order || 0) - (b.order || 0))
    }
  ];

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const issue = issues.find((issue) => issue.id === active.id);
    setActiveIssue(issue || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Find the active issue
    const activeIssue = issues.find((issue) => issue.id === activeId);
    if (!activeIssue) return;

    // Check if we're dropping over a column
    const overColumn = columns.find((col) => col.id === overId);
    if (overColumn && activeIssue.status !== overColumn.status) {
      setIssues((prevIssues) => {
        return prevIssues.map((issue) => {
          if (issue.id === activeId) {
            return {
              ...issue,
              status: overColumn.status,
              order: overColumn.issues.length,
            };
          }
          return issue;
        });
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveIssue(null);

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // Find the active issue
    const activeIssue = issues.find((issue) => issue.id === activeId);
    if (!activeIssue) return;

    // Find which column the active issue belongs to
    const activeColumn = columns.find((col) =>
      col.issues.some((issue) => issue.id === activeId)
    );

    // Find the over issue
    const overIssue = issues.find((issue) => issue.id === overId);

    if (activeColumn && overIssue && activeIssue.status === overIssue.status) {
      // Reordering within the same column
      const columnIssues = activeColumn.issues;
      const oldIndex = columnIssues.findIndex((issue) => issue.id === activeId);
      const newIndex = columnIssues.findIndex((issue) => issue.id === overId);

      if (oldIndex !== newIndex) {
        const reorderedIssues = arrayMove(columnIssues, oldIndex, newIndex);

        setIssues((prevIssues) => {
          return prevIssues.map((issue) => {
            const reorderedIssue = reorderedIssues.find(
              (ri) => ri.id === issue.id
            );
            if (reorderedIssue) {
              return {
                ...issue,
                order: reorderedIssues.indexOf(reorderedIssue),
              };
            }
            return issue;
          });
        });
      }
    }
  };

  const handleCreateIssue = () => {
    setCreateModalDefaultStatus("backlog");
    setIsCreateModalOpen(true);
  };

  const handleImportIssues = () => {
    // Load demo data
    setIssues(mockIssues);
    console.log("Demo issues imported");
  };

  const handleAddIssue = (columnId: string) => {
    const statusMap = {
      'backlog': 'backlog' as const,
      'selected': 'selected' as const,
      'in-progress': 'in-progress' as const,
      'completed': 'completed' as const
    };
    setCreateModalDefaultStatus(
      statusMap[columnId as keyof typeof statusMap] || "backlog"
    );
    setIsCreateModalOpen(true);
  };

  const handleCardClick = (issue: KanbanIssue) => {
    setSelectedIssue(issue);
  };

  const handleCreateNewIssue = (
    newIssueData: Omit<KanbanIssue, "id" | "order">
  ) => {
    const newIssue: KanbanIssue = {
      ...newIssueData,
      id: Date.now().toString(),
      order: issues.filter((i) => i.status === newIssueData.status).length,
    };

    setIssues((prev) => [...prev, newIssue]);
  };

  const handleUpdateIssue = (updatedIssue: KanbanIssue) => {
    setIssues((prev) =>
      prev.map((issue) => (issue.id === updatedIssue.id ? updatedIssue : issue))
    );
    setSelectedIssue(null);
  };

  const handleDeleteIssue = (issueId: string) => {
    setIssues((prev) => prev.filter((issue) => issue.id !== issueId));
    setSelectedIssue(null);
  };

  const handleResetData = () => {
    setIssues([]);
    setShowEmptyState(true);
  };

  const hasIssues = filteredIssues.length > 0;

  return (
    <div className="p-8 bg-gradient-to-br from-slate-50/50 to-white min-h-screen">
      {/* Demo Controls */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setShowEmptyState(!showEmptyState)}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 bg-blue-50/50 hover:bg-blue-100/50 px-3 py-1.5 rounded-lg transition-all duration-200"
        >
          {showEmptyState ? "Load Demo Data" : "Show Empty State"}
        </button>
        <span className="text-slate-300">|</span>
        <button
          onClick={handleResetData}
          className="text-sm font-medium text-red-600 hover:text-red-700 bg-red-50/50 hover:bg-red-100/50 px-3 py-1.5 rounded-lg transition-all duration-200"
        >
          Reset All Data
        </button>
        <span className="text-slate-300">|</span>
        <span className="text-xs text-slate-500 flex items-center">
          Data resets on page refresh
        </span>
      </div>

      <BoardHeader
        title={projectTitle}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onCreateIssue={handleCreateIssue}
      />

      {viewMode === "kanban" && (
        <>
          <BoardFiltersComponent
            filters={filters}
            onFiltersChange={setFilters}
          />

          {hasIssues ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragEnd={handleDragEnd}
            >
              <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
                {columns.map((column) => (
                  <KanbanColumnComponent
                    key={column.id}
                    column={column}
                    onAddIssue={handleAddIssue}
                    onCardClick={handleCardClick}
                  />
                ))}
              </div>

              <DragOverlay
                dropAnimation={{
                  duration: 300,
                  easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
                }}
              >
                {activeIssue ? (
                  <div className="rotate-3 scale-105 opacity-95 shadow-2xl">
                    <KanbanCard issue={activeIssue} />
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          ) : (
            <EmptyBoardState
              onCreateIssue={handleCreateIssue}
              onImportIssues={handleImportIssues}
            />
          )}
        </>
      )}

      {viewMode === "list" && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center">
            <div className="w-8 h-8 bg-slate-300 rounded animate-pulse"></div>
          </div>
          <p className="text-slate-600 font-medium">List view coming soon...</p>
        </div>
      )}

      {viewMode === "timeline" && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-2xl flex items-center justify-center">
            <div className="w-8 h-8 bg-slate-300 rounded animate-pulse"></div>
          </div>
          <p className="text-slate-600 font-medium">
            Timeline view coming soon...
          </p>
        </div>
      )}

      {/* Modals */}
      <CreateIssueModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateIssue={handleCreateNewIssue}
        defaultStatus={createModalDefaultStatus}
      />

      <IssueDetailModal
        issue={selectedIssue}
        isOpen={!!selectedIssue}
        onClose={() => setSelectedIssue(null)}
        onUpdateIssue={handleUpdateIssue}
        onDeleteIssue={handleDeleteIssue}
      />
    </div>
  );
}



