import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './loginform.css';
import { logUser } from '../../action';
import store from '../../store';
import {
  Form, Input,
} from 'antd';
import { HttpUtils } from '../../Services/HttpUtils';

class FormLogin extends Component {
  constructor() {
    super()
    //initilize states
    this.state = {
      email: '',
      password: '',
      loggedIn: true,
      isData: true,
      data: {},
      isLoader: false,
      isAlert: false,
      createAcountform: true,
    }
  }

  CreateUserForm = () => {
    this.setState({ createAcountform: false })
    // console.log(this.state.createAcountform,'sssssss');
  }

  alreadyHaveacount = () => {
    this.setState({ createAcountform: true })
  }

  validateNumber(rule, value, callback) {
    if (isNaN(value)) {
      callback('Please type Numbers');
    } else {
      callback()
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        store.dispatch(logUser(this.state));
        this.setState({ isLoader: true }, () => {
        })
        this.fectSignInApiFunc(values)
      }
    });
  }
  handleSubmitSingUp = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // store.dispatch(logUser(this.state));
        // this.setState({ isLoader: true }, () => {
        // })
        this.fectSignUpApiFunc(values)
      }
    });
  }

  fectSignInApiFunc = async (values) => {
    // fetch signIn api
    let response = await HttpUtils.post('signin', values);
    console.log(response , 'response')
    try {
      if (response.code === 200) {
        localStorage.setItem('loggedIn', JSON.stringify(this.state.loggedIn))
        localStorage.setItem('userToken', JSON.stringify(response.token))
        localStorage.setItem('userName', JSON.stringify(response.companyName))
        localStorage.setItem('userData', JSON.stringify(response))
        this.setState({ isLoader: false });
      } else {
        this.setState({ isLoader: true })
      }
      document.getElementById('closss').click();
      this.props.showDropDown();
    }
    catch (error) {
      //error handling if user enter wrong email or password
      if (response === undefined) {
        this.setState({
          isAlert: true,
          isLoader: false
        })
      }
    }
  }

  fectSignUpApiFunc = async (values) => {
    let role = "buyer";
    values.role = role;
    let response = await HttpUtils.post('signup', values);
    if (response.code === 200) {
      this.setState({ isLoader: false });
      document.getElementById('closss').click();
    }
    else if (response === undefined) {
      this.setState({
        isAlert: true,
        isLoader: false
      })
    }

  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoader, isAlert } = this.state
    return (
      <div className="container">
        <div className="d-none d-sm-block">
          <div className="row school1">

            <div className="col-md-6 school7">
              <img src="../images/log-in.png" alt='img' style={{ width: '100%', height: '257px' }} />
            </div>
            <div className="col-md-5 school6">
              {this.state.createAcountform
                ?
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <div className="form-group">
                    <label for="exampleInputEmail1" style={{ marginBottom: '0px' }}>
                      <span className="school3">
                        Email address:
                  </span>
                    </label>
                    <Form.Item>
                      {getFieldDecorator('email', {
                        rules: [{
                          type: 'email',
                          message: 'The input is not valid E-mail!',
                        }, {
                          required: true,
                          message: 'Please input your E-mail!',
                        }],
                      })(
                        <Input
                          type="text"
                          className={"form-control"}
                          id={"exampleInputEmail1"}
                          name="username"
                          placeholder="Email:*"
                        />
                      )}
                    </Form.Item>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1" style={{ marginBottom: '0px' }}>
                      <span className="school3"
                      >Password:
                  </span>
                    </label>
                    <Form.Item>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                      })(
                        <Input type="password"
                          className={"form-control"}
                          id={"exampleInputPassword1"}
                          placeholder="Password" />
                      )}
                    </Form.Item>
                  </div>
                  <p style={{ marginTop: '-4%' }}><span className="school8">Forget Password!?</span></p>
                  <button type="submit" className="btn btn-primary"><span className="school5">Login</span></button>
                  <p onClick={this.CreateUserForm} className="" style={{ margin: '1vw 0px 0px' }}>
                    <span className="alreadyAcontText">Create Account ?</span>
                  </p>
                  <br />
                  {isAlert ?
                    <div class="alert alert-danger" role="alert">
                      Please cheak your email or password
                    </div>
                    : null
                  }
                </Form>
                :
                <div>
                  <Form onSubmit={this.handleSubmitSingUp} className="login-form">

                    <div className="row">
                      <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                        <label style={{ marginBottom: '0px' }}>
                          <span className="school10">
                            Company name:
                              </span>
                        </label>
                        <Form.Item>
                          {getFieldDecorator('companyName', {
                            rules: [{ required: true, message: 'Please enter your company name' }],
                          })(
                            <Input
                              placeholder="Company name"
                              className="bid_Input"
                            />
                          )}
                        </Form.Item>
                      </div>
                      <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                        <label style={{ marginBottom: '0px' }}>
                          <span className="school10">
                            Email:
                              </span>
                        </label>
                        <Form.Item>
                          {getFieldDecorator('email', {
                            rules: [{
                              type: 'email',
                              message: 'The input is not valid E-mail!',
                            }, {
                              required: true,
                              message: 'Please input your E-mail!',
                            }],
                          })(
                            <Input
                              placeholder="Email"
                              className="bid_Input"
                            />
                          )}
                        </Form.Item>
                      </div>

                    </div><br />


                    <div className="row">
                      <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                        <label style={{ marginBottom: '0px' }}>
                          <span className="school10">
                            Password:
                              </span>
                        </label>
                        <Form.Item hasFeedback>
                          {getFieldDecorator('password', {
                            rules: [
                              {
                                required: true,
                                message: 'Please input your password!',
                              },
                              {
                                validator: this.validateToNextPassword,
                              },
                            ],
                          })(<Input.Password />)}
                        </Form.Item>
                      </div>
                      <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                        <label style={{ marginBottom: '0px' }}>
                          <span className="school10">
                            Confirm Password:
                              </span>
                        </label>
                        <Form.Item hasFeedback>
                          {getFieldDecorator('confirm', {
                            rules: [
                              {
                                required: true,
                                message: 'Please confirm your password!',
                              },
                              {
                                validator: this.compareToFirstPassword,
                              },
                            ],
                          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                        </Form.Item>
                      </div>

                    </div><br />
                    <div className="row" style={{ marginTop: '1vw' }}>
                      <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                        <label style={{ marginBottom: '0px' }}>
                          <span className="school10">
                            Landline no :
                              </span>
                        </label>
                        <Form.Item>
                          {getFieldDecorator('landlineNo', {
                            // initialValue: this.state.dataBnumber,
                            rules: [{
                              required: true,
                              message: 'Please input your lanline number!',
                              whitespace: true
                            },
                            { validator: this.validateNumber.bind(this) }]
                          })(
                            <Input
                              placeholder="Landline no"
                              className="bid_Input"
                            />
                          )}
                        </Form.Item>
                      </div>
                      <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                        <label style={{ marginBottom: '0px' }}>
                          <span className="school10">
                            Mobile no :
                              </span>
                        </label>
                        <Form.Item>
                          {getFieldDecorator('mobileNo', {
                            // initialValue: this.state.dataBnumber,
                            rules: [{
                              required: true,
                              message: 'Please input your mobile Number!',
                              whitespace: true
                            },
                            { validator: this.validateNumber.bind(this) }]
                          })(
                            <Input
                              type="number"
                              placeholder="Mobile no"
                              className="bid_Input"
                            />
                          )}
                        </Form.Item>
                      </div>
                    </div><br />
                    <div className="row">
                      <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                        <button type="submit" className="btn btn-primary"><span className="school5">Sign Up</span></button>
                        <p className="" style={{ margin: '1vw 0px 0px' }}>
                          <span className="alreadyAcontTextSignup">Already have an account ?</span><span className="SignInformText" onClick={this.alreadyHaveacount}>Sign In</span>
                        </p>
                      </div>
                    </div>
                  </Form>
                </div>
              }
            </div>
            {isLoader ? <div class="loading"> 	</div>
              : null
            }




            <div className="col-md-1">
            </div>
          </div>
        </div>




        {/* mobile screen */}
        <div className="d-block d-sm-none">
          <div className="row school1">
            <div className="col-md-4 school7">
              <img src="../images/log-in.png" alt='img' style={{ width: '100%', height: '257px' }} />
            </div>
            <div className="col-md-4 school6">
              {this.state.createAcountform ?
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <div className="form-group">
                    <label for="exampleInputEmail1" style={{ marginBottom: '0px' }}>
                      <span className="school3">
                        Email address:
                  </span>
                    </label>
                    <Form.Item>
                      {getFieldDecorator('email', {
                        rules: [{
                          type: 'email',
                          message: 'The input is not valid E-mail!',
                        }, {
                          required: true,
                          message: 'Please input your E-mail!',
                        }],
                      })(
                        <Input
                          type="text"
                          className={"form-control"}
                          id={"exampleInputEmail1"}
                          name="username"
                          placeholder="Email:*"
                        />
                      )}
                    </Form.Item>
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1" style={{ marginBottom: '0px' }}>
                      <span className="school3"
                      >Password:
                  </span>
                    </label>
                    <Form.Item>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                      })(
                        <Input type="password"
                          className={"form-control"}
                          id={"exampleInputPassword1"}
                          placeholder="Password" />
                      )}
                    </Form.Item>
                  </div>
                  <p style={{ marginTop: '-4%' }}><span className="school8">Forget Password!?</span></p>
                  <button type="submit" className="btn btn-primary"><span className="school5">Login</span></button>
                  <p onClick={this.CreateUserForm} className="" style={{ margin: '1vw 0px 0px' }}>
                    <span className="alreadyAcontText">Create an account ?</span>
                  </p>
                  <br />
                  {isAlert ?
                    <div class="alert alert-danger" role="alert">
                      Please cheak your email or password
            </div>
                    : null
                  }
                </Form>
                :
                <div>
                  <div className="row">
                    <div className="col-12">
                      <label style={{ marginBottom: '0px' }}>
                        <span className="school10">
                          Company name:
                              </span>
                      </label>
                      <Input
                        placeholder="Company name"
                        className="bid_Input"
                      />
                    </div>
                    <div className="col-12">
                      <label style={{ marginBottom: '0px' }}>
                        <span className="school10">
                          Email:
                              </span>
                      </label>
                      <Input
                        placeholder="Email"
                        className="bid_Input"
                      />
                    </div>
                  </div><br />
                  <div className="row" style={{ marginTop: '-4vw' }}>
                    <div className="col-12">
                      <label style={{ marginBottom: '0px' }}>
                        <span className="school10">
                          Landline no :
                              </span>
                      </label>
                      <Input
                        placeholder="Landline no"
                        className="bid_Input"
                      />
                    </div>
                    <div className="col-12">
                      <label style={{ marginBottom: '0px' }}>
                        <span className="school10">
                          Mobile no :
                              </span>
                      </label>
                      <Input
                        type="number"
                        placeholder="Mobile no"
                        className="bid_Input"
                      />
                    </div>
                  </div><br />
                  <div className="row">
                    <div className="col-12">
                      <button type="submit" className="btn btn-primary"><span className="school5">Sign Up</span></button>
                      <p className="" style={{ margin: '1vw 0px 0px' }}>
                        <span className="alreadyAcontText">Already have an account ?</span><span className="SignInformText" onClick={this.alreadyHaveacount}>Sign In</span>
                      </p>
                    </div>
                  </div>
                </div>
              }
            </div>
            {isLoader ? <div class="loading1">   </div>
              : null
            }
            <div className="col-md-1">
            </div>
          </div>
        </div>



      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(FormLogin);
export default WrappedNormalLoginForm;
