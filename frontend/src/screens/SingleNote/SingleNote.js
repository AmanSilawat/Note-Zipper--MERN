import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { delete_note_action, update_note_action } from "../../actions/notesActions";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";

function SingleNote({ match, history }) {
    const [title, set_title] = useState();
    const [content, set_content] = useState();
    const [category, set_category] = useState();
    const [date, set_date] = useState("");

    const dispatch = useDispatch();

    const note_update = useSelector((state) => state.note_update);
    const { loading, error } = note_update;

    const note_delete = useSelector((state) => state.note_delete);
    const { loading: loading_delete, error: error_delete } = note_delete;

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(delete_note_action(id));
        }
        history.push("/mynotes");
    };

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(`/api/notes/${match.params.id}`);

            set_title(data.title);
            set_content(data.content);
            set_category(data.category);
            set_date(data.updatedAt);
        };

        fetching();
    }, [match.params.id, date]);

    const reset_handler = () => {
        set_title("");
        set_category("");
        set_content("");
    };

    const update_handler = (e) => {
        e.preventDefault();
        dispatch(update_note_action(match.params.id, title, content, category));
        if (!title || !content || !category) return;

        reset_handler();
        history.push("/mynotes");
    };

    return (
        <MainScreen title="Edit Note">
            <Card>
                <Card.Header>Edit your Note</Card.Header>
                <Card.Body>
                    <Form onSubmit={update_handler}>
                        {loading_delete && <Loading />}
                        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                        {error_delete && (
                            <ErrorMessage variant="danger">{error_delete}</ErrorMessage>
                        )}
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="title"
                                placeholder="Enter the title"
                                value={title}
                                onChange={(e) => set_title(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Enter the content"
                                rows={4}
                                value={content}
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
                                placeholder="Enter the Category"
                                value={category}
                                onChange={(e) => set_category(e.target.value)}
                            />
                        </Form.Group>
                        {loading && <Loading size={50} />}
                        <Button variant="primary" type="submit">
                            Update Note
                        </Button>
                        <Button
                            className="mx-2"
                            variant="danger"
                            onClick={() => deleteHandler(match.params.id)}
                        >
                            Delete Note
                        </Button>
                    </Form>
                </Card.Body>

                <Card.Footer className="text-muted">
                    Updated on - {date.substring(0, 10)}
                </Card.Footer>
            </Card>
        </MainScreen>
    );
}

export default SingleNote;