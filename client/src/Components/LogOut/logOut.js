import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class LogOut extends Component {
    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this)
    }
    signOut() {
        localStorage.removeItem('loggedIn');
        return <Redirect to='/' />
    }
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            </div>
        )
    }
}
export default LogOut;
