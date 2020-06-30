import React, {useState} from 'react';
import styled from "styled-components";
import {connect} from 'react-redux';
import {GradientButton} from "../../../style/GlobalButtons";
import {Title} from "../../../style/GlobalTitles";
import {BottomRightWrapper, MiddleRightWrapper, TopRightWrapper, FormWrapper} from "../../../style/GlobalWrappers";
import {rem} from 'polished';
import {Input} from "../../../style/GlobalInputs";
import {registrationVerificationAction} from "../../../store/actions/registrationActions";
import Error from '../../Error';

// Styling

const VerificationTitle = styled(Title)`
  margin-bottom: 60px;
`;

const ValidationWrapperForm = styled.div`
    width: 65%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const FormWrapperTop = styled.div`
    width: 100%;
    margin-bottom: ${rem('20px')};
`;

const FormWrapperBottom = styled.div`
     display: grid;
     width: 100%;
     grid-template-columns: 1fr 1fr;
     grid-template-rows: auto;
     grid-column-gap: ${rem('35px')};
     height: 100%;
     margin-bottom: ${rem('70px')};
`;

const ValidationCodeInputContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ValidationCodeInput = styled(Input)`
    width: 100%;
    margin-bottom: ${rem('5px')};
    border-bottom: ${props => props.theme.BorderBottomInput};
`;

const ValidationInputContainer = styled.div`
    width: 100%;
    height: ${rem('60px')};
    display: flex;
    flex-direction: column;
`;

const ValidationInput = styled(Input)`
    width: 100%;
    height: ${rem('55px')};
    margin-bottom: ${rem('8px')};
    border-bottom: ${props => props.theme.BorderBottomInput}
`;

const validationFields = [
    {
        name: 'email',
        placeholder: 'Email',
    },
    {
        name: 'username',
        placeholder: 'Username',
    },
    {
        name: 'first_name',
        placeholder: 'First name',
    },
    {
        name: 'last_name',
        placeholder: 'Last name',
    },
    {
        name: 'password',
        placeholder: 'Password',
    },
    {
        name: 'password_repeat',
        placeholder: 'Password repeat',
    },
];

// Component

const Verification = ({ fieldErrors, nonFieldErrors, networkError, registrationVerificationAction, history}) => {
    const [data, setData] = useState({
        code: '',
        email: '',
        username: '',
        first_name: '',
        last_name: '',
        password: '',
        password_repeat: ''
    })


    const handleInput = e => {
        const name = e.target.name;
        const value = e.target.value;
        setData({...data, [name]: value})
    };

    const handleSubmit = async e => {
        e.preventDefault();
        console.log('Data sent to API', data)
        const response = await registrationVerificationAction(data);
        if (response.status < 400) {
            history.push(`/auth/login`);
        }
        // const loginData = { email: data.email, password: data.password };
        // TODO make loginAction and redirect work
        // const response = await loginAction(loginData);
        // if (response.status === 200) history.push('feed/');
        // console.log("REG VER SUCCESS");
    };

    return <>
        <TopRightWrapper />
        <FormWrapper onSubmit={handleSubmit}>
            <MiddleRightWrapper>
                <VerificationTitle>Verification</VerificationTitle>
                <ValidationWrapperForm>
                    <FormWrapperTop>
                        <ValidationCodeInputContainer>
                            <ValidationCodeInput
                                value={data.code}
                                placeholder='Validation Code'
                                name='code'
                                onChange={handleInput}
                            />
                            <Error errorMessage={fieldErrors.code} />
                        </ValidationCodeInputContainer>
                    </FormWrapperTop>
                    <FormWrapperBottom>
                        {validationFields.map((item) => {
                            return (
                                <ValidationInputContainer key={item.name}>
                                    <ValidationInput
                                        value={data[item.name]}
                                        placeholder={item.placeholder}
                                        name={item.name}
                                        onChange={handleInput}
                                    />
                                    <Error errorMessage={fieldErrors[item.name]} />
                                </ValidationInputContainer>
                            )
                        })}
                    </FormWrapperBottom>
                    <Error errorMessage={nonFieldErrors ? nonFieldErrors : null} />
                    <Error errorMessage={networkError ? networkError : null} />
                </ValidationWrapperForm>
            </MiddleRightWrapper>
            <BottomRightWrapper>
                <GradientButton>COMPLETE</GradientButton>
            </BottomRightWrapper>
        </FormWrapper>
    </>
};

const mapStateToProps = state => {
    return {
        fieldErrors: state.signUpReducer.verificationErrors,
        nonFieldErrors: state.signUpReducer.verificationErrors.non_field_errors,
        networkError: state.errorReducer.error
    };
};

export default connect(mapStateToProps, {registrationVerificationAction})(Verification);
