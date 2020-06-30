import {rem} from 'polished';
import styled from "styled-components";

export const Button = styled.button`
  border-radius: ${rem('30px')};
  border: 1px rgba(0,0,0,0.2) solid;
  width: ${rem('120px')};
  height: ${rem('40px')};
  background: none;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: ${rem('1px')};
  font-size: ${rem('10px')};
  
  // Used for nested Link tabs of react-router-dom
  
  a {
    font-size: inherit;
    color: inherit;
    text-decoration: none;
    height: 100%;
    width: 100%;
    display: block;
    line-height: ${rem('40px')}; // Needs to be the same as the button's height
  }
`;

export const GradientButton = styled.button`
  border: none;
  border-radius: ${rem('30px')};
  background: ${props => props.theme.LinearGradient};
  color: white;
  width: ${rem('260px')};
  height: ${rem('60px')};
  font-size: ${rem('12px')};
  letter-spacing:${rem('1px')};
  cursor: pointer;
  
  // Used for nested Link tabs of react-router-dom
  
  a {
    font-size: inherit;
    color: inherit;
    text-decoration: none;
    height: 100%;
    width: 100%;
    display: block;
    line-height: ${rem('60px')}; /* needs to be the same as height of button */
  }
`;