import Axios from '../../axios'
import {LOGIN, LOGIN_ERROR, LOGOUT} from '../actionTypes';

export const login = (token, user) => {
    return {
        type: LOGIN,
        payload: {
            token,
            user
        }
    }
};

export const loginError = (error) => {
    return {
        type: LOGIN_ERROR,
        payload: error
    }
};

export const logout = () => {
    return {
        type: LOGOUT
    }
}

export const loginAction = ({email, password}) => async (dispatch) => {
    try {
        // debugger
        const response = await Axios.post('auth/token/',{email, password});
        console.log('response in LoginAction', response)
        console.log("LOGIN ACTION RESPONSE", response);
        const token = response.data.access;
        const user = response.data.user;
        if (token) {
            dispatch(login(token, user)); // send the token & user to the reducer
            localStorage.setItem('token', token); // set token to localStorage of the browser
        }
        return response
    } catch (e) {
        console.log(e);
        dispatch(loginError('The credentials are not valid'));
        return e
    }
};