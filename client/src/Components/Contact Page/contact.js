import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import Cpbanner from './cpbanner';
import Cpbannerfoot from './cpbannerfoot';
import Formpanel from './formpanel';
import Contpanel1 from './contpanel1';
import './contact.css';
import AbBanner from '../About Selmore/abBanner';

class Contact extends Component {
  render() {
    return (
    	<div>
		    <Header/>
        <AbBanner advertise={'CONTACT'} bred={'CONTACT'} />
		    <Formpanel />
        <Contpanel1 />
        <Footer />
		  </div>
    );
  }
}
export default Contact;
