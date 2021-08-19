import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { user_login_reducer, user_register_reducer, user_update_reducer } from './reducers/UserReducers';
import { notes_list_reducer, note_create_reducer, note_delete_reducer, note_update_reducer } from './reducers/notesReducers';

const reducer = combineReducers({
    user_login: user_login_reducer,
    user_register: user_register_reducer,
    note_list: notes_list_reducer,
    note_create: note_create_reducer,
    note_update: note_update_reducer,
    note_delete: note_delete_reducer,
    user_update: user_update_reducer
})

const user_info_from_storage = localStorage.getItem('user_info')
    ? JSON.parse(localStorage.getItem("user_info"))
    : null

console.log('user_info_from_storage', user_info_from_storage)

const initialState = {
    user_login: {
        user_info: user_info_from_storage
    }
};

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store