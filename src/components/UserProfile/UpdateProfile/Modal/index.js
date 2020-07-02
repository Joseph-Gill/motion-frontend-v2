import React from 'react';
import styled from 'styled-components'
import { connect } from 'react-redux';
import bin from '../../../../assets/bin.svg';
import upload from '../../../../assets/upload.svg';
import { userUpdateImageAction } from '../../../../store/actions/userActions';


const MainContainer = styled.div`
    border: 1px rgba(0,0,0,0.2) solid;
    box-shadow: 1px 1px 20px -5px #AEAEAE;
    border-radius: 4px;
    height: 100px;
    width: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    top: 200px;
`;

const Option = styled.label`
    width: 100%;
    height: 45%;
    display: flex;
    padding: 0 20px 0 20px;
    align-items: center;
    font-size: 15.5px;
    cursor: pointer;
    &:hover {
        background-color: rgba(0,0,0,0.2);
    }
`;

const Icon = styled.img`
    width: 15px;
    margin-right: 20px;
`;

const OptionText = styled.span`
`;

const Modal = ({ dispatch }) => {

    const uploadImageHandler = (e) => {
        const files = Array.from(e.target.files);
        dispatch(userUpdateImageAction(files));
    };

    return (
        <MainContainer>
            <Option htmlFor='upload'>
                <Icon src={upload} />
                <OptionText>Upload</OptionText>
                <input type='file' id='upload' style={{ display: 'none' }} onChange={uploadImageHandler} />
            </Option>
            <Option>
                <Icon src={bin} />
                <OptionText>Remove</OptionText>
            </Option>
        </MainContainer>
    );
};

export default connect()(Modal);
