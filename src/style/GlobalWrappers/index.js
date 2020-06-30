import styled from "styled-components";
import {rem} from "polished";


export const TopRightWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 14%;
    padding-right: ${rem('35px')};
`;

export const FormWrapper = styled.form`
  height: 86%;
  width: 100%;
`;

export const MiddleRightWrapper = styled.div`
    height: 51%;
    justify-content: flex-end;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const BottomRightWrapper = styled.div`
    height: 49%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const NavTabWrapper = styled.div`
    width: 85px;
    height: 100%;
    padding: 0 3px 0 3px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor:pointer;
    margin-right: 7%;
`;

export const SearchTabWrapper = styled.div`
    width:53px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor:pointer;
    font-size: 16px;
    color: grey;
`;

export const ActiveSearchTabWrapper = styled(SearchTabWrapper)`
    border-bottom: 1px black solid;
`;

export const GradientCircleContainer = styled.div`
      border-radius: 50%;
      background: ${props => props.theme.LinearGradientHover};
      color: white;
      width: 21px;
      height: 21px;
      font-size: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      font-weight: lighter;
`;

export const GenericCard = styled.div`
    box-shadow: 0 3px 20px rgba(229,229,229,0.73);
    border: 0.6px rgba(221,221,221,0.75) solid;
    border-radius: 5px;
    overflow: hidden;
    position: relative; // don't change, needed for absolute element positioning 
    transition: box-shadow 0.3s;

    &:hover, &.active, &.focus {
        box-shadow: 0 3px 20px rgba(229,229,229,0.73), 0 1px 1px 0 rgba(0,0,0,0.14), 0 2px 1px -1px rgba(0,0,0,0.12), 0 1px 3px 0 rgba(0,0,0,0.20);
    }
`;
