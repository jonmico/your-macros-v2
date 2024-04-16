import styled from 'styled-components';
import { useFoodLog } from '../../hooks/useFoodLog';
import { Link } from 'react-router-dom';
import MacroDisplay from '../macro-display/macro-display';
import { FoodLog } from '../../types/food-log';

const StyledLogHistory = styled.div`
  border: 1px solid var(--color-blue-400);
  border-radius: var(--md-radius);
  padding: 1.25rem;
  background-color: var(--color-blue-100);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const StyledH3 = styled.h3`
  font-size: 1.5rem;
  color: var(--color-indigo-700);
`;

export default function LogHistory() {
  return (
    <StyledLogHistory>
      <StyledH3>Food Log History</StyledH3>
      <LogHistoryTable />
    </StyledLogHistory>
  );
}

const StyledLogHistoryTable = styled.div`
  background-color: var(--color-blue-200);
  padding: 0.75rem;
  border-radius: var(--sm-radius);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
`;

const NoLogText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  color: var(--color-gray-600);
  font-weight: 700;
  text-align: center;
`;

function LogHistoryTable() {
  const { foodLogs } = useFoodLog();

  const foodLogList = foodLogs.map((log) => (
    <LogHistoryTableListItem key={log._id} log={log} />
  ));

  const LogHistoryTableOutput =
    foodLogList.length === 0 ? (
      <NoLogText>
        No logs created yet. Click the button above to create your first log!
      </NoLogText>
    ) : (
      <>
        <LogHistoryTableHeader />
        <ul>{foodLogList}</ul>
      </>
    );

  return <StyledLogHistoryTable>{LogHistoryTableOutput}</StyledLogHistoryTable>;
}

const StyledLogHistoryTableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.35fr 1fr 1fr 0.25fr;
  gap: 1rem;
  font-weight: 600;
  border-bottom: 1px solid var(--color-blue-400);
  padding: 0 1rem 0.25rem 1rem;
`;

function LogHistoryTableHeader() {
  return (
    <StyledLogHistoryTableHeader>
      <div>Name</div>
      <div>Meals</div>
      <div>Macros</div>
      <div>Created</div>
      <div>Link</div>
    </StyledLogHistoryTableHeader>
  );
}

const StyledLogHistoryTableListItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 0.35fr 1fr 1fr 0.25fr;
  gap: 1rem;
  padding: 1rem;

  &:nth-of-type(even) {
    background-color: var(--color-blue-300);
    border-radius: var(--sm-radius);
  }
`;

const LogName = styled.div`
  font-weight: 500;
`;

const StyledLink = styled(Link)`
  background-color: var(--color-indigo-600);
  border-radius: var(--lg-radius);
  padding: 0.25rem 0.5rem;
  color: var(--color-slate-100);
  font-size: 0.85rem;
  transition: background-color 200ms ease-in-out;

  &:hover {
    background-color: var(--color-indigo-500);
  }
`;

interface LogHistoryTableListItemProps {
  log: FoodLog;
}

function LogHistoryTableListItem({ log }: LogHistoryTableListItemProps) {
  const {
    calories,
    macros: { carbs, fat, protein },
  } = log.logTotals;
  const data = { calories, fat, carbs, protein };

  const formattedCreatedAt = new Date(log.createdAt).toDateString();

  return (
    <StyledLogHistoryTableListItem>
      <LogName>{log.name}</LogName>
      <div>{log.meals.length}</div>
      <MacroDisplay data={data} />
      <div>{formattedCreatedAt}</div>
      <div>
        <StyledLink to={`${log._id}`}>VIEW</StyledLink>
      </div>
    </StyledLogHistoryTableListItem>
  );
}
