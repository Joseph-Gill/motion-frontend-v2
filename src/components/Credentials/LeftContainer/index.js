import React from 'react';
import styled from "styled-components";
import desk3 from '../../../assets/desk3.jpg';
import {Icon} from "../../../style/GlobalIcons";
import {Button} from "../../../style/GlobalButtons";
import {Title} from "../../../style/GlobalTitles";
import motionLogo from '../../../assets/motion_logo_white.png'
import googlePlay from '../../../assets/googlePlay.svg'
import appleStore from '../../../assets/AppleStore.svg'
import twitter from '../../../assets/twitter.svg'
import facebook from '../../../assets/facebook.svg'
import instagram from '../../../assets/instagram.svg'


const MainContainer = styled.div`
  width: 40%;
  height: 100vh;
  background-image: ${props => props.theme.LinearGradient}, url(${desk3});
  background-repeat: no-repeat;
  background-size: cover;
`;

const TitleContainer = styled.div`
  height: 66%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const BottomContainer = styled.div`
  height: 34%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const IconsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto auto;
  justify-content: center;
  grid-column-gap: 15px;
  align-items: center;
`;

const SocialButton = styled.button`
   height: 38px;
   width: 38px;
   border-radius: 50%;
   border: none;
   background: rgba(255,255,255,0.44);
   display: flex;
   justify-content: center;
   align-items: center;
   cursor: pointer;
   
    &:focus {
   outline: none;
   }   
`;

const SocialIcon = styled(Icon)`
   height: 16px;
   width: 16px;
`;

const AppButtons = styled(Button)`
  border: 2px rgba(255,255,255,0.22) solid;
  display: flex;
  width: 125px;
  justify-content: center;
  align-items: center;
  &:hover {
  transition: 0.3s;
    background: rgba(255,255,255,0.22);
  }
`;

const Slogan = styled(Title)`
    color: rgba(255,255,255,0.69);
    font-size: 15px;
    font-weight: 300;
    letter-spacing: 0.2px;
    line-height: 22px;
    margin: 6% 0 7% 0;
    text-align: center;
`;

const MotionTitle = styled(Title)`
    color: rgba(255,255,255,0.98);
    font-size: 28px;
    font-weight: 400;
    letter-spacing: 0.8px;
    margin-top: 4%;
`;

const Signature = styled(Title)`
    color: rgba(255,255,255,0.82);
    font-size: 12px;
    font-weight: 300;
    letter-spacing: 0.1px;
    margin: 6% 0 7% 0;
`;

const LeftContainer = () => {
    return <>
        <MainContainer>
            <TitleContainer>
                <Icon src={motionLogo}/>
                <MotionTitle>Motion</MotionTitle>
                <Slogan>Connect with friends and the world <br />around you with Motion</Slogan>
                <IconsContainer>
                    <AppButtons><Icon src={googlePlay}/></AppButtons>
                    <AppButtons><Icon src={appleStore}/></AppButtons>
                </IconsContainer>
            </TitleContainer>
            <BottomContainer>
                <IconsContainer>
                    <SocialButton><SocialIcon src={twitter} /></SocialButton>
                    <SocialButton><SocialIcon src={facebook} /></SocialButton>
                    <SocialButton><SocialIcon src={instagram} /></SocialButton>
                </IconsContainer>
                <Signature>© Motion 2019. All rights reserved.</Signature>
            </BottomContainer>
        </MainContainer>
        </>
};

export default LeftContainer

