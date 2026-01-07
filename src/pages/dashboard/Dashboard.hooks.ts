import { useState, useEffect } from 'react';

export interface DashboardData {
  projectCount: number;
  taskCount: number;
  teamMemberCount: number;
  completedTasksThisWeek: number;
}

export interface UseDashboardReturn {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  refreshData: () => void;
}

export function useDashboard(): UseDashboardReturn {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: DashboardData = {
        projectCount: 12,
        taskCount: 48,
        teamMemberCount: 8,
        completedTasksThisWeek: 23
      };
      
      setData(mockData);
    } catch (err) {
      setError('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const refreshData = () => {
    fetchDashboardData();
  };

  return {
    data,
    isLoading,
    error,
    refreshData
  };
}