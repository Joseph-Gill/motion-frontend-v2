import React from 'react';
import UserProfileFullCard from "./UserProfileFullCard";
import MyProfileFeed from "./MyProfileFeed";
import BackgroundBanner from './BackgroundBanner';
import styled from 'styled-components'

const Wrapper = styled.div`
    position: relative;
`;

const ContentContainer = styled.div`
    position: relative;
    top: 100px;
`;

const UserProfile = () => {
    return (
        <Wrapper>
            <BackgroundBanner />
            <ContentContainer>
                <UserProfileFullCard />
                <MyProfileFeed />
            </ContentContainer>
        </Wrapper>
    )
};

export default UserProfile;


// TODO think about elegant way to reuse component logic for random user profiles (only show their posts as feed, no clickable tabs)
