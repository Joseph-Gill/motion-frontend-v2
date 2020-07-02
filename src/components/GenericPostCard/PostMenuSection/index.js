import React, {useState} from 'react';
import menu from '../../../assets/menu.svg';
import styled from "styled-components";
import {rem} from 'polished';
import {connect} from 'react-redux';
import {deletePostAction} from "../../../store/actions/feedActions";

// Styling

const PostMenuWrapper = styled.div`
    position: absolute;
    right: 20px;
    top: 20px;
    min-width: 20px;
    /* box-shadow: 0 0 1px 0 black; */
    display: flex;
    justify-content: center;
`;


const PostMenuModal = styled.div`
    /* border: solid rgba(128,128,128,0.71) 1px; */
    border-radius: 3px;
    /* height: 30px; */
    /* width: 150px; */
    margin-right: 5px;
`;

const MenuButton = styled.button`
    border: none;
    border-radius: ${rem('30px')};
    background: #d62d2f;
    color: white;
    width: ${rem('60px')};
    height: ${rem('20px')};
    font-size: ${rem('12px')};
    letter-spacing:${rem('1px')};
    cursor: pointer;
`;

const IconWrapper = styled.div`
    cursor: pointer;
    width: 20px;
    text-align: center;
    /* border: 1px solid red; */
`;

export const Icon = styled.img`
    /* min-width: 30px; */
`;

// Component

const PostMenuSection = ({post, dispatch}) => {
    const [showMenu, setShowMenu] = useState(false);

    const deletePostHandler = (id) => {
        dispatch(deletePostAction(id))
    };

    return <>
        <PostMenuWrapper>
            {showMenu && (
                <PostMenuModal>
                    <MenuButton onClick={() => deletePostHandler(post.id)}>Delete</MenuButton>
                    <MenuButton>Edit</MenuButton>
                </PostMenuModal>
            )}
            <IconWrapper onClick={() => setShowMenu(!showMenu)}>
                <Icon src={menu}/>
            </IconWrapper>
        </PostMenuWrapper>
    </>
};

export default connect()(PostMenuSection);

// TODO work on options dropdown styling. Only show delete, edit when owner. Otherwise just report (just for visuals, there are no report endpoints)