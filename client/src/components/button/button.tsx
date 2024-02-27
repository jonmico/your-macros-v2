import styled from 'styled-components';

export const PrimaryButton = styled.button`
  border: 1px solid var(--color-gray-900);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  background-color: var(--color-green-400);
  transition: border-radius 0.2s ease-in-out, background-color 0.2s ease-in-out;
  width: fit-content;

  &:hover {
    cursor: pointer;
    border-radius: 16px;
    background-color: var(--color-green-300);
  }
`;

export const ExitButton = styled.button``;
