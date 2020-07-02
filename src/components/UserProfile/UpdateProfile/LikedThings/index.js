import React, { Fragment, useState } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import cross from '../../../../assets/cross.png'

// Styling

const Label = styled.p`
    margin-bottom: 10px;
    font-size: ${rem('15.5px')}
`;

const TagsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const Tag = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: ${rem('20px')};
    width: 0px;
    min-width: ${rem('100px')};
    background-color: #F2F2F2;
    height: ${rem('30px')};
    padding: 0 ${rem('10px')} 0 ${rem('10px')};;
    margin: ${rem('5px')};
`;

const Name = styled.span`
    font-size: ${rem('15.5px')}
`;

const Icon = styled.img`
    height: 12px;
    cursor: pointer;
`;

const NewTagInputContainer = styled.form`
    display: flex;
    justify-content: space-between;
`;

const NewTagInput = styled.input`
    height: 35px;
    font-family: Roboto, sans-serif;
    color: black;
    font-size: ${rem('15.5px')};
    border: none;
    border-bottom: 1px rgba(0,0,0,0.2) solid;
    background: none;
    width: 85%;
`;

const AddTagButton = styled.button`
    border-radius: ${rem('30px')};
    border: 1px rgba(0,0,0,0.2) solid;
    width: ${rem('80px')};
    height: ${rem('30px')};
    background: none;
    cursor: pointer;
    font-weight: bold;
    letter-spacing:${rem('1px')};
    font-size: ${rem('10px')};
`;

// Component

const LikedThings = ({ bottomData, addLikedThingsHandler }) => {
    const [newTag, setNewTag] = useState('');

    const newTagSubmitHandler = e => {
        e.preventDefault();
        if (newTag !== '') {
            addLikedThingsHandler(newTag);
            setNewTag('');
        };
    };

    return (
        <Fragment>
            <Label>Things I like</Label>
            <TagsContainer>
                {bottomData.length >= 1 && bottomData[0].value.map((tag, index) => {
                    return (
                        <Tag key={index} >
                            <Name>{tag}</Name>
                            <Icon src={cross} />
                        </Tag>)
                })}
            </TagsContainer>
            <NewTagInputContainer onSubmit={newTagSubmitHandler} className='NewTagInputContainer' name='things_user_likes'>
                <NewTagInput placeholder='Type something..' value={newTag} onChange={e => setNewTag(e.target.value)} />
                <AddTagButton>ADD</AddTagButton>
            </NewTagInputContainer>
        </Fragment>
    );
};

export default LikedThings;
