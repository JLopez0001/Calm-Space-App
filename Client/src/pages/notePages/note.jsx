import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import NoteDetails from "../../components/noteComponent/note/noteDetails";
import RejectionMessageModal from "../../components/noteComponent/rejection/message";
import RejectionModal from "../../components/noteComponent/rejection/modal";
import Button from 'react-bootstrap/Button';

const NoteDetailsPage = ({ userRole }) => {

    const [cookies, _] = useCookies(["access_token"])
    const { noteID } = useParams(); 
    const [note, setNote] = useState(null);

    const [showRejectionMessageModal, setShowRejectionMessageModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchNoteDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/qa/note/${noteID}`,);
                console.log(response.data);
                setNote(response.data);

                // Show the rejection message modal if the note status is 'rejected'
                if (response.data.status === 'rejected') {
                    setShowRejectionMessageModal(true);
                }

            } catch (error) {
                console.error("Error fetching note details:", error);
            }
        };

        fetchNoteDetails();
    }, [noteID]);

    const handleApprove = async () => {
        try {
            const response = await axios.post(`http://localhost:3001/qa/note/${note._id}/approve`,{},
            { headers: { access_token: cookies.access_token }});
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
            const response = await axios.post(`http://localhost:3001/qa/note/${note._id}/reject`, { reason: rejectionReason },
            { headers: { access_token: cookies.access_token }});
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
                >
                    {userRole === "therapist" && note?.status === 'rejected' && (
                        <Button className="buttons" onClick={() => navigate(`/edit-note/${note._id}`)}>
                            Edit Note
                        </Button>
                    )}
                    {userRole === "qa" && (
                        <div className="note-action-buttons-container">
                            <Button className="note-action-buttons" variant="success" onClick={handleApprove}>Approve</Button>
                            <Button className="note-action-buttons" variant="danger" onClick={() => setShowRejectModal(true)}>Reject</Button>
                        </div>
                    )}
                </NoteDetails>
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
