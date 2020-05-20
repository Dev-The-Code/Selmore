import React, { Component } from 'react';
import './adminUser.scss';
import Header from '../Header/mainheader';
import Footer from '../Footer/mainFooter';
import UserPanel1 from './adminUserPanel1';


class Users extends Component {
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
                <Header  showDropDown={this.showDropDown} hideDropDown={this.hideDropDown} dropDownUser={dropDownUser}/>
                <UserPanel1 />
                <Footer />
            </div>
        );
    }
}

export default Users;