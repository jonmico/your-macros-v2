import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import GlobalNav from './components/global-nav/global-nav';
import { FoodProvider } from './contexts/food-context';
import { FoodLogProvider } from './contexts/food-log-context';
import { MealProvider } from './contexts/meal-context';
import { UserProvider } from './contexts/user-context';
import { useAuth } from './hooks/useAuth';
import { GlobalStyle } from './styles/global-styles';

const AppContainer = styled.div`
  width: 85%;
  margin: 0 auto;
`;

export default function App() {
  const {
    authState: { userId },
  } = useAuth();

  return (
    <UserProvider userId={userId}>
      <FoodLogProvider userId={userId}>
        <FoodProvider>
          <MealProvider>
            <GlobalStyle />
            <GlobalNav />
            <AppContainer>
              <Outlet />
            </AppContainer>
          </MealProvider>
        </FoodProvider>
      </FoodLogProvider>
    </UserProvider>
  );
}
