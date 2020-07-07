import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { UserIcon } from '../../../../style/GlobalIcons';
import { Button } from '../../../../style/GlobalButtons';
import Modal from '../Modal';
import { userUpdateImageAction } from '../../../../store/actions/userActions';


const MainContainer = styled.div`
    border-right: 1px rgba(0,0,0,0.2) solid;
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
`;

const TopContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 50%;
`;

const CustomButton = styled(Button)`
    width: 150px;
`;

const UpdateImageButton = styled(CustomButton)``;

const BottomContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 22%;
`;

const DeleteAccountButton = styled(CustomButton)``;

const SaveButton = styled(CustomButton)``;


const CustomUserIcon = styled(UserIcon)`
  height: 78px;
  width: 78px;
  border: 1px rgba(0,0,0,0.2) solid;
`;

const LeftContainer = ({ userIcon, submitUpdateUserHandler, username }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <MainContainer>
            <TopContainer>
                <CustomUserIcon src={userIcon} />
                <UpdateImageButton onClick={() => setShowModal(!showModal)}>UPDATE IMAGE</UpdateImageButton>
                {showModal && <Modal username={username} target='avatar'/>}
                <UpdateImageButton >UPDATE BANNER</UpdateImageButton>
            </TopContainer>

            <BottomContainer>
                <DeleteAccountButton>DELETE ACCOUNT</DeleteAccountButton>
                <SaveButton onClick={submitUpdateUserHandler} >SAVE</SaveButton>
            </BottomContainer>
        </MainContainer>
    )
};

const mapStateToProps = state => {
    return {
        userIcon: state.userProfileReducer.meData.avatar,
        username: state.userProfileReducer.meData.username
    };
};

export default connect(mapStateToProps)(LeftContainer);
