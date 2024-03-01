import styled from 'styled-components';
import { Input } from '../../ui/input/input';
import { FormInputContainer } from '../../ui/form-input-container/form-input-container';
import { RegisterButton } from '../../components/button/button';
import { useState } from 'react';
import { ErrorText } from '../../ui/error-text/error-text';

const StyledForm = styled.form`
  margin: 2rem auto 0 auto;
  width: 50%;
  max-width: 30rem;
  min-width: 20rem;
  border: 1px solid var(--color-indigo-400);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StyledH2 = styled.h2`
  text-align: center;
`;

type RegisterFormType = {
  email: string;
  password: string;
  repeatPassword: string;
};

export default function Register() {
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

    console.log('You are trying to register!');
  }
  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledH2>Register</StyledH2>
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
      <RegisterButton type={'submit'}>Register</RegisterButton>
    </StyledForm>
  );
}
