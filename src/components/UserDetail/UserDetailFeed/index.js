import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Axios from '../../../axios';
import GenericPostList from '../../GenericPostList';

// Styling

const Wrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    margin-top: 2rem;
`;

// Component

const UserDetailFeed = ({ user }) => {
    const [userPosts, setUserPosts] = useState([]); // lazy way without caching (will not update like count, since posts not updated)

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await Axios.get(`social/posts/user/${user.id}/`);
                setUserPosts(response.data);
            } catch (e) {
                console.error(e);
            }
        };

        // fetching posts of current user and storing them in local state (no redux for now, which means it's refetching them each time)
        if (user) {
            fetchUserPosts();
        }
    }, [user])

    return <Wrapper>{userPosts && <GenericPostList posts={userPosts} />}</Wrapper>
};

export default UserDetailFeed;