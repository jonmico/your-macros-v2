import styled from 'styled-components';
import CurrentLogMeals from '../../components/current-log-meals/current-log-meals';
import DashboardTable from '../../components/dashboard-table/dashboard-table';
import { useUser } from '../../hooks/useUser';
import { IconButton } from '../../components/button/button';
import { FaXmark } from 'react-icons/fa6';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const StyledH2 = styled.h2`
  color: var(--color-gray-700);
`;

const StyledDashboard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export default function Dashboard() {
  const {
    userState: { userData },
  } = useUser();

  if (!userData) return null;

  return (
    <StyledDashboard>
      {!userData.isInitialized && <InitializeAccount />}
      <Container>
        <StyledH2>Dashboard</StyledH2>
        <DashboardTable />
      </Container>
      <Container>
        <CurrentLogMeals />
      </Container>
    </StyledDashboard>
  );
}

const StyledInitializeAccount = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  background-color: var(--color-blue-100);
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid var(--color-blue-300);
  color: var(--color-blue-700);
`;

function InitializeAccount() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <StyledInitializeAccount>
      <Link to={'/app/user/settings'}>Click here to set up your account!</Link>
      <div>
        <IconButton onClick={() => setIsOpen(false)}>
          <FaXmark />
        </IconButton>
      </div>
    </StyledInitializeAccount>
  );
}
