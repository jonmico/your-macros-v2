import { Outlet } from 'react-router-dom';
import { GlobalStyle } from './styles/global-styles';
import styled from 'styled-components';
import GlobalNav from './components/global-nav/global-nav';

const AppContainer = styled.div`
  width: 75%;
  margin: 0 auto;
  padding: 0.5rem 0 0 0;
`;

export default function App() {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <GlobalNav />
        <Outlet />
      </AppContainer>
    </>
  );
}
