import styled from 'styled-components';
import { Input } from '../../ui/input/input';
import { FormInputContainer } from '../../ui/form-input-container/form-input-container';
import { RegisterButton } from '../../components/button/button';

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

export default function Register() {
  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    console.log('You are trying to register!');
  }
  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <FormInputContainer>
        <label htmlFor=''>Email</label>
        <Input />
      </FormInputContainer>
      <FormInputContainer>
        <label htmlFor=''>Password</label>
        <Input />
      </FormInputContainer>
      <FormInputContainer>
        <label htmlFor=''>Re-enter Password</label>
        <Input />
      </FormInputContainer>
      <RegisterButton type={'submit'}>Register</RegisterButton>
    </StyledForm>
  );
}
