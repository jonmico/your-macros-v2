import { createPortal } from 'react-dom';
import styled from 'styled-components';

const StyledModal = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -20%;
  z-index: 1000;
`;

interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
}

export default function Modal({ children, closeModal }: ModalProps) {
  return createPortal(
    <StyledModal>
      <div>
        <button onClick={closeModal}>Close Modal</button>
      </div>
      <div>{children}</div>
    </StyledModal>,
    document.body
  );
}
