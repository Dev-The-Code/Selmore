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
      showDasboardandLisAdd: false,
      hiddenModal: false
    }
  }
  async componentDidMount() {

    this.StateSetForShowDashboard()
  }
  componentWillMount() {
    let loggedIn = this.props.logedIn;
    if (loggedIn) {
      this.setState({
        propUser: true
      })
    }
  }
  StateSetForShowDashboard = () => {
    let adminUser = JSON.parse(localStorage.getItem("userName"));
    if (adminUser == 'admin') {
      console.log('admin')
      this.setState({
        showDasboardandLisAdd: true
      })
    }
  }
  // async componentDidMount() {
  //   let value = await localStorage.getItem("loggedIn");
  //   console.log(value)
  //   if (value) {
  //     this.setState({
  //       propUser: true
  //     })
  //   }
  //   // let data = this.props.userName
  //   // console.log(data, 'header')
  //   // console.log(value, 'values of the header')
  //   // if (data) {
  //   //   console.log(data, 'data in header')
  //   //   this.setState({
  //   //     propUser: true
  //   //   })
  //   // }
  //   // else if (value) {
  //   //   console.log(value, 'data in header from local storage')
  //   //   this.setState({
  //   //     propUser: true
  //   //   })
  //   // }
  // }
  modalDis = () => {
    console.log('calllll')
    this.setState({
      modal: 'modal'
    })
  }
  modelHide = () => {
    this.setState({
      hiddenModal: true
    })
  }

  render() {
    const { propUser, showDasboardandLisAdd, hiddenModal } = this.state
    const value = localStorage.getItem("loggedIn");
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-4 col-md-4 col-lg-3 col-xl-3">
              <img src="../images/selmore-logo.png" className="selmorelogo" />
            </div>
            <div className="col-md-8 col-lg-9 col-xl-9 d-none d-sm-block">
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
                <li className="nav-item navmargin">
                  <Link rel="noopener noreferrer" to={`/dashboard`}>
                    DASHBOARD
                  </Link>
                </li>
                {/* {showDasboardandLisAdd ?
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

                  <li className="nav-item navmargin" style={{ marginTop: "28px" }}>
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
                {showDasboardandLisAdd ?
                  <li className="nav-item navmargin12">
                    <Link rel="noopener noreferrer" to={`/list_add`}><button type="button" className="btn btn-primary btn-sm">
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
                {hiddenModal
                  ?
                  <li className="nav-item navbtnmargin">
                    <Dropdown />
                  </li>
                  :
                  // hiddenModal ? 
                  <li className="nav-item navbtnmargin" >
                    <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal" >
                      Login
                  </button>
                    <div class="modal fade" id="myModal"
                    >
                      <div class="modal-dialog"
                        style={{ marginRight: '650px' }}
                      >
                        <div class="modal-content"
                          style={{ width: '200%', height: '600px' }}
                        >
                          <div class="modal-header">
                            <h4 class="modal-title">Login</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                          </div>
                          <FormLogin modelHide={this.modelHide}/>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss='modal' >Cancel</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                    // : null
                }
                <li className="nav-item navbiddbtn">
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
