import React, { Component } from 'react';
import Header from '../Header/mainheader';
import Footer from '../Footer/mainFooter';
import './megaSale.scss';
import Banner from './megaBanner';
import MegaSalePanel from './megaSalepanl1'

class MegaSale extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropDownUser: false,
      data: ''
    }
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    let data = this.props.location.state;
    this.setState({
      data: data,
    })
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
    const { dropDownUser, data } = this.state;
    return (
      <div>
        <Header showDropDown={this.showDropDown} hideDropDown={this.hideDropDown} dropDownUser={dropDownUser} />
        <Banner advertise={'MEGA SALE'} bred={'Mega Sale'} />
        <MegaSalePanel filterData={data} />
        <Footer />
      </div>
    );
  }
}

export default MegaSale;
