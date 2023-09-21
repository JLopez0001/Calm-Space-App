import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


const HeaderSection = ({service, setService, appointment, setAppointment}) => {

    return (
        <div>
            <Row className="note-section-header">
                <Container> Billing Information </Container>
            </Row>
            <Row>
                <Form.Group as={Col} md="5" controlId="formGroupFirstName">
                    <Form.Label>Service</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Select>
                                <option>Please Select Service</option>
                                <option value="1">Individual Psychotherapy 30 min</option>
                                <option value="2">Tele-Audio Individual Psychotherapy 30 min</option>
                                <option value="3">Tele-Video Individual Psychotherapy 30 min</option>
                            </Form.Select>
                        </InputGroup>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="formGroupFirstName">
                    <Form.Label>Appointment Date</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control 
                                type="date" 
                                min="2015-01-01"
                                max="2024-12-31"
                            />
                        </InputGroup>
                </Form.Group>
            </Row>
        </div>
    )
}
export default HeaderSection;