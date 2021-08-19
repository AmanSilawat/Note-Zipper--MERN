import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Accordion, Badge, Button, Card } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import MainScreen from './../../components/MainScreen';
import './MyNotes.css';
import { useDispatch, useSelector } from 'react-redux';
import { delete_note_action, list_notes } from '../../actions/notesActions';
import Loading from './../../components/Loading'
import ErrorMessage from './../../components/ErrorMessage';

const MyNotes = ({ search }) => {
    const dispatch = useDispatch();
    const note_list = useSelector(state => state.note_list);
    const user_login = useSelector(state => state.user_login);
    const history = useHistory()

    const { loading, notes, error } = note_list;
    const { user_info } = user_login;

    console.log('notes', notes)

    if (notes) {
        notes
            .filter((filtered_note) => {
                console.log(filtered_note.title, search)

            })

    }


    const note_create = useSelector((state) => state.note_create);
    const { success: success_create } = note_create;

    const note_update = useSelector((state) => state.note_update);
    const { success: success_update } = note_update;

    const note_delete = useSelector((state) => state.note_delete);
    const {
        loading: loading_delete,
        error: error_delete,
        success: success_delete,
    } = note_delete;

    const handler_delete = (id) => {
        console.log('delete operation');
        if (window.confirm("Are you sure?")) {
            dispatch(delete_note_action(id));
        }
    }

    useEffect(() => {
        dispatch(list_notes());

        if (!user_info) {
            history.push('/');
        }
    }, [dispatch, success_create, history, user_info, success_update, success_delete])

    return (
        <MainScreen title={`Welcome back ${user_info.name}`}>
            <Link to='createnote'>
                <Button className="createnote_btn">Create New Note</Button>
            </Link>

            {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
            {loading && <Loading />}

            {error_delete && (
                <ErrorMessage variant="danger">{error_delete}</ErrorMessage>
            )}
            {loading_delete && <Loading />}
            {
                notes &&
                notes
                    .filter((filteredNote) =>
                        filteredNote.title.toLowerCase().includes(search.toLowerCase())
                    )
                    .reverse()
                    .map((note) => (
                        <Accordion key={note._id}>
                            <Card>
                                <Card.Header className='card_header'>
                                    <span className='card_title'>
                                        <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
                                            {note.title}
                                        </Accordion.Toggle>
                                    </span>
                                    <div>
                                        <Button href={`/note/${note._id}`}>Edit</Button>
                                        <Button variant="danger" className="mx-2" onClick={() => handler_delete(note._id)}>Delete</Button>
                                    </div>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <h4>
                                            <Badge variant="success">
                                                Category - {note.category}
                                            </Badge>
                                        </h4>
                                        <blockquote className="blockquote mb-0">
                                            <p>
                                                {note.content}
                                            </p>
                                            <footer className="blockquote-footer">
                                                Created on{' '}
                                                <cite title="Source Title">
                                                    {note.createdAt.substring(1, 10)}
                                                </cite>
                                            </footer>
                                        </blockquote>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    ))
            }
        </MainScreen>
    )
}

export default MyNotes
