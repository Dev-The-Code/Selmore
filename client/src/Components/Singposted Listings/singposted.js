import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import Singpanel1 from './singpanel1';
import './singposted.scss';
import AbBanner from '../About Selmore/abBanner';

class Singposted extends Component {
  render() {
    return (
      <div>
        <Header />
        <AbBanner advertise={'SINGNPOSTED LISTINGS'} bred={'CATEGORY'} bred2={'> BILLBOARDS'} bred3={'> SINGNPOSTED LISTINGS'} />
        <Singpanel1 />
        <Footer />
      </div>
    );
  }
}
export default Singposted;