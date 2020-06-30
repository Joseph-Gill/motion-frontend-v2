import Axios from '../../axios';
import {STORE_USERS, STORE_MY_PROFILE_DATA, SET_MY_PROFILE_ACTIVE_TAB, MY_PROFILE_ERROR} from "../actionTypes";
import {useState} from "react";

export const storeMyProfileData = data => {
    return {
        type:STORE_MY_PROFILE_DATA,
        payload: data
    };
};

export const setMyProfileError = error => {
    return {
        type:MY_PROFILE_ERROR,
        payload: error
    };
};

export const getMyProfileAction = () => async (dispatch, useState) => {
    try {
        const response = await Axios.get('/users/me/');
        dispatch(storeMyProfileData(response.data));
    } catch (e) {
        console.error(e.response);
        dispatch(setMyProfileError(e.response));
    }
};
