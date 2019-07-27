import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import Sellpanel1 from './sellpanel1';
import './seller.css';
import AbBanner from '../About Selmore/abBanner';

class Seller extends Component {
  render() {
    return (
      <div>
        <Header showDropDown={this.props.showDropDown} hideDropDown={this.props.hideDropDown} dropDownUser={this.props.dropDownUser} />
        <AbBanner advertise={'SELLER'} bred={'SELLER'} />
        <Sellpanel1 />
        <Footer />
      </div>
    );
  }
}

export default Seller;