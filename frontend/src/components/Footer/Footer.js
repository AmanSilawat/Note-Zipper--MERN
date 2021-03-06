import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Footer.css'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; Note Zipper
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
