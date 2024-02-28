import styled, { keyframes, css } from 'styled-components';
import { createPortal } from 'react-dom';
import { FaXmark } from 'react-icons/fa6';
import { ExitButton } from '../button/button';
import { useEffect, useState } from 'react';

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  } to {
    opacity: 0;
  }
`;

interface ToastContainerProps {
  $isOpen: boolean;
}

const ToastContainer = styled.div<ToastContainerProps>`
  position: fixed;
  top: 5%;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: fit-content;
  animation: ${({ $isOpen }) =>
    $isOpen
      ? css`
          ${slideIn} 0.5s forwards
        `
      : ''};
`;

interface ToastContentProps {
  $isOpen: boolean;
}

const ToastContent = styled.div<ToastContentProps>`
  display: flex;
  align-items: center;
  background-color: var(--color-slate-200);
  border-radius: 8px;
  border: 1px solid var(--color-indigo-400);
  padding: 1rem 2rem;
  gap: 2rem;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  animation: ${({ $isOpen }) =>
    !$isOpen
      ? css`
          ${fadeOut} 0.5s forwards
        `
      : ''};
`;

interface ToastProps {
  children: React.ReactNode;
  closeToastWindow: () => void;
}

export default function Toast({ children, closeToastWindow }: ToastProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    let timeoutCloseToastWindow: number;
    let timeoutToastAnimation: number;

    if (!isHovering) {
      timeoutToastAnimation = setTimeout(() => {
        setIsOpen(false);
        timeoutCloseToastWindow = setTimeout(closeToastWindow, 1000);
      }, 3000);
    }
    return () => {
      clearTimeout(timeoutToastAnimation);
      clearTimeout(timeoutCloseToastWindow);
    };
  }, [closeToastWindow, isHovering]);

  function handleCloseClick() {
    setIsOpen(false);
    setTimeout(closeToastWindow, 1000);
  }

  return createPortal(
    <ToastContainer
      $isOpen={isOpen}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <ToastContent $isOpen={isOpen}>
        {children}
        <ExitButton onClick={handleCloseClick}>
          <FaXmark />
        </ExitButton>
      </ToastContent>
    </ToastContainer>,
    document.body
  );
}
