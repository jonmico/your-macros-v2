import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import AppNav from '../../components/app-nav/app-nav';

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 15rem 1fr;
`;

const OutletContainer = styled.div`
  padding: 2rem;
`;

export default function AppLayout() {
  return (
    <StyledAppLayout>
      <AppNav />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </StyledAppLayout>
  );
}
