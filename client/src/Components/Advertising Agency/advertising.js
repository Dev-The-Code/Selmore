import React, { Component } from 'react';
import AaBanner from './aaBanner';
import Header from '../header';
import Footer from '../footer';
import Bannerfooter from './bannerfooter';
import Aa1 from './aa1';
import Aa2 from './aa2';
import Aa3 from './aa3';
import './advertising.scss';
import AbBanner from '../About Selmore/abBanner';

class Advertising extends Component {
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
        <AbBanner advertise={'ADVERTISING'} bred={'Advertising'} />
        <Aa1 />
        <Aa2 />
        <Aa3 />
        <Footer />
      </div>
    );
  }
}
export default Advertising;