import { type FC, useEffect, useRef, type PropsWithChildren, type MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { MODAL_ROOT } from '../../utils/constants';

type TModalProps = {
  title?: string
  isDigit?: boolean
  onCloseModal: () => void
}

const Modal: FC<PropsWithChildren<TModalProps>> = ({ title = '', isDigit, onCloseModal, children }) => {
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const closeModal = (e: MouseEvent<HTMLDivElement> & { target: HTMLDivElement }) => {
    (modalOverlayRef.current != null) && e.target?.classList.contains(modalOverlayRef.current.className) &&
      onCloseModal();
  };

  useEffect(() => {
    const closeByEscape = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onCloseModal();
      }
    };

    document.addEventListener('keydown', closeByEscape);
    return () => {
      document.removeEventListener('keydown', closeByEscape);
    };
  }, [onCloseModal]);

  if (!MODAL_ROOT) {
    return null;
  }
  return createPortal(
    (
      <>
        <ModalOverlay onCloseModal={closeModal} modalOverlayRef={modalOverlayRef} />
        <div className={modalStyles.modal}>
          <div className={modalStyles.container}>
            <div className={`${modalStyles.header} pl-10 pt-10 pr-10`} >
              <p className={`${isDigit ? 'text text_type_digits-default' : 'text text_type_main-large pr-9'}`}>
                {title}
              </p>
              <p className={modalStyles.cursor}>
                <CloseIcon type="primary" onClick={onCloseModal} />
              </p>
            </div >
            {children}
          </div>
        </div>
      </>
    ),
    MODAL_ROOT
  );
};

export default Modal;
