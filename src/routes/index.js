import React from "react";
import AuthComponent from '../HOC/index'
import Credentials from "../components/Credentials";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navigation from "../components/Navigation";
import Feed from "../components/Feed";



const Routes = () => {
    return <>
        <Router>
            <Switch>
                <Route path={'/auth'} component={AuthComponent(Credentials)}/>
                <Navigation>
                    <Route path={'/feed'} component={AuthComponent(Feed)}/>

                </Navigation>
            </Switch>
        </Router>
    </>
}

export default Routes