import React, { useEffect } from 'react';
import './LandingPage.css';

import { Button, Container, Row } from 'react-bootstrap';

const LandingPage = ({ history }) => {
    useEffect(() => {
        const user_info = localStorage.getItem('user_info');
    
        if (user_info) {
            history.push('/mynotes')
        }

    }, [history])
    return (
        <div className="main" >
            <Container>
                <Row>
                    <div className="intro_text">
                        <div>
                            <h1 className="title">Welcome to Note Zipper</h1>
                            <p className="subtitle">One safe place for all your notes</p>
                        </div>
                        <div className="button_container">
                            <a href="/login">
                                <Button className="landing_button">Login</Button>
                            </a>
                            <a href="/register">
                                <Button className="landing_button" variant="outline-primary" >Register</Button>
                            </a>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default LandingPage
