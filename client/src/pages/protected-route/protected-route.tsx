import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserProvider } from '../../contexts/user-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoading, isLoggedIn, userData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoading, isLoggedIn, navigate]);

  if (isLoading) {
    return 'LOADING';
  }

  if (userData === null) return null;

  return <UserProvider userData={userData}>{children}</UserProvider>;
}
