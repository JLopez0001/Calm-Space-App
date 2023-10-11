import React, { useState } from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';


const ContentSection = ({riskAssessment, setRiskAssessment, qaProviderCode, setQAProviderCode,
                        patientID, setPatientID,content, setContent}) => {
    

    return (
        <div>
            <Row className="note-section-header"> 
                <Container> Progress Note </Container>
            </Row>
            <Form>
                <Form.Group as={Row}  md="6" controlId="formGroupFirstName">
                    <Form.Check
                        required
                        type="checkbox"
                        id="risk-assessment-checkbox"
                        label="Assessed for SI/HI"
                        checked={riskAssessment}
                        onChange={(e) => setRiskAssessment(e.target.checked)}
                    />
                    <Form.Label column sm={2}> QA ID: </Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            required
                            type="text"
                            placeholder="Quality Assuance ID"
                            value={qaProviderCode}
                            onChange={(e) => setQAProviderCode(e.target.value)}
                        />
                    </Col>

                    <Form.Label column sm={2}> Patient ID:  </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Patient ID"
                            value={patientID}
                            onChange={(e) => setPatientID(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description of Session</Form.Label>
                    <Form.Control 
                        required
                        as="textarea" 
                        rows={3} 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Form.Group>
                
            </Form>
        </div>
    )
};

export default ContentSection;