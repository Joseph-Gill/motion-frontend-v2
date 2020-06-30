import styled from "styled-components";
import {rem} from "polished";


export const Input = styled.input`
  height: 35px;
  font-family: Roboto, sans-serif;
  color: black;
  font-size: ${rem('15.5px')};
  border: none;
  background: none;
  width: 100%;
  height: 100%;
  &:focus {
    outline: none;
  }
`;

export const InputTextArea = styled.textarea`
  height: 35px;
  font-family: Roboto, sans-serif;
  color: black;
  font-size: ${rem('15.5px')};
  border: none;
  &:focus {
    outline: none;
  }
`;
