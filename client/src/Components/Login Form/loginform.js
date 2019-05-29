import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import FormLogin from './form';
import './loginform.css';

class Login extends Component {
  render() {
    return (
      <div>
          <FormLogin />
      </div>
    );
  }
}

export default Login;