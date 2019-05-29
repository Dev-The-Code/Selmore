import React, { Component } from 'react';
import './headerfooter.css';
import { Link, withRouter } from 'react-router-dom';
import Dropdown from '../constant/dropdownmenu/Dropdown';
import FormLogin from './Login Form/form';
import { Modal,Button } from 'react-bootstrap';



class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: 'modal'
    }
  }
  modalDis = () => {
    console.log('calllll')
    this.setState({
      modal: 'modal'
    })
  }

  render() {
    const value = localStorage.getItem("loggedIn");
    // console.log(value)
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-4 col-md-4 col-lg-3 col-xl-4">
              <img src="../images/selmore-logo.png" className="selmorelogo" />
            </div>
            <div className="col-md-8 col-lg-9 col-xl-8 d-none d-sm-block">
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
                  <Link rel="noopener noreferrer" to={`/faq`}>
                    FAQ
                  </Link>
                </li>
                <li className="nav-item navmargin" style={{ marginTop: "28px" }}>
                  <a className="nav-link" href="#">
                    BLOG
                  </a>
                </li>
                <li className="nav-item navmargin12">
                  <Link rel="noopener noreferrer" to={`/list_add`}><button type="button" className="btn btn-primary btn-sm">
                    <span> LIST AD </span>
                  </button>
                  </Link>
                </li>
                <li className="nav-item navbiddbtn">
                  <button type="button" className="btn btn-primary btn-sm">
                    <Link rel="noopener noreferrer" to={`/bidding`} style={{ color: "white" }}>
                      <span>BIDDING</span>
                    </Link>
                  </button>
                </li>
                {value
                  ?
                  <li className="nav-item navbtnmargin">
                    <Dropdown />
                  </li>
                  :
                  // <li className="nav-item navbtnmargin">
                  //   <button type="button" className="btn btn-primary btn-sm">
                  //     <Link rel="noopener noreferrer" to={`/signin`} style={{ color: "white" }}>
                  //       Login/Signup
                  //       </Link>
                  //   </button>
                  // </li>
                  <li className="nav-item navbtnmargin" >
                    {/* <Modal.Dialog>
                      <Modal.Header closeButton>
                        <Modal.Title>Modal title</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <p>Modal body text goes here.</p>
                      </Modal.Body>

                      <Modal.Footer>
                        <Button variant="secondary">Close</Button>
                        <Button variant="primary">Save changes</Button>
                      </Modal.Footer>
                    </Modal.Dialog> */}
                    <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#myModal" >
                      Login
                  </button>

                    <div class="modal fade" id="myModal" 
                    
                    >
                      <div class="modal-dialog"
                      style={{marginRight:'650px'}}
                      >
                        <div class="modal-content"
                        style={{ width: '200%', height: '600px'}}
                        >

                          <div class="modal-header">
                            <h4 class="modal-title">Login</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                            {/* <button type="button" class="close" id='diss' data-dismiss={this.state.modal} >&times;</button> */}

                          </div>

                          <FormLogin />


                          <div class="modal-footer">
                            {/* <button type="button" class="btn btn-danger" data-dismiss={this.state.modal} >Cancel</button> */}
                            <button type="button" class="btn btn-danger" data-dismiss='modal' >Cancel</button>

                            {/* <button type="button" class="btn btn-primary" data="modal">Login</button> */}
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
      </div>
    );
  }
}

export default Header;
