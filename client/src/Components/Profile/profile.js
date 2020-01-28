import React, { Component } from 'react';
import Header from '../header';
import ProfileView from './profileView';
import NewProfile from './newProfile';
import Panel1 from '../panel1';
import Panel2 from '../panel2';
import Footer from '../footer';



class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
          dropDownUser: false,
        }
      }
    
      componentWillMount() {
        window.scrollTo(0, 0);
      }
    
      showDropDown = () => {
        this.setState({
          dropDownUser: true
        })
      }
    
      hideDropDown = () => {
        this.setState({
          dropDownUser: false
        })
      }
    
      render() {
        const { dropDownUser } = this.state;
        return (
            <div>
                 <Header showDropDown = {this.showDropDown} hideDropDown = {this.hideDropDown} dropDownUser = {dropDownUser} />
                <ProfileView/>
                <NewProfile/>
                
            </div>
        )
    }

}

export default Profile;
