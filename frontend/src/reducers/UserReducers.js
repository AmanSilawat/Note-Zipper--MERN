import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "./../constants/userConstants"

export const user_login_reducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,

            }

        case USER_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user_info: action.payload
            }

        case USER_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const user_register_reducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true,

            }

        case USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                user_info: action.payload
            }

        case USER_REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export const user_update_reducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return {
                loading: true,

            }

        case USER_UPDATE_SUCCESS:
            return {
                loading: false,
                success: true,
                user_info: action.payload
            }

        case USER_UPDATE_FAIL:
            return {
                loading: false,
                success: false,
                error: action.payload
            }

        default:
            return state
    }
}