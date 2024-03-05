import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoading, isLoggedIn, userData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading === false && isLoggedIn === false && !userData) {
      navigate('/login');
    }
  }, [isLoading, isLoggedIn, userData, navigate]);

  return children;
}
