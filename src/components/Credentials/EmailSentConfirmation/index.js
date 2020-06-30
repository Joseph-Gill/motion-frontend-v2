import React from 'react';
import styled from "styled-components";
import {GradientButton} from "../../../style/GlobalButtons";
import {Message, Title} from "../../../style/GlobalTitles";
import check from '../../../assets/check.jpg'
import {rem} from 'polished';
import {Link} from "react-router-dom";
import {BottomRightWrapper, FormWrapper, MiddleRightWrapper, TopRightWrapper} from "../../../style/GlobalWrappers";

// Styling

const CheckImage = styled.img`
  width: ${rem('90px')};
  margin: ${rem('37px')} 0;
`;

const EmailSentMessage = styled(Message)`
  letter-spacing:${rem('0.6px')};
  font-weight: 300;
  font-size: ${rem('15px')};
  margin-bottom: ${rem('5px')};
`;

const EmailUserMessage = styled(Message)`
  letter-spacing:${rem('0.6px')};
  font-weight: 500;
   font-size: ${rem('15px')};
   color: rgba(0,0,0,0.74);
`;

// Component

const EmailSentConfirmation = ({ emailValue }) => {
  return <>
    <TopRightWrapper />
    <FormWrapper>
      <MiddleRightWrapper>
        <Title>Congratulations!</Title>
        <CheckImage src={check} />
        <EmailSentMessage>We've sent a confirmation code to your email</EmailSentMessage>
        <EmailUserMessage>{emailValue}</EmailUserMessage>
      </MiddleRightWrapper>
      <BottomRightWrapper>
        <GradientButton>
          <Link to={`/auth/signup/validation`}>CONTINUE</Link>

        </GradientButton>
      </BottomRightWrapper>
    </FormWrapper>
  </>
};

export default EmailSentConfirmation;
