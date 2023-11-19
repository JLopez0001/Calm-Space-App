import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';


const ContentSection = ({riskAssessment, setRiskAssessment, qaProviderCode, setQAProviderCode,
                        patientID, setPatientID,content, setContent, readOnly, disabled}) => {
    

    return (
        <div className="d-flex justify-content-around">
            <Form className="content-section">
                <div className="content-row">
                    <Form.Group as={Row}  md="6" controlId="formGroupFirstName">
                        <Form.Check
                            required
                            disabled={disabled}
                            type="checkbox"
                            id="risk-assessment-checkbox"
                            label="Assessed for SI/HI"
                            checked={riskAssessment}
                            onChange={(e) => setRiskAssessment(e.target.checked)}
                            readOnly={readOnly}
                        />
                        {!readOnly && (
                            <>
                                <Form.Label column sm={2}> QA ID: </Form.Label>
                                <Col sm={10}>
                                    <Form.Control 
                                        required
                                        className="input-placeholder"
                                        type="text"
                                        placeholder="QA ID"
                                        value={qaProviderCode}
                                        onChange={(e) => setQAProviderCode(e.target.value)}
                                        readOnly={readOnly}
                                    />
                                </Col>

                                <Form.Label column sm={2}> Patient ID:  </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        required
                                        className="input-placeholder"
                                        type="text"
                                        placeholder="Patient ID"
                                        value={patientID}
                                        onChange={(e) => setPatientID(e.target.value)}
                                        readOnly={readOnly}
                                    />
                                </Col>
                            </>
                        )}  
                    </Form.Group>
                </div>
                <div >
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label className="note-header"> <h5>Description of Session</h5></Form.Label>
                        <Form.Control 
                            className="input-placeholder"
                            required
                            as="textarea" 
                            rows={3} 
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            readOnly={readOnly}
                        />
                    </Form.Group>
                </div>
            </Form>
        </div>
    )
};

export default ContentSection;