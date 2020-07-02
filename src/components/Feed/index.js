import React, {useEffect} from 'react';
import styled from "styled-components";
import {connect} from 'react-redux';
import FilterPosts from "./FilterPosts";
import NewPost from "./NewPosts";
import GenericPostList from "../GenericPostList";
import GenericSpinner from "../GenericSpinner";
import {getPostsAction} from "../../store/actions/feedActions";

// Styling

const FeedContainer = styled.div`
  background-color: #F7F7F8;
`;

const Center = styled.div`
    text-align: center;
    display: flex;
    justify-content: center;
`;

// Component

const Feed = ({activeFilterId, posts, getPostsAction, isEmpty}) => {
    // using a custom hook to re-fetch posts every couple of seconds in case other users have created new ones
    // it's working but commented out for development
    // let [delay, setDelay] = useState(15000); // can be used to throttle amount of refetches
    // useInterval(() => {
    //     getPostsAction();
    // }, delay);


    // fetch relevant posts every time the active filter changes
    useEffect(() => {
        getPostsAction();
    }, [activeFilterId, getPostsAction]);

    // display spinner if loading and only <NewPost /> input if no posts were loaded
    const displayMessage = () => isEmpty ? <Center><NewPost/></Center> : <GenericSpinner/>

    return <>
        <FeedContainer>
            <FilterPosts/>
            {posts && posts.length ?
                <GenericPostList posts={posts} injected={[<NewPost key={'new-post'}/>]}/> : displayMessage()}
        </FeedContainer>
    </>
};


const mapStateToProps = (state) => {
    const feedReducer = state.feedReducer;
    const isEmpty = feedReducer[feedReducer.filter.getActiveNamespace() + 'sEmpty'];
    return {
        activeFilterId: feedReducer.filter.activeFilterId,
        posts: feedReducer.getFilteredPosts(),
        isEmpty: isEmpty
    };
};

export default connect(mapStateToProps, { getPostsAction })(Feed);