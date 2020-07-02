import React, { useEffect } from 'react';
import styled from 'styled-components'
import { Button } from "../../../style/GlobalButtons";
import { UserIcon } from "../../../style/GlobalIcons";
import { getMyProfileAction } from "../../../store/actions/userActions";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import ProfileTabs from './ProfileTabs';
import GenericTagList from '../../GenericTagList';


const FullCardContainer = styled.div`
    margin: 0 auto;
    margin-bottom: 2rem;
    background-color: white;
    border-radius: 4px;
    height: 400px;
    /* width: 80%; */
    box-shadow: 1px 1px 20px -5px #AEAEAE;
    max-width: 1180px;
    display: grid;
    grid-template-columns: 325px auto auto;
    grid-template-rows: auto auto 100px;
    grid-template-areas: 
      "left top-right top-right top-right"
      "left top-right top-right top-right"
      "left bottom-right bottom-right bottom-right"
      ;
`;

const FullCardLeft = styled.div`
    grid-area: left;
    border-right: 1px solid #ccc;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
`;

const EditButton = styled(Button)`
    margin-top: 2rem;

`;
const FullCardTopRight = styled.div`
    grid-area: top-right;
    /* background: red; */
    padding: 2rem;
    padding-bottom: 0.5rem;
   
`;

const FullCardBottomRight = styled.div`
    grid-area: bottom-right;
    border-top: 1px solid #ccc;
    /* background: orange; */
`;

const UserProfilePicIcon = styled(UserIcon)`
    height: 78px;
    width: 78px;
    margin-bottom: 1rem;
`;

const NameTitle = styled.p`
    font-size: 1.5rem;
    margin-bottom: 0.5rem;

`;

const LocationTitle = styled.p`
    font-weight: 300;
    font-size: 0.85rem;
`;

const Data = styled.div`
    padding: 0 2rem;
`;

const DataTop = styled(Data)`
    overflow: auto;
    width: 50%;
    height: 70%;
`;

const DataTitle = styled.p`
    font-weight: 700;
    margin-bottom: 1rem;
`;

const DataContent = styled.div`

`;

const DataText = styled.p`

`;


const PublicDataWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 70%;
`;


const PrivateDataWrapper = styled.div`
    display: flex;
    flex-direction: row;

`;


const UserProfileFullCard = ({ meData, getMyProfileAction, history }) => {
    const { last_name, first_name, avatar, location, about_me, email, phone, things_user_likes } = meData;

    useEffect(() => {
        getMyProfileAction();
    }, [getMyProfileAction]);

    const editHandler = function () {
        history.push('/userProfileUpdate')
    };

    return <>
        <FullCardContainer>

            <FullCardLeft>
                <UserProfilePicIcon src={avatar || 'https://via.placeholder.com/50x50'} />
                <NameTitle>{`${first_name} ${last_name}`}</NameTitle>
                <LocationTitle >{location}</LocationTitle>
                <EditButton onClick={editHandler}>Edit Profile</EditButton>
            </FullCardLeft>

            <FullCardTopRight>
                <PublicDataWrapper>
                    <DataTop>
                        <DataTitle>About</DataTitle>
                        <DataContent>
                            <DataText>{about_me}</DataText>
                        </DataContent>
                    </DataTop>

                    <DataTop>
                        <DataTitle>Things I Like</DataTitle>
                        <GenericTagList tags={things_user_likes} />
                    </DataTop>
                </PublicDataWrapper>

                <PrivateDataWrapper>
                    <Data>
                        <DataTitle>Email</DataTitle>
                        <DataText>{email}</DataText>
                    </Data>

                    <Data>
                        <DataTitle>Phone</DataTitle>
                        <DataText>{phone || '000-000-00-00'}</DataText>
                    </Data>
                </PrivateDataWrapper>
            </FullCardTopRight>

            <FullCardBottomRight>
                <ProfileTabs />
            </FullCardBottomRight>

        </FullCardContainer>

    </>
};


const mapStateToProps = state => {
    return {
        meData: state.userProfileReducer.meData
    };
};


export default connect(mapStateToProps, { getMyProfileAction })(withRouter(UserProfileFullCard));



// TODO change backend to make it possible to change things_user_likes (via nested serialization on PATCH of users/me)
