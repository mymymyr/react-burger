import modalOverlayStyles from './modal-overlay.module.css';
import { type FC, type RefObject, type MouseEventHandler } from 'react';

type TModalOverlayProps = {
  onCloseModal: MouseEventHandler<HTMLDivElement>
  modalOverlayRef?: RefObject<HTMLDivElement>
}

export const ModalOverlay: FC<TModalOverlayProps> = ({ onCloseModal, modalOverlayRef }) => {
  return (
        <div className={modalOverlayStyles.overlay} onClick={onCloseModal} ref={modalOverlayRef}>
        </div>
  );
};

export default ModalOverlay;
