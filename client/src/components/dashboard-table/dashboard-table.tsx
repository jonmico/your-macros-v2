import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useFoodLog } from '../../hooks/useFoodLog';
import { useUser } from '../../hooks/useUser';
import LogSelect from '../log-select/log-select';
import DashboardData from '../dashboard-data/dashboard-data';

const StyledDashboardTable = styled.div`
  border: 1px solid var(--color-indigo-300);
  padding: 0.75rem;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DashboardTableHeader = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const LogSelectWrapper = styled.div`
  width: 12.5rem;
`;

export default function DashboardTable() {
  const { foodLogs, currentLog } = useFoodLog();
  const { userState } = useUser();
  const { userData } = userState;

  if (userData === null) return;

  return (
    <StyledDashboardTable>
      {currentLog === null ? (
        <NoLogs />
      ) : (
        <>
          <DashboardTableHeader>
            <div>Currently viewing:</div>
            <LogSelectWrapper>
              <LogSelect currentLog={currentLog} logs={foodLogs} />
            </LogSelectWrapper>
          </DashboardTableHeader>
          <DashboardData currentLog={currentLog} userData={userData} />
        </>
      )}
    </StyledDashboardTable>
  );
}

const NoLogsContainer = styled.div`
  height: 7.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.5rem;
`;

const NoLogsText = styled.div`
  color: var(--color-gray-700);
  font-size: 1.25rem;
  font-weight: 600;
`;

const NoLogsLink = styled(Link)`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: var(--color-blue-200);

  transition: background-color 300ms ease-in-out;

  &:hover {
    background-color: var(--color-blue-300);
  }
`;

function NoLogs() {
  return (
    <NoLogsContainer>
      <NoLogsText>You haven't created any logs yet {':('}</NoLogsText>
      <NoLogsLink to={'/app/food-logs'}>Make your first log!</NoLogsLink>
    </NoLogsContainer>
  );
}
