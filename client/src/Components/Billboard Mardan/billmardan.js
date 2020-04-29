import React, { Component } from 'react';
import Header from '../Header/mainheader';
import Footer from '../footer';
import Mardanpanel1 from './mardanpanel1';
import Mardanpanel2 from './mardanpanel2';
import './billmardan.scss';
import AbBanner from '../About Selmore/abBanner';

class Billmardan extends Component {
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
        <Mardanpanel1 />
        <Mardanpanel2 />
        <Footer />
      </div>
    );
  }
}
export default Billmardan;