import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';


const LoginForm = ({username, setUsername, password, setPassword, onSubmit,validated}) =>{

    return (
        <div className='form-panel auth-panel'>
             <Form noValidate validated={validated} onSubmit={onSubmit}>
                <div className='auth-panel-header'>
                    <h1>Login</h1>
                </div>
                <Form.Group className="mb-3" controlId="formGroupUsername">
                    <Form.Label>Username</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                            className='input-placeholder' 
                            required
                            type="username" 
                            placeholder="Username"
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                        />
                            <Form.Control.Feedback type="invalid">
                                Please add a Username.
                            </Form.Control.Feedback>
                        </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                className='input-placeholder' 
                                required
                                type="password" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please add a Password.
                            </Form.Control.Feedback>
                        </InputGroup>
                </Form.Group>
                <Button className='buttons auth-button' type="submit">Submit</Button>
            </Form>
        </div>
    );
};

export default LoginForm;