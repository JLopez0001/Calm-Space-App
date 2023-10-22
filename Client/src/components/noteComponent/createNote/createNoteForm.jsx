import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import HeaderSection from './serviceAndAppointmentSection';
import GoalSection from './goalSection';
import ContentSection from './contentSection';
import RejectionMessageModal from '../rejection/message';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const NoteForm = ({ note = {}, isEditMode = false }) => {
    
    const navigate = useNavigate();

    const [riskAssessment, setRiskAssessment] = useState(isEditMode ? note.riskAssessmentChecked.checked : false);
    const [content, setContent] = useState(isEditMode ? note.content : '');
    const [appointmentDate, setAppointmentDate] = useState(isEditMode ? note.appointmentDate : '');
    const [service, setService] = useState(isEditMode ? note.service : '');
    const [goals, setGoals] = useState(isEditMode ? note.goals.map(goalObj => goalObj.goal) : []);
    const [objectives, setObjectives] = useState(isEditMode ? note.goals.map(goalObj => goalObj.objective) : []);
    const [patientID, setPatientID] = useState(isEditMode ? note.patient.patientID : '');
    const [qaProviderCode, setQAProviderCode] = useState(isEditMode ?note.qaReviewer.providerCode : '');
    const [therapistProviderCode] = useState(isEditMode ? note.therapist.providerCode : '');
    const [status] = useState(isEditMode ? note.status : 'pending');

    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Therapist Provider Code in the modal
    const [modalProviderCode, setModalProviderCode] = useState(''); 
    
    // Rejection message modal
    const [showRejectionMessageModal, setShowRejectionMessageModal] = useState(false);
    const [rejectionMessage] = useState(isEditMode ?note.rejectionReason : ''); 

    const handleShowRejectionMessageModal = () => {
        setShowRejectionMessageModal(true);
    }

    const handleCloseRejectionMessageModal = () => {
        setShowRejectionMessageModal(false);
    }

    const noteData = {
        riskAssessmentChecked: {
            checked: riskAssessment,
        },
        content: content,
        appointmentDate: appointmentDate,
        service: service,
        goals: goals.map((goal, index) => ({
        goal: goal,
        objective: objectives[index],
        })),
        therapistProviderCode: therapistProviderCode,
        patientId: patientID,
        qaProviderCode: qaProviderCode,
        status: status,
    };

    console.log(noteData);

    const onSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }
        setValidated(true);
        handleShow();
    };

    const handleModalSubmit = async () => {
        handleClose();
    
        // Include therapistProviderCode in the noteData
        const updatedNoteData = {
            ...noteData,
            therapistProviderCode: modalProviderCode,
        };
    
        try {
            if (isEditMode) {
                console.log('PUT endpoint:', `/qa/note/${note._id}/edit`);
                console.log('Data being sent:', updatedNoteData);
                await axios.put(`http://localhost:3001/qa/note/${note._id}/edit`, updatedNoteData);
            } else {
                // Create a new note
                await axios.post('http://localhost:3001/patients/create-note', updatedNoteData);
            }
            navigate(`/patient/${patientID}`);
        } catch (err) {
            console.error('Error:', err.message);
            console.error('Error updating note:', err.response.data);

        }
    };
    

    return (
        <>
        <div className="">
            <Form noValidate validated={validated} onSubmit={onSubmit}>
            <HeaderSection
                service={service}
                setService={setService}
                appointmentDate={appointmentDate}
                setAppointmentDate={setAppointmentDate}
                readOnly={false}
                status={status}
                showRejectionMessageModal={handleShowRejectionMessageModal}
                
            />
            <RejectionMessageModal 
                show={showRejectionMessageModal} 
                handleClose={handleCloseRejectionMessageModal}
                message={rejectionMessage}
            />
            <GoalSection
                goals={goals}
                setGoals={setGoals}
                objectives={objectives}
                setObjectives={setObjectives}
                readOnly={false}
            />
            <ContentSection
                riskAssessment={riskAssessment}
                setRiskAssessment={setRiskAssessment}
                qaProviderCode={qaProviderCode}
                setQAProviderCode={setQAProviderCode}
                patientID={patientID}
                setPatientID={setPatientID}
                content={content}
                setContent={setContent}
                readOnly={false}
            />
            <Button type="submit">Submit Note</Button>
            </Form>
        </div>
        <div>
            <Modal centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Provider Signature</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Group as={Row}>
                    <Col>
                    <Form.Label>Please Enter Code:</Form.Label>
                    </Col>
                    <Col>
                    <Form.Control
                        type="text"
                        value={modalProviderCode}
                        onChange={(e) => setModalProviderCode(e.target.value)}
                    />
                    </Col>
                </Form.Group>
                </Form>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button onClick={handleModalSubmit} type="submit">
                    Submit
                </Button>
                </Modal.Footer>
            </Modal.Body>
            </Modal>
        </div>
        </>
    );
};

export default NoteForm;
