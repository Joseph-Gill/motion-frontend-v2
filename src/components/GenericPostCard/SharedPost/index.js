import React from 'react';
import styled from "styled-components";
import Moment from "react-moment";
import moment from 'moment'
import {UserIcon} from "../../../style/GlobalIcons";
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {EmojioneV4} from 'react-emoji-render';

// Styling

const PostMainContainer = styled.div`
    width: 100%;
    height: auto;
    background: white;
    border-left: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    padding-left: 25px;
    position: relative; /* don't change, needed for absolute element positioning */
    margin-bottom: 1.5rem;
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

    /* to remove default styles of the nested Links */
    a {
        font-size: inherit;
        text-decoration: none;
        color: inherit;
    }
`;

const UserPostDate = styled.p`
    /* to select the nested <Moment /> Component */
    & > time {
    font-size: 0.8rem;
    font-weight: lighter;
    color: #8c8c8c;
    }
`;

const ContentSection = styled.div`
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
    const oneDayInMilliseconds = 60 * 60 * 24 * 1000;
    if (moment().diff(datetimeFormatted) > oneDayInMilliseconds) {
        return <Moment format="DD MMM YY" withTitle>{datetime}</Moment>
    }
    return <Moment fromNow>{datetime}</Moment>
};

const SharedPost = ({post}) => {
    return <>
        {post &&
        <PostMainContainer>
            <UserSection>
                <Link to={`/users/${post.user.id}`}>
                    <UserIcon
                        src={post.user.avatar || `https://eu.ui-avatars.com/api/?name=${post.user.first_name}+${post.user.last_name}`}/>
                </Link>
                <UserSectionRight>
                    <UserName>
                        <Link to={`/users/${post.user.id}`}>{post.user.first_name} {post.user.last_name}</Link>
                    </UserName>
                    <UserPostDate>{dateFormatter(post.created)}</UserPostDate>
                </UserSectionRight>
            </UserSection>
            <ContentSection>
                <PostMessage>
                    <EmojioneV4 size={32} text={post.content}/>
                </PostMessage>
            </ContentSection>
        </PostMainContainer>
        }
    </>
};

export default connect()(SharedPost);
