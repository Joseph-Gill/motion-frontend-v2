import React, {useState, useEffect} from 'react';
import {withRouter, Link} from "react-router-dom";
import styled from "styled-components";
import {connect} from 'react-redux';
import menu from '../../assets/menu.svg';
import ProfileMenuModal from './ProfileMenuModal';
import NotificationMenu from './NotificationMenu';
import {Icon, UserIcon} from "../../style/GlobalIcons";
import postLogo from '../../assets/postsLogoColor.svg';
import bell from '../../assets/bellGrey.svg';
import friendsIconGrey from '../../assets/friendsIconGrey.svg';
import motionLogo from '../../assets/motionLogoColor.png';
import {Title} from "../../style/GlobalTitles";
import {NavTabWrapper} from "../../style/GlobalWrappers";
import NotificationCounter from './NotificationCounter';
import {getMyProfileAction} from '../../store/actions/userActions';

// Styling

const Wrapper = styled.div`
    padding-top: 80px; /* Needs to be exactly the same height as the Header, offsets content because it's fixed */
`;

const Header = styled.div`
    border-bottom: solid 1px rgba(221, 221, 221, 0.67);
    width: 100%;
    height: 80px;
    display: flex;
    padding: 0 4% 0 2.2%;
    position: fixed;
    margin-bottom: 100px;
    top: 0;
    z-index: 1000;
    background-color: white;
`;

const NavSectionLeft = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 18%;
    cursor: pointer;
`;

const NavSectionMiddle = styled.div`
    width: 80%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .active {
        border: 1px solid red;
    }
    a {
        text-decoration: none;
        margin-right: 2rem;
    }
`;

const NavSectionRight = styled.div`
    width: 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
`;

const MotionLogo = styled(Icon)`
    width: 27px;
    height: 27px;
    margin-right: 5%;
`;

const MotionTitle = styled(Title)`
    font-size: 22px;
    font-weight: 400;
`;

const TabTitles = styled(Title)`
    font-size: 17px;
    font-weight: 400;
`;

const PostWrapper = styled(NavTabWrapper)``;

const FriendsWrapper = styled(NavTabWrapper)`
    width: 140px;
`;

const IconContainer = styled.div`
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
`;

// Component

const Navigation = ({children, avatar, getMyProfileAction, history}) => {
    const [showNotificationMenu, setShowNotificationMenu] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    useEffect(() => {
        getMyProfileAction();
    }, [getMyProfileAction]);

    const redirectHandler = path => {
        setShowProfileMenu(false);
        history.push(path)
    };

    return (
        <Wrapper>
            <Header>
                <NavSectionLeft onClick={() => history.push('/feed')}>
                    <MotionLogo src={motionLogo}/>
                    <MotionTitle>Motion</MotionTitle>
                </NavSectionLeft>
                <NavSectionMiddle>
                    <Link to={'/feed'}>
                        <PostWrapper>
                            <Icon src={postLogo}/>
                            <TabTitles>Posts</TabTitles>
                        </PostWrapper>
                    </Link>
                    <Link to={'/users'}>
                        <FriendsWrapper>
                            <Icon src={friendsIconGrey}/>
                            <TabTitles>Find Friends</TabTitles>
                        </FriendsWrapper>
                    </Link>
                </NavSectionMiddle>
                <NavSectionRight>
                    <IconContainer onClick={() => setShowNotificationMenu(!showNotificationMenu)}>
                        <Icon src={bell} />
                        <NotificationCounter />
                    </IconContainer>
                    {showNotificationMenu && <NotificationMenu />}
                    <Link to='/userProfile' replace>
                        <UserIcon src={avatar} />
                    </Link>
                    <IconContainer onClick={() => setShowProfileMenu(!showProfileMenu)}>
                        <Icon src={menu} />
                    </IconContainer>
                    {showProfileMenu && <ProfileMenuModal redirectHandler={redirectHandler} />}
                </NavSectionRight>
            </Header>
            {children}
        </Wrapper>
    );
};

const mapStateToProps = state => ({
    avatar: state.userProfileReducer.meData.avatar || ''
});

export default withRouter(connect(mapStateToProps, {getMyProfileAction})(Navigation));

// TODO fix ProfileMenuModal. It's hard to click and doesn't close if user clicks anywhere else on page
// TODO implement notification dropdown for recieved and requested friendrequests
// TODO display bottom border for active tab
// TODO cool medium like parallax header (smoothly disappears on scroll down, appears on scroll up):
// https://medium.com/@mariusc23/hide-header-on-scroll-down-show-on-scroll-up-67bbaae9a78c
// http://jsfiddle.net/mariusc23/s6mLJ/31/ (demo with jquery)
// https://medium.com/mtholla/create-a-transitioning-header-using-react-hooks-like-mediums-c70ed211f7c9 (preferably this)


