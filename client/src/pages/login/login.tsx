import LoginRegisterForm from '../../ui/login-register-form/login-register-form';
import { FormInputContainer } from '../../ui/form-input-container/form-input-container';
import { Input } from '../../ui/input/input';
import { WideButton } from '../../components/button/button';
import { useState } from 'react';
import { ErrorText } from '../../ui/error-text/error-text';
import { useAuth } from '../../hooks/useAuth';
import { Spinner } from '../../components/spinner/spinner';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type LoginFormStateType = {
  email: string;
  password: string;
};

export default function Login() {
  const { login, userData, error, isLoading } = useAuth();
  const [loginFormState, setLoginFormState] = useState<LoginFormStateType>({
    email: '',
    password: '',
  });
  const [loginFormErrors, setLoginFormErrors] = useState<LoginFormStateType>({
    email: '',
    password: '',
  });

  function handleInputChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setLoginFormState({
      ...loginFormState,
      [evt.target.name]: evt.target.value,
    });

    if (loginFormErrors[evt.target.name as keyof LoginFormStateType]) {
      setLoginFormErrors({ ...loginFormErrors, [evt.target.name]: '' });
    }
  }

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const errors = { email: '', password: '' };
    let hasErrors = false;

    for (const key in loginFormState) {
      if (loginFormState[key as keyof LoginFormStateType] === '') {
        errors[key as keyof LoginFormStateType] = 'Required.';
        hasErrors = true;
      }
    }

    if (hasErrors) {
      setLoginFormErrors(errors);
      return;
    }

    await login(loginFormState.email, loginFormState.password);
  }

  console.log(userData, error);
  return (
    <LoginRegisterForm header={'Login'} handleSubmit={handleSubmit}>
      {isLoading && (
        <SpinnerContainer>
          <Spinner></Spinner>
        </SpinnerContainer>
      )}
      <FormInputContainer>
        <label htmlFor='email'>Email</label>
        <Input
          id={'email'}
          name={'email'}
          type={'text'}
          onChange={handleInputChange}
          value={loginFormState.email}
        />
        {loginFormErrors.email && (
          <ErrorText>{loginFormErrors.email}</ErrorText>
        )}
      </FormInputContainer>
      <FormInputContainer>
        <label htmlFor='password'>Password</label>
        <Input
          id={'password'}
          name={'password'}
          type={'password'}
          onChange={handleInputChange}
          value={loginFormState.password}
        />
        {loginFormErrors.password && (
          <ErrorText>{loginFormErrors.password}</ErrorText>
        )}
      </FormInputContainer>
      <WideButton>Login</WideButton>
    </LoginRegisterForm>
  );
}
