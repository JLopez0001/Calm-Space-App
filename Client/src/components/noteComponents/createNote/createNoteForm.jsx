import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import HeaderSection from './serviceAndAppointmentSection';
import GoalSection from './goalSection';
import ContentSection from './contentSection';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const NoteForm = () => {
        
    const navigate = useNavigate();

    const [riskAssessment, setRiskAssessment] = useState(false);
    const [content, setContent] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [service, setService] = useState('');
    const [goals, setGoals] = useState([]);
    const [objectives, setObjectives] = useState([]);
    const [patientID, setPatientID] = useState('');
    const [qaProviderCode, setQAProviderCode] = useState('');
    const [therapistProviderCode, setTherapistProviderCode] = useState('');
    const [status, setStatus] = useState('pending');
    const [validated, setValidated] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Therapist Provider Code in the modal
    const [modalProviderCode, setModalProviderCode] = useState(''); 

    const noteData = {
        riskAssessmentChecked: riskAssessment,
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

    const handleModalSubmit = () => {
        handleClose();

        // Include therapistProviderCode in the noteData
        const updatedNoteData = {
        ...noteData,
        therapistProviderCode: modalProviderCode,
        };

        try {
        axios
            .post('http://localhost:3001/patients/create-note', updatedNoteData)
            .then((response) => {
            console.log(response);
            if (response.data.message === 'Note created successfully!') {
                console.log(response.data.message);
                navigate(`/patient/${patientID}`);
            } else {
                const errorMessage = response.data.message;
                console.log(errorMessage);
            }
            })
            .catch((err) => {
            console.error('Error submitting:', err);
            });
        } catch (err) {
        console.error('Error submitting:', err);
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
