import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WideButton } from '../../components/button/button';
import {
  CenterSpinnerContainer,
  Spinner,
} from '../../components/spinner/spinner';
import { useAuth } from '../../hooks/useAuth';
import { ErrorText } from '../../ui/error-text/error-text';
import { FormInputContainer } from '../../ui/form-input-container/form-input-container';
import { Input } from '../../ui/input/input';
import LoginRegisterForm from '../../ui/login-register-form/login-register-form';
import Error from '../../ui/error/error';

type LoginFormStateType = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    login,
    authState: { error: authError },
  } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
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

    setIsLoading(true);
    const isLoggedIn = await login(
      loginFormState.email,
      loginFormState.password
    );
    setIsLoading(false);

    if (isLoggedIn) navigate('/app/dashboard');
  }

  return (
    <LoginRegisterForm header={'Login'} handleSubmit={handleSubmit}>
      {authError && <Error errorText={authError} />}
      {isLoading && (
        <CenterSpinnerContainer>
          <Spinner></Spinner>
        </CenterSpinnerContainer>
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
