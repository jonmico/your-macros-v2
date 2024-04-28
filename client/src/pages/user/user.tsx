import { Outlet } from 'react-router-dom';
import UserNav from '../../components/user-nav/user-nav';
import styled from 'styled-components';

const StyledUserPage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function UserPage() {
  return (
    <StyledUserPage>
      <UserNav />
      <Outlet />
    </StyledUserPage>
  );
}
