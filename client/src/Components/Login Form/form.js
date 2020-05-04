import React, { Component } from 'react';
import './loginform.scss';
import {
  Form, Input,
} from 'antd';
import { HttpUtils } from '../../Services/HttpUtils';
import SingUPForm from '../SingUpForm/singUpForm';
import LoginForm from './logIn'

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
      mgs: ''
    }
  }

  CreateUserForm = () => {
    this.setState({ createAcountform: false })
  }

  alreadyHaveacount = () => {
    this.setState({ createAcountform: true })
  }

  fectSignInApiFunc = async (values) => {
    this.setState({
      isLoader: true
    })
    // fetch signIn api
    let response = await HttpUtils.post('signin', values);
    try {
      if (response.code === 200) {
        localStorage.setItem('loggedIn', JSON.stringify(this.state.loggedIn))
        localStorage.setItem('userToken', JSON.stringify(response.token))
        localStorage.setItem('userName', JSON.stringify(response.companyName))
        localStorage.setItem('userData', JSON.stringify(response))
        this.setState({ isLoader: false, isAlert: false });
        document.getElementById('closss').click();
        this.props.showDropDown();
      } else {
        this.setState({
          isLoader: false,
          isAlert: true,
          mgs: response.msg
        })
      }
    }
    catch (error) {
      //error handling if user enter wrong email or password
      if (response === undefined) {
        this.setState({
          isAlert: true,
          isLoader: false,
          mgs: ' Please cheak your email or password'
        })
      }
    }
  }

  fectSignUpApiFunc = async (values) => {
    this.setState({
      isLoader: true
    })
    let role = "buyer";
    values.role = role;
    let response = await HttpUtils.post('signup', values);

    try {
      if (response.code === 200) {
        this.setState({
          isLoader: false,
          createAcountform: true,
          isAlert : false
        });
      }
      else {
        this.setState({
          isAlert: true,
          mgs: response.error,
          isLoader: false,
        })
      }
      // else {
      //   this.setState({ isLoader: true })
      // }
      // document.getElementById('closss').click();
      // this.props.showDropDown();
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


  render() {
    const { getFieldDecorator } = this.props.form;
    const { isLoader, isAlert, createAcountform, mgs } = this.state
    return (
      <div className="container">
        <div className="d-none d-sm-block">
          <div className="row school1">

            <div className="col-md-6 school7">
              <img src="../images/log-in.png" alt='img' style={{ width: '100%', height: '257px' }} />
            </div>
            <div className="col-md-5 school6">
              {createAcountform
                ?
                <div>
                  <LoginForm CreateUserForm={this.CreateUserForm} fectSignInApiFunc={this.fectSignInApiFunc}
                    isLoader={isLoader} isAlert={isAlert} mgs={mgs} />
                </div>
                :
                <div>
                  <SingUPForm alreadyHaveacount={this.alreadyHaveacount} fectSignUpApiFunc={this.fectSignUpApiFunc}
                    isLoader={isLoader} isAlert={isAlert} mgs={mgs} />
                </div>
              }
            </div>
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
