import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const RejectionMessageModal = ({ show, handleClose, message }) => {
   
    return (
        <Modal centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title style={{color : '#03071e'}}>Rejection Reason</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{color : "#03071e"}} >
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button className='buttons' variant="danger" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RejectionMessageModal;
