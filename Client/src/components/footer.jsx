import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <footer className="footer">
            <Container fluid className="p-4 pb-0">
                <Row className="align-items-center justify-content-between">  {/* Add justify-content-between */}
                    <Col lg={4} className="mb-4 mb-md-0">
                        <h6>Sign up for our newsletter</h6>
                        <Form className="d-flex">
                            <Form.Group className="flex-grow-1 me-2" controlId="formNewsletterEmail">
                                <Form.Control type="email" placeholder="Email address" />
                            </Form.Group>
                            <Button type="submit" className="buttons" variant="primary">
                                Subscribe
                            </Button>
                        </Form>
                    </Col>

                    <Col lg={4} className="mb-4 mb-md-0">
                        <div className="me-5 d-none d-lg-block">
                            <h6>Get connected with us on social networks:</h6>
                        </div>
                        <div>
                            <a href="https://www.facebook.com">
                                <FacebookIcon className="icons" fontSize='large'/>
                            </a>
                            <a href="https://www.twitter.com">
                                <TwitterIcon className="icons" fontSize='large'/>
                            </a>
                            <a href="https://www.instagram.com">
                                <InstagramIcon className="icons" fontSize='large'/>
                            </a>
                        </div>
                    </Col>

                    <Col lg={4} className="mb-4 mb-md-0 text-lg-right">
                        <h6 className="contact-footer">Need Assistance? Contact Us:</h6>
                        <p>Email: Calmspace@help.org</p>
                        <p>Phone: 1-800-123-4567</p>
                    </Col>
                </Row>
            </Container>
            <div className="copyright text-center p-3">
                © 2023 Calm Space:
            </div>
        </footer>
    );
};

export default Footer;