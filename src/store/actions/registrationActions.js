import Axios from '../../axios';
import {SIGNUP, SIGNUP_ERROR, VERIFICATION_ERROR} from "../actionTypes";
import {setError} from "./errorActions";

export const signUpSuccess = email => {
    return {
        type: SIGNUP,
        payload: email
    }
};

export const signUpError = error => {
    return {
        type: SIGNUP_ERROR,
        payload: error
    };
};

export const verificationError = errors => {
    return {
        type: VERIFICATION_ERROR,
        payload: errors
    }
}

export const signUpAction = email => async (dispatch) => {
    try {
        const response = await Axios.post('auth/registration/', {email: email});
        await dispatch(signUpSuccess(email));
        console.log('Response inside signUpAction', response);
        return response
    } catch (e) {
        await dispatch(signUpError(e.response.data.email[0]));
        return e.response
    };
};

export const registrationVerificationAction = data => async (dispatch) => {
    try {
        const response = await Axios.patch('auth/registration/validation', {...data});
        return response
    } catch (e) {
        //Network Error
        if (!e.response) {
            await dispatch(setError(e.message));
            return e;
        };
        let errors = {}
        // Cleaning up error messages from the backend, getting rid of nested arrays
        for (let i of Object.keys(e.response.data)) {
            errors[i] = e.response.data[i].join(' ');
        };
        await dispatch(verificationError(errors));
        return e.response;
    };
};