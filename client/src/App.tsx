import { Outlet } from 'react-router-dom';
import { GlobalStyle } from './styles/global-styles';
import styled from 'styled-components';
import GlobalNav from './components/global-nav/global-nav';
import { AuthProvider } from './contexts/auth-context';
import { UserProvider } from './contexts/user-context';
import { FoodLogProvider } from './contexts/food-log-context';
import { FoodProvider } from './contexts/food-context';
import { MealProvider } from './contexts/meal-context';

const AppContainer = styled.div`
  width: 85%;
  margin: 0 auto;
`;

export default function App() {
  return (
    <AuthProvider>
      <UserProvider>
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
