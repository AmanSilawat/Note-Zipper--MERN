import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import MainScreen from "../../components/MainScreen";
import "./RegisterScreen.css";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";

function RegisterScreen({ history}) {
    const [email, set_email] = useState("");
    const [name, set_name] = useState("");
    const [pic, set_pic] = useState(
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    );
    const [password, set_password] = useState("");
    const [confirm_password, set_confirm_password] = useState("");
    const [message, set_message] = useState(null);
    const [picMessage, set_pic_message] = useState(null);

    const post_details = (pic) => {
        if (
            pic ===
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        ) {
            return set_pic_message("Please Select an Image");
        }

        set_pic_message(null);
        if (pic.type === "image/jpeg" || pic.type === "image/png") {
            const data = new FormData();
            data.append("file", pic);
            data.append("upload_preset", "notezipper");
            data.append("cloud_name", "dvldkptxh");
            fetch("https://api.cloudinary.com/v1_1/dvldkptxh/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    set_pic(data.url.toString());
                    console.log(data);
                    console.log(data.url.toString());
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            return set_pic_message("Please Select an Image");
        }
    };

    const dispatch = useDispatch();

    const user_register = useSelector(state => state.user_register);
    const { loading, error, user_info } = user_register;


    useEffect(() => {
        if (user_info) {
            history.push('/mynotes')
        }
    }, [history, user_info])

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirm_password) {
            set_message('Password do not match');
        } else {
            dispatch(register(name, email, password, pic))
        }
        
    };

    return (
        <MainScreen title="REGISTER">
            <div className="loginContainer">
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                {loading && <Loading />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            value={name}
                            placeholder="Enter name"
                            onChange={(e) => set_name(e.target.value)}
                        />
                    </Form.Group>

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

                    <Form.Group controlId="confirm_Password">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirm_password}
                            placeholder="Confirm Password"
                            onChange={(e) => set_confirm_password(e.target.value)}
                        />
                    </Form.Group>

                    {picMessage && (
                        <ErrorMessage variant="danger">{picMessage}</ErrorMessage>
                    )}
                    <Form.Group controlId="pic">
                        <Form.Label>Profile Picture</Form.Label>
                        <Form.File
                            onChange={(e) => post_details(e.target.files[0])}
                            id="custom-file"
                            type="image/png"
                            label="Upload Profile Picture"
                            custom
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Register
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        Have an Account ? <Link to="/login">Login</Link>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    );
}

export default RegisterScreen;