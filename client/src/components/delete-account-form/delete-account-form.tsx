import { BadRedButton } from '../button/button';
import styled from 'styled-components';

const StyledH2 = styled.h2`
  color: var(--color-gray-800);
`;

const StyledDeleteAccountForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function DeleteAccountForm() {
  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    console.log('DeleteAccountForm test.');
  }

  return (
    <StyledDeleteAccountForm onSubmit={handleSubmit}>
      <StyledH2>Delete Account</StyledH2>
      <BadRedButton>Delete</BadRedButton>
    </StyledDeleteAccountForm>
  );
}
