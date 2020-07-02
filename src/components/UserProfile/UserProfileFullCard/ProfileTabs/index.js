import React from 'react';
import styled from 'styled-components'
import { connect } from "react-redux";
import { setMyProfileActiveTab } from '../../../../store/actions/userActions'


const TabsContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 100%;
`;

// TODO create a real Tab comoonent instead of inlining it
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

const ProfileTabs = ({ dispatch, userProfile }) => {
    const { meData, activeTab } = userProfile;

    // this data is used to display and populate the individual <Tab> components
    const tabsData = [
        {
            identifier: 'Posts',
            getMetaData: () => meData.amount_of_posts
        },
        {
            identifier: 'Likes',
            getMetaData: () => meData.amount_of_likes
        },
        {
            identifier: 'Friends',
            getMetaData: () => meData.amount_of_friends
        },
        {
            identifier: 'Followers',
            getMetaData: () => meData.amount_of_followers
        },
        {
            identifier: 'Following',
            getMetaData: () => meData.amount_following
        },
    ];

    const handleClick = (e) => {
        // https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes
        const clickedTabIdentifier = e.currentTarget.dataset.identifier;
        dispatch(setMyProfileActiveTab(clickedTabIdentifier));
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



const mapStateToProps = state => {
    return {
        userProfile: state.userProfileReducer
    };
};

export default connect(mapStateToProps)(ProfileTabs);


// TODO find out why the tabs that display posts create horizontal scrollbar
