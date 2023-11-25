import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { toast } from "react-hot-toast";  
import PatientCard from "../../components/patientComponent/createPatient/patientCard";
import NoteForm from "../../components/noteComponent/createNote/createNoteForm";
import QAUsers from "../../components/qaComponent/qaUsers";
import { Row, Col } from "react-bootstrap";


const CreateNotePage = () => {

    const [cookies, _] = useCookies(["access_token"])
    const { patientID } = useParams();
    const [patientData, setPatientData] = useState({
        firstName: "",
        lastName: "",
        patientID: "",
    });
    const [qaUsers, setQAUsers] = useState([]);


    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/patients/patient/${patientID}`,
                { headers: { access_token: cookies.access_token }});
                //debugger;
                console.log(response);
                if (response.status === 200) {
                    setPatientData(response.data.patient);
                } else {
                    console.error('Invalid patient data:', response.data);
                }
            } catch (error) {
                console.error('Error fetching patient data:', error);
                toast.error(error.response?.data?.message || 'Error fetching patient data');
            }
        }

        if (patientID) {
            fetchPatientData();
        }
    }, [patientID]);

    useEffect(() => {
        const fetchQAUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/qa/get-qa-users');
                console.log(response);
                if (response.status === 200) {
                    setQAUsers(response.data);
                } else {
                    console.error('Invalid QA users data:', response.data);
                }
            } catch (error) {
                console.error('Error fetching QA users data:', error);
                toast.error(error.response?.data?.message || 'Error fetching QA users data');
            }
        };
        fetchQAUsers();
    }, []);


    return (
        <div>
            <Row>
                <Col>
                    <Row  xs={6} md={6} lg={3}>
                        <div className="patient-card-col">
                            <PatientCard
                                providerCode={patientData.patientID}
                                firstName={patientData.firstName}
                                lastName={patientData.lastName}
                                phoneNumber={patientData.phoneNumber}
                                address={patientData.address}
                            />
                        </div>
                    </Row>
                    <Row  xs={6} md={6} lg={3} className="justify-content-center">
                        <div className="qa-users-table">
                            <QAUsers
                                qaUsers={qaUsers}
                            />  
                        </div>
                    </Row>
                </Col>
              
                <Col xs={12} md={12} lg={9}>
                    <NoteForm />
                </Col>
            </Row>
        </div>
    )
}

export default CreateNotePage;