import React, { Component } from 'react';
import Header from '../Header/mainheader';
import Footer from '../footer';
import Buyerpanel1 from './buyerpanel1';
import './buyer.scss';
import AbBanner from '../About Selmore/abBanner';

class Buyer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropDownUser: false,
    }
  }

  componentWillMount() {
    window.scrollTo(0, 0);
  }

  showDropDown = () => {
    this.setState({
      dropDownUser: true
    })
  }

  hideDropDown = () => {
    this.setState({
      dropDownUser: false
    })
  }

  render() {
    const { dropDownUser } = this.state;
    return (
      <div>
        <Header showDropDown={this.showDropDown} hideDropDown={this.hideDropDown} dropDownUser={dropDownUser} />
        <AbBanner advertise={'BUYER'} bred={'BUYER'} />
        <Buyerpanel1 />
        <Footer />
      </div>
    );
  }
}

export default Buyer;