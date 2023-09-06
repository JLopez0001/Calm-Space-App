import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import PatientCard from "../../components/patientCard";
import { useGetUserID } from '../../hooks/getUserID';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const HomePage = () => {

    const [patients, setPatients] = useState([]);

    const userID = useGetUserID();

    useEffect(() => {

        const therapistID = userID;

        // Fetch patients assigned to the therapist from the backend.
        axios.get(`http://localhost:3001/auth/patients/${therapistID}`)
        .then((response) => {
            if (Array.isArray(response.data)) {
                setPatients(response.data);
            } else {
                console.error('Invalid patient data:', response.data);
            }
        })
        .catch((error) => {
            console.error('Error fetching patient data:', error);
        });
    }, [userID]);

    return (
        <div>
            <div>
                <Button href="/create-patient">Add Patient</Button>
            </div>
            <Row xs={1} md={3} className="patients-card">
                {patients.map((patient) => (
                    <Col key={patient._id}>
                        <div className='card'>
                            <PatientCard
                                providerCode={patient.patientID}
                                firstName={patient.firstName}
                                lastName={patient.lastName}
                                phoneNumber={patient.phoneNumber}
                                address={patient.address}
                            />
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomePage;