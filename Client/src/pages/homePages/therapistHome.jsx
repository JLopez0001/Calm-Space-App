import { useState } from 'react';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import PatientCard from '../../components/patientComponent/createPatient/patientCard';
import { useGetUserID } from '../../hooks/getUserID';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const TherapistHomePage = () => {
    
    const [cookies, _] = useCookies(["access_token"])
    const loggedInUsername = window.localStorage.getItem("username");

    const [patients, setPatients] = useState([]);
    const userID = useGetUserID();

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/patients/patients/${userID}`,
                { headers: { access_token: cookies.access_token } });
                if (Array.isArray(response.data)) {
                    setPatients(response.data);
                } else {
                    console.error('Invalid patient data:', response.data);
                }
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        };

        if (userID) {
            fetchPatients();
        }
    }, [userID]);

    return (

        <div>
            <div className="greeting-user">
                <h1>Welcome {loggedInUsername}</h1>
            </div>
            <div>
                <Button  className='buttons add-patient-button' href="/create-patient">Add Patient</Button>
            </div>
            <Row xs={1} md={3}>
                {patients.map((patient) => (
                    <Col className='d-flex justify-content-center' key={patient._id}>
                        <PatientCard
                            providerCode={patient.patientID}
                            firstName={patient.firstName}
                            lastName={patient.lastName}
                            phoneNumber={patient.phoneNumber}
                            address={patient.address}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default TherapistHomePage;