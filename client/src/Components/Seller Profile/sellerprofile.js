import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import Sellprobanner from './sellprofilebanner';
import Sellpropanel1 from './sellprofilepanel1';
import './sellprofile.css';
import AbBanner from '../About Selmore/abBanner';

class Sellerprofile extends Component {
  render() {
    return (
        <div>
        	<Header />
            <AbBanner advertise={'SELLER PROFILE'} bred={'CATEGORY'} bred2={'> BILLBOARDS'} bred3={'> SELLER PROFILE'} />
        	<Sellpropanel1 />
        	<Footer />
    	</div> 
    );
  }
}
export default Sellerprofile;