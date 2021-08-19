import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { create_note_action } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";

function CreateNote({ history }) {
    const [title, set_title] = useState("");
    const [content, set_content] = useState("");
    const [category, set_category] = useState("");

    const dispatch = useDispatch();

    const note_create = useSelector((state) => state.note_create);
    const { loading, error, note } = note_create;

    console.log(note);

    const resetHandler = () => {
        set_title("");
        set_category("");
        set_content("");
    };

    const submit_handler = (e) => {
        e.preventDefault();
        dispatch(create_note_action(title, content, category));
        if (!title || !content || !category) return;

        resetHandler();
        history.push("/mynotes");
    };

    useEffect(() => { }, []);

    return (
        <MainScreen title="Create a Note">
            <Card>
                <Card.Header>Create a new Note</Card.Header>
                <Card.Body>
                    <Form onSubmit={submit_handler}>
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                placeholder="Enter the title"
                                onChange={(e) => set_title(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={content}
                                placeholder="Enter the content"
                                rows={4}
                                onChange={(e) => set_content(e.target.value)}
                            />
                        </Form.Group>
                        {content && (
                            <Card>
                                <Card.Header>Note Preview</Card.Header>
                                <Card.Body>
                                    <ReactMarkdown>{content}</ReactMarkdown>
                                </Card.Body>
                            </Card>
                        )}

                        <Form.Group controlId="content">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="content"
                                value={category}
                                placeholder="Enter the Category"
                                onChange={(e) => set_category(e.target.value)}
                            />
                        </Form.Group>
                        {loading && <Loading size={50} />}
                        <Button type="submit" variant="primary">
                            Create Note
                        </Button>
                        <Button className="mx-2" onClick={resetHandler} variant="danger">
                            Reset Feilds
                        </Button>
                    </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                    Creating on - {new Date().toLocaleDateString()}
                </Card.Footer>
            </Card>
        </MainScreen>
    );
}

export default CreateNote;