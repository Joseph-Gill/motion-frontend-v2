import {SIGNUP, SIGNUP_ERROR, VERIFICATION_ERROR} from "../../actionTypes";

const initialState = {
    email: '',
    error: null,
    verificationErrors: {
        'code': null,
        'email': null,
        'username': null,
        'first_name': null,
        'last_name': null,
        'password': null,
        'password_repeat': null,
        'non_field_errors': null,
    }
};

export const signUpReducer = (state = initialState, action) => {
    switch(action.type) {
        case SIGNUP: {
            return {
                ...state,
                email: action.payload,
                error: null
            }
        }
        case SIGNUP_ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        case VERIFICATION_ERROR: {
            return {
                ...state,
                verificationErrors: {...state.verificationErrors, ...action.payload}
            }
        }
        default:
            return state
    }
};