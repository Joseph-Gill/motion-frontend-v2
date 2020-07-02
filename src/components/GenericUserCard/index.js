import React from 'react';
import styled from "styled-components";
import { rem } from "polished";
import { connect } from 'react-redux';
import Hobby from './Hobby';
import { UserIcon } from "../../style/GlobalIcons";
import { Button } from '../../style/GlobalButtons';
import FriendButton from './FriendButton';
import defaultAvatar from '../../assets/defaultAvatar.png';
import { toggleFollowAction } from '../../store/actions/userActions';

// Styling

const UserCardContainer = styled.div`
  width: ${rem('360px')};
  height: ${rem('490px')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: solid lightgrey 1px;
  border-radius: 5px;
  background-color: white;
  margin: ${rem('40px')} ${rem('20px')} 0 ${rem('20px')};
  padding: ${rem('20px')} ${rem('40px')} ${rem('20px')} ${rem('40px')};
  -webkit-box-shadow: 1px 1px 20px -5px #AEAEAE; 
  box-shadow: 1px 1px 20px -5px #AEAEAE;
`;

const CustomUserIcon = styled(UserIcon)`
  height: 78px;
  width: 78px;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserName = styled.p`
  font-size: ${rem('24px')};
  margin-bottom: ${rem('10px')};
`;

const UserLocation = styled.p`
  font-size: ${rem('18px')};
  font-weight: 300;
  height: 20px;
`;

const RelationButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const FollowButton = styled(Button)`
`;

const FollowButtonActive = styled(Button)`
  background: ${props => props.theme.LinearGradientHover};
  color: white;
  border: none;
`;

const ButtonText = styled.p`
  font-weight: initial;
  letter-spacing:${rem('1px')};
  font-size: ${rem('13px')};
`;

const AboutUser = styled.p`
`;

const HobbiesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
  height: ${rem('120px')}
`;

// Component

const GenericUserCard = ({ user, dispatch }) => {
  const fullName = `${user.first_name} ${user.last_name}`
  const isFollowing = user.logged_in_user_is_following;

  const followToggleHandler = userId => {
    dispatch(toggleFollowAction(userId))
  };

  return (
    <UserCardContainer>
      <CustomUserIcon src={user.avatar ? user.avatar : defaultAvatar} />
      <UserInfoContainer>
        <UserName>{fullName !== ' ' ? fullName : user.username}</UserName>
        <UserLocation>{user.location}</UserLocation>
      </UserInfoContainer>
      <RelationButtonsContainer>
        {isFollowing
          ? <FollowButtonActive onClick={() => followToggleHandler(user.id)}><ButtonText>UNFOLLOW</ButtonText></FollowButtonActive>
          : <FollowButton onClick={() => followToggleHandler(user.id)}><ButtonText>FOLLOW</ButtonText></FollowButton>
        }
        <FriendButton user={user} />
      </RelationButtonsContainer>
      <AboutUser>{user.about_me}</AboutUser>
      <HobbiesContainer>
        {user.things_user_likes.map((hobby, index) => <Hobby hobby={hobby} key={index} />)}
      </HobbiesContainer>
    </UserCardContainer>
  );
};

export default connect()(GenericUserCard);
