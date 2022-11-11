import ModalOverlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay(props) {
    return (
        <div className={ModalOverlayStyles.overlay} onClick={props.onCloseModal} ref={props.modalOverlayRef}>
            {props.children}
        </div>
    );
}

ModalOverlay.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    modalOverlayRef: PropTypes.objectOf(ModalOverlay)
};

export default ModalOverlay;