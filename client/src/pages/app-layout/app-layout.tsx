import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import AppNav from '../../components/app-nav/app-nav';

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 12.5rem 1fr;
`;

export default function AppLayout() {
  return (
    <StyledAppLayout>
      <AppNav />
      <Outlet />
    </StyledAppLayout>
  );
}
