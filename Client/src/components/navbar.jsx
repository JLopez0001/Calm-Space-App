import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const NavFeature = () => {

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container >
                <Navbar.Brand href="/">Calm Space</Navbar.Brand>
                    <Nav className="justify-content-end">
                        <Row>
                            <Col><Nav.Link href="/">Home</Nav.Link></Col>
                            <Col md="auto"><Nav.Link href="/search-patient">Search Patient</Nav.Link></Col>
                            <Col md="auto" ><Nav.Link href="/login">Login</Nav.Link></Col>
                            <Col md="auto"><Nav.Link href="/register">Register</Nav.Link></Col>
                        </Row>
                    </Nav>
            </Container>
        </Navbar>
    
    );
}

export default NavFeature;
