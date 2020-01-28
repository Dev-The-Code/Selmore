import React, { Component } from 'react';
import AbBanner from './abBanner';
import Panel1 from './panel1';
import Panel2 from './panel2';
import Header from '../header';
import Footer from '../footer';
import './about.css';

class About extends Component {
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
        <AbBanner advertise={'ABOUT SELMORE'} bred={'About'} />
        <Panel1 />
        <Panel2 />
        <Footer />
      </div>
    );
  }
}
export default About;