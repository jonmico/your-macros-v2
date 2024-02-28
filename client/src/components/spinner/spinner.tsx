import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid var(--color-indigo-300);
  border-top: 5px solid var(--color-indigo-600);
  border-radius: 50%;
  animation: ${rotate} infinite 1s ease-in-out;
`;
