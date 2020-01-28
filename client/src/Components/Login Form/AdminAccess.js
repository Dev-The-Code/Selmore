import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AdminAccess = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
       localStorage.getItem('admin') 
            ? <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
            :
            <Component {...props} />
    )
    } />
)