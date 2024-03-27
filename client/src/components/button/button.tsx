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

  &:disabled {
    cursor: not-allowed;
    background-color: var(--color-gray-300);
  }
`;

export const ExitButton = styled.button`
  background-color: inherit;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: fit-content;
  width: fit-content;
  font-size: 1.25rem;
  color: var(--color-indigo-500);
  transition: color 0.2s ease-in-out;

  &:hover {
    color: var(--color-red-400);
    cursor: pointer;
  }
`;

export const MealTableCheckButton = styled(ExitButton)`
  font-size: 1.5rem;
  &:hover {
    color: var(--color-indigo-400);
  }
`;

export const IconButton = styled(ExitButton)`
  color: var(--color-blue-500);
  font-size: 1.5rem;

  &:hover {
    color: var(--color-blue-400);
  }

  &:disabled {
    cursor: not-allowed;
    color: var(--color-gray-400);
  }
`;

export const WideButton = styled(PrimaryButton)`
  width: 100%;
`;

export const SmallButton = styled(PrimaryButton)`
  width: fit-content;
  background-color: var(--color-indigo-300);
  font-size: 0.9rem;
  padding: 0.25rem 0.5rem;
  border-radius: var(--lg-radius);
  justify-self: center;

  &:hover {
    background-color: var(--color-indigo-200);
  }
`;

export const PurpleWideButton = styled(PrimaryButton)`
  width: 100%;
  background-color: var(--color-indigo-600);
  color: var(--color-slate-100);
  padding: 0.5rem 1.5rem;

  &:hover {
    background-color: var(--color-indigo-500);
  }

  &:disabled {
    background-color: var(--color-slate-500);
    color: var(--color-slate-900);
    opacity: 0.4;
  }
`;
