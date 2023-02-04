import { useEffect, useRef } from "react";
import { createPortal } from 'react-dom';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { MODAL_ROOT } from '../../utils/constants.js';

function Modal({ title = '', isDigit, onCloseModal, children }) {
    const modalOverlayRef = useRef(null)
    const closeModal = (e) => {
        e.target.classList.contains(modalOverlayRef.current.className) &&
            onCloseModal();
    }

    useEffect(() => {
        const closeByEscape = (evt) => {
            if (evt.key === 'Escape') {
                onCloseModal();
            }
        }

        document.addEventListener('keydown', closeByEscape);
        return () => {
            document.removeEventListener('keydown', closeByEscape);
        }
    }, [onCloseModal]);

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
}

Modal.propTypes = {
    title: PropTypes.string,
    isDigit: PropTypes.bool,
    onCloseModal: PropTypes.func.isRequired
};

export default Modal;
