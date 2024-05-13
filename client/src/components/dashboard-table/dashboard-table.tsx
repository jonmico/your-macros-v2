import { useFoodLog } from '../../hooks/useFoodLog';
import { useUser } from '../../hooks/useUser';
import LogSelect from '../log-select/log-select';

export default function DashboardTable() {
  const { foodLogs, currentLog } = useFoodLog();
  const { userState } = useUser();
  const { userData } = userState;

  if (userData === null) return;

  return (
    <div>
      <div>Currently viewing:</div>
      <LogSelect currentLog={currentLog} logs={foodLogs} />
    </div>
  );
}
