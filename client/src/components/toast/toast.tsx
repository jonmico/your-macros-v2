import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { FaXmark } from 'react-icons/fa6';
import { ExitButton } from '../button/button';

const StyledToast = styled.div`
  position: fixed;
  top: 5%;
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
`;

interface ToastProps {
  children: React.ReactNode;
  closeToastWindow: () => void;
}

export default function Toast(props: ToastProps) {
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
