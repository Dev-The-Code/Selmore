import React, { Component } from 'react';
import Header from '../Header/mainheader';
import Banner from './HomeBanner/homeBanner';
import MegaSale from './MegaSalePanel/megaSalePanel';
import BrowseCategory from './BrowseByCategoryPanel/browseByCate';
import NewiestBill from './NewestBillboardsPanel/newestBillboards';
import PrestigiousClients from './PrestigiousClientsPanel/prestigiousClientsPanel';
import BrowseTopCity from './TopCitiesBillboardPanel/topCitiesBillboard';
import ListingAdPanel from './ListingAdPanel/listingAd';
import HowItWork from './HowItWorkPanel/howItWork';
import Footer from '../Footer/mainFooter';

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
      <div style={{backgroundColor:'white'}}>
        <Header showDropDown={this.showDropDown} hideDropDown={this.hideDropDown} dropDownUser={dropDownUser} />
        <Banner />
        <MegaSale />
        <BrowseCategory />
        {/* <NewiestBill /> */}
        <PrestigiousClients />
        <BrowseTopCity />
        <ListingAdPanel />
        <HowItWork />
        <Footer />
      </div>
    );
  }
}

export default Home;
