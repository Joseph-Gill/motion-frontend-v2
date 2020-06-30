import React from "react";
import AuthComponent from '../HOC/index'
import Credentials from "../components/Credentials";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


const Routes = () => {
    return <>
        <Router>
            <Switch>
                <Route path={'/auth'} component={AuthComponent(Credentials)}/>
            </Switch>
        </Router>
    </>
}

export default Routes