import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const NavFeature = ({ userRole,loggedIn, handleLogout}) => {

    const homeLink = userRole === "qa" ? "/qa" : "/";
    const navigate = useNavigate();

    const handleBrandClick = () => {
        navigate(homeLink);
      };

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand onClick={handleBrandClick} style={{ cursor: 'pointer'}}>
                    Calm Space
                </Navbar.Brand>
                    <Nav className="justify-content-end">
                        <Row>
                            {!loggedIn && (
                            <>
                                <Col md="auto"><Nav.Link href="/login">Login</Nav.Link></Col>
                                <Col md="auto"><Nav.Link href="/register">Register</Nav.Link></Col>
                            </>
                            )}
                            {loggedIn && (
                                <>
                                    <Col><Nav.Link href={homeLink}>Home</Nav.Link></Col>
                                    <Col md="auto"><Nav.Link href="/search-patient">Search Patient</Nav.Link></Col>
                                    <Col md="auto"><Nav.Link onClick={handleLogout}>Logout</Nav.Link></Col>
                                </>
                            )}
                        </Row>
                    </Nav>
            </Container>
        </Navbar>
    );
}

export default NavFeature;
