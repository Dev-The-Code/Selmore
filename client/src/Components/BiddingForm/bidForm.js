import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import BidForm from './mainBidForm';
import './bidForm.scss';

class Bidform extends Component {
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
        <BidForm />
        <Footer/>
      </div>
    );
  }
}

export default Bidform;
