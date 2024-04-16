import React, { useState } from 'react';
import { FaCircleXmark } from 'react-icons/fa6';
import styled from 'styled-components';
import {
  ExitButton,
  PrimaryButton,
  PurpleWideButton,
} from '../../components/button/button';
import LogHistory from '../../components/log-history/log-history';
import { useFoodLog } from '../../hooks/useFoodLog';
import { useUser } from '../../hooks/useUser';
import { Input } from '../../ui/input/input';
import { PageHeader } from '../../ui/page-header/page-header';

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
  return (
    <StyledFoodLogsHeader>
      <PageHeader>Food Logs</PageHeader>
      <CreateNewLog />
    </StyledFoodLogsHeader>
  );
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.25rem;
`;

const CreateLogHeader = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ErrorText = styled.div`
  border: 1px solid var(--color-red-600);
  border-radius: var(--sm-radius);
  color: var(--color-red-600);
  background-color: var(--color-red-200);
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
`;

function CreateNewLog() {
  const { userId } = useUser();
  const { createLog, error } = useFoodLog();
  const [logName, setLogName] = useState('');
  const [logNameError, setLogNameError] = useState('');
  const [isCreateLogOpen, setIsCreateLogOpen] = useState(false);

  function handleOpenClick() {
    setIsCreateLogOpen(true);
  }

  function handleCloseClick() {
    setIsCreateLogOpen(false);
    setLogNameError('');
  }

  function handleInputChange(evt: React.ChangeEvent<HTMLInputElement>) {
    if (logNameError) setLogNameError('');
    setLogName(evt.target.value);
  }

  async function handleCreateClick(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (!logName) {
      setLogNameError('Please provide a name for the log');
      return;
    }
    const data = await createLog(userId, logName);

    if (!data) return;

    if (data.createdLog) setLogName('');
  }

  return (
    <div>
      {!isCreateLogOpen ? (
        <PrimaryButton onClick={handleOpenClick} type={'submit'}>
          Create New Log
        </PrimaryButton>
      ) : (
        <StyledForm onSubmit={handleCreateClick}>
          <CreateLogHeader>
            <label htmlFor='logName'>Food Log Name</label>
            <ExitButton onClick={handleCloseClick} type={'button'}>
              <FaCircleXmark />
            </ExitButton>
          </CreateLogHeader>
          <Input
            placeholder={'Food Log Name...'}
            type='text'
            name={'logName'}
            id={'logName'}
            value={logName}
            onChange={handleInputChange}
          />
          {logNameError && <ErrorText>{logNameError}</ErrorText>}
          {error && <ErrorText>{error}</ErrorText>}
          <PurpleWideButton type={'submit'}>Create Food Log</PurpleWideButton>
        </StyledForm>
      )}
    </div>
  );
}
