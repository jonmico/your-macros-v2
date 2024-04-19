import { Outlet } from 'react-router-dom';
import { GlobalStyle } from './styles/global-styles';
import styled from 'styled-components';
import GlobalNav from './components/global-nav/global-nav';
import { AuthProvider } from './contexts/auth-context';
import { UserProvider } from './contexts/user-context';
import { FoodLogProvider } from './contexts/food-log-context';
import { FoodProvider } from './contexts/food-context';
import { MealProvider } from './contexts/meal-context';
import { useAuth } from './hooks/useAuth';

const AppContainer = styled.div`
  width: 85%;
  margin: 0 auto;
`;

export default function App() {
  const {
    authState: { userId },
  } = useAuth();

  return (
    <AuthProvider>
      <UserProvider userId={userId}>
        <FoodLogProvider>
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
    </AuthProvider>
  );
}
