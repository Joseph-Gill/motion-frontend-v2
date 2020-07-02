import {ADD_POST_TO_LIST, DELETE_POST, FEED_ERROR, STORE_POSTS, SET_ACTIVE_FILTER, LIKE_POST} from "../../actionTypes";

// id            the "key" of the individual filter entry. Usually the same as the namespace.
// path          Path to API endpoint you want to fetch posts from
// namespace     Key under which the posts are stored in redux. When undefined, value of "id" should be used (see comments on initialState below)
// displayName   Text of buttons that users click to change the "activeFilter".

const POSTS_FILTER_ENTRIES = {
    allPosts: {
        id: 'allPosts',
        path: '/social/posts/',
        namespace: 'posts', // changed the namespace to store the posts under feedReducer.posts and not feedReducer.allPosts
        displayName: 'All'
    },
    likedPosts: {
        id: 'likedPosts',
        path: '/social/posts/likes/',
        namespace: '', // when left empty, posts will be stored under value of "id" --> feedReducer.likedPosts
        displayName: 'Liked'
    },
    friendsPosts: {
        id: 'friendsPosts',
        path: '/social/posts/friends/',
        namespace: '',
        displayName: 'Friends'
    },
    followingPosts: {
        id: 'followingPosts',
        path: '/social/posts/following/',
        namespace: '',
        displayName: 'Follow'
    },
    followersPosts: {
        id: 'followersPosts',
        path: '/social/posts/followersPosts/',
        namespace: '',
        displayName: 'Follow'
    },
    myPosts: {
        id: 'myPosts',
        path: '/social/posts/me/',
        namespace: '',
        displayName: 'MyPosts'
    }
};

const initialState = {
    posts: [],              // an empty "namespace" (see comment on FILTER_ENTRIES above)
    friendsPosts: [],       // an empty "namespace"
    followingPosts: [],     // an empty "namespace"
    likedPosts: [],         // an empty "namespace"
    myPosts: [],            // an empty "namespace"
    error: null,
    filter: {
        filters: POSTS_FILTER_ENTRIES,
        activeFilterId: 'likedPosts',

        /** returns the active filter entry, based off the activeFilterId */
        getActiveFilter: function () { return this.filters[this.activeFilterId] },

        /** returns the active namespace. defaults to the id of the active filter entry */
        getActiveNamespace: function () { return this.getActiveFilter().namespace || this.getActiveFilter().id },

    },
    /** returns all posts of the active filter */
    getFilteredPosts: function () { return this[this.filter.getActiveNamespace()] },

    /** returns a copy of all the posts of the active filter */
    getFilteredPostsCopy: function () { return [...this.getFilteredPosts()] },
};

export const feedReducer = (state = initialState, action) => {
    switch (action.type) {
        case STORE_POSTS: {
            const namespace = action.payload.namespaceOverride || state.filter.getActiveNamespace();
            return {
                ...state,
                [namespace]: action.payload.data,
                [namespace + 'isEmpty']: !action.payload.data.length, // whether or not fetched data was empty in active namespace
                error: null,
            }
        }
        case LIKE_POST: {
            const postsCopy = state.getFilteredPostsCopy();
            const index = postsCopy.findIndex((post) => post.id === action.payload.postId);
            postsCopy[index] = action.payload.postData;
            // console.log("NAMESPACE", state.filter.GetActiveNamespace())

            return {
                ...state,
                [state.filter.getActiveNamespace()]: postsCopy,
                error: null,
            }
        }
        case SET_ACTIVE_FILTER: {
            return {
                ...state,
                filter: { ...state.filter, activeFilterId: action.payload.filterId },
                error: null,
            }
        }
        case FEED_ERROR: {
            return {
                ...state,
                error: action.payload,
            }
        }
        case ADD_POST_TO_LIST: {
            const posts = state.getFilteredPosts();
            const postToAdd = action.payload.postData;
            return {
                ...state,
                posts: posts.concat(postToAdd), // !hardcoded namespace because created post shouldn't appear in other places
                error: null
            }
        }
        case DELETE_POST: {
            // find the position of the post in the array
            const postsCopy = state.getFilteredPostsCopy();
            const indexToRemove = postsCopy.findIndex(post => post.id === action.payload.postId);

            // do nothing if post wasn't found
            if (indexToRemove === -1) return state;

            // Remember: splice mutates the array and returns the removed post and NOT the remaining posts!
            postsCopy.splice(indexToRemove, 1);

            return {
                ...state,
                [state.filter.getActiveNamespace()]: postsCopy,
                error: null
            }
        }
        default:
            return state
    }
};

// Read this article about normalizing data: https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape/
// for the sake of simplicity, we decided not to normalize fetched data in these solutions
// Feel free to experiment using dictionaries (also called hashmaps or hashtables) instead of arrays to store normalized data in future projects
// you can find additional comments under src/helpers/converters.js and methods that can help converting Arrays to "Dictionaries/Hashmaps"

