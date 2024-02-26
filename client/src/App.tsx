import { Outlet } from 'react-router-dom';
import { GlobalStyle } from './styles/global-styles';
import styled from 'styled-components';
import GlobalNav from './components/global-nav/global-nav';

const AppContainer = styled.div`
  width: 75%;
  max-width: 75rem;
  margin: 0 auto;
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <GlobalNav />
      <AppContainer>
        <Outlet />
      </AppContainer>
    </>
  );
}
