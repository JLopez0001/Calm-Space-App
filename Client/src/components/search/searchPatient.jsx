import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import SearchResults from './searchResults';

const SearchPatient = () => {
    const [searchOption, setSearchOption] = useState('fullName');
    const [firstName, setFirstName] = useState(''); // Separate state for first name
    const [lastName, setLastName] = useState('');   // Separate state for last name
    const [patientID, setPatientID] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleOptionChange = (e) => {
        setSearchOption(e.target.value);
    };

    const handleSearch = async () => {
        try {
            let query;
    
            if (searchOption === 'fullName') {
                query = `${firstName} ${lastName}`;
            } else {
                query = patientID;
            }
    
            const response = await axios.get(`http://localhost:3001/patients/search-patient/${searchOption}/${query}`);
            if (response.status === 200) {
                setSearchResults(response.data);
                console.log('Search results:', response.data);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Form>
            <div className="patient-search-form">
                <h4> Search By </h4>
                {['fullName', 'patientID'].map((option) => (
                    <Form.Check
                        key={option}
                        inline
                        label={option === 'fullName' ? 'Full Name' : 'Patient ID'}
                        name="searchOption"
                        type="radio"
                        id={`inline-${option}`}
                        value={option}
                        checked={searchOption === option}
                        onChange={handleOptionChange}
                    />
                ))}
                <Row>
                    {searchOption === 'fullName' && (
                        <>
                            <Form.Group as={Col} md="auto" controlId="formGroupFirstName">
                                <InputGroup hasValidation>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="First Name: John"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please add a First Name.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group as={Col} md="auto" controlId="formGroupLastName">
                                <InputGroup hasValidation>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Last Name: Doe"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please add a Last Name.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </>
                    )}
                    {searchOption === 'patientID' && (
                        <Form.Group as={Col} md="auto" controlId="formGroupPatientID">
                            <InputGroup hasValidation>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Patient ID"
                                    value={patientID}
                                    onChange={(e) => setPatientID(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please add patient Id.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    )}
                    <Col>
                        <Button onClick={handleSearch}>Search</Button>
                    </Col>
                </Row>
                <Row>
                    <SearchResults results={searchResults} />
                </Row>
            </div>
            
        </Form>
    );
};

export default SearchPatient;
