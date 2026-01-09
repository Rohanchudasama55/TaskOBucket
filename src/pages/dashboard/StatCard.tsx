import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  change?: number;
  trend?: 'up' | 'down';
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  change,
  trend
}) => (
  <div className="bg-white rounded-lg p-6 shadow-sm border">
    <span className="text-sm text-gray-600">{title}</span>

    <div className="flex justify-between items-end mt-2">
      <div>
        <h2 className="text-3xl font-bold">{value}</h2>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      {change !== undefined && trend && (
        <div className={`flex items-center text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          <span className="ml-1">{Math.abs(change)}</span>
        </div>
      )}
    </div>
  </div>
);

export default StatCard;
