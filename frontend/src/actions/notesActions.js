import {
    NOTES_CREATE_FAIL,
    NOTES_CREATE_REQUEST,
    NOTES_CREATE_SUCCESS,
    NOTES_DELETE_FAIL,
    NOTES_DELETE_REQUEST,
    NOTES_DELETE_SUCCESS,
    NOTES_LIST_FAIL,
    NOTES_LIST_REQUEST,
    NOTES_LIST_SUCCESS,
    NOTES_UPDATE_FAIL,
    NOTES_UPDATE_REQUEST,
    NOTES_UPDATE_SUCCESS,
} from "../constants/notesConstants";
import axios from "axios";

export const list_notes = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: NOTES_LIST_REQUEST,
        });

        const {
            user_login: { user_info },
        } = getState();


        console.log('user_login', user_info)

        const config = {
            headers: {
                Authorization: `Bearer ${user_info.token}`,
            },
        };

        const { data } = await axios.get(`/api/notes`, config);

        dispatch({
            type: NOTES_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: NOTES_LIST_FAIL,
            payload: message,
        });
    }
};

export const create_note_action = (title, content, category) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: NOTES_CREATE_REQUEST,
        });

        const {
            user_login: { user_info },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user_info.token}`,
            },
        };

        const { data } = await axios.post(
            `/api/notes/create`,
            { title, content, category },
            config
        );

        dispatch({
            type: NOTES_CREATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: NOTES_CREATE_FAIL,
            payload: message,
        });
    }
};

export const delete_note_action = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: NOTES_DELETE_REQUEST,
        });

        const {
            user_login: { user_info },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${user_info.token}`,
            },
        };

        const { data } = await axios.delete(`/api/notes/${id}`, config);

        dispatch({
            type: NOTES_DELETE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: NOTES_DELETE_FAIL,
            payload: message,
        });
    }
};

export const update_note_action = (id, title, content, category) => async (
    dispatch,
    getState
) => {
    try {
        dispatch({
            type: NOTES_UPDATE_REQUEST,
        });

        const {
            user_login: { user_info },
        } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user_info.token}`,
            },
        };

        const { data } = await axios.put(
            `/api/notes/${id}`,
            { title, content, category },
            config
        );

        dispatch({
            type: NOTES_UPDATE_SUCCESS,
            payload: data,
        });
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: NOTES_UPDATE_FAIL,
            payload: message,
        });
    }
};