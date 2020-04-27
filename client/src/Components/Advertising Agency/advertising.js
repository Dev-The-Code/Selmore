import React, { Component } from 'react';
import Header from '../Header/mainheader';
import Footer from '../Footer/mainFooter';
import Aa1 from './aa1';
import Aa2 from './aa2';
import TopCitiesBill from '../HomePage/TopCitiesBillboardPanel/topCitiesBillboard';
import './advertising.scss';

class Advertising extends Component {
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
        <Aa1 />
        <Aa2 />
        <TopCitiesBill />
        <Footer />
      </div>
    );
  }
}
export default Advertising;