import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const PatientCard = ({providerCode, firstName, lastName, phoneNumber, address}) => {
  return (
    <Card className='patient-card' style={{ width:'18rem' }}>
        <Card.Img variant="top" src="https://blog.alliedmarketresearch.com/images/user_icon.png" />
        <Card.Body>
            <Card.Title className='patient-info'>{firstName} {lastName}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Patient ID: {providerCode}</Card.Subtitle>
        </Card.Body>
        <ListGroup className='patient-demographics'>
            <ListGroup.Item>Phone Number: {phoneNumber}</ListGroup.Item>
            <ListGroup.Item>Address: {address}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
            <Card.Link 
              onClick={() => {
                const patientID = providerCode;
                window.localStorage.setItem("patientID", patientID);
              }} 
              href={`/patient/${providerCode}`}
              className='patient-chart-link'
            >
              Patient Chart
            </Card.Link>
        </Card.Body>
    </Card>
  );
}

export default PatientCard;