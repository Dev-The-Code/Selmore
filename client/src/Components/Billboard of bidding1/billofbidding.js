import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import Billofbanner from './billofbanner';
import Billofpanel1 from './billofpanel1';
import Billofpanel2 from './billofpanel2';
import './billofbidding.css';
import AbBanner from '../About Selmore/abBanner';

class Billbidding extends Component {
  render() {
    return (
        <div>
          	 <Header showDropDown = {this.props.showDropDown} hideDropDown = {this.props.hideDropDown} dropDownUser = {this.props.dropDownUser} />
            <AbBanner advertise={'BILLBOARDS FOR BIDDING'} bred={'CATEGORY'} bred2={'> FOR BIDDING'} />  
            <Billofpanel1 />
            <Billofpanel2 />
            <Footer />      
  		  </div> 
    );
  }
}
export default Billbidding;