import styled from 'styled-components';

export const Input = styled.input`
  height: 2rem;
  padding: 0.25rem;
  border-radius: 4px;
  border: 1px solid var(--color-slate-400);
  /* outline: none; */

  &:focus-visible {
    outline: 1px solid var(--color-indigo-600);
  }
`;
