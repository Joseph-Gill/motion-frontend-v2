import {STORE_MY_PROFILE_DATA, SET_MY_PROFILE_ACTIVE_TAB, MY_PROFILE_ERROR} from "../../actionTypes";

const initialState = {
    meData: {
        id: -1,
        email: '',
        first_name: '',
        last_name: '',
        username: '',
        avatar: '',
        banner: '',
        location: '',
        about_me: '',
        things_user_likes: [],
        amount_of_posts: -1,
        amount_of_likes: -1,
        amount_of_friends: -1,
        amount_of_followers: -1,
        amount_following: -1,
    },
    myPosts: [],
    myFriends: [],
    myFollowers: [],
    myFollowing: [],
    activeTab: 'Posts',
    error: null
};

export const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_MY_PROFILE_DATA: {
            return {
                ...state,
                meData: {...action.payload},
                error: null
            }
        }
        case SET_MY_PROFILE_ACTIVE_TAB: {
            return {
                ...state,
                activeTab: action.payload
            }
        }
        case MY_PROFILE_ERROR: {
            return {
                ...state,
                error: action.payload,
            }
        }
        default:
            return state
    };
};
