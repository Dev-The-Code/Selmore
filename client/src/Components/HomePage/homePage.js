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
      megaSalebillBoards: [],
      newestBillboard: []
    }
  }

  componentWillMount() {
    window.scrollTo(0, 0);
    this.getNewestBillboard()
    this.getMegaSaleBillboards();
    this.getBiddingBillboard();
    this.checkingBookedBillboard()
  }

  getNewestBillboard = async () => {
    let response = await HttpUtils.get('getbillboard');
    let newestBillboardData = [];
    let newestBillboard = [];

    if (response) {
      if (response.code == 200) {
        let data = response.content;

        for (var i = 0; i < data.length; i++) {
          if (data[i].date != undefined && data[i].time != undefined && data[i].dayOfMonth != undefined &&
            data[i].monthNo != undefined && data[i].yearCount != undefined) {
            newestBillboardData.push(data[i])


          }
        }
        let dayCount = 7;
        var toDate = new Date();
        for (var j = dayCount; j = dayCount; j--) {
          var sevenDaysAgo = moment().subtract(dayCount, 'days').toDate()
          var dayOfMonthAgo = sevenDaysAgo.getDate();
          var monthNoOfYear = sevenDaysAgo.getMonth() + 1;
          var yearNo = sevenDaysAgo.getFullYear();
          dayCount--;

          for (var k = 0; k < newestBillboardData.length; k++) {
            if (dayOfMonthAgo == newestBillboardData[k].dayOfMonth && monthNoOfYear == newestBillboardData[k].monthNo &&
              yearNo == newestBillboardData[k].yearCount) {
              newestBillboard.push(newestBillboardData[k])
            }
          }
        }
        this.setState({
          newestBillboard: newestBillboard
        })
      }
    }
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

    let paidMarketPlaceData = [];
    let paidMegaSaleData = [];
    let paidBiddingData = []

    if (responseBookedData) {
      if (responseBookedData.code == 200) {
        let data = responseBookedData.content;
        for (var i = 0; i < data.length; i++) {
          if (data[i].paymentStatus == "paid") {
            paidMarketPlaceData.push(data[i])
          }
        }
      }

    }

    if (responseMegaSaleData) {
      if (responseMegaSaleData.code == 200) {
        let data = responseMegaSaleData.content;
        for (var i = 0; i < data.length; i++) {
          if (data[i].paymentStatus == "paid") {
            paidMegaSaleData.push(data[i])
          }
        }
      }

    }

    if (responsebidderData) {
      if (responsebidderData.code == 200) {
        let data = responsebidderData.content;
        for (var i = 0; i < data.length; i++) {
          if (data[i].paymentStatus == "paid") {
            paidBiddingData.push(data[i])
          }
        }
      }
    }

    if (paidMarketPlaceData.length > 0) {
      this.checkingMarketPlaceBookDataExpire(paidMarketPlaceData)
    }

    if (paidMegaSaleData.length > 0) {
      this.checkingMegaSaleBookDataExpire(paidMegaSaleData)
    }

    if (paidBiddingData.length > 0) {
      this.checkingBiddingBookDataExpire(paidBiddingData)
    }



  }

  checkingMarketPlaceBookDataExpire = async (paidMarketPlaceData) => {
    // paidMarketPlaceData.map((elem, key) => {
    for (var i = 0; i < paidMarketPlaceData.length; i++) {
      let expireDate = paidMarketPlaceData[i].dateRange[1];
      const now = moment();
      const then = moment(expireDate);
      let daysDiff = then.diff(now, 'days');
      if (daysDiff < 0) {
        let obj = {
          objectId: paidMarketPlaceData[i]._id,
          paymentStatus: 'expire',
        }
        let response = await HttpUtils.post('postmarketPlaceBookedbillboard', obj);
        if (response) {
          if (response.code == 200) {
            let updateMarketPlace = {
              objectId: paidMarketPlaceData[i].billboardId,
              avalibleOn: '',
              avalibleOnId: '',
              status: "Available",
              bookFrom: '',
              bookId: ''
            }
            let respMatkietPlace = await HttpUtils.post('listadd', updateMarketPlace);
            if (respMatkietPlace) {
              if (respMatkietPlace.code == 200) {
                let objForEmail = {
                  companyName: paidMarketPlaceData[i].companyName,
                  companyEmail: paidMarketPlaceData[i].companyEmail,
                  bookedDateFrom: paidMarketPlaceData[i].dateRange[0],
                  bookedDateTo: paidMarketPlaceData[i].dateRange[1],
                  paidAmountForBooking: paidMarketPlaceData[i].amountCharge,
                  biilboardAddres: paidMarketPlaceData[i].address,
                  billboardCity: paidMarketPlaceData[i].city,
                  billboardState: paidMarketPlaceData[i].state,
                }
                let responseSendEmail = await HttpUtils.post('sendEmailToCompany', objForEmail);
              }
            }
          }
        }
      }
    }

    // })
  }

  checkingMegaSaleBookDataExpire = async (paidMegaSaleData) => {
    // paidMegaSaleData.map((elem, key) => {
    for (var i = 0; i < paidMegaSaleData.length; i++) {
      let expireDate = paidMegaSaleData[i].bookedDate.slice(19, 29);
      const now = moment();
      const then = moment(expireDate);
      let daysDiff = then.diff(now, 'days');
      if (daysDiff < 0) {
        let obj = {
          objectId: paidMegaSaleData[i]._id,
          paymentStatus: 'expire',
        }
        let response = await HttpUtils.post('postMegaSalebillboard', obj);
        if (response) {
          if (response.code == 200) {
            let updateMarketPlace = {
              objectId: paidMegaSaleData[i].billboardId,
              avalibleOn: '',
              avalibleOnId: '',
              status: "Available",
              bookFrom: '',
              bookId: ''

            }
            let respMatkietPlace = await HttpUtils.post('listadd', updateMarketPlace);
            if (respMatkietPlace) {
              if (respMatkietPlace.code == 200) {
                let objForEmail = {
                  companyName: paidMegaSaleData[i].companyName,
                  companyEmail: paidMegaSaleData[i].companyEmail,
                  bookedDateFrom: paidMegaSaleData[i].bookedDate.slice(5, 15),
                  bookedDateTo: paidMegaSaleData[i].bookedDate.slice(19, 29),
                  paidAmountForBooking: paidMegaSaleData[i].billboardAmount,
                  biilboardAddres: paidMegaSaleData[i].address,
                  billboardCity: paidMegaSaleData[i].city,
                  billboardState: paidMegaSaleData[i].state,
                }
                let responseSendEmail = await HttpUtils.post('sendEmailToCompany', objForEmail);
              }
            }
          }
        }

      }
    }


    // })
  }
  
  checkingBiddingBookDataExpire = async (paidBiddingData) => {
    // paidBiddingData.map((elem, key) => {
    for (var i = 0; i < paidBiddingData.length; i++) {


      let expireDate = paidBiddingData[i].billboardAvailabilityTo;
      const now = moment();
      const then = moment(expireDate);
      let daysDiff = then.diff(now, 'days');
      if (daysDiff < 0) {

        let obj = {
          objectId: paidBiddingData[i]._id,
          paymentStatus: 'expire',
        }
        let response = await HttpUtils.post('bidderBillboardBooked', obj);

        if (response) {
          if (response.code == 200) {
            let updateMarketPlace = {
              objectId: paidBiddingData[i].billboardId,
              avalibleOn: '',
              avalibleOnId: '',
              status: "Available",
              bookFrom: '',
              bookId: ''

            }
            let respMatkietPlace = await HttpUtils.post('listadd', updateMarketPlace);

            if (respMatkietPlace) {
              if (respMatkietPlace.code == 200) {
                let objForEmail = {
                  companyName: paidBiddingData[i].companyName,
                  companyEmail: paidBiddingData[i].companyEmail,
                  bookedDateFrom: paidBiddingData[i].billboardAvailabilityFrom,
                  bookedDateTo: paidBiddingData[i].billboardAvailabilityTo,
                  paidAmountForBooking: paidBiddingData[i].bidAamount,
                  biilboardAddres: paidBiddingData[i].address,
                  billboardCity: paidBiddingData[i].city,
                  billboardState: paidBiddingData[i].state,
                }
                let responseSendEmail = await HttpUtils.post('sendEmailToCompany', objForEmail);
              }
            }
          }
        }

      }
    }
    // })
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
    const { dropDownUser, megaSalebillBoards, newestBillboard } = this.state;
    return (
      <div style={{ backgroundColor: 'white' }}>
        <Header showDropDown={this.showDropDown} hideDropDown={this.hideDropDown} dropDownUser={dropDownUser} />
        <Banner />
        {megaSalebillBoards.length > 0 && <MegaSale megaSalebillBoards={megaSalebillBoards} />}
        <BrowseCategory />
        {newestBillboard && newestBillboard.length > 3 && <NewiestBill newestBillboard={newestBillboard} />}
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
