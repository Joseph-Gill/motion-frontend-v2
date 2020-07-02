import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import GenericModalContainer from '../GenericModal';
import { connect } from 'react-redux';
import { setModal } from '../../store/actions/modalActions';
import sendIcon from '../../assets/send_buton.svg'
import { Icon, UserIcon } from "../../style/GlobalIcons";
import { GradientCircleContainer } from "../../style/GlobalWrappers";
import SharedPost from '../GenericPostCard/SharedPost';
import { createPostAction } from '../../store/actions/feedActions';

// Styling

const Wrapper = styled.div`
    max-width: 90vw;
    /* min-height:500px; */
    min-height: 50vh;
    max-height: 90vh;
    width: calc(560px + 7rem);
    background-color: white;
    display: flex;
    flex-flow: column nowrap;
    position: relative;
    border-radius: 5px;
    overflow: hidden;
`;

const IconAbsolute = styled(UserIcon)`
    position: absolute;
    top: 2rem;
    left: 2rem;
    height: 3rem;
    width: 3rem;
`;

const TextArea = styled.textarea`
    resize: none;
    width: calc(100% - 2rem);
    margin-bottom: 1.5rem;
    border: 1px solid #ccc;
    padding: 1rem;
    outline: none;
    border-radius: 5px;
    min-height: 20vh;
    height: unset;
    background-color: #efefef;
`;

const TopSection = styled.div`
    flex-grow: 1;
    padding-left: 7rem;
    padding-top: 2rem;
    padding-right: 2rem;
    max-height: 70vh;
    overflow: hidden;
`;

const BottomSection = styled.div`
    border-top: 1px solid #ddd;
    margin-top: auto;
    height: 90px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: flex-end;
    padding-right: 2rem;
`;

const SendButtonContainer = styled(GradientCircleContainer)`
    height: 60px;
    width: 60px;
    min-width: 60px;
    margin-left: auto;
    cursor: pointer;
`;

// Component

const modalNamespace = 'ModalNewPost'; // a namespace called "ModalNewPost" where data is stored about this modal in redux modalReducer

const ModalPostDetail = ({ setModal, createPostAction, isVisible, modalData, avatar, firstname }) => {
    const [content, setContent] = useState('');
    const [rows, setRows] = useState(0);
    const textarea = useRef(null);

    useEffect(() => { setModal(modalNamespace, { shared: null }, false) }, [setModal]);

    const handleClose = () => { setModal(modalNamespace, { shared: null }, false) };

    const createPost = async () => {
        const data = {
            content,
            shared: {shared: modalData.shared.id, content: modalData.shared.content}
            // sharing post only works via admin atm
            // Django expects a dictionary to be send, like this: shared: {shared: 41, content: "content of shared post"}
            // this results in a server error. Ideally you should be able to send: shared: 51 to reference postId
        };
        console.log(data)
        try {
            const response = await createPostAction(data);
            if (response.status === 201) {
                setContent('');
                setModal(modalNamespace, {shared: null}, false)
            }
        } catch (e) {
            console.log('Error in create post', e)
        }
    };

    const handleInput = (e) => {
        setContent(e.target.value);
        const textRowCount = textarea.current ? textarea.current.value.split("\n").length : 0;
        if (textRowCount <= 15) {
            setRows(textRowCount + 1);
        }
    };

    const handleCreatePost = (e) => {
        e.preventDefault();
        createPost();

    };

    return <>
        {isVisible && modalData &&
            <GenericModalContainer close={handleClose}>
                <Wrapper>
                    <TopSection>
                        <IconAbsolute src={avatar || 'https://via.placeholder.com/50x50'} />
                        {/* Textareas are not automatically adjusting height: https://stackoverflow.com/a/56008181 */}
                        <TextArea
                            value={content}
                            placeholder={`what's on your mind ${firstname}?`}
                            onChange={handleInput}
                            ref={textarea}
                            rows={rows}
                        />
                        <SharedPost post={modalData.shared} />
                    </TopSection>
                    <BottomSection>
                        <SendButtonContainer onClick={handleCreatePost}>
                            <Icon src={sendIcon} />
                        </SendButtonContainer>
                    </BottomSection>
                </Wrapper>
            </GenericModalContainer>
        }
    </>
}

const mapStateToProps = (state) => ({
    isVisible: state.modalReducer[modalNamespace].isVisible,
    modalData: state.modalReducer[modalNamespace].data,
    avatar: state.userProfileReducer.meData.avatar,
    firstname: state.userProfileReducer.meData.first_name
});

export default connect(mapStateToProps, { setModal, createPostAction })(ModalPostDetail);
