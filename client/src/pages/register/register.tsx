import { useState } from 'react';
import { WideButton } from '../../components/button/button';
import { useAuth } from '../../hooks/useAuth';
import { ErrorText } from '../../ui/error-text/error-text';
import { FormInputContainer } from '../../ui/form-input-container/form-input-container';
import { Input } from '../../ui/input/input';
import LoginRegisterForm from '../../ui/login-register-form/login-register-form';
import {
  CenterSpinnerContainer,
  Spinner,
} from '../../components/spinner/spinner';
import { useNavigate } from 'react-router-dom';

type RegisterFormType = {
  email: string;
  password: string;
  repeatPassword: string;
};

export default function Register() {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const [registerFormState, setRegisterFormState] = useState<RegisterFormType>({
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [errors, setErrors] = useState<RegisterFormType>({
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [passwordMatchError, setPasswordMatchError] = useState('');

  function handleFormInputChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setRegisterFormState({
      ...registerFormState,
      [evt.target.name]: evt.target.value,
    });

    setErrors((prevState) => {
      if (errors[evt.target.name as keyof RegisterFormType]) {
        return { ...prevState, [evt.target.name]: '' };
      }
      return prevState;
    });

    if (
      (evt.target.name === 'password' ||
        evt.target.name === 'repeatPassword') &&
      passwordMatchError
    ) {
      setPasswordMatchError('');
    }
  }

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const errors: RegisterFormType = {
      email: '',
      password: '',
      repeatPassword: '',
    };

    let hasErrors = false;

    for (const key in registerFormState) {
      if (registerFormState[key as keyof RegisterFormType] === '') {
        errors[key as keyof RegisterFormType] = 'Required.';
        hasErrors = true;
      }
    }

    if (registerFormState.password !== registerFormState.repeatPassword) {
      setPasswordMatchError('Passwords must match.');
    }

    if (hasErrors) {
      setErrors(errors);
      return;
    }

    const user = {
      email: registerFormState.email,
      password: registerFormState.password,
    };

    const isLoggedIn = await register(user);

    if (isLoggedIn) navigate('/app/dashboard');
  }
  return (
    <LoginRegisterForm header={'Register'} handleSubmit={handleSubmit}>
      {isLoading && (
        <CenterSpinnerContainer>
          <Spinner></Spinner>
        </CenterSpinnerContainer>
      )}
      <FormInputContainer>
        <label htmlFor='email'>Email</label>
        <Input
          type={'text'}
          name={'email'}
          id={'email'}
          onChange={handleFormInputChange}
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
      </FormInputContainer>
      <FormInputContainer>
        <label htmlFor='password'>Password</label>
        <Input
          type={'password'}
          name={'password'}
          id={'password'}
          onChange={handleFormInputChange}
        />
        {errors.password && <ErrorText>{errors.password}</ErrorText>}
      </FormInputContainer>
      <FormInputContainer>
        <label htmlFor='repeatPassword'>Re-enter Password</label>
        <Input
          type={'password'}
          name={'repeatPassword'}
          id={'repeatPassword'}
          onChange={handleFormInputChange}
        />
        {errors.repeatPassword && (
          <ErrorText>{errors.repeatPassword}</ErrorText>
        )}
      </FormInputContainer>
      {passwordMatchError && <ErrorText>{passwordMatchError}</ErrorText>}
      <WideButton type={'submit'}>Register</WideButton>
    </LoginRegisterForm>
  );
}
