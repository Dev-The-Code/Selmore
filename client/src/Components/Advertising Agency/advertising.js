import React, { Component } from 'react';
import AaBanner from './aaBanner';
import Header from '../header';
import Footer from '../footer';
import Bannerfooter from './bannerfooter';
import Aa1 from './aa1';
import Aa2 from './aa2';
import Aa3 from './aa3';
import './advertising.css';
import AbBanner from '../About Selmore/abBanner';

class Advertising extends Component {
  render() {
    return (
        <div>
        	 <Header showDropDown = {this.props.showDropDown} hideDropDown = {this.props.hideDropDown} dropDownUser = {this.props.dropDownUser} />
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