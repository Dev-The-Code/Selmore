import React, { Component } from 'react';
import './home.css';
import { Redirect, Link } from 'react-router-dom';
import { HttpUtils } from '../Services/HttpUtils';

class Panel1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      directMarket: false,
      keyValuee: '',
      categoryArr: ['Billboard ', 'Taxi Ads', 'Bus Ads', 'Bus Shelter Ads', 'Airport Ads', 'Shopping Mall',
        'Total Cinima Ads', 'Radio Ads', 'Other'],
      billboardcategory: [],
      billboardcategoryCount: 0,
      taxiAdscategory: [],
      taxiAdscategoryCount: 0,
      busAdscategory: [],
      busAdscategorycount: 0,
      busShelterAdscategory: [],
      busShelterAdscategoryCount: 0,
      airportAdscategory: [],
      airportAdscategoryCount: 0,
      shoppingMallcategory: [],
      shoppingMallcategoryCount: 0,
      cinimaAdscategory: [],
      cinimaAdscategoryCount: 0,
      radioAdscategory: [],
      radioAdscategoryCount: 0,
      othercategory: [],
      othercategoryCount: 0,
      bilboardData: [],
      nameBill: ''
    }
  }
  async componentWillMount() {
    let response = await HttpUtils.get('getbillboard');
    let data = response.content;
    let billboardcategoryArr = [];
    let billboardcategoryNumber = 0;
    let taxiAdscategoryArr = [];
    let taxiAdscategoryNumber = 0;
    let busAdscategoryArr = [];
    let busAdscategoryNumber = 0;
    let busShelterAdscategoryArr = [];
    let busShelterAdscategoryNumber = 0;
    let airportAdscategoryArr = [];
    let airportAdscategoryNumber = 0;
    let shoppingMallcategoryArr = [];
    let shoppingMallcategoryNumber = 0;
    let cinimaAdscategoryArr = [];
    let cinimaAdscategoryNumber = 0;
    let radioAdscategoryArr = [];
    let radioAdscategoryNumber = 0;
    let othercategoryArr = [];
    let othercategoryNumber = 0;
    for (var i in data) {
      if (data[i].category[0] == 'Billboard ') {
        billboardcategoryArr.push(data[i]);
        billboardcategoryNumber = billboardcategoryNumber + 1;
      }
      else if (data[i].category[0] == 'Taxi Ads') {
        taxiAdscategoryArr.push(data[i]);
        taxiAdscategoryNumber = taxiAdscategoryNumber + 1;
      }
      else if (data[i].category[0] == 'Bus Ads') {
        busAdscategoryArr.push(data[i]);
        busAdscategoryNumber = busAdscategoryNumber + 1;
      }
      else if (data[i].category[0] == 'Bus Shelter Ads') {
        busShelterAdscategoryArr.push(data[i]);
        busShelterAdscategoryNumber = busShelterAdscategoryNumber + 1;
      }
      else if (data[i].category[0] == 'Airport Ads') {
        airportAdscategoryArr.push(data[i]);
        airportAdscategoryNumber = airportAdscategoryNumber + 1;
      }
      else if (data[i].category[0] == 'Shopping Mall') {

        shoppingMallcategoryArr.push(data[i]);
        shoppingMallcategoryNumber = shoppingMallcategoryNumber + 1;
      }
      else if (data[i].category[0] == 'Total Cinima Ads') {
        cinimaAdscategoryArr.push(data[i]);
        cinimaAdscategoryNumber = cinimaAdscategoryNumber + 1;
      }
      else if (data[i].category[0] == 'Radio Ads') {
        radioAdscategoryArr.push(data[i]);
        radioAdscategoryNumber = radioAdscategoryNumber + 1;
      }
      else if (data[i].category[0] == 'Other') {
        othercategoryArr.push(data[i]);
        othercategoryNumber = othercategoryNumber + 1;
      }
    }

    this.setState({
      billboardcategory: billboardcategoryArr,
      billboardcategoryCount: billboardcategoryNumber,
      taxiAdscategory: taxiAdscategoryArr,
      taxiAdscategoryCount: taxiAdscategoryNumber,
      busAdscategory: busAdscategoryArr,
      busAdscategorycount: busAdscategoryNumber,
      busShelterAdscategory: busShelterAdscategoryArr,
      busShelterAdscategoryCount: busShelterAdscategoryNumber,
      airportAdscategory: airportAdscategoryArr,
      airportAdscategoryCount: airportAdscategoryNumber,
      shoppingMallcategory: shoppingMallcategoryArr,
      shoppingMallcategoryCount: shoppingMallcategoryNumber,
      cinimaAdscategory: cinimaAdscategoryArr,
      cinimaAdscategoryCount: cinimaAdscategoryNumber,
      radioAdscategory: radioAdscategoryArr,
      radioAdscategoryCount: radioAdscategoryNumber,
      othercategory: othercategoryArr,
      othercategoryCount: othercategoryNumber,
    })
  }
  hoverAlert = (value, billName) => {
    console.log(value)
    console.log(billName, 'daniyal work');
    this.setState({
      directMarket: true,
      keyValuee: value,
      bilboardData: value,
      nameBill: billName,
    })
  }

  render() {
    // const { directMarket, keyValuee } = this.state;
    const {
      billboardcategory,
      billboardcategoryCount,
      taxiAdscategory,
      taxiAdscategoryCount,
      busAdscategory,
      busAdscategorycount,
      busShelterAdscategory,
      busShelterAdscategoryCount,
      airportAdscategory,
      airportAdscategoryCount,
      shoppingMallcategory,
      shoppingMallcategoryCount,
      cinimaAdscategory,
      cinimaAdscategoryCount,
      radioAdscategory,
      radioAdscategoryCount,
      othercategory,
      othercategoryCount,
      directMarket,
      nameBill,
      keyValuee,
      bilboardData
    } = this.state;
    console.log(nameBill, 'billName')
    if (directMarket) {
      return <Redirect to={{
        pathname: '/market_place',
        state: { bilboardData: bilboardData, nameBill: nameBill }
      }} />

    }
    return (
      <div>
        <div className="container animated animatedFadeInUp fadeInUp" style={{ "backgroundImage": "url('../images/dropdown1.png')" }}>
          <div className="row">
            <div className="container">
              <div className="row">
                <div className="col-3 col-md-4 col-lg-4 col-xl-4"></div>
                <div className="col-6 col-md-4 col-lg-4 col-xl-4 head3"><h1 className="pakola1"><span className="head2">SEARCH BY CATEGORY</span></h1></div>
                <div className="col-3 col-md-4 col-lg-4 col-xl-4"></div>
              </div>
              <div className="row">
                <div className="col-4 col-md-4 col-lg-4 col-xl-4"></div>
                <div className="col-4 col-md-4 col-lg-4 col-xl-4 hrline"></div>
                <div className="col-4 col-md-4 col-lg-4 col-xl-4"></div>
              </div>
            </div>
          </div><br />
          <div className="row">
            <div className="container space">
              {/* <Link to={{ pathname: `/market_place`, state: keyValuee }}> */}
              {/* <Link to={{ pathname: `/market_place`, state: busAdscategory }}> */}
              <div className="col-md-4 divborder"
                onClick={() => this.hoverAlert(busAdscategory, 'Bus Ads')}
              >
                <div className="row">
                  <div className="col-md-3 col-3 col-sm-3">
                    <img src="../images/1.png" alt='img' className="lane1" />
                  </div>
                  <div className="col-md-9 col-9 col-sm-9">
                    <h5 className="lane3" >{`Bus Ads (${busAdscategorycount})`}</h5>
                  </div>
                </div>
              </div>
              {/* </Link> */}
              <div className="col-md-4 divborder" onClick={() => this.hoverAlert(taxiAdscategory, 'Taxi Ads')}>
                <div className="row">
                  <div className="col-md-3 col-3 col-sm-3">
                    <img src="../images/2.png" alt='img' className="lane1" />
                  </div>
                  <div className="col-md-9 col-9 col-sm-9">
                    <h5 className="lane3">{`Taxi Ads (${taxiAdscategoryCount})`}</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-4 divborder" onClick={() => this.hoverAlert(billboardcategory, 'Billboard')}>
                <div className="row">
                  <div className="col-md-3 col-3 col-sm-3">
                    <img src="../images/3.png" alt='img' className="lane1" />
                  </div>
                  <div className="col-md-9 col-9 col-sm-9">
                    <h5 className="lane3">{`Billboard (${billboardcategoryCount})`}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="container space">
              <div className="col-md-4 divborder" onClick={() => this.hoverAlert(shoppingMallcategory, 'Shopping')}>
                <div className="row">
                  <div className="col-md-3 col-3 col-sm-3">
                    <img src="../images/4.png" alt='img' className="lane1" />
                  </div>
                  <div className="col-md-9 col-9 col-sm-9">
                    <h5 className="lane2">Shopping <br />{`Mall (${shoppingMallcategoryCount})`}</h5>
                  </div>
                </div>
              </div>

              <div className="col-md-4 divborder" onClick={() => this.hoverAlert(airportAdscategory, 'Airport Ads')}>
                <div className="row">
                  <div className="col-md-3 col-3 col-sm-3">
                    <img src="../images/5.png" alt='img' className="lane1" />
                  </div>
                  <div className="col-md-9 col-9 col-sm-9">
                    <h5 className="lane3">{`Airport Ads (${airportAdscategoryCount})`}</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-4 divborder" onClick={() => this.hoverAlert(busShelterAdscategory, 'Bus Shelter')}>
                <div className="row">
                  <div className="col-md-3 col-3 col-sm-3">
                    <img src="../images/6.png" alt='img' className="lane1" />
                  </div>
                  <div className="col-md-9 col-9 col-sm-9">
                    <h5 className="lane2">Bus Shelter <br />{`Ads (${busShelterAdscategoryCount})`}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="container space">
              <div className="col-md-4 divborder" onClick={() => this.hoverAlert(othercategory, 'Other')}>
                <div className="row">
                  <div className="col-md-3 col-3 col-sm-3">
                    <img src="../images/7.png" alt='img' className="lane1" />
                  </div>
                  <div className="col-md-9 col-9 col-sm-9">
                    <h5 className="lane3">{`Other (${othercategoryCount})`}</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-4 divborder" onClick={() => this.hoverAlert(radioAdscategory, 'Radio Ads')}>
                <div className="row">
                  <div className="col-md-3 col-3 col-sm-3">
                    <img src="../images/8.png" alt='img' className="lane1" />
                  </div>
                  <div className="col-md-9 col-9 col-sm-9">
                    <h5 className="lane3">{`Radio Ads (${radioAdscategoryCount})`}</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-4 divborder" onClick={() => this.hoverAlert(cinimaAdscategory, 'Total Cinema')}>
                <div className="row">
                  <div className="col-md-3 col-3 col-sm-3">
                    <img src="../images/9.png" alt='img' className="lane1" />
                  </div>
                  <div className="col-md-9 col-9 col-sm-9">
                    <h5 className="lane2">Total Cinema<br />{`Ads (${cinimaAdscategoryCount})`}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div><br />
      </div>
    );
  }
}

export default Panel1;