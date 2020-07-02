import {SET_MODAL} from "../actionTypes";

export const setModal = (namespace, data, isVisible = null) => {
    return {
        type: SET_MODAL,
        payload: { namespace, data, isVisible }
    };
};