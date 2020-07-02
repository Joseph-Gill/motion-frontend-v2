import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import styled from "styled-components";

// Styling

const Center = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;

// Component - Displayed while data is being fetched

const GenericSpinner = () => (
    <Center>
        <ClipLoader size={100} sizeUnit={'px'} color={'purple'} css={'margin-top: 2rem'}/>
    </Center>
);

export default GenericSpinner;