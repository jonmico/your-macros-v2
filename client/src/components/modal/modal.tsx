import { createPortal } from 'react-dom';
import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContent = styled.div`
  position: relative;
  top: -15%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  background-color: var(--color-slate-100);
  border: 1px solid var(--color-indigo-300);
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
}

export default function Modal({ children, closeModal }: ModalProps) {
  return createPortal(
    <StyledModal>
      <ModalContent>
        <button onClick={closeModal}>Close Modal</button>
        <div>{children}</div>
      </ModalContent>
    </StyledModal>,
    document.body
  );
}
