import React from 'react';
import styled from 'styled-components'
import { rem } from 'polished';

// Styling

const InputContainer = styled.div`
    height: 45px;
    width: 80%;
    display: flex;
    flex-direction: column;
    border-bottom: 1px rgba(0,0,0,0.2) solid;
`;

const Label = styled.div`
    height: 20px;
    font-size: 15px;
    color: rgba(0,0,0,0.2);
`;

const Input = styled.input`
    height: 25px;
    font-family: Roboto, sans-serif;
    color: black;
    font-size: ${rem('15.5px')};
    border: none;
    background: none;
    width: 100%;
    height: 100%;
`;

// Component

const InputList = ({ inputs, onChangeHandler }) => {
    return (
        inputs.map((input, i) => {
            return (
                <InputContainer key={i} >
                    <Label>{input.label}</Label>
                    <Input value={input.value} onChange={onChangeHandler} name={input.name} type={input.type} />
                </InputContainer>
            );
        })
    );
};

export default InputList;
