import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import Biddpanel1 from './biddpanel1';
import Bidbanner from './biddingbanner';
import './bidding.css';
import AbBanner from '../About Selmore/abBanner';

class Bidding extends Component {
  componentWillMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <Header showDropDown={this.props.showDropDown} hideDropDown={this.props.hideDropDown} dropDownUser={this.props.dropDownUser} />
        <Bidbanner advertise={'BIDDING'} bred={'Bidding'} />
        <Biddpanel1 />
        <Footer/>
      </div>
    );
  }
}

export default Bidding;
