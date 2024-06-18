import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  Spinner,
  CenterSpinnerContainer,
} from '../../components/spinner/spinner';

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
    return (
      <CenterSpinnerContainer>
        <Spinner></Spinner>
      </CenterSpinnerContainer>
    );
  }

  return <div>{children}</div>;
}
