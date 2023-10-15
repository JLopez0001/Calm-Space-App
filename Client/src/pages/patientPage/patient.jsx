import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import PatientChart from "../../components/patientComponents/patientChart/patientsChart";

const PatientPage = () => {
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
            });

            console.log("Response:", response); // Debugging log
    
            if (response.status === 200) {
                // Update patientData with the new diagnosis (response.data may contain updated data)
                setPatientData((prevData) => ({
                    ...prevData,
                    diagnoses: [...prevData.diagnoses, { diagnosis: newDiagnosis, icd10: newICD10 }],
                }));
            } else {
                console.error('Failed to add diagnosis:', response.data);
            }
        } catch (error) {
            console.error('Error adding diagnosis:', error);
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/patients/patient/${patientID}`)
            .then((response) => {
                if (response.status === 200) {
                    console.log("Received patient data:", response.data); // Debugging log
                    // Ensure that diagnoses is an array, or convert it to an array if it's not
                    const updatedPatientData = {
                        ...response.data.patient,
                        diagnoses: Array.isArray(response.data.patient.diagnoses) ? response.data.patient.diagnoses : [],
                    };
                    setPatientData(updatedPatientData);
                    setNotes(response.data.notes); // Set the notes state
                } else {
                    console.error('Invalid patient data:', response.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching patient data:', error);
            });
    }, [patientID]);
    

    console.log("Rendering PatientPage with patientData:", patientData); // Debugging log

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
