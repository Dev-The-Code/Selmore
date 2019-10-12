import React, { Component } from 'react';
import Header from '../header';
import ProfileView from './profileView';
import NewProfile from './newProfile';
import Panel1 from '../panel1';
import Panel2 from '../panel2';
import Footer from '../footer';



class Profile extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        window.scrollTo(0,0);
    }
    render() {
        return (
            <div>
                 <Header showDropDown = {this.props.showDropDown} hideDropDown = {this.props.hideDropDown} dropDownUser = {this.props.dropDownUser} />
                <ProfileView/>
                <NewProfile/>
                
            </div>
        )
    }

}

export default Profile;
