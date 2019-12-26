import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import Billofpanel1 from './billofpanel1';
import Billofpanel2 from './billofpanel2';
import './billofbidding.css';
import BannerBid from './biddingBanner';
import AbBanner from '../About Selmore/abBanner';

class Billbidding extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: ''
    }
  }

  componentWillMount() {
    window.scrollTo(0, 0);
  }


  render() {
    const { data } = this.state;
    return (
      <div>
        <Header showDropDown={this.props.showDropDown} hideDropDown={this.props.hideDropDown} dropDownUser={this.props.dropDownUser} />
        <BannerBid/>
        <Billofpanel1 data={this.props.location.state} />
        <Billofpanel2 data={this.props.location.state}/>
        <Footer />
      </div>
    );
  }
}
export default Billbidding;