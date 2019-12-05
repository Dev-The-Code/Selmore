import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import Cartpanel1 from './cartPanel1';
import './carts.css';

class Carts extends Component {
  componentWillMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <Header showDropDown={this.props.showDropDown} hideDropDown={this.props.hideDropDown} dropDownUser={this.props.dropDownUser} />
        <Cartpanel1 />
        <Footer />
      </div>
    );
  }
}
export default Carts;
