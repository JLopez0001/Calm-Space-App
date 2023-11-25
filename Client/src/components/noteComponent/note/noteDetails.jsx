import React from "react";
import HeaderSection from "../createNote/serviceAndAppointmentSection";
import GoalSection from "../createNote/goalSection";
import ContentSection from "../createNote/contentSection";


const formatDate = (dateString) => {
    if(!dateString) return ""; // Return empty string if dateString is null or undefined
    const dateObj = new Date(dateString);
    const yyyy = dateObj.getUTCFullYear();
    const mm = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // January is 0!
    const dd = String(dateObj.getUTCDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};  

const NoteDetails = ({ note , userRole, toggleRejectionMessageModal, children}) => {

    if (!note) return <p>Loading note details...</p>;
     return (
        <div className="note-form-container">
            <div className='create-note-form note-form-panel'>
                <HeaderSection
                    service={note.service}
                    appointmentDate={formatDate(note.appointmentDate)}
                    readOnly={true} 
                    disabled={true}
                    userRole={userRole}  
                    note={note}
                    showRejectionMessageModal={toggleRejectionMessageModal}                />

                <GoalSection 
                    goals={note.goals.map(g => g.goal)}
                    objectives={note.goals.map(g => g.objective)}
                    readOnly={true} 
                />
                <ContentSection 
                    riskAssessment={note.riskAssessmentChecked}
                    qaProviderCode={note.qaProviderCode}
                    patientID={note.patientId}
                    content={note.content}
                    readOnly={true}
                    disabled={true}
                />

                {children}

            </div>
            
        </div>
    );
};

export default NoteDetails;
