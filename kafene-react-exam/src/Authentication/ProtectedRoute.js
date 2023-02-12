import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import {isAuth} from '../Authentication/Auth'

const ProtectedRoute = ({Component, ...rest}) => {
    return ( 
        <Route {...rest} 
        render = {props => 
        isAuth() ? <Component {...props}/> : 
            <Redirect to="/" />
        }/>
     );
}
 
export default ProtectedRoute;