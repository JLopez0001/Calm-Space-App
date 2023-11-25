import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/esm/Button';
import Table from 'react-bootstrap/Table';

const PatientChart = ({ firstName, lastName, patientID, diagnoses, onAddDiagnosis, notes }) => {
    const [newDiagnosis, setNewDiagnosis] = useState('');
    const [newICD10, setNewICD10] = useState('');
    const [showInputFields, setShowInputFields] = useState(false);

    const toggleInputFields = () => {
        setShowInputFields(!showInputFields);
        if (showInputFields) {
            setNewDiagnosis('');
            setNewICD10('');
        }
    };

    const handleAddNewDiagnosis = () => {
        if (newDiagnosis.trim() !== '' && newICD10.trim() !== '') {
            onAddDiagnosis(newDiagnosis, newICD10)
                .then(() => {
                    setNewDiagnosis('');
                    setNewICD10('');
                    setShowInputFields(false);
                })
                .catch((error) => {
                    console.error('Error adding diagnosis:', error);
                });
        }
    };

    const formatDate = (dateString) => {
        if(!dateString) return ""; // Return empty string if dateString is null or undefined
        const dateObj = new Date(dateString);
        const yyyy = dateObj.getUTCFullYear();
        const mm = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // January is 0!
        const dd = String(dateObj.getUTCDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };


    // Function to convert date strings to JavaScript Date objects for sorting
    const convertToDateObjects = (notes) => {
        return notes.map((note) => ({
            ...note,
            appointmentDate: new Date(note.appointmentDate),
        }));
    };

    return (
        <div>
            <Container className='patient-info patient-chart-header'>
                <h2 className='patient-chart-info'>{firstName} {lastName} </h2>
                <h3 className='patient-chart-info'> Patient ID: {patientID}</h3>
            </Container>
            <Container fluid >
                <Row>
                    {/* Notes */}
                    <Col sm={12} lg={8}>  
                        <div className='patient-chart-notes'>
                            <div className='patient-chart'>
                                <Row>
                                    <Col className='patient-notes d-flex justify-content-center' sm={9}> <h4>Patients Notes</h4> </Col>
                                    <Col sm={3}> 
                                        <Button  
                                            className='buttons' 
                                            href={`/patient/${patientID}/create-note`}
                                        >
                                         Add Note
                                        </Button> 
                                    </Col>
                                </Row>
                            </div>
                            <Table className='patient-note-table' striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Status</th>
                                        <th>Note</th>
                                        <th>Appointment Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {notes && notes.length > 0 ? (
                                        convertToDateObjects(notes)
                                            .sort((a, b) => b.appointmentDate - a.appointmentDate)
                                            .map((note, index) => (
                                                <tr key={index}>
                                                    <td>{note.status}</td>
                                                    <td>
                                                        <Link className='link' to={`/note/${note._id}`}>
                                                            {note.service}
                                                        </Link>
                                                    </td>
                                                    <td>{formatDate(note.appointmentDate)}</td>
                                                </tr>
                                            ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3">No notes available.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </Col>
    
                    {/* Diagnosis */}
                    <Col sm={12} lg={4}>
                        <div className="patient-chart-notes">
                            <h4 className='patient-chart-diagnosis'> Diagnosis</h4>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ICD-10</th>
                                        <th>Diagnosis Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {diagnoses && diagnoses.length > 0 ? (
                                            diagnoses.map((diagnosisObj, index) => (
                                                <tr key={index}>
                                                    <td>{diagnosisObj.icd10}</td>
                                                    <td>{diagnosisObj.diagnosis}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="2">No diagnosis available.</td>
                                            </tr>
                                    )}
                                </tbody>
                            </Table>
                            {showInputFields && (
                                <div>
                                    <input
                                        size={15}
                                        type="text"
                                        placeholder="ICD10"
                                        value={newICD10}
                                        onChange={(e) => setNewICD10(e.target.value)}
                                    />
                                    <input
                                        size={15}
                                        type="text"
                                        placeholder="Enter Diagnosis"
                                        value={newDiagnosis}
                                        onChange={(e) => setNewDiagnosis(e.target.value)}
                                    />
                                    <Button
                                        className='diagnosis-button buttons '
                                        variant="primary"
                                        onClick={handleAddNewDiagnosis}
                                    >
                                        ADD DIAGNOSIS
                                    </Button>
                                    <Button
                                        className='diagnosis-button buttons'
                                        variant="secondary"
                                        onClick={toggleInputFields}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            )}
                            {!showInputFields && (
                                <Button className='buttons' variant="primary" onClick={toggleInputFields}>
                                    ADD DIAGNOSIS
                                </Button>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}    

export default PatientChart;