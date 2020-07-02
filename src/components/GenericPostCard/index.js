import React from 'react';
import styled from "styled-components";
import Moment from "react-moment";
import moment from 'moment';
import {UserIcon} from "../../style/GlobalIcons";
import heart from '../../assets/heart.svg';
import share from '../../assets/share.svg';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {likePostAction} from "../../store/actions/feedActions";
import PostMenuSection from "./PostMenuSection";
import ToggleButton from "./ToggleButton";
import SharedPost from "./SharedPost";
import LazyLoad from 'react-lazyload';
import PostImages from './PostImages'
import {EmojioneV4} from 'react-emoji-render';
import {setModal} from "../../store/actions/modalActions"

// Styling

const PostMainContainer = styled.div`
    width: 560px;
    height: auto;
    background: white;
    box-shadow: 
        0 3px 20px rgba(229,229,229,0.73), 
        0 0 0 1px rgba(221,221,221,0.75);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 25px;
    position: relative; /* don't change, needed for absolute element positioning */
    transition: box-shadow 0.3s;

    &:hover {
        box-shadow: 
        0 3px 20px rgba(229,229,229,0.73), 
        0 1px 1px 0 rgba(0,0,0,0.14), 
        0 2px 1px -1px rgba(0,0,0,0.12), 
        0 1px 3px 0 rgba(0,0,0,0.20),
        0 0 0 1px rgba(221,221,221,0.75);
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

    /* to style the nested Link */
    a {
        font-size: inherit;
        text-decoration: none;
        color: inherit;
    }

    /* https://stackoverflow.com/questions/48502647/conditional-rendering-in-styled-components */
    ${({isSharing}) => isSharing && `
        &:after {
            content: "shared a post";
            display: inline-block;
            margin-left: 1.25rem;
            color: #8c8c8c;
            font-size: 0.8rem;
            font-weight: 300;
        }
    `}
`;

const UserPostDate = styled.p`
    & > time {
    font-size: 0.9rem;
    font-weight: lighter;
    color: #8c8c8c;
    }
`;

const ContentSection = styled.div`
    height: auto;
 `;

const BottomSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    /* margin-top: 0.75rem; */
`;

const LeftBottomWrappper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 214px;
`;

const RightBottomWrappper = styled.div`
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const PostMessage = styled.div`
    font-family: Roboto, sans-serif;
    font-size: 16px;
    color: #3e3e3e;
    line-height: 1.75;
    letter-spacing: -0.5px;
    height: auto;
    margin-bottom: 1.5rem;
`;

const LikeCounterTitles = styled.p`
    font-size: 14px;
    color: rgba(98,98,98,0.89);
    margin: 0 4px 0 1px;
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

const Post = ({loggedInUser, post, likePostAction, setModal}) => {
    const {user, shared, content, amount_of_likes, created, logged_in_user_liked} = post;
    const {first_name, last_name} = user;

    const handleLikePost = id => {
        likePostAction(id)
    };

    const handleOpenModalNewPost = e => {
        debugger
        console.log('share');
        setModal('ModalNewPost', {shared: post}, true);
    };

    return <>
        <LazyLoad height={200}>
            <PostMainContainer className={'post'}> {/* className required for react-masonry */}
                {loggedInUser && (loggedInUser.username === post.user.username) ? <PostMenuSection post={post}/> : ''}
                <UserSection>
                    <Link to={`/users/${user.id}`}>
                        <UserIcon src={user.avatar || `https://eu.ui-avatars.com/api/?name=${user.first_name}+${user.last_name}`}/>
                    </Link>
                    <UserSectionRight>
                        <UserName isSharing={shared}>
                            <Link to={`/users/${user.id}`}>{first_name} {last_name}</Link>
                        </UserName>
                        <UserPostDate>{dateFormatter(created)}</UserPostDate>
                    </UserSectionRight>
                </UserSection>
                <ContentSection>
                    <PostMessage>
                        <EmojioneV4 size={32} text={content} />
                    </PostMessage>
                    <PostImages post={post} />
                    <SharedPost post={shared} />
                </ContentSection>
                <BottomSection>
                    <LeftBottomWrappper>
                        <ToggleButton icon={heart} text='Like' onClickHandler={() => handleLikePost(post.id)} active={logged_in_user_liked} />
                        <ToggleButton icon={share} text='Share' onClickHandler={handleOpenModalNewPost} />
                    </LeftBottomWrappper>
                    <RightBottomWrappper>
                        <LikeCounterTitles>{amount_of_likes}</LikeCounterTitles>
                        <LikeCounterTitles>{amount_of_likes === 1 ? 'like' : 'likes'}</LikeCounterTitles>
                    </RightBottomWrappper>
                </BottomSection>
            </PostMainContainer>
        </LazyLoad>
    </>
};

const mapStateToProps = state => ({
    loggedInUser: state.userProfileReducer.meData
})

export default connect(mapStateToProps, {likePostAction, setModal})(Post);


// TODO fix refresh of liking text that broke


