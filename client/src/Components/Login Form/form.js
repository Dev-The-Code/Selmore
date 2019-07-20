import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './loginform.css';
import { logUser } from '../../action';
import store from '../../store';
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';
import { HttpUtils } from '../../Services/HttpUtils';
// var modal = ReactBootstrap.Modal

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
      isAlert: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        store.dispatch(logUser(this.state));
        this.setState({ isLoader: true }, () => {
          // console.log(this.state.loggedIn, "logged in")
          // localStorage.setItem('loggedIn', JSON.stringify(this.state.loggedIn))
        })
        // console.log('Received values of form: ', values);
        this.fectSignInApiFunc(values)

      }
    });
  }

  fectSignInApiFunc = async (values) => {
    // fetch signIn api
    let response = await HttpUtils.post('signin', values);
    try {
      if (response.code === 200) {
        localStorage.setItem('loggedIn', JSON.stringify(this.state.loggedIn))
        localStorage.setItem('userToken', JSON.stringify(response.token))
        localStorage.setItem('userName', JSON.stringify(response.username))
        localStorage.setItem('userData', JSON.stringify(response))
        this.setState({ isLoader: false });
      } else {
        this.setState({ isLoader: true })
      }
      document.getElementById('closss').click();
      this.props.showDropDown();
    }
    catch (error) {
      console.log(error, 'catch')

      //error handling if user enter wrong email or password
      if (response === undefined) {
        this.setState({
          isAlert: true,
          isLoader: false
        })
      }
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoader, isAlert } = this.state
    return (
      <div className="container">
        <div className="d-none d-sm-block">
          <div className="row school1">
            
            <div className="col-md-4 school7">
              <img src="../images/log-in.png" style={{ width: '100%', height: '257px' }} />
            </div>
            <div className="col-md-4 school6">
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
                <br />
                {isAlert ?
                  <div class="alert alert-danger" role="alert">
                    Please cheak your email or password
            </div>
                  : null
                }
              </Form>
            </div>
            {isLoader ? <div class="loading"> 	</div>
              : null
            }
            <div className="col-md-1">
            </div>
          </div>
        </div>



        <div className="d-block d-sm-none">
          <div className="row school1">
            
            <div className="col-md-4 school7">
              <img src="../images/log-in.png" style={{ width: '100%', height: '257px' }} />
            </div>
            <div className="col-md-4 school6">
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
                <br />
                {isAlert ?
                  <div class="alert alert-danger" role="alert">
                    Please cheak your email or password
            </div>
                  : null
                }
              </Form>
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
