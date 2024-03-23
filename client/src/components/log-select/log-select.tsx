import styled, { css, keyframes } from 'styled-components';
import { FoodLog } from '../../types/food-log';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa6';
import { useFoodLog } from '../../hooks/useFoodLog';

const rotate90 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-90deg);
  }
`;

const StyledLogSelect = styled.div`
  position: relative;
`;

interface LogSelectMainProps {
  $isLogListOpen: boolean;
}

const LogSelectMain = styled.div<LogSelectMainProps>`
  border: 1px solid var(--color-blue-500);
  border-radius: var(--sm-radius);
  background-color: var(--color-slate-100);
  padding: 0.25rem 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 10rem;

  &:hover {
    cursor: pointer;
  }

  & svg {
    animation: ${(props) =>
      props.$isLogListOpen
        ? css`
             250ms forwards ${rotate90}
          `
        : ''};
  }
`;

const LogSelectName = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const scaleList = keyframes`
  from {
    transform: scaleY(0);
    opacity: 0;
  } to {
    transform: scaleY(1);
    opacity: 1;
  }
`;

const LogSelectList = styled.ul`
  border: 1px solid var(--color-blue-500);
  padding: 0.25rem;
  border-radius: var(--sm-radius);
  position: absolute;
  width: max-content;
  background-color: var(--color-slate-100);
  transform: scaleY(0);
  opacity: 0;
  animation: ${css`100ms forwards ${scaleList}`};
`;

interface LogSelectProps {
  logs: FoodLog[];
  currentLog: FoodLog | null;
}

export default function LogSelect({ logs, currentLog }: LogSelectProps) {
  const [isLogListOpen, setIsLogListOpen] = useState(false);

  // TODO: Look at null case.
  if (!logs.length || currentLog === null) {
    return <Link to={'/app/food-logs'}>Create a log</Link>;
  }

  const logList = logs.map((log) => (
    <LogSelectListItem
      key={log._id}
      log={log}
      closeLogList={() => setIsLogListOpen(false)}
    />
  ));

  function handleLogListClick() {
    setIsLogListOpen((prevState) => !prevState);
  }

  return (
    <StyledLogSelect>
      <LogSelectMain
        $isLogListOpen={isLogListOpen}
        onClick={handleLogListClick}
      >
        <LogSelectName>{currentLog?.name}</LogSelectName> <FaAngleLeft />
      </LogSelectMain>
      {isLogListOpen && <LogSelectList>{logList}</LogSelectList>}
    </StyledLogSelect>
  );
}

const ListItem = styled.li`
  padding: 0.25rem 0.5rem;
  border-radius: var(--sm-radius);
  transition: background-color 250ms;

  &:hover {
    cursor: pointer;
    background-color: var(--color-blue-200);
  }
`;

interface LogSelectListItemProps {
  log: FoodLog;
  closeLogList: () => void;
}

function LogSelectListItem({ log, closeLogList }: LogSelectListItemProps) {
  const { foodLogDispatch } = useFoodLog();

  function handleClick() {
    foodLogDispatch({ type: 'foodLog/setCurrentLog', payload: log });
    closeLogList();
  }

  return <ListItem onClick={handleClick}>{log.name}</ListItem>;
}
