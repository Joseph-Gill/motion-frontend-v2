import React, {useState} from 'react';
import styled from "styled-components";
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {rem} from 'polished'
import {Button, GradientButton} from "../../../style/GlobalButtons";
import {Message, Title} from "../../../style/GlobalTitles";
import lock from '../../../assets/lock.svg'
import user from '../../../assets/user.svg'
import {Input} from "../../../style/GlobalInputs";
import {BottomRightWrapper, FormWrapper, MiddleRightWrapper, TopRightWrapper} from "../../../style/GlobalWrappers";
import {loginAction} from "../../../store/actions/loginActions";
import Error from "../../Error";

// Styling

const SignUpMessage = styled(Message)`
  margin-right: ${rem('15px')};
`;

const LoginIcon = styled.img`
  margin: 0 ${rem('20px')} 0 ${rem('5px')}
`;

const InputWrapper = styled.div`
  width: ${rem('340px')};
  height: ${rem('58px')};
  border-bottom: solid rgba(149,149,149,0.21) ${rem('2px')};
  margin-bottom: ${rem('20px')};
  display: flex;
  align-items: center;
`;

const SignInTitle = styled(Title)`
  margin-bottom: ${rem('40px')};
`;

const SignInButton = styled(GradientButton)`
  a {
    font-size: 1rem;
  }
  &:hover {
    background: ${props => props.theme.LinearGradientHover};
  }
`;

// Component

const Login = ({error, loginAction, history, match}) => {
    const [email, setEmail] = useState('raloxew683@lerwfv.com');
    const [password, setPassword] = useState('password01');

    const inputHandler = (e, fn) => {
        fn(e.currentTarget.value)
    };

    const loginHandler = async e => {
        e.preventDefault();
        const loginData = {email, password};
        const response = await loginAction(loginData);
        if (response.status === 200) history.push('feed/');
    };

    return <>
        <TopRightWrapper>
            <SignUpMessage>Don't have an account?</SignUpMessage>
            <Button>
                <Link to={'/auth/signup'}>SIGN UP</Link>
            </Button>
        </TopRightWrapper>
        <FormWrapper onSubmit={loginHandler}>
            <MiddleRightWrapper>
                <SignInTitle>Sign In</SignInTitle>
                <InputWrapper>
                    <LoginIcon src={user} alt='user icon'/>
                    <Input
                        type='text'
                        placeholder='Email'
                        value={email}
                        name='email'
                        onChange={e => inputHandler(e, setEmail)}
                    />
                </InputWrapper>
                <InputWrapper>
                    <LoginIcon src={lock} alt='lock icon'/>
                    <Input
                        type='password'
                        placeholder='Password'
                        value={password}
                        name='password'
                        onChange={e => inputHandler(e, setPassword)}
                    />
                </InputWrapper>
                {<Error errorMessage={error}/>}
            </MiddleRightWrapper>
            <BottomRightWrapper>
                <SignInButton onClick={loginHandler}>SIGN IN</SignInButton>
            </BottomRightWrapper>
        </FormWrapper>
    </>
};

const mapStateToProps = state => {
    return {
        error: state.loginReducer.error
    };
};

export default withRouter(connect(mapStateToProps, {loginAction})(Login));