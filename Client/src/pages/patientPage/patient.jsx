import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { toast } from "react-hot-toast";
import axios from 'axios';
import PatientChart from "../../components/patientComponent/patientChart/patientsChart";

const PatientPage = () => {

    const [cookies, _] = useCookies(["access_token"])
    const { patientID } = useParams();
    const [patientData, setPatientData] = useState({
        firstName: "",
        lastName: "",
        patientID: "",
        diagnoses: [] 
    });
    const [notes, setNotes] = useState([]);

    const onAddDiagnosis = async (newDiagnosis, newICD10) => {
        try {
            const response = await axios.post(`http://localhost:3001/patients/patient/add-diagnosis/${patientID}`, {
                diagnosis: newDiagnosis,
                icd10: newICD10,
            }, { headers: { access_token: cookies.access_token } });

            if (response.status === 200) {
                setPatientData((prevData) => ({
                    ...prevData,
                    diagnoses: [...prevData.diagnoses, { diagnosis: newDiagnosis, icd10: newICD10 }],
                }));
                toast.success('Diagnosis Added Successfully!');
            } else {
                toast.error('Failed To Add Diagnosis');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed To Add Diagnosis');
        }
    };

    useEffect(() => {
        const fetchPatientData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/patients/patient/${patientID}`,
                { headers: { access_token: cookies.access_token } });
                if (response.status === 200) {
                    const updatedPatientData = {
                        ...response.data.patient,
                        diagnoses: Array.isArray(response.data.patient.diagnoses) ? response.data.patient.diagnoses : [],
                    };
                    setPatientData(updatedPatientData);
                    setNotes(response.data.notes);
                } else {
                    console.error('Invalid patient data:', response.data);
                }
            } catch (error) {
                console.error('Error fetching patient data:', error);
                toast.error(error.response?.data?.message || 'Error fetching patient data');
            }
        };

        if (patientID) {
            fetchPatientData();
        }
    }, [patientID]);

    return (
        <div>
            <PatientChart
                firstName={patientData.firstName}
                lastName={patientData.lastName}
                patientID={patientData.patientID}
                diagnoses={patientData.diagnoses}
                onAddDiagnosis={onAddDiagnosis} 
                notes={notes}
            />
        </div>
    )
}

export default PatientPage;
