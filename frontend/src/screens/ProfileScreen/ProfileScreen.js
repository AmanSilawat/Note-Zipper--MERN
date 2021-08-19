import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import MainScreen from "../../components/MainScreen";
import "./ProfileScreen.css";
import { useDispatch, useSelector } from "react-redux";
import { update_profile } from "../../actions/userActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";

const ProfileScreen = ({ location, history }) => {
    const [name, set_name] = useState("");
    const [email, set_email] = useState("");
    const [pic, set_pic] = useState();
    const [password, set_password] = useState("");
    const [confirm_password, set_confirm_password] = useState("");
    const [pic_message, set_pic_message] = useState();

    const dispatch = useDispatch();

    const user_login = useSelector((state) => state.user_login);
    const { user_info } = user_login;

    const user_update = useSelector((state) => state.user_update);
    const { loading, error, success } = user_update;

    useEffect(() => {
        if (!user_info) {
            history.push("/");
        } else {
            set_name(user_info.name);
            set_email(user_info.email);
            set_pic(user_info.pic);
        }
    }, [history, user_info]);

    const post_details = (pics) => {
        set_pic_message(null);
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "notezipper");
            data.append("cloud_name", "dvldkptxh");
            fetch("https://api.cloudinary.com/v1_1/dvldkptxh/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    set_pic(data.url.toString());
                    console.log(pic);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            return set_pic_message("Please Select an Image");
        }
    };

    const submit_handler = (e) => {
        e.preventDefault();

        if (password === confirm_password) {
            dispatch(update_profile({ name, email, password, pic }));
        }
    };

    return (
        <MainScreen title="EDIT PROFILE">
            <div>
                <Row className="profile_container">
                    <Col md={6}>
                        <Form onSubmit={submit_handler}>
                            {loading && <Loading />}
                            {success && (
                                <ErrorMessage variant="success">
                                    Updated Successfully
                                </ErrorMessage>
                            )}
                            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    value={name}
                                    onChange={(e) => set_name(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => set_email(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => set_password(e.target.value)}
                                ></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="confirm_password">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirm_password}
                                    onChange={(e) => set_confirm_password(e.target.value)}
                                ></Form.Control>
                            </Form.Group>{" "}
                            {pic_message && (
                                <ErrorMessage variant="danger">{pic_message}</ErrorMessage>
                            )}
                            <Form.Group controlId="pic">
                                <Form.Label>Change Profile Picture</Form.Label>
                                <Form.File
                                    onChange={(e) => post_details(e.target.files[0])}
                                    id="custom-file"
                                    type="image/png"
                                    label="Upload Profile Picture"
                                    custom
                                />
                            </Form.Group>
                            <Button type="submit" varient="primary">
                                Update
                            </Button>
                        </Form>
                    </Col>
                    <Col
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <img src={pic} alt={name} className="profile_pic" />
                    </Col>
                </Row>
            </div>
        </MainScreen>
    );
};

export default ProfileScreen;