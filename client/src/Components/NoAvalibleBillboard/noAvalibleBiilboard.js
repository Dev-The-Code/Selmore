import React, { Component } from 'react';
import Header from '../Header/mainheader';
import Footer from '../Footer/mainFooter';
import NoAvalibleBillboardpanel1 from './noAvalibleBillboardpanel1';
import './noAvalibleBiilboard.scss';

class NoAvalibleBillboard extends Component {
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
        <NoAvalibleBillboardpanel1 />
        <Footer />
      </div>
    );
  }
}
export default NoAvalibleBillboard;
