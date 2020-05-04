import React, { Component } from 'react';
import Header from '../Header/mainheader';
import Footer from '../footer';
import Billofpanel1 from './billofpanel1';
import Billofpanel2 from './billofpanel2';
import './billofbidding.scss';
import BannerBid from './biddingBanner';

class Billbidding extends Component {
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
        <BannerBid/>
        <Billofpanel1 data={this.props.location.state} />
        <Billofpanel2 data={this.props.location.state}/>
        <Footer />
      </div>
    );
  }
}
export default Billbidding;