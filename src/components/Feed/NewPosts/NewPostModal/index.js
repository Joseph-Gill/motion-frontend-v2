import React, {useState} from 'react';
import styled from "styled-components";
import {connect} from 'react-redux';
import {InputTextArea} from "../../../../style/GlobalInputs";
import {UserIcon} from "../../../../style/GlobalIcons";
import sendIcon from '../../../../assets/send_buton.svg';
import {GradientCircleContainer} from "../../../../style/GlobalWrappers";
import {createPostAction} from "../../../../store/actions/feedActions";
import gallery from '../../../../assets/gallery.svg';
import link from '../../../../assets/link.svg';
import Error from '../../../Error';

// Styling

const ModalExternalContainer = styled.form`
    position: fixed;
    top:0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background: rgba(0,0,0,0.78);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 500;
`;

const NewPostModalContainer = styled.div`
  width: 560px;
  height: 600px;
  background: white;
  border-radius: 5px;
  padding: 38px 35px 40px 30px;
  display: grid;
  grid-template-areas: 
    "sidebar post post"
    "sidebar image image"
    "sidebar image image"
    "bottom bottom bottom"
  ;
  grid-template-columns: 100px 1fr 30px;
  grid-template-rows: 1fr 1fr 1fr 70px;
`;

const UserSideBar = styled.div`
  grid-area: sidebar;
  width: 90px;
  display: flex;
  justify-content: center;
`;

const PostSection = styled.div`
    grid-area: post;
`;

const ImageSection = styled.div`
grid-area: image;
`;

const BottomSection = styled.div`
    grid-area: bottom;
    border-top: solid grey 1px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: 20px;
`;

const NewPostInput = styled(InputTextArea)`
  height: 100%;
  width: 100%;
  word-break: break-word;
  font-family: Roboto,serif;
  font-size: 16px;
  color: #3e3e3e;
  line-height: 26px;
  letter-spacing: -0.5px;
  resize: none;
  
`;

const NewPostUserIcon = styled(UserIcon)`
    height: 53px;
    width: 53px;
`;

const AddRelationButtonContainer = styled.div`
    grid-area: bottom;
    display: flex;
    justify-content: space-between;
    width: 80px;
    height: 40px;
`;

const CancelButton = styled.div`
    grid-area: bottom;
    height: 40px;
`;

const SendButtonContainer = styled.div`
    grid-area: bottom;
    width: 40px;
    height: 40px;
    cursor: pointer;
`;

const PostCreatedMessage = styled.div`
    position: absolute;
    height: 100px;
    width: 400px;
    background: rgba(129,238,39,0.65);
    font-size: 40px;
`;

export const Icon = styled.img`
    cursor: pointer;
`;

export const BigGradientCircleContainer = styled(GradientCircleContainer)`
    width: 50px;
    height: 50px;
`;

// Component

const NewPostModal = ({user, dispatch, setShowPostModal, content, setContent, error}) => {
    const [showCreateMessage, setShowCreateMessage] = useState(false);

    const createPost = async () => {
        const data = {
            content,
        };
        const response = await dispatch(createPostAction(data)).catch(e => console.log('Create post error', e));
        if (response === 201) {
            setContent('');
            setShowCreateMessage(!showCreateMessage);
            setTimeout(() => {
                setShowPostModal(false);
            }, 2000);
        }
    };

    const cancelCreatePost = () => {
        setContent('');
        setShowPostModal(false);
    }

    return <>
        <ModalExternalContainer>
            <NewPostModalContainer>
                <UserSideBar>
                    <NewPostUserIcon src={user ? user.avatar : null}/>
                </UserSideBar>
                <PostSection>
                    <NewPostInput
                        value={content}
                        onChange={e => setContent(e.currentTarget.value)}
                        placeholder='What is on your mind?'
                    />
                    <Error errorMessage={error}/>
                </PostSection>
                <ImageSection/>
                <BottomSection>
                    <AddRelationButtonContainer>
                        <Icon src={gallery}/>
                        <Icon src={link}/>
                    </AddRelationButtonContainer>
                    <CancelButton onClick={cancelCreatePost}>
                        <Icon src={link}/>
                    </CancelButton>
                    <SendButtonContainer type='submit' onClick={createPost}>
                        <BigGradientCircleContainer>
                            <Icon src={sendIcon}/>
                        </BigGradientCircleContainer>
                    </SendButtonContainer>
                </BottomSection>
                {showCreateMessage &&
                <PostCreatedMessage>
                    Your Post has been created successfully!
                </PostCreatedMessage>
                }
            </NewPostModalContainer>
        </ModalExternalContainer>
    </>
};

const mapStateToProps = state => {
    return {
        user: state.loginReducer.user,
        error: state.feedReducer.error
    }
};

export default connect(mapStateToProps)(NewPostModal);