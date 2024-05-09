import PasswordResetForm from '../password-reset-form/password-reset-form';
import DeleteAccountForm from '../delete-account-form/delete-account-form';
import styled from 'styled-components';

const StyledAccount = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default function Account() {
  return (
    <StyledAccount>
      <PasswordResetForm />
      <DeleteAccountForm />
    </StyledAccount>
  );
}
