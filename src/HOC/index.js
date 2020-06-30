import React, {useEffect} from 'react';
import {connect} from 'react-redux'

export default WrappedComponent => {
    const AuthComponent = (props) => {
        const {authenticated, history, location} = props;

        useEffect(() => {
            const userRedirect = () => {
                const path = location.pathname;
                if(path.includes('auth') && authenticated) {
                    history.push('/feed');
                } else if (!path.includes('auth') && !authenticated) {
                    history.push('auth/login');
                }

            };
            userRedirect()
        }, [authenticated, history, location]);
        return <WrappedComponent {...props} />
    }
    const mapStateToProps = (state) => ({
        authenticated: state.loginReducer.authenticated
    });
    return connect(mapStateToProps)(AuthComponent);
}

// TODO consider replacing this HOC with a simple redirect in the <App> using the same kind of logic inside a useEffect
// TODO refresh token every so often to prevent access from expiring
// TODO when token expired, try refresh first before redirect to login page
// TODO needs a check to redirect from baseURL to either /feed or /login