import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';


const LoginForm = ({username, setUsername, password, setPassword, onSubmit, onValidate,validated}) =>{

    return (
        <div className='auth-panel'>
             <Form noValidate validated={validated} onValidate={onValidate} onSubmit={onSubmit}>
                <div className='auth-panel-header'>
                    <h1>Login</h1>
                </div>
                <Form.Group className="mb-3" controlId="formGroupUsername">
                    <Form.Label>Username</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                            required
                            type="username" 
                            placeholder="Enter username"
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
                <Button type="submit">Submit</Button>
            </Form>

        </div>
    );
};

export default LoginForm;