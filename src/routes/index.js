import React from "react";
import AuthComponent from '../HOC/index'
import Credentials from "../components/Credentials";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navigation from "../components/Navigation";
import Feed from "../components/Feed";
import ModalPostDetail from "../components/ModalPostDetail";
import ModalNewPost from '../components/ModalNewPost';
import FindFriends from "../components/FindFriends";
import UserDetail from "../components/UserDetail";
import UserProfile from "../components/UserProfile";
import UpdateProfile from "../components/UserProfile/UpdateProfile";

const Routes = () => {
    return <>
        <Router>
            <ModalPostDetail />
            <ModalNewPost />
            <Switch>
                <Route path={'/auth'} component={AuthComponent(Credentials)}/>
                <Navigation>
                    <Route exact path='/' component={AuthComponent(Feed)}/>
                    <Route exact path='/users' component={AuthComponent(FindFriends)}/>
                    <Route path='/users/:userId' component={AuthComponent(UserDetail)}/>
                    <Route exact path='/userProfile' component={AuthComponent(UserProfile)}/>
                    <Route exact path='/userProfileUpdate' component={AuthComponent(UpdateProfile)}/>
                </Navigation>
            </Switch>
        </Router>
    </>
};

export default Routes