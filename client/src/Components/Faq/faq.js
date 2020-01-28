import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import Faqpanel1 from './faqpanel1';
import './faq.css';
import AbBanner from '../About Selmore/abBanner';

class Faq extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropDownUser: false,
    }
  }

  componentWillMount() {
    window.scrollTo(0, 0);
  }

  showDropDown = () => {
    this.setState({
      dropDownUser: true
    })
  }

  hideDropDown = () => {
    this.setState({
      dropDownUser: false
    })
  }

  render() {
    const { dropDownUser } = this.state;
    return (
      <div>
        <Header showDropDown={this.showDropDown} hideDropDown={this.hideDropDown} dropDownUser={dropDownUser} />
        <AbBanner advertise={'FREQUENTLY ASKED QUESTIONS'} bred={'FAQ'} />
        <Faqpanel1 />
        <Footer />
      </div>
    );
  }
}
export default Faq;