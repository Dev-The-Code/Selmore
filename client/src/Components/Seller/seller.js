import React, { Component } from 'react';
import Header from '../Header/mainheader';
import Footer from '../footer';
import Sellpanel1 from './sellpanel1';
import './seller.scss';
import AbBanner from '../About Selmore/abBanner';

class Seller extends Component {
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
        <AbBanner advertise={'SELLER'} bred={'SELLER'} />
        <Sellpanel1 />
        <Footer />
      </div>
    );
  }
}

export default Seller;