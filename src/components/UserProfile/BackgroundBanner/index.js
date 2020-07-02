import React from 'react';
import { connect } from 'react-redux';
import styled from "styled-components";
import { defaultUserProfileBanner } from '../../../constants';

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

const BackgroundBanner = ({ banner }) => {

    const backgroundBanner = banner || defaultUserProfileBanner;

    return <>
        <Banner background={backgroundBanner} />
    </>
};

const mapStateToProps = state => ({
    banner: state.userProfileReducer.meData.banner
});

export default connect(mapStateToProps)(BackgroundBanner);