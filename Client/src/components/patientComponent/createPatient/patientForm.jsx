import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';


const PatientForm = ({firstName, setFirstName, lastName, setLastName,
                     address, setAddress, phoneNumber, setPhoneNumber, providerCode,
                      setProviderCode,onSubmit,validated}) => {
    return (
        <div className='form-panel'>
            <h1 className='form-title'>Create Patient</h1>
            <Form noValidate validated={validated} onSubmit={onSubmit}>
                <Row className='create-patient-row d-flex justify-content-center'>
                    <Form.Group as={Col} sm={8} md={5} controlId='formGroupFirstName'>
                        <Form.Label>First Name</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    className='input-placeholder'
                                    required
                                    type='firstName'
                                    placeholder='First Name'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please add a First Name.
                                </Form.Control.Feedback>
                            </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} sm={8} md={5} controlId="formGroupLastName">
                        <Form.Label>Last Name</Form.Label>
                            <InputGroup  hasValidation>
                                <Form.Control
                                    className='input-placeholder'
                                    required
                                    type='lastName'
                                    placeholder='Last Name'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please add a Last Name.
                                </Form.Control.Feedback>
                            </InputGroup>
                    </Form.Group>
                </Row>

                <Row className='create-patient-row  d-flex justify-content-center'>
                    <Form.Group as={Col} sm={8} md={5} controlId="formGroupPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    className='input-placeholder' 
                                    required
                                    type='phoneNumber'
                                    placeholder='Phone Number'
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please add phone number.
                                </Form.Control.Feedback>
                            </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} sm={8} md={5} controlId="formGroupAddress">
                        <Form.Label>Address</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    className='input-placeholder'
                                    required
                                    type='address'
                                    placeholder='Address'
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please add address.
                                </Form.Control.Feedback>
                            </InputGroup>
                    </Form.Group>
                </Row>

                <Row className='create-patient-row d-flex justify-content-center'>
                    <Form.Group as={Col} sm={8} md={5} controlId="formGroupProviderCode">
                        <Form.Label>Provider Code</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    className='input-placeholder' 
                                    required
                                    type='providerCode'
                                    placeholder='i.e. 123456'
                                    value={providerCode}
                                    onChange={(e) => setProviderCode(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please add your provider code.
                                </Form.Control.Feedback>
                            </InputGroup>
                    </Form.Group>
                </Row>
                <Button className='buttons' type="submit">Submit form</Button>
            </Form>         
        </div>
    );
};

export default PatientForm;