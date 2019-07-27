import React, { Component } from 'react';
import Header from '../header';
import Panel1 from '../panel1';
import Panel2 from '../panel2';
import Footer from '../footer';
import ProfileView from './profileView';



class Profile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                 <Header showDropDown = {this.props.showDropDown} hideDropDown = {this.props.hideDropDown} dropDownUser = {this.props.dropDownUser} />
                <ProfileView/>
                <Panel1 />
                <Panel2 />
                <Footer />
            </div>
        )
    }

}

export default Profile;
