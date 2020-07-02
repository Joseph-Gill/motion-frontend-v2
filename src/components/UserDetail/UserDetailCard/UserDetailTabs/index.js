import React from 'react';
import styled from 'styled-components'

// Styling

const TabsContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 100%;
`;

const Tab = styled.button`
    outline: none;
    cursor: pointer;
    display: flex;
    flex-flow: column nowrap;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    border: none;
    border-bottom: 3px solid transparent;
    background: none;
    height: 100%;
    margin: 0 1.5%;
    transition: all 0.3s;

    /* https://stackoverflow.com/questions/48502647/conditional-rendering-in-styled-components */
    ${({ active }) => active && `
        border-bottom-color: #9d88ff;

        p:nth-of-type(2) {
            opacity: 1;
        }
    `}
`;

const Amount = styled.p`
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
`;

const TabName = styled.p`
opacity: 0.5;

`;

// Component

const UserDetailTabs = ({ user }) => {
    const activeTab = 'nothing'; // hardcoded since there are no endpoints to get followers, following, friends of random users, only logged in user.

    // this data is used to display and populate the individual <Tab> components
    const tabsData = [
        {
            identifier: 'Posts',
            getMetaData: () => user.amount_of_posts
        },
        {
            identifier: 'Likes',
            getMetaData: () => user.amount_of_likes
        },
        {
            identifier: 'Friends',
            getMetaData: () => user.amount_of_friends
        },
        {
            identifier: 'Followers',
            getMetaData: () => user.amount_of_followers
        },
        {
            identifier: 'Following',
            getMetaData: () => user.amount_following
        },
    ];

    const handleClick = (e) => {
        // https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
        // const clickedTabIdentifier = e.currentTarget.dataset.identifier;
        // dispatch(setMyProfileActiveTab(clickedTabIdentifier));
    }

    return <>
        <TabsContainer>
            {
                tabsData && tabsData.map(({ identifier, getMetaData }, i) => (
                    <Tab active={identifier === activeTab}
                        onClick={handleClick}
                        data-identifier={identifier}
                        key={identifier}
                    >
                        <Amount>{getMetaData()}</Amount>
                        <TabName>{identifier}</TabName>
                    </Tab>
                ))
            }
        </TabsContainer>
    </>
};

// No real tabs for random users, as you can only access the posts they made not their friends, following, followers
export default UserDetailTabs;
