import React, { Component } from 'react';
import Header from '../Header/mainheader';
import Banner from './HomeBanner/homeBanner';
import MegaSale from './MegaSalePanel/megaSalePanel';
import BrowseCategory from './BrowseByCategoryPanel/browseByCate';
import NewiestBill from './NewestBillboardsPanel/newestBillboards';
import PrestigiousClients from './PrestigiousClientsPanel/prestigiousClientsPanel';

class Home extends Component {
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
        <Banner />
        <MegaSale />
        <BrowseCategory />
        <NewiestBill />
        <PrestigiousClients />
      </div>
    );
  }
}

export default Home;
