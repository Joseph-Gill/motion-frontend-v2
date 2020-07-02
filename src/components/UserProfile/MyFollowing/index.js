import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsersAction } from '../../../store/actions/userActions';
import GenericUserList from '../../GenericUserList';
import GenericSpinner from '../../GenericSpinner';
import styled from 'styled-components';

// Styling

const Wrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    width: 1200px;
    margin: 0 auto;
`;

const Center = styled.div`
    text-align: center;
    display: flex;
    justify-content: center;
    margin: auto;
`;

// Component
// Users logged in user is following
const MyFollowing = ({ myFollowing, isEmpty, getUsersAction }) => {
    useEffect(() => { getUsersAction('following') }, [getUsersAction]);

    const displayMessage = () => isEmpty ? <Center>You're not following anyone</Center> : <GenericSpinner />;

    return <Wrapper>
        {myFollowing && myFollowing.length
            ? <GenericUserList users={myFollowing} />
            : displayMessage()
        }
    </Wrapper>
};


const mapStateToProps = state => {
    return ({
        myFollowing: state.usersReducer.following,
        isEmpty: state.usersReducer['followingisEmpty'],

    })
};
export default connect(mapStateToProps, { getUsersAction })(MyFollowing);
