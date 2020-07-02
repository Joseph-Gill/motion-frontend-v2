// import React from 'react';
// import Post from "../Post";
// import styled from 'styled-components';
// import { connect } from "react-redux";
// import GenericPostList from '../../GenericPostList';
//
//
// const Feed = styled.div`
//     height: 1000px;
//     width: 1000px;
//     border: solid purple;
// `;
//
// const PostsList = ({ posts }) => {
//     return <>
//         <PostsListContainer>
//             {posts ? <GenericPostList posts={posts} /> : "Loading ..."}
//         </PostsListContainer>
//     </>
// };
//
// const mapStateToProps = state => {
//     const activeFilterId = state.feedReducer.filter.activeFilterId;
//     return ({
//         posts: state.feedReducer[activeFilterId]
//     })
// };
//
// export default connect(mapStateToProps)(PostsList);
