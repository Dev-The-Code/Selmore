import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import Sellbanner from './sellbanner';
import Sellbannerfoot from './sellbannerfoot';
import Sellpanel1 from './sellpanel1';
import './seller.css';
import AbBanner from '../About Selmore/abBanner';

class Seller extends Component {
  render() {
    return (
      <div>
      		<Header />
          <AbBanner advertise={'SELLER'} bred={'SELLER'} />
      		<Sellpanel1 />
      		<Footer />
      </div>
    );
  }
}

export default Seller;