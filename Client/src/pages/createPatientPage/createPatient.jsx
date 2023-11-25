import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-hot-toast'; 
import { useCookies } from "react-cookie"
import PatientForm from '../../components/patientComponent/createPatient/patientForm';
import axios from 'axios';

const CreatePatientPage = () => {

    const [validated, setValidated] = useState(false);
    const navigate = useNavigate();
    const [cookies, _] = useCookies(["access_token"])

    
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
            const response = await axios.post("http://localhost:3001/patients/create-patient", {
                firstName,
                lastName,
                phoneNumber,
                address,
                therapistProviderCode: providerCode,
            },{ headers: { access_token: cookies.access_token }});
            if (response.data.message === "Patient created and assigned to therapist successfully!") {
                toast.success(`Nice Job! ${firstName} ${lastName} Is Your New Patient!`);
                navigate("/");
            } else  {
                const errorMessage = response.data.message;
                toast.error(errorMessage);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Patient creation failed due to an unexpected error");
            console.error(error)
        };
    };



    return (
        <div className='form-container create-patient'>
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