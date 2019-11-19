import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import BidForm from './mainBidForm';
import './bidForm.css';

class Bidform extends Component {
  componentWillMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <Header showDropDown={this.props.showDropDown} hideDropDown={this.props.hideDropDown} dropDownUser={this.props.dropDownUser} />
        <BidForm />
        {/* <Footer/> */}
      </div>
    );
  }
}

export default Bidform;
