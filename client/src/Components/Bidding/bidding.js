import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import Biddbanner from './biddingbanner';
import Biddpanel1 from './biddpanel1';
import './bidding.css';
import AbBanner from '../About Selmore/abBanner';

class Bidding extends Component {
  render() {
    return (
      <div>
      		 <Header showDropDown = {this.props.showDropDown} hideDropDown = {this.props.hideDropDown} dropDownUser = {this.props.dropDownUser} />
      		<AbBanner  advertise={'BIDDING'} bred={'Bidding'}/>
      		<Biddpanel1 />
       </div>
    );
  }
}

export default Bidding;
