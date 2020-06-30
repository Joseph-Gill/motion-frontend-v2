import React from 'react';
import styled from "styled-components";

const NotificationContainer = styled.div`
    border: solid orange;
    height: 400px;
    width: 150px;
    position: absolute;
    top: 70px;
    left: -30px;
    background: white;
`;

const NotificationMenu = () => {
    return <>
        <NotificationContainer>
            <p>Received requests</p>
            <p>Sent requests</p>
        </NotificationContainer>
    </>
};

export default NotificationMenu

// TODO Make Friend Requests links work