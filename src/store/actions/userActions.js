import Axios from '../../axios';
import {STORE_USERS, STORE_MY_PROFILE_DATA, SET_MY_PROFILE_ACTIVE_TAB, MY_PROFILE_ERROR} from "../actionTypes";

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

export const storeUsers = (namespace, data) => {
    return {
        type: STORE_USERS,
        payload: { namespace, data }
    }
};

export const setMyProfileActiveTab = tabIdentifier => {
    return {
        type: SET_MY_PROFILE_ACTIVE_TAB,
        payload: tabIdentifier
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

export const toggleFollowAction = userId => async (dispatch, useState) => {
    try {
        const state = useState();
        const response = await Axios.post(`/social/followers/toggle-follow/${userId}/`);

        // update the local redux state
        const users = state.usersReducer.users;
        const newUsers = users.map(user => user.id === userId ? response.data : user);

        // find which namespace is currently active
        const activeFilterId = state.usersReducer.filter.activeFilterId;
        const namespace = state.usersReducer.filter.filters[activeFilterId].namespace || activeFilterId;

        dispatch(storeUsers(namespace, newUsers));
        return response;
    } catch (e) {
        console.error(e.response);
        return e;
    };
};


export const friendRequestAction = receiver => async (dispatch, useState) => {
    try {
        const state = useState();
        const response = await Axios.post(`/social/friends/request/${receiver.id}/`);

        const activeFilterId = state.usersReducer.filter.activeFilterId;
        const activeFilter = state.usersReducer.filter.filters[activeFilterId];

        const users = state.usersReducer[activeFilter.namespace || activeFilter.id];
        const updatedUser = { ...receiver, logged_in_user_sent_fr: true }
        const newUsers = users.map(user => user.id === receiver.id ? updatedUser : user);

        const namespace = activeFilter.namespace || activeFilter.id;
        dispatch(storeUsers(namespace, newUsers));
        return response;
    } catch (e) {
        console.error(e.response);
        return e;
    };
};

/**
 * Fetch users from the backend. The API Endpoint that will be used is determined by the activeFilter.
 *  Use the action creator "setActiveFilter" to change the active filter.
 * @param {string} filterIdOverwrite Overwrite the activeFilter. By default usersReducer.filter.activeFilterId will be used
 */
export const getUsersAction = (filterIdOverwrite = null) => async (dispatch, useState) => {
    const state = useState();

    try {
        // get the url path based on the active filter
        const activeFilterId = filterIdOverwrite || state.feedReducer.filter.activeFilterId;
        const activeFilter = state.usersReducer.filter.filters[activeFilterId];

        // make request to the backend using the path that you get from the activeFilter (see FILTER_ENTRIES in usersReducer)
        const response = await Axios.get(activeFilter.path);

        // store fetched users under the correct "namespace" in the usersReducer
        const namespace = activeFilter.namespace || activeFilter.id; // (see FILTER_ENTRIES in usersReducer to understand why we do this)
        dispatch(storeUsers(namespace, response.data));
    } catch (e) {
        // dispatch(feedError(e.response));
        console.error(e.response);
    };
};

export const userUpdateAction = data => async (dispatch, useState) => {
    try {
        const response = await Axios.patch(`/users/me/`, data);
        dispatch(storeMyProfileData(response.data));
        return response;
    } catch (e) {
        return e;
    }
};


// TODO fix like rest
// ACCEPT FRIEND REQUEST WANTS THE FR-REQUEST ID, NOT THE USER ID. SHOULD WE CHANGE THE BACKEND? OR HOW DO WE GET THE FR ID?
export const acceptFriendRequestAction = receiver => async (dispatch, useState) => {
    try {
        const response = await Axios.patch(`/social/friends/requests/${receiver.id}/`, { status: 'A' });
        const users = useState().usersReducer.users;
        const updatedUser = { ...receiver, logged_in_user_sent_fr: true }
        const newUsers = users.map(user => user.id === receiver.id ? updatedUser : user);
        dispatch(storeUsers(newUsers));
        return response;
    } catch (e) {
        console.error(e.response);
        return e;
    };
};

export const userUpdateImageAction = (files) => async (dispatch, useState) => {
    const formData = new FormData();
    files.forEach((file, i) => {
        formData.append('avatar', file);
    });
    const url = new URL(`https://motion.propulsion-home.ch/backend/api/users/me/`);
    const headers = {
        Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNTc5MzY5MjU3LCJqdGkiOiIwZjkxZjU3MGVmZmE0NWNlODBjOWFjNTQwZDBiZTJkOSIsInVzZXJfaWQiOjR9.e5C8Z7PxDjkMvNiukQzRnEXTglQL-PdCrMLzGtKzW5M'
    };
    fetch(url, {
        headers,
        method: 'PATCH',
        body: formData
    })
        .then(res => res.json())
        .then(updatedUser => {
            dispatch(storeMyProfileData(updatedUser))
            return updatedUser
        })
        .catch(err => console.log(err));
}

