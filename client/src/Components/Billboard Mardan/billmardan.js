import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import Mardanbanner from './mardanbanner';
import Mardanpanel1 from './mardanpanel1';
import Mardanpanel2 from './mardanpanel2';
import './billmardan.css';
import AbBanner from '../About Selmore/abBanner';

class Billmardan extends Component {
  render() {
    return (
        <div>
        	 <Header showDropDown = {this.props.showDropDown} hideDropDown = {this.props.hideDropDown} dropDownUser = {this.props.dropDownUser} />
            <AbBanner advertise={'BILLBOARDS'} bred={'LISTING'} bred2={'> MARDAN'}/>
            <Mardanpanel1 />
            <Mardanpanel2 />
            <Footer />
    	</div> 
    );
  }
}
export default Billmardan;