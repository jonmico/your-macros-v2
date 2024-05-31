import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
      console.log('In useEffect hook.');
      navigate('/login');
    }
  }, [isLoading, isLoggedIn, navigate]);

  if (isLoading) {
    return 'LOADING';
  }

  return <div>{children}</div>;
}
