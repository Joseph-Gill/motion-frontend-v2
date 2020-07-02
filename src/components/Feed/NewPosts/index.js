import React, {useState} from 'react';
import styled from "styled-components";
import {connect} from 'react-redux';
import sendIcon from '../../../assets/send_buton.svg';
import {Icon, UserIcon} from "../../../style/GlobalIcons";
import {GradientCircleContainer} from "../../../style/GlobalWrappers";
import {Input} from "../../../style/GlobalInputs";
import {setModal} from '../../../store/actions/modalActions';

// Styling

const NewPostContainer = styled.div`
  width: 560px;
  height: 122px;
  background: white;
  box-shadow: 
        0 3px 20px rgba(229,229,229,0.73), 
        0 0 0 1px rgba(221,221,221,0.75);
  border-radius: 5px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  cursor:pointer;
  transition: box-shadow 0.3s;

  &:hover {
        box-shadow: 
        0 3px 20px rgba(229,229,229,0.73), 
        0 1px 1px 0 rgba(0,0,0,0.14), 
        0 2px 1px -1px rgba(0,0,0,0.12), 
        0 1px 3px 0 rgba(0,0,0,0.20),
        0 0 0 1px rgba(221,221,221,0.75);
    }
`;

const SendButtonContainer = styled(GradientCircleContainer)`
    height: 60px;
    width: 60px;
    min-width: 60px;
    position: static;
`;

const BigUserIcon = styled(UserIcon)`
    height: 60px;
    width: 60px;
    min-width: 60px;
    margin-right: 2rem;
`;

// Component

const NewPost = ({me, setModal}) => {
    const [content, setContent] = useState('');

    const handleOpenModalNewPost = (e) => {
        setModal('ModalNewPost', null, true);
    }

    return <>
        <NewPostContainer>
            <BigUserIcon src={me.avatar ? me.avatar : ''}/>
            <Input
                onClick={handleOpenModalNewPost}
                value={content}
                onChange={e => setContent(e.target.value)}
                placeholder={`What's on your mind, ${me.first_name}`}/>
            <SendButtonContainer onClick={handleOpenModalNewPost}>
                <Icon src={sendIcon}/>
            </SendButtonContainer>
        </NewPostContainer>
    </>
};

const mapStateToProps = state => {
    return {
        me: state.userProfileReducer.meData
    };
};

// the second argument of connect is called "mapDispatchToProps" --> https://react-redux.js.org/using-react-redux/connect-mapdispatch
export default connect(mapStateToProps, {setModal})(NewPost);