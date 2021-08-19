import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import "./LoginScreen.css";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/userActions";

const RegisterScreen = ({ history }) => {
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");

    const dispatch = useDispatch();
    const user_login = useSelector((state) => state.user_login)

    const { loading, error, user_info } = user_login;

    useEffect(() => {
        if (user_info) {
            history.push('/mynotes');
        }
    }, [history, user_info])

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    };

    return (
        <MainScreen title="LOGIN">
            <div className="loginContainer">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            placeholder="Enter email"
                            onChange={(e) => set_email(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            placeholder="Password"
                            onChange={(e) => set_password(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        New Customer ? <Link to="/register">Register Here</Link>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    )
}

export default RegisterScreen
