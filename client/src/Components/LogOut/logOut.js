import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class LogOut extends Component {
    constructor(props) {
        super(props);
        this.signOut = this.signOut.bind(this)
    }
    componentWillMount() {
        window.scrollTo(0,0);
    }
    signOut() {
        localStorage.removeItem('loggedIn');
        return <Redirect to='/home' />
    }
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            </div>
        )
    }
}
export default LogOut;
