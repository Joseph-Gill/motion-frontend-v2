import React from 'react';
import styled from "styled-components";

// Styling

const ToggleButtonContainer = styled.div`
    display: flex;
    width: 80px;
    align-items: center;
    cursor: pointer;
`;


export const Icon = styled.img`
    margin-right: 15px;

    /* changing color of svgs can be tricky. Using filters is one option that doesn't require you to change the source svg itself */
    /* https://css-tricks.com/change-color-of-svg-on-hover/ */
    /* Here is a codepen to help you generate filters: https://codepen.io/sosuke/pen/Pjoqqp  */
    &.active {
        filter: invert(23%) sepia(63%) saturate(2878%) hue-rotate(-9deg) brightness(137%) contrast(121%);
    }
`;

// an alternative to the Icon above that works with background-images
// export const IconAlternative = styled.span`
//     margin-right: 15px;
//     width: 1.25rem;
//     height: 1.25rem;
//     background-size: contain;
//     background-position: center;
//     background-repeat: no-repeat;
//
//     /* changing color of svgs can be tricky. Using filters is one option that doesn't require you to change the source svg itself */
//     /* https://css-tricks.com/change-color-of-svg-on-hover/ */
//     /* Here is a codepen to help you generate filters: https://codepen.io/sosuke/pen/Pjoqqp  */
//     &.active {
//         filter: invert(23%) sepia(63%) saturate(2878%) hue-rotate(-9deg) brightness(137%) contrast(121%);
//     }
//
//     /* https://stackoverflow.com/questions/48502647/conditional-rendering-in-styled-components */
//     ${({ src }) => src && `
//         background-image: url(${src});
//     `}
// `;

const PostButtonTitles = styled.p`
    font-size: 14px;
    font-weight: bolder;
    color: #3b3b3b;
`;

const ToggleButton = ({ icon, text, onClickHandler, active = false}) => {
    return (
        <ToggleButtonContainer onClick={onClickHandler}>
            <Icon src={icon} active={active} className={active ? 'active' : ''}/>
            <PostButtonTitles>{text}</PostButtonTitles>
        </ToggleButtonContainer>
    )
};

export default ToggleButton;