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
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ms-auto">
                        {!loggedIn && (
                            <>
                                <Nav.Link as={NavLink} to="/login" className="nav-link">Login</Nav.Link>
                                <Nav.Link as={NavLink} to="/register" className="nav-link">Register</Nav.Link>
                            </>
                        )}
                        {loggedIn && (
                            <>
                                <Nav.Link as={NavLink} to={homeLink} className="nav-link" activeClassName="active">Home</Nav.Link>
                                <Nav.Link as={NavLink} to="/search-patient" className="nav-link" activeClassName="active">Search Patient</Nav.Link>
                                <Nav.Link onClick={handleLogout} className="nav-link">Logout</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavFeature;
