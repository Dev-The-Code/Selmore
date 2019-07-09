import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import Buyerbanner from './buyerbanner';
import Buyerbannerfoot from './buyerbannerfoot';
import Buyerpanel1 from './buyerpanel1';
import './buyer.css';
import AbBanner from '../About Selmore/abBanner';

class Buyer extends Component {
  render() {
    return (
      <div>
      		 <Header showDropDown = {this.props.showDropDown} hideDropDown = {this.props.hideDropDown} dropDownUser = {this.props.dropDownUser} />
          <AbBanner advertise={'BUYER'} bred={'BUYER'} />
          <Buyerpanel1 />
          <Footer />
      </div>
    );
  }
}

export default Buyer;