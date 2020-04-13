import React, { Component } from 'react';
import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
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
    console.log('logOut')
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


  openNav = () => {
    console.log(document.getElementById("myNav"))
    document.getElementById("mySideNav").style.width = "100%";

  }
  openNav = () => {
    document.getElementById("mySidenav").style.width = "100%";
  }

  closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
  }


  render() {
    let userName = JSON.parse(localStorage.getItem('userName'));
    const Dropmenu = (
      <Menu>
        <Menu.Item className="dropdownTextHover">
          <Link rel="noopener noreferrer" to={`/profile`}>
            <span className="menuTextinDrop">Profile</span>
          </Link>
        </Menu.Item>
        <Menu.Item className="dropdownTextHover">
          <Link rel="noopener noreferrer" to={`/dashboard`}>
            <span className="menuTextinDrop">Dashboard</span>
          </Link>
        </Menu.Item>
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

        {/* <div className="d-none d-sm-block">
          <MDBDropdown>
            <MDBDropdownToggle caret color="primary" className='toogle dropdown-toggle'>
              <div className='userName dropdown-toggle'>
                <span className="navFont" style={{ color: 'white' }}>{userName}</span>
              </div>
            </MDBDropdownToggle>
            <MDBDropdownMenu basic>
              <MDBDropdownItem>
                <Link rel="noopener noreferrer" to={`/profile`}>Profile</Link>
              </MDBDropdownItem>
              <MDBDropdownItem>
                <Link rel="noopener noreferrer" to={`/dashboard`}>Dashboard</Link>
              </MDBDropdownItem>
              <MDBDropdownItem onClick={this.logOut}>
                <Link rel="noopener noreferrer" to={`/home`}>
                  Log Out
                </Link>
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </div> */}

        {/* <div className="d-block d-sm-none">
          <MDBDropdown>
            <MDBDropdownToggle caret color="primary" className='toogle dropdown-toggle mob_butn'>
              <div className='userName dropdown-toggle'
              >{userName}</div>
            </MDBDropdownToggle>
            <MDBDropdownMenu basic>
              <MDBDropdownItem className="mob_butn_pro">
                <Link rel="noopener noreferrer" to={`/profile`} onClick={this.closeNav}>
                  <h5>Profile</h5>
                </Link>
              </MDBDropdownItem>
              <MDBDropdownItem className="mob_butn_log" onClick={this.logOut} onClick={this.closeNav}>
                <Link rel="noopener noreferrer" to={`/home`} onClick={this.closeNav}>
                  <h5>Log Out</h5>
                </Link>
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </div> */}
      </div>
    );
  }
}
export default Dropdownn;














// import React from 'react';
// import {Dropdown ,DropdownButton} from 'react-dom'



// class Dropdow extends React.Component {
//   constructor() {
//     super();

//     // this.state = {
//     //   displayMenu: false,
//     // };

//     // this.showDropdownMenu = this.showDropdownMenu.bind(this);
//     // this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

//   };

//   // showDropdownMenu(event) {
//   //   event.preventDefault();
//   //   this.setState({ displayMenu: true }, () => {
//   //     document.addEventListener('click', this.hideDropdownMenu);
//   //   });
//   // }

//   // hideDropdownMenu() {
//   //   this.setState({ displayMenu: false }, () => {
//   //     document.removeEventListener('click', this.hideDropdownMenu);
//   //   });

//   // }

//   render() {
//     return (
//       <div className='container'>
//         {/* <div className="row">

//           <div className="col-md-8 col-lg-8 col-xl-8 d-none d-sm-block">
//             <div className="button btn btn-primary btn-sm" onClick={this.showDropdownMenu}> User Name </div>

//             {this.state.displayMenu ? (
//               <ul className="nav navsm">
//                 <li className="nav-item navmargin12" >
//                   <button className="active btn btn-primary btn-sm">My Profile</button>
//                 </li>
//                 <li className="nav-item navbiddbtn">
//                   <button className="btn btn-primary btn-sm">Log Out</button>
//                 </li>
//               </ul>
//             ) :
//             (
//               null
//               )
//             }
//           </div>
//         </div> */}
//         {/* <li><a href="#Manage Pages">Manage Pages</a></li>
//       <li><a href="#Create Ads">Create Ads</a></li>
//       <li><a href="#Manage Ads">Manage Ads</a></li>
//       <li><a href="#Activity Logs">Activity Logs</a></li>
//       <li><a href="#Setting">Setting</a></li> */}
//         <DropdownButton id="dropdown-basic-button" title="Dropdown button">
//           <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
//           <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
//           <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
//         </DropdownButton>;
//       </div>
//     );
//   }


// }


// export default Dropdow;