import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth';
import { apiDeleteUser } from '../../services/auth-api';
import { BadRedButton } from '../button/button';

const StyledH2 = styled.h2`
  color: var(--color-gray-800);
`;

const StyledDeleteAccountForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function DeleteAccountForm() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const data = await apiDeleteUser();

    if ('successfulDelete' in data) {
      logout();

      navigate('/');
    } else {
      console.log('No successfulDelete in DeleteAccountForm.');
    }
  }

  return (
    <StyledDeleteAccountForm onSubmit={handleSubmit}>
      <StyledH2>Delete Account</StyledH2>
      <BadRedButton>Delete</BadRedButton>
    </StyledDeleteAccountForm>
  );
}
