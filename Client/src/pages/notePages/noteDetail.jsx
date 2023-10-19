import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import NoteDetails from "../../components/noteComponents/note/noteDetails";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

const NoteDetailsPage = () => {
    const { noteID } = useParams(); // Access route parameters using useParams

    const [note, setNote] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchNoteDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/qa/note/${noteID}`);
                setNote(response.data);
            } catch (error) {
                console.error("Error fetching note details:", error);
            }
        };

        fetchNoteDetails();
    }, [noteID]);

    const handleApprove = async () => {
        try {
            const response = await axios.post(`http://localhost:3001/qa/note/${note._id}/approve`);
            console.log(response.data.message);
            navigate('/qa');
        } catch (error) {
            console.error("Error approving the note:", error);
        }
    };

    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');

    const handleReject = async () => {
        try {
            const response = await axios.post(`http://localhost:3001/qa/note/${note._id}/reject`, { reason: rejectionReason });
            console.log(response.data.message);

            setShowRejectModal(false);
            setRejectionReason('');

            navigate('/qa');
        } catch (error) {
            console.error("Error rejecting the note:", error);
        }
    };


    return (
        <>
        <NoteDetails note={note} /> 
        <div>
            <Button onClick={handleApprove}>Approve</Button>
            <Button onClick={() => setShowRejectModal(true)}>Reject</Button>
            <Modal show={showRejectModal} onHide={() => setShowRejectModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Reject Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea 
                        value={rejectionReason} 
                        onChange={e => setRejectionReason(e.target.value)} 
                        placeholder="Enter rejection reason..."
                        rows="4" 
                        style={{ width: '100%' }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowRejectModal(false)}>Close</Button>
                    <Button variant="danger" onClick={handleReject}>Confirm Rejection</Button>
                </Modal.Footer>
            </Modal>
        </div>
        </>
    );
};

export default NoteDetailsPage;
