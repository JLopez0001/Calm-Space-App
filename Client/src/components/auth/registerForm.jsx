import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';


const RegisterForm = ({email, setEmail, username, setUsername, password, setPassword, role, setRole, onSubmit,validated}) =>{

  return (
    <div className='form-panel auth-panel'>

      <Form noValidate validated={validated} onSubmit={onSubmit}>
        <div className='auth-panel-header'>
          <h1>Register</h1>
        </div>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label>Email address</Form.Label>
            <InputGroup hasValidation>
              <Form.Control 
                className='input-placeholder' 
                required
                type="email" 
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please add an Email.
              </Form.Control.Feedback>
            </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupUsername">
          <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                className='input-placeholder'
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

        <Form.Group className="mb-3" controlId="formGroupRole">
          <Form.Label>Role</Form.Label>
            {['radio'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  feedback="Please Select Role."
                  feedbackType="invalid"
                  required
                  inline
                  label="Therapist"
                  name="role"
                  type={type}
                  value= "therapist"
                  onChange={(e) => setRole(e.target.value)}
                  id={`inline-${type}-therapist`}
                />
                <Form.Check
                  feedback="Please Select Role."
                  feedbackType="invalid"
                  required
                  inline
                  label="QA"
                  name="role"
                  type={type}
                  value="qa"
                  onChange={(e) => setRole(e.target.value)}
                  id={`inline-${type}-qa`}
                />
              </div>
          ))}
        </Form.Group>
        <Button className='buttons auth-button' type="submit">Submit</Button>
      </Form>

    </div>
  );
}

export default RegisterForm;