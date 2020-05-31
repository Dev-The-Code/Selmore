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
import { HttpUtils } from '../../Services/HttpUtils';
import moment from 'moment';


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dropDownUser: false,
      megaSalebillBoards: []
    }
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    this.getMegaSaleBillboards();
    this.getBiddingBillboard();
    this.checkingBookedBillboard()
  }

  getMegaSaleBillboards = async () => {
    let response = await HttpUtils.get('getallmegabillboard');
    if (response) {
      if (response.code == 200) {
        let data = response.content;

        this.setState({
          megaSalebillBoards: data
        })
      }
    }

    this.megaSalebillBoardData()
  }

  megaSalebillBoardData = async () => {
    const { megaSalebillBoards } = this.state;

    megaSalebillBoards.map((elem, key) => {
      let elemObj = elem;
      let timeTillDateStart = `${`${elemObj.saleEndDate}, ${elemObj.saleEndTime}`}`;
      const now = moment();
      const then = moment(timeTillDateStart);
      var totalSec = then.diff(now, 'seconds');
      var hours = parseInt(totalSec / 3600);
      var minutes = parseInt(totalSec / 60) % 60;
      var seconds = totalSec % 60;
      if (hours <= 0 && minutes <= 0 && seconds <= 0) {
        this.removedData(elem._id, elem)
      }
    })

  }

  removedData = async (objectId, data) => {
    let updateMarketPlace = {
      objectId: data.billboardId,
      avalibleOn: '',
      avalibleOnId: '',
      status: "No Available",
    }
    let respMatkietPlace = await HttpUtils.post('listadd', updateMarketPlace);
    let booked = {
      objectId: objectId
    }
    let response = await HttpUtils.post('megaSaleDelete', booked);

    if (response) {
      if (response.code == 200) {
        this.getMegaSaleBillboards()
      }
    }

  }


  getBiddingBillboard = async () => {
    let response = await HttpUtils.get('getbiddingbillboard');
    if (response) {
      if (response.code == 200) {
        let data = response.content;
        data.map((elem, key) => {
          let elemObj = elem;
          let timeTillDateStart = `${`${elemObj.biddingEndDate}, ${elemObj.biddingEndTime}`}`;
          const now = moment();
          const then = moment(timeTillDateStart);
          var totalSec = then.diff(now, 'seconds');
          var hours = parseInt(totalSec / 3600);
          var minutes = parseInt(totalSec / 60) % 60;
          var seconds = totalSec % 60;
          if (hours <= 0 && minutes <= 0 && seconds <= 0) {
            this.highestBidder(elem._id, elem)
          }
        })
      }
    }
  }

  highestBidder = async (objectId, data) => {
    let obj = {
      id: objectId
    }
    let biddingBiggerAmount = 0;
    let bidderDetail;
    let response = await HttpUtils.post('getspecificBiddingbillboardHistory', obj);
    if (response) {
      if (response.code == 200) {
        if (response.content.length > 0) {
          let biddingData = response.content;
          for (var i in biddingData) {
            if (Number(biddingData[i].bidAamount) > Number(biddingBiggerAmount)) {
              biddingBiggerAmount = biddingData[i].bidAamount;
              bidderDetail = biddingData[i]
            }
          }
          this.bookedBidderBillboard(bidderDetail, data)
        }
        else {
          let obj = {
            objectId: objectId,
          }
          let response = await HttpUtils.post('biddingBillboardDelete', obj);
        }


      }
    }
  }

  bookedBidderBillboard = async (bidderDetail, data) => {
    bidderDetail.objectId = '';
    let response = await HttpUtils.post('bidderBillboardBooked', bidderDetail);
    if (response) {
      if (response.code == 200) {

        let updateMarketPlace = {
          objectId: data.billboardId,
          avalibleOn: '',
          avalibleOnId: '',
          status: "No Available",
        }
        let respMatkietPlace = await HttpUtils.post('listadd', updateMarketPlace);

        let obj = {
          objectId: bidderDetail.biddingBillboardId,
        }
        let response = await HttpUtils.post('biddingBillboardDelete', obj);
      }
    }
  }

  checkingBookedBillboard = async () => {
    let responseBookedData = await HttpUtils.get('getallbookedbillboard');
    let responseMegaSaleData = await HttpUtils.get('getallbookedMeagSalebillboard');
    let responsebidderData = await HttpUtils.get('getallbidderBookbillboard');

    console.log(responseBookedData , 'responseBookedData')
    console.log(responseMegaSaleData , 'responseMegaSaleData')
    console.log(responsebidderData , 'responsebidderData')


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
    const { dropDownUser, megaSalebillBoards } = this.state;
    return (
      <div style={{ backgroundColor: 'white' }}>
        <Header showDropDown={this.showDropDown} hideDropDown={this.hideDropDown} dropDownUser={dropDownUser} />
        <Banner />
        <MegaSale megaSalebillBoards={megaSalebillBoards} />
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
