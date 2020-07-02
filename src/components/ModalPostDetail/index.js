import React, { useEffect } from 'react';
import styled from 'styled-components';
import GenericModalContainer from '../GenericModal';
import { UserIcon } from "../../style/GlobalIcons";
import moment from 'moment';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { setModal } from '../../store/actions/modalActions';
import ImageCarousel from './ImageCarousel';
import { likePostAction } from '../../store/actions/feedActions';
import ToggleButton from '../GenericPostCard/ToggleButton';
import heart from '../../assets/heart.svg';
import share from '../../assets/share.svg';

// Styling

const Wrapper = styled.div`
    max-width: 90vw;
    max-height: 90vh;
    width: auto;
    background-color: white;
    overflow: hidden;
    border-radius: 5px;
    display: flex;
    flex-flow: row nowrap;
`;

const LeftContent = styled.div`
    flex-grow: 1;
    outline: none;
    border-right: 1px solid #ddd;
`;

const RightContent = styled.div`
    display: flex;
    flex-flow: column nowrap;
    width: 300px;
    min-width: 350px;
    height: 100%;
    background-color: white;
    height: auto;
`;

const Padding = styled.div`
    padding: 1.25rem;
    padding-bottom: 0;
`;

const LikeCounter = styled.div`
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: auto;
    margin-left: auto;
    padding-right: 1.5rem;
    padding-bottom: 1rem;
    font-weight: 300;
    font-size: 0.85rem;
    color: #999;
`;

const Actions = styled.div`
    border-top: 1px solid #ccc;
    /* margin-top: auto; */
`;

const ActionsContainer = styled.div`

    display: flex;
    flex-flow: row nowrap;
    padding: 2rem 1.25rem;


    & > div {
        margin-right: 2rem;
    }
`;

const UserSection = styled.div`
  width: 100%;
  display: flex;
  height: 50px;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const UserSectionRight = styled.div`
  display: flex;
  height: 35px;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 12px;
`;

const UserName = styled.p`
  font-size: 14px;
  font-weight: bolder;
  color: #3b3b3b;
`;

const UserPostDate = styled.p`
  font-size: 12.5px;
  font-weight: lighter;
 color: #8c8c8c;
`;

const PostContent = styled.div`
    height: auto;
 `;

const PostMessage = styled.div`
  font-family: Roboto,serif;
  font-size: 16px;
  color: #3e3e3e;
  line-height: 26px;
  letter-spacing: -0.5px;
  height: auto;
`;

// Component

const dateFormatter = datetime => {
    const datetimeFormatted = moment(datetime);
    const oneDayInMiliseconds = 60 * 60 * 24 * 1000;
    if (moment().diff(datetimeFormatted) > oneDayInMiliseconds) {
        return <Moment format="DD MMM YY" withTitle>{datetime}</Moment>
    }
    return <Moment fromNow>{datetime}</Moment>
};

const modalNamespace = 'ModalPostDetail'; // used in redux ModalReducer to specify where data of this modal is stored

const ModalPostDetail = ({ setModal, isVisible, post, likePostAction }) => {
    // used to change which image is currently shown to the user

    useEffect(() => {
        // initialize new modal: creates a namespace called "postDetailModal" where data is stored about this modal
        setModal(modalNamespace, null, false);
    }, [setModal]);

    const handleLikePost = async id => {
        try {
            const postData = await likePostAction(id);
            setModal(modalNamespace, postData, true);

        } catch (e) {
            console.error(e);
        }
    };

    const handleOpenModalNewPost = (e) => {
        setModal(modalNamespace, null, false);
        setModal('ModalNewPost', { shared: post }, true);
    };

    const handleClose = () => {
        setModal(modalNamespace, null, false);
    };

    return <>
        {isVisible && post && post.user &&
            <GenericModalContainer close={handleClose}>
                <Wrapper>
                    <LeftContent>
                        <ImageCarousel post={post} />
                    </LeftContent>
                    <RightContent>
                        <Padding>
                            <UserSection>
                                <UserIcon src={post.user.avatar || 'https://via.placeholder.com/50x50'} />
                                <UserSectionRight>
                                    <UserName>{post.user.first_name || 'John'} {post.user.last_name || 'Doe'}</UserName>
                                    <UserPostDate>{dateFormatter(post.created || "2020-01-14")}</UserPostDate>
                                </UserSectionRight>
                            </UserSection>
                            <PostContent>
                                <PostMessage>{post.content || ''}</PostMessage>
                            </PostContent>
                        </Padding>
                        <LikeCounter>{post.amount_of_likes} {post.amount_of_likes === 1 ? 'like' : 'likes'}</LikeCounter>
                        <Actions>
                            <ActionsContainer>
                                <ToggleButton icon={heart} text='Like' onClickHandler={() => handleLikePost(post.id)} active={post.logged_in_user_liked} />
                                <ToggleButton icon={share} text='Share' onClickHandler={handleOpenModalNewPost} />
                            </ActionsContainer>
                        </Actions>

                    </RightContent>
                </Wrapper>
            </GenericModalContainer>
        }
    </>
};

const mapStateToProps = (state) => ({
    isVisible: state.modalReducer[modalNamespace].isVisible, // postDetailModal is the "namespace" of this modal where the relevant state is stored
    post: state.modalReducer[modalNamespace].data
});

export default connect(mapStateToProps, { setModal, likePostAction })(ModalPostDetail);
