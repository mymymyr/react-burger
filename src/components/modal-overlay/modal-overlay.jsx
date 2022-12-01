import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay({ onCloseModal, modalOverlayRef }) {
    return (
        <div className={modalOverlayStyles.overlay} onClick={onCloseModal} ref={modalOverlayRef}>
        </div>
    );
}

ModalOverlay.propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    modalOverlayRef: PropTypes.objectOf(ModalOverlay)
};

export default ModalOverlay;
