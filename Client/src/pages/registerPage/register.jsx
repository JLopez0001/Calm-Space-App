import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RegisterForm from '../../components/auth/registerForm';

const RegisterPage = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);

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
        try {
            const response = await axios.post("http://localhost:3001/auth/register", {
                username,
                email,
                password,
                role,
            })
            if (response.data.message === "User Registered Successfully!") {
                alert(`Registration Completed. Welcome ${username}! Please Login`);
                navigate("/login");
            } else {
                // Handle registration error, if any
                const errorMessage = response.data.message;
                alert(errorMessage);
            }
        } catch (err) {
            console.error(err);
        }
    };
  
    return (
        <div>
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
                onValidate={handleValidation}
                validated={validated}
            />
        </div>
    )
}

export default RegisterPage;
