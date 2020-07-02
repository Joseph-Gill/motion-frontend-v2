import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import GenericSpinner from '../GenericSpinner';
import GenericUserList from '../GenericUserList';
import { getUsersAction } from '../../store/actions/userActions';

// Styling

const FindFriendsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
`;

// Component

// fetch relevant posts every time the active filter changes
const FindFriends = ({ users, fetchUsers, getUsersAction }) => {
  useEffect(() => {
    getUsersAction('allUsers');
  }, [getUsersAction]);


  return (
    <FindFriendsContainer>
      {users.length ? <GenericUserList users={users} /> : <GenericSpinner />}
    </FindFriendsContainer>
  );
};

const mapStateToProps = state => {
  const currentUserId = state.userProfileReducer.meData.id;
  const allUsers = state.usersReducer.users;
  const usersWithoutCurrentUser = allUsers.filter(user => user.id !== currentUserId);
  return {
    users: usersWithoutCurrentUser
  };
};

export default connect(mapStateToProps, { getUsersAction })(FindFriends);