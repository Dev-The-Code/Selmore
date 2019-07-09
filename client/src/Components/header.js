import React, { Component } from 'react';
import './headerfooter.css';
import { Link, withRouter } from 'react-router-dom';
import Dropdown from '../constant/dropdownmenu/Dropdown';
import FormLogin from './Login Form/form';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: 'modal',
      propUser: false,
      showDasboardandListAdd: false,
      hiddenModal: '',
      dropDownUser: false
    }
  }
  async componentDidMount() {
    let adminUser = JSON.parse(localStorage.getItem("userData"));
    if (adminUser != null) {
      if (adminUser.role == 'admin') {
        this.StateSetForShowDashboard()
      }
    }
  }
  // componentWillMount() {
  //   let loggedIn = this.props.logedIn;
  //   if (loggedIn) {
  //     this.setState({
  //       propUser: true
  //     })
  //   }

  // }
  // componentWillUpdate() {
  //   let adminUser = JSON.parse(localStorage.getItem("userData"));
  //   if (adminUser != null) {
  //     if (adminUser.role == 'admin') {
  //       this.StateSetForShowDashboard()
  //     }
  //   }
  // }
  StateSetForShowDashboard = () => {
    let adminUser = JSON.parse(localStorage.getItem("userData"));
    console.log(adminUser)
    if(adminUser !== null){
       if (adminUser.role == 'admin') {
      this.setState({
        showDasboardandListAdd: true
      })
    }
    }
   
    this.setState({
      showDasboardandListAdd: true
    })
  }
  hideStateSetForShowDashboard = () => {
    this.setState({
      showDasboardandListAdd: false
    })
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
    const { showDasboardandListAdd, dropDownUser } = this.state;
    const value = localStorage.getItem("loggedIn");
    let adminUser = JSON.parse(localStorage.getItem("userData"));
    console.log(showDasboardandListAdd);
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-3 col-lg-3 col-xl-3">
              <img src="../images/selmore-logo.png" className="selmorelogo" />
            </div>
            <div className="col-md-9 col-lg-9 col-xl-9 d-none d-sm-block">
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
                {showDasboardandListAdd ?
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
                {showDasboardandListAdd ?
                  null
                  :
                  <li className="nav-item navmargin" style={{ marginTop: "28px" }}>
                    <a className="nav-link" href="#">
                      BLOG
                    </a>
                  </li>
                }
                <li className="nav-item navmargin">
                  <Link rel="noopener noreferrer" to={`/market_place`}>
                    MARKETPLACE
                  </Link>
                </li>
                {showDasboardandListAdd ?
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
                <li className="nav-item navbiddbtn">
                  <button type="button" className="btn btn-primary btn-sm">
                    <Link rel="noopener noreferrer" to={`/bidding`} style={{ color: "white" }}>
                      <span>BIDDING</span>
                    </Link>
                  </button>
                </li>
                {dropDownUser || value
                  ?
                  <li className="nav-item navbtnmargin">
                    <Dropdown hideDropDown={this.hideDropDown} hideStateSetForShowDashboard={this.hideStateSetForShowDashboard} />
                  </li>
                  :
                  <li className="nav-item navbtnmargin" >
                    <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal" >
                      Login
                  </button>
                    <div class="modal fade" id="myModal">
                      <div class="modal-dialog" style={{ marginRight: '650px' }}>
                        <div class="modal-content" style={{ width: '200%', height: '600px' }}>
                          <div class="modal-header">
                            <h4 class="modal-title">Login</h4>
                            <button type="button" class="close" data-dismiss='modal'>&times;</button>
                          </div>
                          <FormLogin showDropDown={this.showDropDown} StateSetForShowDashboard={this.StateSetForShowDashboard} />
                          <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss='modal' id='closss'>Cancel</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  //   <Modal >
                  //   <Modal.Header closeButton>
                  //     <Modal.Title>Modal heading</Modal.Title>
                  //   </Modal.Header>
                  //   <Modal.Body> <FormLogin /></Modal.Body>
                  //   <Modal.Footer>
                  //     <button variant="secondary" >
                  //       Close
                  //     </button>
                  //     <button variant="primary">
                  //       Save Changes
                  //     </button>
                  //   </Modal.Footer>
                  // </Modal>
                }
                <li className="nav-item navbiddbtn">
                </li>
              </ul>
            </div>


{/*mobile_menu*/}


            {/*<div className="d-block d-sm-none">
              <div id="side_menu" class="mobile_menu">
                <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
                <a href="#">
                  <Link rel="noopener noreferrer" to={`/`}>
                    HOME
                  </Link></a>
                <a href="#">
                  <Link rel="noopener noreferrer" to={`/about`}>
                    ABOUT
                  </Link></a>
                <a href="#">
                  <Link rel="noopener noreferrer" to={`/advertising_agency`}>
                    AGENCY
                  </Link></a>
                  {showDasboardandListAdd ?
                <a href="#">
                  <Link rel="noopener noreferrer" to={`/dashboard`}>
                    DASHBOARD
                  </Link></a>
                  :
                <a href="#">
                  <Link rel="noopener noreferrer" to={`/faq`}>
                    FAQ
                  </Link>
                </a>
                }
                {showDasboardandListAdd ?
                  null
                  :
                <a className="nav-link"  href="#">
                  BLOG
                </a>
                }
                <a href="#">
                  <Link rel="noopener noreferrer" to={`/market_place`}>
                    MARKETPLACE
                  </Link>
                </a>
                {showDasboardandListAdd ?

                <Link rel="noopener noreferrer" to={`/list_add`}>
                  <button type="button" className="btn btn-primary btn-sm">
                    <span> LIST AD </span>
                  </button>
                </Link>

                :
                  null
                }

                <button type="button" className="btn btn-primary btn-sm">
                  <Link rel="noopener noreferrer" to={`/bidding`} style={{ color: "white" }}>
                    <span>BIDDING</span>
                  </Link>
                </button>

                {dropDownUser || value
                  ?

// kaam karna he is me
              </div>

              <h2>Animated Sidenav Example</h2>
              <p>Click on the element below to open the side navigation menu.</p>
              <span style="font-size:30px;cursor:pointer" onclick="openNav()">&#9776; open</span>

            </div>*/}









          </div>
        </div>
      </div>
    );
  }
}

export default Header;
