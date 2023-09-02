import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const PatientCard = ({providerCode, firstName, lastName, phoneNumber, address}) => {
  return (
    <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src="https://blog.alliedmarketresearch.com/images/user_icon.png" />
        <Card.Body>
            <Card.Title><h2>{firstName} {lastName}</h2></Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Patient ID: {providerCode}</Card.Subtitle>
        </Card.Body>
        <ListGroup className="patient-demographics">
            <ListGroup.Item>Phone Number: {phoneNumber}</ListGroup.Item>
            <ListGroup.Item>Address: {address}</ListGroup.Item>
        </ListGroup>
        <Card.Body>
            <Card.Link href="/patient">Patient Chart</Card.Link>
        </Card.Body>
    </Card>
  );
}

export default PatientCard;