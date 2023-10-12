import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientForm from '../../components/patientComponents/createPatient/patientForm';
import axios from 'axios';

const CreatePatientPage = () => {

    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();

    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [providerCode, setProviderCode] = useState('');

    const handleValidation = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        handleValidation(event);

        try {
            const response = await axios.post("http://localhost:3001/auth/create-patient", {
                firstName,
                lastName,
                phoneNumber,
                address,
                therapistProviderCode: providerCode,
            })
            if (response.data.message === "Patient created and assigned to therapist successfully!") {
                alert(response.data.message);
                console.log("Before navigation");
                navigate("/");
                console.log("After navigation");
            } else  {
                const errorMessage = response.data.message;
                alert(errorMessage);
            }
        } catch (error) {
            console.error(error)
        }
    }



    return (
        <div>
            <PatientForm
                firstName={firstName}
                setFirstName={setFirstName}
                lastName={lastName}
                setLastName={setLastName}
                address={address}
                setAddress={setAddress}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                providerCode={providerCode}
                setProviderCode={setProviderCode}
                onSubmit={onSubmit}
                validated={validated}
            />
        </div>
    )
}

export default CreatePatientPage;