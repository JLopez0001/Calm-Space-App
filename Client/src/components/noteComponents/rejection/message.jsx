import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const RejectionMessageModal = ({ show, handleClose, message }) => {
   
    return (
        <Modal centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Rejection Reason</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RejectionMessageModal;
