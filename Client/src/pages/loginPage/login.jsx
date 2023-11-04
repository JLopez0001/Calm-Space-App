import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie"
import axios from 'axios';
import LoginForm from '../../components/auth/loginForm';


const LoginPage = ({onLoginSuccess}) => {

    const [, setCookies] = useCookies(["access_token"])


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
            const response = await axios.post("http://localhost:3001/auth/login", {   
                    username,
                    password,
                })

                if(response.data.message === "Logged In Successfully"){

                    setCookies("access_token", response.data.token); 
                    window.localStorage.setItem("userID", response.data.userID);
                    window.localStorage.setItem("username", response.data.username);
                    window.localStorage.setItem("userRole", response.data.role);
                    window.localStorage.setItem("token", response.data.token);
                    
                    onLoginSuccess();

                    // Navigate based on the role
                    const destination = response.data.role === "therapist" ? "/" : "/qa";
                    navigate(destination, { replace: true });

                    // console.log(response.data.role)
                    
                    alert(response.data.message);
                } else {
                    const errorMessage = response.data.message;
                    alert(errorMessage);
                }
        } catch (err) {
            console.error(err)
    }};

    return (
        <div>
            <LoginForm
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                onSubmit={onSubmit}
                onValidate={handleValidation}
                validated={validated}
            />
        </div>
    )
}

export default LoginPage;
