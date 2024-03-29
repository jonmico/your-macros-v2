import styled from 'styled-components';
import { PrimaryButton } from '../../components/button/button';
import { useFoodLog } from '../../hooks/useFoodLog';
import { FoodLog } from '../../types/food-log';
import MacroDisplay from '../../components/macro-display/macro-display';
import { Input } from '../../ui/input/input';
import { useUser } from '../../hooks/useUser';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const StyledFoodLogs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function FoodLogs() {
  return (
    <StyledFoodLogs>
      <FoodLogsHeader />
      <LogHistory />
    </StyledFoodLogs>
  );
}

const StyledFoodLogsHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

function FoodLogsHeader() {
  const { userId } = useUser();
  const { createLog } = useFoodLog();
  const [logName, setLogName] = useState('');

  async function handleClick() {
    await createLog(userId, logName);
  }

  return (
    <StyledFoodLogsHeader>
      <h2>Logs</h2>
      <div>
        <PrimaryButton onClick={handleClick} type={'submit'}>
          Create New Log
        </PrimaryButton>
        <label htmlFor='logName'>Log Name</label>
        <Input
          type='text'
          name={'logName'}
          id={'logName'}
          value={logName}
          onChange={(evt) => setLogName(evt.target.value)}
        />
      </div>
    </StyledFoodLogsHeader>
  );
}

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

function LogHistory() {
  return (
    <StyledLogHistory>
      <StyledH3>Log History</StyledH3>
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

function LogHistoryTable() {
  const { foodLogs } = useFoodLog();

  const foodLogList = foodLogs.map((log) => (
    <LogHistoryTableListItem key={log._id} log={log} />
  ));

  return (
    <StyledLogHistoryTable>
      <LogHistoryTableHeader />
      <ul>{foodLogList}</ul>
    </StyledLogHistoryTable>
  );
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
  }

  &:last-of-type {
    border-bottom-left-radius: var(--sm-radius);
    border-bottom-right-radius: var(--sm-radius);
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
