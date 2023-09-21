import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import HeaderSection from './serviceAndAppointmentSection';
import GoalSection from './goalSection';

const NoteForm = ({ validated, onSubmit}) =>{

    return (
        <div className=''>
            <Form noValidate validated={validated} onSubmit={onSubmit}> 
                <HeaderSection />
                <GoalSection />
                <Button type="submit"> Submit Note </Button>
            </Form>
        </div>
    );
}

export default NoteForm;