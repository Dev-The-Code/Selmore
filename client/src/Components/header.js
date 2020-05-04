import React, { Component } from 'react';
import './headerfooter.scss';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import Dropdown from '../constant/dropdownmenu/Dropdown';
import FormLogin from './Login Form/form';

class Header extends Component {
  constructor(props) {
    super(props);
  }


  openNav = () => {
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
    const value = JSON.parse(localStorage.getItem("loggedIn"));
    let adminUser = JSON.parse(localStorage.getItem("userData"));
  
    return (
      <div>
        <div className="container" style={{ paddingLeft: '0px' }}>
          <div className="row">
            <div className="col-md-2 col-lg-2 col-xl-2 d-none d-sm-block">
              <Link rel="noopener noreferrer" to={`/home`}>
                <img src="../images/selmore-logo.png" alt='img' className="selmorelogo" />
              </Link>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-3"></div>
            <div className="col-md-8 col-lg-8 col-xl-7 d-none d-sm-block">

              <ul className={value ? 'nav navsm' : 'nav navsm2'}>
                <li className="nav-item navmargin" >
                  <Link rel="noopener noreferrer" to={`/home`}>
                    <span className="navFont">HOME</span>
                  </Link>
                </li>

                <li className="nav-item navmargin">
                  <Link rel="noopener noreferrer" to={`/about`}>
                    <span className="navFont">ABOUT</span>
                  </Link>
                </li>
                <li className="nav-item navmargin">
                  <Link rel="noopener noreferrer" to={`/advertising_agency`}>
                    <span className="navFont">AGENCY</span>
                  </Link>
                </li>


                <li className="nav-item navmargin">
                  <Link rel="noopener noreferrer" to={`/market_place`}>
                    <span className="navFont">MARKETPLACE</span>
                  </Link>
                </li>
                
                  <li className="nav-item navmargin">
                    <Link rel="noopener noreferrer" to={`/megaSale`}>
                      <span className="navFont"> MEGA SALE </span>
                    </Link>
                  </li>
                  <li className="nav-item navmargin">
                    <Link rel="noopener noreferrer" to={`/bidding`}>
                      <span className="navFont"> BIDDING </span>
                    </Link>
                  </li>
                {adminUser !== null && adminUser.role == 'admin' ?
                  <li className="nav-item navmargin">
                    <Link rel="noopener noreferrer" to={`/users`}>
                      <span className="navFont">USERS</span>
                    </Link>
                  </li>
                  : null}
                {adminUser !== null && adminUser.role == 'admin' ?
                  <li className="nav-item navmargin">
                    <Link rel="noopener noreferrer" to={`/cart`}>
                      <span className="navFont">CART</span>
                    </Link>
                  </li>
                  : null}

                {adminUser !== null && adminUser.role == 'admin' ?
                  <li className="nav-item navmargin">
                    <Link rel="noopener noreferrer" to={`/dashboard`}>
                      <span className="navFont">DASHBOARD</span>
                    </Link>
                  </li>
                  :
                  <li className="nav-item navmargin">
                    <Link rel="noopener noreferrer" to={`/faq`}>
                      <span className="navFont">FAQ</span>
                    </Link>
                  </li>
                }
                {adminUser !== null && adminUser.role == 'admin' ?
                  <li className="nav-item navmargin13">
                    <Link rel="noopener noreferrer" to={`/list_add`}>
                      <button type="button" className="btn btn-primary">
                        <span className="navFont" style={{color:'white'}}> LIST AD </span>
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
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" >
                      <span className="navFont" style={{color:'white'}}> LOGIN </span>
                    </button>
                    <div class="modal fade" id="myModal">
                      <div class="modal-dialog" style={{ marginRight: '49.5%' }}>
                        <div class="modal-content" style={{ width: '200%' }}>
                          <div class="modal-header">
                            <h4 class="modal-title">Login</h4>
                            <button type="button" class="close" data-dismiss='modal'>&times;</button>
                          </div>
                          <FormLogin showDropDown={this.props.showDropDown} />
                          <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss='modal' id='closss' style={{ marginTop: '-0.5%' , color:'white'}}>Cancel</button>
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
                      <Link rel="noopener noreferrer" to={`/home`} onClick={this.closeNav}>
                        <span className="navFont">Home</span>
                      </Link>
                    </li>
                    <li className="mob_li">
                      <Link rel="noopener noreferrer" to={`/about`} onClick={this.closeNav}>
                        <span className="navFont">About</span>
                      </Link>
                    </li>
                    <li className="mob_li">
                      <Link rel="noopener noreferrer" to={`/advertising_agency`} onClick={this.closeNav}>
                        <span className="navFont">Agency</span>
                      </Link>
                    </li>
                    {adminUser !== null && adminUser.role == 'admin' ?
                      <li className="mob_li">
                        <Link rel="noopener noreferrer" to={`/cart`}>
                          <span className="navFont">Cart</span>
                        </Link>
                      </li>
                      : null}
                    {adminUser !== null && adminUser.role == 'admin' ?
                      <li className="mob_li">
                        <Link rel="noopener noreferrer" to={`/users`}>
                          <span className="navFont">Users</span>
                        </Link>
                      </li>
                      : null}
                    {adminUser !== null && adminUser.role == 'admin' ?
                      <li className="mob_li">
                        <Link rel="noopener noreferrer" to={`/dashboard`} onClick={this.closeNav}>
                          <span className="navFont">Dashboard</span>
                        </Link>
                      </li>
                      :
                      <li className="mob_li">
                        <Link rel="noopener noreferrer" to={`/faq`} onClick={this.closeNav}>
                          <span className="navFont">Faq</span>
                        </Link>
                      </li>
                    }
                    {adminUser !== null && adminUser.role == 'admin' ?
                      null
                      :
                      <li className="mob_li">
                        <a className="nav-link" href="#" onClick={this.closeNav}>
                          <span className="navFont">Blog</span>
                        </a>
                      </li>
                    }
                    <li className="mob_li">
                      <Link rel="noopener noreferrer" to={`/market_place`} onClick={this.closeNav}>
                        <span className="navFont">Market Place</span>
                      </Link>
                    </li>
                    <li className="mob_li">
                      <button type="button" class="btn btn-primary btn-sm mob_Salebutn" data-toggle="modal" data-target="#myModal1" onClick={this.closeNav}>
                        <Link rel="noopener noreferrer" to={`/megaSale`} onClick={this.closeNav}>
                          <span className="navFont"> Mega Sale</span>
                        </Link>
                      </button>
                    </li>
                    <li className="mob_li">
                      <button type="button" class="btn btn-primary btn-sm mob_butn" data-toggle="modal" data-target="#myModal1" onClick={this.closeNav}>
                        <Link rel="noopener noreferrer" to={`/bidding`} onClick={this.closeNav}>
                          <span className="navFont">Bidding</span>
                        </Link>
                      </button>
                    </li>
                    {adminUser !== null && adminUser.role == 'admin' ?
                      <li className="nav-item mob_li">
                        <Link rel="noopener noreferrer" to={`/list_add`} onClick={this.closeNav}>
                          <button type="button" className="btn btn-primary btn-sm mob_butn">
                            <span className="navFont" style={{color:'white'}}> List Ad </span>
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
                          <span className="navFont">Login</span>
                        </button>
                        <div class="modal fade" id="myModal1" style={{ marginTop: '-10px' }}>
                          <div class="modal-dialog">
                            <div class="modal-content" style={{ width: '100%', height: '740px' }}>
                              <div class="modal-header">
                                <h4 class="modal-title">Login</h4>
                                <button type="button" class="close" data-dismiss='modal' style={{color:'white'}}>&times;</button>
                              </div>
                              <FormLogin showDropDown={this.props.showDropDown} />
                              <div class="modal-footer" style={{ borderTop: '60px solid #e9ecef' }}>
                                <button type="button" class="btn btn-danger" data-dismiss='modal' id='closss' style={{ marginTop: '-30%' ,color:'white'}} style={{}}>Cancel</button>
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