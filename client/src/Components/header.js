import React, { Component } from 'react';
import './headerfooter.css';
import { Link } from 'react-router-dom';
import Dropdown from '../constant/dropdownmenu/Dropdown';
import FormLogin from './Login Form/form';

class Header extends Component {
  constructor(props) {
    super(props);
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
    const { dropDownUser } = this.props;
    const value = localStorage.getItem("loggedIn");
    let adminUser = JSON.parse(localStorage.getItem("userData"));
    return (
      <div>
        <div className="container" style={{ paddingLeft: '0px' }}>
          <div className="row">
            <div className="col-md-3 col-lg-3 col-xl-3 d-none d-sm-block">
              <Link rel="noopener noreferrer" to={`/`}>
                <img src="../images/selmore-logo.png" alt='img' className="selmorelogo" />
              </Link>
            </div>
            <div className="col-md-3 col-lg-3 col-xl-2"></div>
            <div className="col-md-6 col-lg-6 col-xl-7 d-none d-sm-block">
              <ul className="nav navsm">
                <li className="nav-item navmargin" >
                  <Link rel="noopener noreferrer" to={`/`}>
                    HOME
                  </Link>
                </li>
                <li className="nav-item navmargin">
                  <Link rel="noopener noreferrer" to={`/about`}>
                    ABOUT
                  </Link>
                </li>
                <li className="nav-item navmargin">
                  <Link rel="noopener noreferrer" to={`/advertising_agency`}>
                    AGENCY
                  </Link>
                </li>
                {adminUser !== null && adminUser.role == 'admin' ?
                  <li className="nav-item navmargin">
                    <Link rel="noopener noreferrer" to={`/dashboard`}>
                      DASHBOARD
                    </Link>
                  </li>
                  :
                  <li className="nav-item navmargin">
                    <Link rel="noopener noreferrer" to={`/faq`}>
                      FAQ
                    </Link>
                  </li>
                }
                {/* {adminUser !== null && adminUser.role == 'admin' ?
                  null
                  :
                  <li className="nav-item navmargin blgs">
                    <a className="nav-link" href="#">
                      BLOG
                    </a>
                  </li>
                } */}
                <li className="nav-item navmargin">
                  <Link rel="noopener noreferrer" to={`/market_place`}>
                    MARKETPLACE
                  </Link>
                </li>
                {adminUser !== null && adminUser.role == 'admin' ?
                  <li className="nav-item navmargin12">
                    <Link rel="noopener noreferrer" to={`/list_add`}>
                      <button type="button" className="btn btn-primary btn-sm">
                        <span> LIST AD </span>
                      </button>
                    </Link>
                  </li>
                  :
                  null
                }
                {/*  not working right now but will work soon
                <li className="nav-item navbiddbtn">
                  <button type="button" className="btn btn-primary btn-sm">
                    <Link rel="noopener noreferrer" to={`/bidding`} style={{ color: "white" }}>
                      <span>BIDDING</span>
                    </Link>
                  </button>
                </li> */}
                {dropDownUser || value
                  ?
                  <li className="nav-item navbtnmarginLog">
                    <Dropdown hideDropDown={this.props.hideDropDown} />
                  </li>
                  :
                  <li className="nav-item navbtnmargin" >
                    <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal" >
                      Login
                  </button>
                    <div class="modal fade" id="myModal">
                      <div class="modal-dialog" style={{ marginRight: '49.5%' }}>
                        <div class="modal-content" style={{ width: '200%', height: '600px' }}>
                          <div class="modal-header">
                            <h4 class="modal-title">Login</h4>
                            <button type="button" class="close" data-dismiss='modal'>&times;</button>
                          </div>
                          <FormLogin showDropDown={this.props.showDropDown} />
                          <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss='modal' id='closss' style={{ marginTop: '-0.5%' }}>Cancel</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                }
                <li className="nav-item navbiddbtn">
                </li>
              </ul>
            </div>
            {/*mobile_menu*/}
            <div className="col-12 d-block d-sm-none">
              <div id="mySidenav" class="menunav">
                <a href="javascript:void(0)" className="closebtn" onClick={this.closeNav}>&times;</a>
                <div className="menunav-content">
                  <ul className="" style={{ marginTop: '-30px' }}>
                    <li className="mob_li" style={{ listStyle: 'none' }}>
                      <Link rel="noopener noreferrer" to={`/`} onClick={this.closeNav}>
                        HOME
                  </Link>
                    </li>
                    <li className="mob_li">
                      <Link rel="noopener noreferrer" to={`/about`} onClick={this.closeNav}>
                        ABOUT
                  </Link>
                    </li>
                    <li className="mob_li">
                      <Link rel="noopener noreferrer" to={`/advertising_agency`} onClick={this.closeNav}>
                        AGENCY
                  </Link>
                    </li>
                    {adminUser !== null && adminUser.role == 'admin' ?
                      <li className="mob_li">
                        <Link rel="noopener noreferrer" to={`/dashboard`} onClick={this.closeNav}>
                          DASHBOARD
                    </Link>
                      </li>
                      :
                      <li className="mob_li">
                        <Link rel="noopener noreferrer" to={`/faq`} onClick={this.closeNav}>
                          FAQ
                    </Link>
                      </li>
                    }
                    {adminUser !== null && adminUser.role == 'admin' ?
                      null
                      :
                      <li className="mob_li">
                        <a className="nav-link" href="#" onClick={this.closeNav}>
                          BLOG
                    </a>
                      </li>
                    }
                    <li className="mob_li">
                      <Link rel="noopener noreferrer" to={`/market_place`} onClick={this.closeNav}>
                        MARKETPLACE
                  </Link>
                    </li>
                    {adminUser !== null && adminUser.role == 'admin' ?
                      <li className="nav-item mob_li">
                        <Link rel="noopener noreferrer" to={`/list_add`} onClick={this.closeNav}>
                          <button type="button" className="btn btn-primary btn-sm mob_butn">
                            <span> LIST AD </span>
                          </button>
                        </Link>
                      </li>
                      :
                      null
                    }
                    {/* <li className="mob_li">
                      <button type="button" className="btn btn-primary btn-sm  mob_butn">
                        <Link rel="noopener noreferrer" to={`/bidding`} onClick={this.closeNav} style={{ color: "white", fontSize: '.875rem' }}>
                          <span>BIDDING</span>
                        </Link>
                      </button>
                    </li> */}
                    {dropDownUser || value
                      ?
                      <li className="nav-item navbtnmargin mob_li">
                        <Dropdown hideDropDown={this.props.hideDropDown} />
                      </li>
                      :
                      <li className="nav-item navbtnmargin mob_li" >
                        <button type="button" class="btn btn-primary btn-sm mob_butn" data-toggle="modal" data-target="#myModal1" onClick={this.closeNav}>
                          Login
                  </button>
                        <div class="modal fade" id="myModal1" style={{ marginTop: '-10px' }}>
                          <div class="modal-dialog">
                            <div class="modal-content" style={{ width: '100%', height: '740px' }}>
                              <div class="modal-header">
                                <h4 class="modal-title">Login</h4>
                                <button type="button" class="close" data-dismiss='modal'>&times;</button>
                              </div>
                              <FormLogin showDropDown={this.props.showDropDown} />
                              <div class="modal-footer" style={{ borderTop: '60px solid #e9ecef' }}>
                                <button type="button" class="btn btn-danger" data-dismiss='modal' id='closss' style={{ marginTop: '-30%' }}>Cancel</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    }
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-12 d-block d-sm-none">
              <div className="col-6">
                <i onClick={this.openNav} className="fa fa-bars" style={{ content: '\f0c9', color: 'black', fontSize: '24px', marginTop: '20px' }}></i>
              </div>
              <div className="col-6 d-block d-sm-none">
                <img src="../images/selmore-logo.png" alt='img' className="mobileselmorelogo" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;