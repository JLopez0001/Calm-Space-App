import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const NavFeature = ({ userRole, loggedIn, handleLogout }) => {
    const homeLink = userRole === "qa" ? "/qa" : "/";
    
    return (
        <Navbar expand="lg" className="nav-bar">
            <Container fluid>
                <Navbar.Brand as={NavLink} to={homeLink}>
                    <h2 className="company-name">CALM SPACE</h2>
                </Navbar.Brand>
                <Nav className="justify-content-end">
                    <Row>
                        {!loggedIn && (
                            <>
                                <Col md="auto"><NavLink to="/login" className="nav-link">Login</NavLink></Col>
                                <Col md="auto"><NavLink to="/register" className="nav-link">Register</NavLink></Col>
                            </>
                        )}
                        {loggedIn && (
                            <>
                                <Col><NavLink to={homeLink} className="nav-link" activeClassName="active">Home</NavLink></Col>
                                <Col md="auto"><NavLink to="/search-patient" className="nav-link" activeClassName="active">Search Patient</NavLink></Col>
                                <Col md="auto"><Nav.Link onClick={handleLogout} className="nav-link">Logout</Nav.Link></Col>
                            </>
                        )}
                    </Row>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default NavFeature;
