import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import Faqpanel1 from './faqpanel1';
import './faq.css';
import AbBanner from '../About Selmore/abBanner';

class Faq extends Component {
  render() {
    return (
      <div>
        <Header showDropDown={this.props.showDropDown} hideDropDown={this.props.hideDropDown} dropDownUser={this.props.dropDownUser} />
        <AbBanner advertise={'FREQUENTLY ASKED QUESTIONS'} bred={'FAQ'} />
        <Faqpanel1 />
        <Footer />
      </div>
    );
  }
}
export default Faq;