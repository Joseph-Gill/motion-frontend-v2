import {GENERAL_ERROR, GENERAL_ERROR_CLEAR} from "../../actionTypes";

const initialState = {error: null};

export const errorReducer = (state = initialState, action) => {
    switch (action.type) {
        case GENERAL_ERROR: {
            return {
                ...state,
                error: action.payload
            }
        }
        case GENERAL_ERROR_CLEAR: {
            return {
                ...state,
                error: null
            }
        }
        default:
            return state
    }
};