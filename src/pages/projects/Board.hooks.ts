import { useState, useEffect } from 'react';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'inProgress' | 'review' | 'done';
  assignee?: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
}

export interface UseBoardReturn {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, newStatus: Task['status']) => void;
}

export function useBoard(): UseBoardReturn {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading tasks
    const loadTasks = async () => {
      setIsLoading(true);
      try {
        // Mock data
        const mockTasks: Task[] = [
          {
            id: '1',
            title: 'Design user interface',
            description: 'Create wireframes and mockups for the new feature',
            status: 'inProgress',
            assignee: 'John Doe',
            priority: 'high',
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-02')
          },
          {
            id: '2',
            title: 'Implement API endpoints',
            description: 'Create REST API endpoints for user management',
            status: 'todo',
            assignee: 'Jane Smith',
            priority: 'medium',
            createdAt: new Date('2024-01-01'),
            updatedAt: new Date('2024-01-01')
          }
        ];
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTasks(mockTasks);
      } catch (err) {
        setError('Failed to load tasks');
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const moveTask = (id: string, newStatus: Task['status']) => {
    updateTask(id, { status: newStatus });
  };

  return {
    tasks,
    isLoading,
    error,
    addTask,
    updateTask,
    deleteTask,
    moveTask
  };
}