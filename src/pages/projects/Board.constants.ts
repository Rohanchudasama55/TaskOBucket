export const BOARD_MESSAGES = {
  title: 'Project Board',
  loading: 'Loading board...',
  error: 'Failed to load board',
  noTasks: 'No tasks found',
  addTask: 'Add Task',
  editTask: 'Edit Task'
} as const;

export const BOARD_COLUMNS = {
  todo: 'To Do',
  inProgress: 'In Progress',
  review: 'Review',
  done: 'Done'
} as const;

export const BOARD_ACTIONS = {
  addTask: 'add-task',
  editTask: 'edit-task',
  deleteTask: 'delete-task',
  moveTask: 'move-task'
} as const;