import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsersAction } from '../../../store/actions/userActions';
import GenericUserList from '../../GenericUserList';
import GenericSpinner from '../../GenericSpinner';
import styled from 'styled-components';


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

const MyFriends = ({ myFriends, isEmpty, getUsersAction }) => {
    useEffect(() => {
        getUsersAction('friends');

    }, [getUsersAction]);

    const displayMessage = () => isEmpty ? <Center>You have no Friends (yet :) )</Center> : <GenericSpinner />;

    return <Wrapper>
        {MyFriends && MyFriends.length
            ? <GenericUserList users={myFriends} />
            : displayMessage()
        }
    </Wrapper>
};


const mapStateToProps = state => {
    return ({
        myFriends: state.usersReducer.friends,
        isEmpty: state.usersReducer['friendsisEmpty']

    })
};
export default connect(mapStateToProps, { getUsersAction })(MyFriends);
