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