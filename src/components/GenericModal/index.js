import React from 'react';
import styled from 'styled-components';

// Styling

const Wrapper = styled.div`
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 1001; /* to make it appear in front of every other component */
        display: flex;
        justify-content: center;
        align-items: center;
    `;

const Background = styled.div`
        position: fixed;
        background-color: black;
        opacity: 0.5;
        width: 100%;
        height: 100%;
    `;

const ModalContent = styled.div`
        position: relative;
        /* min-width: 100px; */
        /* min-height: 100px; */
        /* background-color: white; */
        /* border: 1px solid black; */
        z-index: 1002; /*  only thing that should not be "darkened" */
    `;

const CloseButton = styled.button`
        background: none;
        border: none;
        color: white;
        width: 1.5rem;
        height: 1.5rem;
        position: absolute;
        top: -1.5rem; /* same as width&height */
        right: -1.5rem; /* same as width&height */
        cursor: pointer;
        font-size: 1.5rem;
        line-height: 0.75rem; /* needs to be 1/2 of font-size! */
        outline: none;
        /* border: 1px solid red; */
        &::before { 
            content: '✖';
        }
    `;

// Component

// don't use this component directly, it needs a parent component that adds the content and logic
// close() should implement some logic which hides the Modal
const GenericModalContainer = ({ children, close }) => {

    const handleClose = (e) => {
        try {
            close(); // a function provided by the parent component via props, that gets executed whenever modal should close
            console.log("close Modal");
        } catch (error) {
            console.error('You forgot to pass close() as a prop to GenericModalContainer');

        }


    };

    return (
        <Wrapper>
            <Background onClick={handleClose} />
            <ModalContent>
                <CloseButton onClick={handleClose} ></CloseButton>
                {children}
            </ModalContent>
        </Wrapper>
    )
}

export default GenericModalContainer;
