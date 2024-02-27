import styled, { keyframes } from 'styled-components';
import { createPortal } from 'react-dom';
import { FaXmark } from 'react-icons/fa6';
import { ExitButton } from '../button/button';
import { useEffect } from 'react';

const slideIn = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

const StyledToast = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  align-items: center;
  width: fit-content;
  background-color: var(--color-slate-200);
  border-radius: 8px;
  border: 1px solid var(--color-indigo-400);
  padding: 1rem 2rem;
  gap: 2rem;
  animation: ${slideIn} 0.2s ease-in-out forwards;
`;

interface ToastProps {
  children: React.ReactNode;
  closeToastWindow: () => void;
}

export default function Toast(props: ToastProps) {
  useEffect(() => {
    const id = setTimeout(props.closeToastWindow, 5000);

    return () => clearTimeout(id);
  }, [props.closeToastWindow]);
  return createPortal(
    <StyledToast>
      <div>{props.children}</div>
      <ExitButton onClick={props.closeToastWindow}>
        <FaXmark />
      </ExitButton>
    </StyledToast>,
    document.body
  );
}
