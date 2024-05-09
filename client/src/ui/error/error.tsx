import styled from 'styled-components';

const StyledError = styled.div`
  border: 1px solid var(--color-red-500);
  border-radius: 4px;
  background-color: var(--color-red-200);
  padding: 0.5rem;
  color: var(--color-red-500);
`;

interface ErrorProps {
  errorText: string;
}

export default function Error({ errorText }: ErrorProps) {
  return <StyledError>{errorText}</StyledError>;
}
