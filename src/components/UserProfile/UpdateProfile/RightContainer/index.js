import React from 'react';
import styled from 'styled-components'
import InputList from '../InputList';
import LikedThings from '../LikedThings';

const MainContainer = styled.div`
    width: 75%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TopContainer = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
`;

const Column = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
`;

const BottomContainer = styled.div`
    width: 90%;
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 20px 0 20px 0;
`;

const RightContainer = ({ fullData, onChangeHandler, addLikedThingsHandler }) => {
    const leftInputs = Object.values(fullData).filter(data => data.side === 'left')
    const rightInputs = Object.values(fullData).filter(data => data.side === 'right')
    const bottomData = Object.values(fullData).filter(data => data.side === 'bottom')

    return (
        <MainContainer>
            <TopContainer>
                <Column>
                    <InputList inputs={leftInputs} onChangeHandler={onChangeHandler} />
                </Column>
                <Column>
                    <InputList inputs={rightInputs} onChangeHandler={onChangeHandler} />
                </Column>
            </TopContainer>

            <BottomContainer>
                <LikedThings addLikedThingsHandler={addLikedThingsHandler} bottomData={bottomData} />
            </BottomContainer>
        </MainContainer>)
};

export default RightContainer;
