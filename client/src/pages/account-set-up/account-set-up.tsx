import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useEffect } from 'react';
import { useUser } from '../../hooks/useUser';
import SettingsMacroForm from '../../components/settings-macro-form/settings-macro-form';
import { UserData } from '../../types/user-data';
import styled from 'styled-components';

const StyledAccountSetup = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: var(--color-slate-600);
  transition: color 200ms ease-in-out;

  &:hover {
    color: var(--color-indigo-700);
  }
`;

export default function AccountSetUp() {
  const {
    userState: { userData },
  } = useUser();

  if (!userData) return null;

  return (
    <StyledAccountSetup>
      <div>
        <h2>Welcome to YourMacros!</h2>
        <h3>Please configure your account below</h3>
      </div>
      <AccountSetupForm userData={userData} />
      <StyledLink to={'/app'}>Skip for now</StyledLink>
    </StyledAccountSetup>
  );
}

interface AccountSetupFormProps {
  userData: UserData;
}

function AccountSetupForm({ userData }: AccountSetupFormProps) {
  const { isInitialized, macros } = userData;
  const navigate = useNavigate();
  const {
    authState: { isLoggedIn, isLoading },
  } = useAuth();

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      navigate('/login');
    }

    if (isLoggedIn && isInitialized) {
      navigate('/app');
    }
  }, [isLoggedIn, navigate, isLoading, isInitialized]);

  return (
    <div>
      <SettingsMacroForm macros={macros} />
    </div>
  );
}
