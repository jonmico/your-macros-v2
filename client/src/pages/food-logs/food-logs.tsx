import { useState } from 'react';
import styled from 'styled-components';
import { PrimaryButton } from '../../components/button/button';
import { useFoodLog } from '../../hooks/useFoodLog';
import { useUser } from '../../hooks/useUser';
import { Input } from '../../ui/input/input';
import LogHistory from '../../components/log-history/log-history';

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
