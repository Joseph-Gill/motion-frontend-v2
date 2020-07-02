import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPostsAction } from '../../../store/actions/feedActions';
import GenericPostList from '../../GenericPostList';
import GenericSpinner from '../../GenericSpinner';


const MyLikedPosts = ({ likedPosts, getPostsAction }) => {
    useEffect(() => { getPostsAction('likedPosts') }, [getPostsAction]);

    const displayMessage = () => likedPosts.length ? <GenericSpinner /> : <p>You have no posts</p>;

    return <>
        {likedPosts
            ? <GenericPostList posts={likedPosts} />
            : displayMessage()
        }
    </>
};


const mapStateToProps = state => {
    return ({
        likedPosts: state.feedReducer.likedPosts
    })
};
export default connect(mapStateToProps, { getPostsAction })(MyLikedPosts);
