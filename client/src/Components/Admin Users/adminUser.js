import React, { Component } from 'react';
import './adminUser.css';
import Header from '../header';
import Footer from '../footer';
import UserPanel1 from './adminUserPanel1';
import { Link } from 'react-router-dom';


class Users extends Component {
    render() {
        const { } = this.props;
        return (
            <div>
                <Header  showDropDown={this.props.showDropDown} hideDropDown={this.props.hideDropDown} dropDownUser={this.props.dropDownUser}/>
                <UserPanel1 />
                <Footer />
            </div>
        );
    }
}

export default Users;