import { useEffect, useRef } from "react";
import { createPortal } from 'react-dom';
import modalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { MODAL_ROOT } from '../../utils/constants.js';


function Modal({ title = '', onCloseModal, children }) {
    const modalOverlayRef = useRef(null)
    function closeModal(e) {
        e.target.classList.contains(modalOverlayRef.current.className) &&
            onCloseModal();
    }

    useEffect(() => {
        function closeByEscape(evt) {
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
                            <p className='text text_type_main-large pr-9'>
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
    onCloseModal: PropTypes.func.isRequired,
    title: PropTypes.string
};

export default Modal;
