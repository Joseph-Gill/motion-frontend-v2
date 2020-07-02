import React, { useEffect, useState } from 'react';
import UserDetailCard from "./UserDetailCard";
import UserDetailFeed from "./UserDetailFeed";
import { connect } from 'react-redux';
import BackgroundBanner from './BackgroundBanner';
import styled from 'styled-components'
import Axios from '../../axios';

// Styling

const Wrapper = styled.div`
    position: relative;
`;

const ContentContainer = styled.div`
    position: relative;
    top: 100px;
`;

// Component

const UserDetail = ({ userFromStore, currentUserId }) => {
    const [user, setUser] = useState(userFromStore);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await Axios.get(`/users/${currentUserId}/`);
                setUser(response.data);
            } catch (e) {
                console.error(e);
            }
        };

        // fetching user if it wasn't found in redux
        if (!userFromStore) {
            fetchCurrentUser();
        }

    }, [currentUserId, userFromStore])

    return (
        <Wrapper>
            {user && <ContentContainer>
                <BackgroundBanner user={user} />
                <UserDetailCard user={user} />
                <UserDetailFeed user={user} />

            </ContentContainer>
            }
        </Wrapper>
    )
};

const mapStateToProps = (state, ownProps) => {
    // checking if user is already in our local redux store, then we don't have to refetch it
    // TODO it should refetch user anyway and update the store. his metadata might have changed since last fetch
    const currentUserId = ownProps.match.params.userId;
    const index = state.usersReducer.users.findIndex(user => Number(currentUserId) === user.id);
    const userFromStore = state.usersReducer.users[index];
    return {
        userFromStore,
        currentUserId
    };
};

export default connect(mapStateToProps)(UserDetail);

// TODO think about elegant way to reuse component logic instead of duplicating it for random user profiles (only show their posts as feed, no clickable tabs)