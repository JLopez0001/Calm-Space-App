import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';

const PatientChart = ({ firstName, lastName, patientID, diagnoses, onAddDiagnosis }) => {
    console.log("Rendering PatientChart with data:", firstName, lastName, patientID);

    const [showInputFields, setShowInputFields] = useState(false);
    const [newDiagnosis, setNewDiagnosis] = useState('');
    const [newICD10, setNewICD10] = useState('');
    const [displayedDiagnoses, setDisplayedDiagnoses] = useState([]);

    // Function to handle adding a new diagnosis
    const handleAddDiagnosis = () => {
        if (newDiagnosis.trim() !== '') {
            onAddDiagnosis(newDiagnosis, newICD10)
                .then((response) => {
                    if (response.status === 200) {
                        // Update displayedDiagnoses immediately after a successful add
                        setDisplayedDiagnoses([...displayedDiagnoses, { diagnosis: newDiagnosis, icd10: newICD10 }]);
                        setNewDiagnosis('');
                        setNewICD10('');
                    } else {
                        console.error('Failed to add diagnosis:', response.data);
                    }
                })
                .catch((error) => {
                    console.error('Error adding diagnosis:', error);
                });
        }
        setShowInputFields(!showInputFields); // Toggle the input fields
    };
    
    useEffect(() => {
        // Initialize displayedDiagnoses with the initial diagnoses
        setDisplayedDiagnoses(diagnoses || []);
    }, [diagnoses]);

    return (
        <div className='patient-chart-header'>
            <Container>
                <h2>{firstName} {lastName} </h2>
                <h3>Patient ID: {patientID}</h3>
            </Container>
            <Container>
                <Row>
                    <Col> Notes </Col>
                    <Col>
                        <div className="auth-panel">
                            <h4>Diagnosis</h4>
                            <Row>
                                <Col>ICD-10</Col>
                                <Col>Diagnosis Description</Col>
                            </Row>
                            <Row>
                                <Col>
                                    {displayedDiagnoses && displayedDiagnoses.length > 0 ? (
                                        <ul>
                                            {displayedDiagnoses.map((diagnosisObj, index) => (
                                                <li key={index}>
                                                    {diagnosisObj.icd10}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No diagnosis available.</p>
                                    )}

                                    {showInputFields && (
                                        <div>
                                            <input
                                                size={15}
                                                type="text"
                                                placeholder="ICD10"
                                                value={newICD10}
                                                onChange={(e) => setNewICD10(e.target.value)}
                                            />
                                        </div>
                                    )}
                                </Col>
                                <Col>
                                    {displayedDiagnoses && displayedDiagnoses.length > 0 ? (
                                        <ul>
                                            {displayedDiagnoses.map((diagnosisObj, index) => (
                                                <li key={index}>
                                                    {diagnosisObj.diagnosis}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No diagnosis available.</p>
                                    )}

                                    {showInputFields && (
                                        <div>
                                            <input
                                                size={15}
                                                type="text"
                                                placeholder="Enter Diagnosis"
                                                value={newDiagnosis}
                                                onChange={(e) => setNewDiagnosis(e.target.value)}
                                            />
                                            <Button
                                                variant="primary"
                                                onClick={handleAddDiagnosis}
                                            >
                                                {showInputFields ? 'Cancel' : 'ADD DIAGNOSIS'}
                                            </Button>
                                        </div>
                                    )}
                                </Col>
                            </Row>
                            <Button variant="primary" onClick={handleAddDiagnosis}>ADD DIAGNOSIS</Button>

                        </div>
                    </Col>

                </Row>
            </Container>
        </div>
    );
};

export default PatientChart;
