import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import NoteDetails from "../../components/noteComponent/note/noteDetails";
import RejectionMessageModal from "../../components/noteComponent/rejection/message";
import RejectionModal from "../../components/noteComponent/rejection/modal";
import Button from 'react-bootstrap/Button';

const NoteDetailsPage = ({ userRole }) => {

    const { noteID } = useParams(); 
    const [note, setNote] = useState(null);

    const [showRejectionMessageModal, setShowRejectionMessageModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchNoteDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/qa/note/${noteID}`);
                console.log(response.data);
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
            toast.success(response.data.message);
            console.log(response.data.message);
            navigate('/qa');
        } catch (error) {
            toast.error(error.response?.data?.message || "Error approving the note");
            console.error("Error approving the note:", error);
        }
    };

    const handleReject = async () => {
        try {
            const response = await axios.post(`http://localhost:3001/qa/note/${note._id}/reject`, { reason: rejectionReason });
            console.log(response.data.message);

            setShowRejectModal(false);
            setRejectionReason('');
            toast.success(response.data.message);
            navigate('/qa');
        } catch (error) {
            toast.error(error.response?.data?.message || "Error rejecting the note");
            console.error("Error rejecting the note:", error);
        }
    };
    return (
        <>
            <div className="note-form-container">
                <NoteDetails 
                    note={note} 
                    userRole={userRole}
                    toggleRejectionMessageModal={() => setShowRejectionMessageModal(true)}
                />
                {userRole === "therapist" && note?.status === 'rejected' && (
                    <Button className="buttons" onClick={() => navigate(`/edit-note/${note._id}`)}>
                        Edit Note
                    </Button>
                )}
                {userRole === "qa" && (
                    <div style={{width : "15%"}} className="d-flex justify-content-around">
                        <Button  variant="success" onClick={handleApprove}>Approve</Button>
                        <Button variant="danger" onClick={() => setShowRejectModal(true)}>Reject</Button>
                    </div>
                )}
            </div>
            <div>
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
