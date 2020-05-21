import React, { Component } from 'react';
import Panel1 from './panel1';
import ListAdHome from '../HomePage/ListingAdPanel/listingAd';
import Header from '../Header/mainheader';

import Footer from '../Footer/mainFooter';
import './about.scss';

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
        <Panel1 />
        {/* <Panel2 /> */}
        <ListAdHome />
        <Footer />
      </div>
    );
  }
}
export default About;