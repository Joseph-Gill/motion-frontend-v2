import { STORE_USERS, USERS_ERROR } from "../../actionTypes";

// id            the "key" of the individual filter entry. Usually the same as the namespace.
// path          Path to API endpoint you want to fetch users from
// namespace     Key under which the users are stored in redux. When undefined, value of "id" should be used (see comments on initialState below)
// displayName   Text of buttons that users click to change the "activeFilter".
const USERS_FILTER_ENTRIES = {
    allUsers: {
        id: 'allUsers',
        path: '/users/',
        namespace: 'users', // changed the namespace to store the users under usersReducer.users and not usersReducer.allUsers
        displayName: 'All'
    },
    followers: {
        id: 'followers',
        path: '/social/followers/followers/',
        namespace: '', // when left empty, users will be stored under value of "id" --> usersReducer.followers
        displayName: 'Followers'
    },
    following: {
        id: 'following',
        path: '/social/followers/following/',
        namespace: '',
        displayName: 'Following'
    },
    friends: {
        id: 'friends',
        path: '/social/friends/',
        namespace: '',
        displayName: 'Friends'
    }
};

const initialState = {
    users: [],           // an empty "namespace" (see comment on FILTER_ENTRIES above)
    followers: [],        // an empty "namespace"
    following: [],       // an empty "namespace"
    friends: [],         // an empty "namespace"
    filter: {
        filters: USERS_FILTER_ENTRIES,
        activeFilterId: 'allUsers' // identifier to select active filter from FILTER_ENTRIES
    },
    error: null
};


export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_USERS: {
            return {
                ...state,
                [action.payload.namespace]: action.payload.data,
                [action.payload.namespace + 'isEmpty']: !action.payload.data.length,

                error: null,
            }
        }
        case USERS_ERROR: {
            return {
                ...state,
                error: action.payload,
            }
        }
        default:
            return state
    };
};
