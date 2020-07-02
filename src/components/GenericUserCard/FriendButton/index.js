import React from 'react';
import styled from "styled-components";
import { rem } from "polished";
import { connect } from 'react-redux';
import { Icon } from '../../../style/GlobalIcons';
import { Button } from '../../../style/GlobalButtons';
import { friendRequestAction } from '../../../store/actions/userActions';
import { acceptFriendRequestAction } from '../../../store/actions/userActions';
import checkmark from '../../../assets/checkmark.svg';
import clock from '../../../assets/clock.svg';
import cross from '../../../assets/cross.png';

// Styling

const ButtonText = styled.p`
font-weight: initial;
letter-spacing:${rem('1px')};
font-size: ${rem('13px')};
`;

const FriendButtonTextOnly = styled(Button)`
`;

const FriendButtonWithIcon = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: default;
  background-color: #F2F2F2;
`;

const CustomIcon = styled(Icon)`
  height: 15px;
  margin-right: 10px;
`;

// Component

const FriendButton = ({ user, dispatch }) => {
  const isFriends = user.logged_in_user_is_friends;
  const isRejected = user.logged_in_user_is_rejected;
  const sentFR = user.logged_in_user_sent_fr;
  const receivedFR = user.logged_in_user_received_fr;

  const friendRequestHandler = user => {
    dispatch(friendRequestAction(user));
  };

  // ACCEPT FRIEND REQUEST WANTS THE FR-REQUEST ID, NOT THE USER ID. SHOULD WE CHANGE THE BACKEND? OR HOW DO WE GET THE FR ID?
  const acceptFriendRequestHandler = user => {
    dispatch(acceptFriendRequestAction(user));
  };

  if (isFriends) return <FriendButtonWithIcon><CustomIcon src={checkmark} /><ButtonText>FRIEND</ButtonText></FriendButtonWithIcon>
  if (isRejected) return <FriendButtonWithIcon><CustomIcon src={cross} /><ButtonText>REJECTED</ButtonText></FriendButtonWithIcon>
  if (sentFR) return <FriendButtonWithIcon><CustomIcon src={clock} /><ButtonText>PENDING</ButtonText></FriendButtonWithIcon>
  if (receivedFR) return <FriendButtonTextOnly onClick={() => acceptFriendRequestHandler(user)}><ButtonText>ACCEPT</ButtonText></FriendButtonTextOnly>
  return <FriendButtonTextOnly onClick={() => friendRequestHandler(user)}><ButtonText>ADD FRIEND</ButtonText></FriendButtonTextOnly>
};

export default connect()(FriendButton);
