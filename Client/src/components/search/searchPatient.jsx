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
        <Form className='form-panel'>
                <h4 className='search-title'> Search By </h4>
                <div className='search-radio'>
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
                </div>
                <div className='search-info-row'>
                    <Row className="justify-content-md-center">
                        {searchOption === 'fullName' && (
                            <>
                                <Col md={4}>
                                    <Form.Group controlId="formGroupFirstName">
                                        <InputGroup hasValidation>
                                            <Form.Control
                                                required
                                                type="text"
                                                className='input-placeholder'
                                                placeholder="First Name: John"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please add a First Name.
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                </Col>

                                <Col md={4}>
                                    <Form.Group controlId="formGroupLastName">
                                        <InputGroup hasValidation>
                                            <Form.Control
                                                className='input-placeholder'
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
                                </Col>
                            </>
                        )}
                        {searchOption === 'patientID' && (
                            <Col md={5}>
                                <Form.Group controlId="formGroupPatientID">
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            required
                                            type="text"
                                            placeholder="Patient ID"
                                            className='input-placeholder'
                                            value={patientID}
                                            onChange={(e) => setPatientID(e.target.value)}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please add patient Id.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        )}
                        <Col md={3} className="d-flex align-items-center pl-0">
                            <Button className='buttons search-button' onClick={handleSearch}>Search</Button>
                        </Col>
                    </Row>
                </div>
                <Row>
                    <SearchResults results={searchResults} />
                </Row>            
        </Form>
    );
};

export default SearchPatient;
