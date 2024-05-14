import { FoodLog } from '../../types/food-log';

interface DashboardGridProps {
  currentLog: FoodLog;
}

export default function DashboardGrid({ currentLog }: DashboardGridProps) {
  return (
    <div>
      <h2>{currentLog.name}</h2>
    </div>
  );
}
