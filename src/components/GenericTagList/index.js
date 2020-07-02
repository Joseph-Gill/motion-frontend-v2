import React from 'react';
import styled from "styled-components";
import { rem } from "polished";

// Styling

const TagList = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const Tag = styled.div`
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

// Component

const GenericTagList = ({ tags }) => (
  <TagList>
    {tags && tags.map((tag, index) => <Tag key={index} >{tag}</Tag>)}
  </TagList>
);

export default GenericTagList;