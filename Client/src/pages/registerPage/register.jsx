import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import RegisterForm from '../../components/auth/registerForm';

const RegisterPage = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);

    const onSubmit = async (event) => {   
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(true); 
            return; 
        }

        try {
            const response = await axios.post("http://localhost:3001/auth/register", {
                username,
                email,
                password,
                role,
            })

            if (response.data.message === "User Registered Successfully!") {
                toast.success(`Registration Completed. Welcome ${username}! Please Login`);
                navigate("/login");
            } else {
                toast.error(response.data.error || "Registration failed");
            }

        } catch (err) {
            toast.error(err.response?.data?.error || "Registration failed due to an unexpected error");
            console.error(err);
        }
    };
  
    return (
        <div className='image-background form-container'>
            <RegisterForm
                username={username}
                setUsername={setUsername}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                role={role}
                setRole={setRole}
                onSubmit={onSubmit}
                validated={validated}
            />
        </div>
    )
}

export default RegisterPage;
