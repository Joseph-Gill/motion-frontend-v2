import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';
import LeftContainer from './LeftContainer';
import RightContainer from './RightContainer';
import { userUpdateAction } from '../../../store/actions/userActions';


const FullCardContainer = styled.div`
    margin: 0 auto;
    margin-bottom: 2rem;
    background-color: white;
    border-radius: 4px;
    height: 500px;
    box-shadow: 1px 1px 20px -5px #AEAEAE;
    max-width: 1180px;
    display: flex;
    position: relative;
    top: 10px;
`;

const UpdateProfile = ({ userProfile, dispatch, history }) => {
    const [data, setData] = useState({});

    useEffect(() => {
        const initialState = {
            first_name: { name: 'first_name', value: userProfile.first_name, label: 'First name', type: 'text', side: 'left' },
            last_name: { name: 'last_name', value: userProfile.last_name, label: 'Last name', type: 'text', side: 'right' },
            email: { name: 'email', value: userProfile.email, label: 'Email', type: 'text', side: 'left' },
            username: { name: 'username', value: userProfile.username, label: 'Username', type: 'text', side: 'right' },
            location: { name: 'location', value: userProfile.location, label: 'Location', type: 'text', side: 'left' },
            phone: { name: 'phone', value: '000-000-000', label: 'Phone', type: 'text', side: 'right' },
            about_me: { name: 'about_me', value: userProfile.about_me, label: 'About', type: 'text', side: 'left' },
            password: { name: 'password', value: '', label: 'Password', type: 'password', side: 'right' },
            things_user_likes: { name: 'things_user_likes', value: userProfile.things_user_likes, label: 'Things I like', type: 'text', side: 'bottom' }
        }
        setData(initialState)
    }, []);

    const onChangeHandler = e => {
        const name = e.target.name;
        const val = e.target.value;
        setData({ ...data, [name]: { ...data[name], value: val } });
    };

    const addLikedThingsHandler = thing => {
        setData({ ...data, things_user_likes: { ...data.things_user_likes, value: [...data.things_user_likes.value, thing] } });
    };

    const submitUpdateUserHandler = async e => {
        e.preventDefault();
        const updateData = {}
        Object.keys(data).forEach(key => {
            // backend needs to be fixed - updating these 4 keys don't work
            return key === 'phone' || key === 'email' || key === 'password' || key === 'things_user_likes' ? null : updateData[key] = data[key].value;
        });
        const response = await dispatch(userUpdateAction(updateData));
        if (response.status === 200) {
            history.push('/userProfile')
        }
    };

    return (
        <FullCardContainer>
            <LeftContainer submitUpdateUserHandler={submitUpdateUserHandler} />
            <RightContainer onChangeHandler={onChangeHandler} addLikedThingsHandler={addLikedThingsHandler} fullData={data} />
        </FullCardContainer>
    );
};

const mapStateToProps = state => {
    return {
        userProfile: state.userProfileReducer.meData
    };
};

export default connect(mapStateToProps)(UpdateProfile);
