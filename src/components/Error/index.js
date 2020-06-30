import React from 'react';
import styled from "styled-components";
import {rem} from 'polished';

export const ErrorMessage = styled.span`
  height: 10px;
  border: red;
  font-family: Roboto, sans-serif;
  color: red;
  font-size: ${rem ('12px')};
`;

const Error = ({errorMessage}) => {
    return <ErrorMessage>{errorMessage ? errorMessage : ''}</ErrorMessage>
};

export default Error