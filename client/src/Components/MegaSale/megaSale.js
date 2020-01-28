import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import './megaSale.css';
import Banner from './megaBanner';
import MegaSalePanel from './megaSalepanl1'

class MegaSale extends Component {
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
        <Banner advertise={'MEGA SALE'} bred={'Mega Sale'} />
        <MegaSalePanel />
        <Footer/>
      </div>
    );
  }
}

export default MegaSale;
