import styled from 'styled-components';

export const Input = styled.input`
  height: 2rem;
  padding: 0.25rem;
  border-radius: 4px;
  border: 1px solid var(--color-slate-400);
  width: 100%;

  &:focus-visible {
    outline: 1px solid var(--color-indigo-600);
  }
`;

export const ServingsInput = styled.input`
  width: 4rem;
  height: 2rem;
  text-align: center;
  padding: 0;
  border: none;
  border-bottom: 1px solid var(--color-indigo-500);
  background-color: var(--color-blue-100);
  transition: background-color 300ms ease-in-out;

  &:focus-visible {
    outline: 1px solid var(--color-indigo-600);
    background-color: var(--color-blue-200);
  }
`;
