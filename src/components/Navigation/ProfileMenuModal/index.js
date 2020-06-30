import React from 'react';
import {connect} from 'react-redux';
import styled from "styled-components";
import {withRouter} from 'react-router-dom';
import {logout} from '../../../store/actions/loginActions';
import profile from '../../../assets/profile.svg';
import logoutIcon from '../../../assets/logout.svg';

// Styling

const ProfileMenuWrapper = styled.div`
    border: 1px solid lightgrey;
    width: 150px;
    height: 110px;
    position: absolute;
    top: 70px;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background: white;
    border-radius: 3px;
`;

const ProfileMenuOption = styled.div`
    width: 100%;
    height: 35px;
    cursor: pointer;
    display: flex;
    align-items: center;
    &:hover {
        background-color: lightgrey;
    }
`;

const Icon = styled.img`
    height: 20px;
    margin: 0 10px 0 10px;
`;

// Component

const ProfileMenuModal = ({history, dispatch, redirectHandler}) => {
    const logOutHandler = () => {
        history.push('/auth/login');
        return dispatch(logout())
    };

    return <>
        <ProfileMenuWrapper>
            <ProfileMenuOption onClick={() => redirectHandler('userProfile')}>
                <Icon src={profile}/>
                My Profile
            </ProfileMenuOption>
            <ProfileMenuOption onClick={logOutHandler}>
                <Icon src={logoutIcon}/>
                Log out
            </ProfileMenuOption>
        </ProfileMenuWrapper>
        </>
};

export default withRouter(connect()(ProfileMenuModal))

