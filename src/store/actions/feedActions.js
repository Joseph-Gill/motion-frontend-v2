import Axios from '../../axios';
import {ADD_POST_TO_LIST, DELETE_POST, FEED_ERROR, STORE_POSTS, SET_ACTIVE_FILTER, LIKE_POST} from "../actionTypes";

export const likePost = (postId, postData) => {
    return {
        type: LIKE_POST,
        payload: { postId, postData }
    };
};

export const storePosts = (namespaceOverride, data) => {
    return {
        type: STORE_POSTS,
        payload: { namespaceOverride, data }
    };
};

// Changes which posts will be fetched when you dispatch "getPostsAction()", filterId = id of the filter to activate
export const setActiveFilter = filterId => {
    return {
        type: SET_ACTIVE_FILTER,
        payload: { filterId }
    };
};

export const feedError = error => {
    return {
        type: FEED_ERROR,
        payload: error
    };
};

export const addPostToList = postData => {
    return {
        type: ADD_POST_TO_LIST,
        payload: { postData }
    };
};

export const removePostFromList = postId => {
    return {
        type: DELETE_POST,
        payload: { postId }
    };
};

export const getPostsAction = (filterIdOverride = null) => async (dispatch, getState) => {
    try {
        const state = getState();
        const filter = state.feedReducer.filter.filters[filterIdOverride] || state.feedReducer.filter.getActiveFilter();
        const response = await Axios.get(filter.path);
        let namespaceOverride = filterIdOverride ? (filter.namespace || filter.id) : null;
        if (filter.id === state.feedReducer.filter.getActiveFilter().id && !filterIdOverride) {
            namespaceOverride = filter.namespace || filter.id
        }
        dispatch(storePosts(namespaceOverride, response.data));
    } catch (e) {
        dispatch(feedError(e.response))
    }
};

export const createPostAction = data => async (dispatch, getState) => {
    try {
        const response = await Axios.post('/social/posts/', data);
        dispatch(addPostToList(response.data))
        return response
    } catch (e) {
        dispatch(feedError(`Content: ${e.response.data.content.join(' ')}`))
        return e.response
    }
};

export const likePostAction = postId => async (dispatch, getState) => {
    try {
        const response = await Axios.post(`/social/posts/toggle-like/${postId}/`);
        if (response.status === 200) {
            dispatch(likePost(postId, response.data));
            return response
        }
    } catch (e) {
        console.log('catch in likePostAction', e);
    }
};

export const deletePostAction = postId => async (dispatch, getState) => {
    try {
        const response = await Axios.delete(`/social/posts/${postId}/`);
        dispatch(removePostFromList(postId));
        return response
    } catch (e) {
        console.log('catch in deletePostAction', e);
    }
};

