import React from 'react';
import GenericPostCard from '../GenericPostCard';
import Masonry from "react-masonry-css";
import styled from "styled-components";
import GenericSpinner from "../GenericSpinner";
import './index.css';

// Styling

const Center = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

// Component

// This component can be reused every time we need to render a list of posts.
// The actual list of posts is provided by the parent
// You just import this GenericPostList and pass the list of posts as a prop called "posts"

const GenericPostList = ({posts, injected = []}) => {
    const breakpointColumnsObj = {
        default: 2,
        1200: 1,
        // 1150: 1
    };

    return (
        <Center>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {posts
                    ? [...injected, ...posts.map((post, i) => <GenericPostCard post={post} key={'post' + post.id}/>)]
                    : <GenericSpinner/>
                }
            </Masonry>
        </Center>

    )
}
export default GenericPostList;


// TODO add proptypes to type check the "shape" of the posts array is correct
// TODO maybe move Masonry stuff in a wrapper component in case you need to display posts without it
