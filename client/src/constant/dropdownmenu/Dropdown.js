import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import './style.scss';


class Dropdownn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      logout: false
    }
    this.logOut = this.logOut.bind(this)
  }

  //clear local storage & redirect to Home
  logOut() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('coords');
    localStorage.removeItem('userData');
    this.setState({
      logout: true
    })
    this.props.hideDropDown();
    return <Redirect to={{ pathname: '/' }} />
  }


  // openNav = () => {
  //   document.getElementById("mySideNav").style.width = "100%";

  // }
  // openNav = () => {
  //   document.getElementById("mySidenav").style.width = "100%";
  // }

  // closeNav = () => {
  //   document.getElementById("mySidenav").style.width = "0";
  // }


  render() {
    let userName = JSON.parse(localStorage.getItem('userName'));
    let adminUser = JSON.parse(localStorage.getItem("userData"));

    const Dropmenu = (
      <Menu>
        <Menu.Item className="dropdownTextHover">
          <Link rel="noopener noreferrer" to={`/profile`}>
            <span className="menuTextinDrop">Profile</span>
          </Link>
        </Menu.Item>
        {adminUser !== null && adminUser.role == 'admin' ?
          <Menu.Item className="dropdownTextHover">
            <Link rel="noopener noreferrer" to={`/dashboard`}>
              <span className="menuTextinDrop">Dashboard</span>
            </Link>
          </Menu.Item> : null
        }
        {adminUser !== null && adminUser.role == 'admin' ?
          <Menu.Item className="dropdownTextHover">
            <Link rel="noopener noreferrer" to={`/cart`}>
              <span className="menuTextinDrop">Cart</span>
            </Link>
          </Menu.Item> : null
        }
        {adminUser !== null && adminUser.role == 'admin' ?
          <Menu.Item className="dropdownTextHover">
            <Link rel="noopener noreferrer" to={`/users`}>
              <span className="menuTextinDrop">Users</span>
            </Link>
          </Menu.Item> : null
        }

        <Menu.Item onClick={this.logOut} className="dropdownTextHover">
          <Link rel="noopener noreferrer" to={`/home`} onClick={this.closeNav}>
            <span className="menuTextinDrop">Log Out</span>
          </Link>
        </Menu.Item>
      </Menu>
    );
    return (
      <div>

        <div className="d-none d-sm-block">
          <Dropdown overlay={Dropmenu} >
            <div className='ant-dropdown-link' onClick={e => e.preventDefault()}>
              <button className="btn userControlBtn">{userName} <i class="fa fa-arrow-down"></i></button>
            </div>
          </Dropdown>
        </div>
        <div className="d-block d-sm-none">
          <Dropdown overlay={Dropmenu} >
            <div className='ant-dropdown-link' onClick={e => e.preventDefault()}>
              <button className="btn userControlBtnMOB">{userName} <i class="fa fa-arrow-down"></i></button>
            </div>
          </Dropdown>
        </div>

     
      </div>
    );
  }
}
export default Dropdownn;