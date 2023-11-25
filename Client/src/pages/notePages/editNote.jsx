import React, { useState, useEffect } from "react";
import axios from 'axios';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { useParams } from "react-router-dom";
import NoteForm from "../../components/noteComponent/createNote/createNoteForm";
import RejectionMessageModal from "../../components/noteComponent/rejection/message";
import { red } from '@mui/material/colors';

const EditNotePage = () => { 
    
    const { noteID } = useParams(); 
    const [note, setNote] = useState(null);

    const [showRejectionModal, setShowRejectionModal] = useState(false);
    const handleShowRejectionMessageModal = () => setShowRejectionModal(true);
    const handleCloseRejectionMessageModal = () => setShowRejectionModal(false);

    useEffect(() => {
        const fetchNoteDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/qa/note/${noteID}`);
                setNote(response.data);
                console.log("Fetched note:", response.data);

                // Show rejection message modal if note is rejected
                if (response.data.status === 'rejected') {
                    setShowRejectionModal(true);
                }
            } catch (error) {
                console.error("Error fetching note details:", error);
            }
        };

        fetchNoteDetails();
    }, [noteID]);
    

    // console.log("Full note object:", note);

    if (!note) return <p>Loading note details...</p>;

    return (
        <>
            {note && note.status === 'rejected' && (
                <div className="rejection-info-icon">
                    <h3 className="reject-reason">This Note Has Been Rejected</h3>
                    <AnnouncementIcon 
                            sx={{fontSize: 55, color: red[500]}} 
                            onClick={handleShowRejectionMessageModal}
                        />
                </div>
            )}
        
            <NoteForm 
                note={note} 
                isEditMode={true} 
                showRejectionMessageModal={handleShowRejectionMessageModal}
            />

            <RejectionMessageModal 
                show={showRejectionModal}
                message={note.rejectionReason} 
                handleClose={handleCloseRejectionMessageModal}
            />
        </>
    );
};

export default EditNotePage;