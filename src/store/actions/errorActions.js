import {GENERAL_ERROR, GENERAL_ERROR_CLEAR} from "../actionTypes";

export const setError = errorMessage => {
    return {
        type:GENERAL_ERROR,
        payload: errorMessage
    };
};

export const clearError = () => {
    return {
        type: GENERAL_ERROR_CLEAR,
        payload: null
    };
};