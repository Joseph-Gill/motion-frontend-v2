import {SET_MODAL} from "../../actionTypes";


const initialState = {
    // "ModalPostDetail" is a namespace that holds all data the actual <ModalPostDetail /> component needs
    ModalPostDetail: {
        isVisible: false,
        // example data that will be displayed in <ModalPostDetail /> by default
        data: {
            id: 8,
            user: {
                id: 9,
                email: 'linus@email.com',
                first_name: 'Linus',
                last_name: 'Johnson',
                username: 'linus',
                avatar: 'http://motion.propulsion-home.ch/media-files/avataaars4.png',
                banner: null,
                location: 'Bern',
                about_me: 'Passionate about flowers',
                things_user_likes: [
                ],
                logged_in_user_is_following: true,
                logged_in_user_is_friends: false,
                logged_in_user_is_rejected: false,
                logged_in_user_received_fr: false,
                logged_in_user_sent_fr: false,
                amount_of_posts: 2,
                amount_of_likes: 0,
                amount_of_friends: 6,
                amount_of_followers: 2,
                amount_following: 3
            },
            images: [
                {
                    image: 'http://motion.propulsion-home.ch/media-files/main-qimg-6c8a8390e6d1ce14f103206262e20177.jpg',
                    post: 8
                },
                {
                    image: 'http://motion.propulsion-home.ch/media-files/main-qimg-11edc5e0bab88a733d1cc002b6929b6f.jpg',
                    post: 8
                }
            ],
            logged_in_user_liked: true,
            is_from_logged_in_user: false,
            amount_of_likes: 1,
            shared: null,
            content: 'Hong Kong Phooey, number one super guy. Hong Kong Phooey, quicker than the human eye. He’s got style, a groovy style, and a car that just won’t stop. When the going gets tough, he’s really rough, with a Hong Kong Phooey chop (Hi-Ya!). Hong Kong Phooey, number one super guy. Hong Kong Phooey, quicker than the human eye. Hong Kong Phooey, he’s fan-riffic!',
            created: '2019-11-21T17:02:42.896633+01:00'
        }
    },
    // "ModalNewPost" is another namespace
    ModalNewPost: {
        isVisible: true,
        data: {
        }
    }
    // by dispatching SET_MODAL with a new "namespace", it will be added here automatically
};


export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MODAL: {
            const { namespace, data, isVisible } = action.payload;
            const newData = data || { ...state[namespace].data }; // copy old data if no new data was provided

            // handling edge case where namespace wasn't existing and no visibility was defined earlier
            const oldIsVisible = state[namespace] ? state[namespace].isVisible : false;

            // prevents an undefined "isVisible" from overwriting the visibility to "false" instead of not changing it
            const newIsVisible = (isVisible === null || isVisible === undefined) ? oldIsVisible : isVisible;

            return { ...state, [namespace]: { isVisible: newIsVisible, data: newData } }
        }
        default:
            return state
    }
};
