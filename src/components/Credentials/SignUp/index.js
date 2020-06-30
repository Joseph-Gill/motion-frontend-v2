import React, {useState} from 'react';
import styled from "styled-components";
import {rem} from 'polished';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Button, GradientButton} from "../../../style/GlobalButtons";
import {Message, Title} from "../../../style/GlobalTitles";
import {BottomRightWrapper, FormWrapper, MiddleRightWrapper, TopRightWrapper} from "../../../style/GlobalWrappers";
import {Input} from "../../../style/GlobalInputs";
import emailIcon from '../../../assets/email.png';
import Error from "../../Error";
import {signUpAction} from '../../../store/actions/registrationActions';

// Styling

const SignUpMessage = styled(Message)`
    margin-right: ${rem('15px')};
`;

const SignInTitle = styled(Title)`
  margin-bottom: ${rem('40px')};
`;

const EmailIcon = styled.img`
  margin: 0 ${rem('20px')} 0 0;
  width: 30px;
`;

const InputWrapper = styled.div`
    width: ${rem('340px')};
    height: ${rem('58px')};
    border-bottom: solid rgba(149,149,149,0.21) ${rem('2px')};
    margin-bottom: ${rem('10px')};
    display: flex;
    align-items: center;
`;


// Component

const SignUp = ({error, signUpAction, history, match}) => {
    let [email, setEmail] = useState('');

    const handleInputChange = e => setEmail(e.target.value);

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await signUpAction(email);
        if (response.status < 400) {
            history.push(`${match.url}/sent`);
        }
    };
    return <>
        <TopRightWrapper>
            <SignUpMessage>Already have an account?</SignUpMessage>
            <Button>
                <Link to={'/auth/login'}>SIGN IN</Link>
            </Button>
        </TopRightWrapper>
        <FormWrapper onSubmit={handleSubmit}>
            <MiddleRightWrapper>
                <SignInTitle>Sign Up</SignInTitle>
                <InputWrapper>
                    <EmailIcon src={emailIcon} alt='email icon'/>
                    <Input placeholder='Email' value={email} onChange={handleInputChange}/>
                </InputWrapper>
                {<Error errorMessage={error} />}
            </MiddleRightWrapper>
            <BottomRightWrapper>
                <GradientButton>
                    Continue
                </GradientButton>
            </BottomRightWrapper>
        </FormWrapper>
    </>
};

const mapStateToProps = state => {
    return {
        error: state.signUpReducer.error
    };
};

export default connect(mapStateToProps, {signUpAction})(SignUp)