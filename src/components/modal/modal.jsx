import { useEffect, useRef } from "react";
import { createPortal } from 'react-dom';
import ModalStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';
import IngredientDetails from '../ingredient-details/ingredient-details.jsx';
import OrderDetails from '../order-details/order-details.jsx';
import PropTypes from 'prop-types';
import { dataItemPropTypes } from '../utils/dataPropTypes.js'

function Modal(props) {
    const modalRoot = document.getElementById("react-modals");
    const modalOverlayRef = useRef(null)
    function closeModal(e) {
        e.target.classList.contains(modalOverlayRef.current.className) &&
            props.onCloseModal();
    }

    useEffect(() => {
        document.addEventListener("keydown", props.onCloseModal, false);
        return () => {
            document.removeEventListener("keydown", props.onCloseModal, false);
        };
    }, []);


    return createPortal(
        (
            <ModalOverlay onCloseModal={closeModal} modalOverlayRef={modalOverlayRef}>
                <div className={ModalStyles.modal}>
                    {
                        props.type === 'ingredient' ? (
                            <IngredientDetails {...props.item} onCloseModal={props.onCloseModal} />
                        ) : (
                            <OrderDetails onCloseModal={props.onCloseModal} />
                        )
                    }
                </div>
            </ModalOverlay>
        ),
        modalRoot
    );
}

Modal.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    item: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.shape(dataItemPropTypes)),
        PropTypes.shape(dataItemPropTypes)
    ]).isRequired,
    type: PropTypes.string.isRequired
};

export default Modal;