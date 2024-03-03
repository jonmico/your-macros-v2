import styled from 'styled-components';

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

interface LoginRegisterFormProps {
  children: React.ReactNode;
  header: string;
  handleSubmit(evt: React.FormEvent<HTMLFormElement>): Promise<void>;
}

export default function LoginRegisterForm({
  children,
  header,
  handleSubmit,
}: LoginRegisterFormProps) {
  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledH2>{header}</StyledH2>
      {children}
    </StyledForm>
  );
}
