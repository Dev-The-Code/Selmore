import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import Formpanel from './formpanel';
import Contpanel1 from './contpanel1';
import './contact.css';
import AbBanner from '../About Selmore/abBanner';

class Contact extends Component {
  render() {
    return (
      <div>
        <Header showDropDown={this.props.showDropDown} hideDropDown={this.props.hideDropDown} dropDownUser={this.props.dropDownUser} />
        <AbBanner advertise={'CONTACT'} bred={'CONTACT'} />
        <Formpanel showDropDown={this.props.showDropDown} />
        <Contpanel1 />
        <Footer />
      </div>
    );
  }
}
export default Contact;
