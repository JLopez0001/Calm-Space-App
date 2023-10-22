import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { red } from '@mui/material/colors';



const HeaderSection = ({service, setService, appointmentDate, setAppointmentDate, readOnly, disabled, status, toggleRejectionMessageModal, userRole, note}) => {

    const handleAppointmentChange = (e) => {
        setAppointmentDate(e.target.value);
    };
    
    const formatDate = (dateString) => {
        if(!dateString) return ""; // handle falsy values
        const dateObj = new Date(dateString);
        const yyyy = dateObj.getUTCFullYear();
        const mm = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // January is 0!
        const dd = String(dateObj.getUTCDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    return (
        <div>
            <Row className="note-section-header">
                <Col sm={10}>
                    <Container> Billing Information </Container>
                </Col>
                <Col sm={2}>
                    {(status === 'rejected' || (userRole === 'qa' && note?.rejectionReason)) && 
                        <AnnouncementIcon 
                            sx={{ fontSize: 40, color: red[500]}} 
                            onClick={toggleRejectionMessageModal}
                        />
                    }  
                </Col>
            </Row>
            <Form>
                <Row>
                    <Form.Group as={Col} md="5" controlId="formGroupFirstName">
                        <Form.Label>Service</Form.Label>
                        <Form.Select disabled={disabled} required value={service} onChange={(e) => setService(e.target.value)}>
                            <option value="">Please Select Service</option>
                            <option value="Individual Psychotherapy 30 min">Individual Psychotherapy 30 min</option>
                            <option value="Tele-Audio Individual Psychotherapy 30 min">Tele-Audio Individual Psychotherapy 30 min</option>
                            <option value="Tele-Video Individual Psychotherapy 30 min">Tele-Video Individual Psychotherapy 30 min</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} md="3" controlId="formGroupFirstName">
                        <Form.Label>Appointment Date</Form.Label>
                            <Form.Control 
                                required
                                type="date" 
                                min="2015-01-01"
                                max="2024-12-31"
                                value={formatDate(appointmentDate)}
                                onChange={handleAppointmentChange} 
                                readOnly={readOnly}
                            />
                    </Form.Group>
                </Row>
            </Form>
        </div>
    )
}
export default HeaderSection;