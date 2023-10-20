import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import NoteDetails from "../../components/noteComponents/note/noteDetails";
import RejectionMessageModal from "../../components/noteComponents/rejection/message";
import RejectionModal from "../../components/noteComponents/rejection/modal";
import Button from 'react-bootstrap/Button';

const NoteDetailsPage = ({ userRole }) => {
    
    const { noteID } = useParams(); 
    const [note, setNote] = useState(null);
    const [showRejectionMessageModal, setShowRejectionMessageModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchNoteDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/qa/note/${noteID}`);
                setNote(response.data);

                // If the note status is 'rejected' and the user is a therapist, show the rejection message modal
                if (response.data.status === 'rejected' && userRole === "therapist") {
                    setShowRejectionMessageModal(true);
                }

            } catch (error) {
                console.error("Error fetching note details:", error);
            }
        };

        fetchNoteDetails();
    }, [noteID, userRole]);

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
                {userRole === "qa" && (
                    <>
                        <Button onClick={handleApprove}>Approve</Button>
                        <Button onClick={() => setShowRejectModal(true)}>Reject</Button>
                    </>
                )}

                <RejectionModal 
                    show={showRejectModal} 
                    handleClose={() => setShowRejectModal(false)}
                    rejectionReason={rejectionReason}
                    handleReject={handleReject}
                    setRejectionReason={setRejectionReason}
                />

                <RejectionMessageModal 
                    show={showRejectionMessageModal}
                    handleClose={() => setShowRejectionMessageModal(false)}
                    message={note?.rejectionReason}
                />
            </div>
        </>
    );
};

export default NoteDetailsPage;
