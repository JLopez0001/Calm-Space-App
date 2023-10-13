import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const QAHomeScreen = ({ userName, notes }) => {
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
                        <Col>{note.appointmentDate}</Col>
                        <Col>{note.patient.firstName} {note.patient.lastName}</Col>
                        <Col>{note.therapist.username}</Col>
                        <Col>{note.service}</Col>
                    </Row>
                ))}
            </Container>
        </div>
    );
};

export default QAHomeScreen;
