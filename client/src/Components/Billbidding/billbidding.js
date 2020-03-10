import React, { Component } from 'react';
import Header from '../header';
import Billbiddpanel1 from './billbiddpanel1';
import Billbiddpanel2 from './billbiddpanel2';
import './billbidding.scss';
import AbBanner from '../About Selmore/abBanner';

class Billbidding extends Component {
  componentWillMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div>
        <Header showDropDown={this.props.showDropDown} hideDropDown={this.props.hideDropDown} dropDownUser={this.props.dropDownUser} />
        <AbBanner advertise={'BILLBOARDS'} bred={'CATEGORY'} />
        <Billbiddpanel1 />
        <Billbiddpanel2 />

      </div>
    );
  }
}
export default Billbidding;