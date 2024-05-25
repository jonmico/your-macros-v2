import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCookies } from 'react-cookie';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const {
    authState: { isLoading, isLoggedIn },
  } = useAuth();
  const navigate = useNavigate();
  const [cookies] = useCookies(['token']);

  console.log(cookies);

  useEffect(() => {
    if (!isLoading && !isLoggedIn && !cookies.token) {
      console.log('In useEffect hook.');
      navigate('/login');
    }
  }, [isLoading, isLoggedIn, navigate, cookies.token]);

  if (isLoading) {
    return 'LOADING';
  }

  return <div>{children}</div>;
}
