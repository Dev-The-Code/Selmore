import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import Buyerpanel1 from './buyerpanel1';
import './buyer.css';
import AbBanner from '../About Selmore/abBanner';

class Buyer extends Component {
  componentWillMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <Header showDropDown={this.props.showDropDown} hideDropDown={this.props.hideDropDown} dropDownUser={this.props.dropDownUser} />
        <AbBanner advertise={'BUYER'} bred={'BUYER'} />
        <Buyerpanel1 />
        <Footer />
      </div>
    );
  }
}

export default Buyer;