import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isAuth } from './Auth';

function LogInRedirect({ path, Component }) {
    return (
        <Route path={path} exact
            render={props => isAuth() ?
                <Redirect to="/order" /> :
                <Component {...props} />
            }
        />        
    )
}

export default LogInRedirect;