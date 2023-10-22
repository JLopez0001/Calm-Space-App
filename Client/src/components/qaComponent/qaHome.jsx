import React from 'react';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const QAHomeScreen = ({ userName, notes }) => {

    const formatDate = (dateString) => {
        if(!dateString) return ""; // Return empty string if dateString is null or undefined
        const dateObj = new Date(dateString);
        const yyyy = dateObj.getUTCFullYear();
        const mm = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // January is 0!
        const dd = String(dateObj.getUTCDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    return (
        <div className='qa-home-screen'>
            <div className="greeting-user">
                <h1>Welcome {userName}</h1>
            </div>
            <Container>
                <Row>
                    <Col>Tasks To Review</Col>
                </Row>
                <Row>
                    <Col>Appointment Date</Col>
                    <Col>Patient Name</Col>
                    <Col>From UserID</Col>
                    <Col>Service</Col>
                </Row>
                {notes.map(note => (
                    <Row key={note._id}>
                        <Col>{formatDate(note.appointmentDate)}</Col>
                        <Col>
                            <Link to={`/patient/${note.patient.patientID}`}>
                                {note.patient.firstName} {note.patient.lastName}
                            </Link>
                        </Col>
                        <Col>{note.therapist.username}</Col>
                        <Col>
                            <Link to={`/note/${note._id}`}>
                                {note.service}
                            </Link>
                        </Col>
                    </Row>
                ))}
            </Container>
        </div>
    );
};

export default QAHomeScreen;
