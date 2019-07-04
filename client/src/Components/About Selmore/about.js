import React, { Component } from 'react';
import AbBanner from './abBanner';
import Panel1 from './panel1';
import Panel2 from './panel2';
import Header from '../header';
import Footer from '../footer';
import './about.css';

class About extends Component {
  render() {
    return (
        <div>
        	 <Header showDropDown = {this.props.showDropDown} hideDropDown = {this.props.hideDropDown} dropDownUser = {this.props.dropDownUser} />
        	<AbBanner advertise={'ABOUT SELMORE'} bred={'About'} />
        	<Panel1 />
        	<Panel2 />
          <Footer />
  		</div> 
    );
  }
}
export default About;