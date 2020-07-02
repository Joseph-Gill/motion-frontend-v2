import React from 'react';
import styled from "styled-components";
import { rem } from "polished"; // ${rem('px')};

const HobbyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${rem('20px')};
  min-width: ${rem('80px')};
  background-color: #F2F2F2;
  height: ${rem('30px')};
  padding: 0 ${rem('10px')} 0 ${rem('10px')};;
  margin: ${rem('5px')};
`;

const Hobby = ({ hobby }) => {
  return <HobbyContainer>{hobby}</HobbyContainer>
};

export default Hobby;
