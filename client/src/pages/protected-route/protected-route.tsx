import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MealProvider } from '../../contexts/meal-context';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const {
    authState: { isLoading, isLoggedIn },
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoading, isLoggedIn, navigate]);

  if (isLoading) {
    return 'LOADING';
  }

  // if (userData === null) return null;

  return <MealProvider>{children}</MealProvider>;
}
