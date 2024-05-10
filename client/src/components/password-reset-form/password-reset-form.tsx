import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import styled from 'styled-components';
import { Input } from '../../ui/input/input';
import { PurpleWideButton } from '../button/button';
import { Spinner } from '../spinner/spinner';
import Error from '../../ui/error/error';

const StyledPasswordResetForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
  min-width: 17.5rem;
  position: relative;
`;

const FormInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledH2 = styled.h2`
  color: var(--color-gray-800);
`;

const SpinnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

// TODO: Add error handling/validation.
export default function PasswordResetForm() {
  const {
    changePassword,
    authState: { error: authError },
  } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handlePasswordSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setFormError('All fields must be complete.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    await changePassword(currentPassword, newPassword, confirmNewPassword);
    setIsLoading(false);

    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  }

  return (
    <StyledPasswordResetForm onSubmit={handlePasswordSubmit}>
      {isLoading && (
        <SpinnerContainer>
          <Spinner></Spinner>
        </SpinnerContainer>
      )}
      <StyledH2>Password Management</StyledH2>
      {authError && <Error errorText={authError} />}
      <FormInputContainer>
        <label htmlFor='currentPassword'>Current Password</label>
        <Input
          type='password'
          id={'currentPassword'}
          name={'currentPassword'}
          value={currentPassword}
          onChange={(evt) => setCurrentPassword(evt.target.value)}
        />
      </FormInputContainer>
      <FormInputContainer>
        <label htmlFor='newPassword'>New Password</label>
        <Input
          type='password'
          id={'newPassword'}
          name={'newPassword'}
          value={newPassword}
          onChange={(evt) => setNewPassword(evt.target.value)}
        />
      </FormInputContainer>
      <FormInputContainer>
        <label htmlFor='confirmNewPassword'>Confirm New Password</label>
        <Input
          type='password'
          id={'confirmNewPassword'}
          name={'confirmNewPassword'}
          value={confirmNewPassword}
          onChange={(evt) => setConfirmNewPassword(evt.target.value)}
        />
      </FormInputContainer>
      <PurpleWideButton disabled={isLoading}>Change Password</PurpleWideButton>
    </StyledPasswordResetForm>
  );
}
