import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPostsAction } from '../../../store/actions/feedActions';
import GenericPostList from '../../GenericPostList';
import GenericSpinner from '../../GenericSpinner';


const MyPosts = ({ myPosts, getPostsAction }) => {
    useEffect(() => { getPostsAction('myPosts') }, [getPostsAction]);

    const displayMessage = () => myPosts.length ? <GenericSpinner /> : <p>You have no posts</p>;

    return <>
        {myPosts
            ? <GenericPostList posts={myPosts} />
            : displayMessage()}
    </>
};


const mapStateToProps = state => ({
    myPosts: state.feedReducer.myPosts
});

export default connect(mapStateToProps, { getPostsAction })(MyPosts);
