import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const RejectionModal = ({ show, handleClose, rejectionReason, handleReject, setRejectionReason }) => {
    
    return (
        <Modal centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title style={{color : '#03071e'}}>Reject Note</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <textarea
                    className='input-placeholder'
                    value={rejectionReason}
                    onChange={e => setRejectionReason(e.target.value)}
                    placeholder="Enter rejection reason..."
                    rows="4"
                    style={{ width: '100%' }}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="danger" onClick={handleReject}>Confirm Rejection</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default RejectionModal;
