import React from 'react';
import styled from "styled-components";
import {defaultUserProfileBanner} from "../../../constants";

// Styling

const Banner = styled.div`
    height: 100vh;
    background-image: url(${({ background }) => background});
    background-repeat: no-repeat;
    background-size: cover;
    width: 100vw;
    height: 330px;
    position: fixed;
    top: 0;
    z-index: -1;
`;

// Component

const BackgroundBanner = ({ user }) => {

    return <>
        {user && <Banner background={user.banner || defaultUserProfileBanner} />}
    </>
};

export default BackgroundBanner;