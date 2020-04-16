import React, { Component } from 'react';
import './home.scss';
import { Redirect } from 'react-router-dom';
import { HttpUtils } from '../Services/HttpUtils';

class Panel1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      directMarket: false,
      keyValuee: '',
      categoryArr: ['Billboard ', 'Taxi Ads', 'Bus Ads', 'Bus Shelter Ads', 'Airport Ads', 'Shopping Mall', 'Streamers',
        'Total Cinima Ads', 'Radio Ads', 'Other'],
      billboardcategory: [],
      taxiAdscategory: [],
      busAdscategory: [],
      busShelterAdscategory: [],
      airportAdscategory: [],
      shoppingMallcategory: [],
      steamerMallcategory: [],
      cinimaAdscategory: [],
      radioAdscategory: [],
      othercategory: [],
      bilboardData: [],
      showValueHead: ''
    }
  }
  async componentWillMount() {
    let response = await HttpUtils.get('getbillboard');
    let data = response.content;
    let billboardcategoryArr = [];
    let taxiAdscategoryArr = [];
    let busAdscategoryArr = [];
    let busShelterAdscategoryArr = [];
    let airportAdscategoryArr = [];
    let shoppingMallcategoryArr = [];
    let steamerMallcategoryArr = [];
    let cinimaAdscategoryArr = [];
    let radioAdscategoryArr = [];
    let othercategoryArr = [];
    for (var i in data) {
      if (data[i].category[0] == 'Billboard ') {
        billboardcategoryArr.push(data[i]);
      }
      else if (data[i].category[0] == 'Taxi Ads') {
        taxiAdscategoryArr.push(data[i]);
      }
      else if (data[i].category[0] == 'Bus Ads') {
        busAdscategoryArr.push(data[i]);
      }
      else if (data[i].category[0] == 'Bus Shelter Ads') {
        busShelterAdscategoryArr.push(data[i]);
      }
      else if (data[i].category[0] == 'Airport Ads') {
        airportAdscategoryArr.push(data[i]);
      }
      else if (data[i].category[0] == 'Shopping Mall') {

        shoppingMallcategoryArr.push(data[i]);
      }
      else if (data[i].category[0] == 'Streamers') {
        steamerMallcategoryArr.push(data[i]);
      }
      else if (data[i].category[0] == 'Total Cinima Ads') {
        cinimaAdscategoryArr.push(data[i]);
      }
      else if (data[i].category[0] == 'Radio Ads') {
        radioAdscategoryArr.push(data[i]);
      }
      else if (data[i].category[0] == 'Other') {
        othercategoryArr.push(data[i]);
      }
    }

    this.setState({
      billboardcategory: billboardcategoryArr,
      taxiAdscategory: taxiAdscategoryArr,
      busAdscategory: busAdscategoryArr,
      busShelterAdscategory: busShelterAdscategoryArr,
      airportAdscategory: airportAdscategoryArr,
      shoppingMallcategory: shoppingMallcategoryArr,
      steamerMallcategory: steamerMallcategoryArr,
      cinimaAdscategory: cinimaAdscategoryArr,
      radioAdscategory: radioAdscategoryArr,
      othercategory: othercategoryArr,
    })
  }
  hoverAlert = (value, nameKey) => {
    this.setState({
      directMarket: true,
      bilboardData: value,
      showValueHead: nameKey,
    })
  }

  render() {
    const {
      billboardcategory,
      taxiAdscategory,
      busAdscategory,
      busShelterAdscategory,
      airportAdscategory,
      shoppingMallcategory,
      steamerMallcategory,
      cinimaAdscategory,
      radioAdscategory,
      othercategory,
      directMarket,
      showValueHead,
      bilboardData
    } = this.state;
    if (directMarket) {
      return <Redirect to={{
        pathname: '/market_place',
        state: { bilboardData: bilboardData, showValueHead: showValueHead }
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
              <div className="col-md-4 divborder" onClick={() => this.hoverAlert(busAdscategory, 'Bus Ads')}>
                <div className="row">
                  <div className="col-md-3 col-3 col-sm-3">
                    <img src="../images/1.png" alt='img' className="lane1" />
                  </div>
                  <div className="col-md-9 col-9 col-sm-9">
                    <h5 className="lane3" >{`Bus Ads (${busAdscategory.length})`}</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-4 divborder" onClick={() => this.hoverAlert(taxiAdscategory, 'Taxi Ads')}>
                <div className="row">
                  <div className="col-md-3 col-3 col-sm-3">
                    <img src="../images/2.png" alt='img' className="lane1" />
                  </div>
                  <div className="col-md-9 col-9 col-sm-9">
                    <h5 className="lane3">{`Taxi Ads (${taxiAdscategory.length})`}</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-4 divborder" onClick={() => this.hoverAlert(billboardcategory, 'Billboard')}>
                <div className="row">
                  <div className="col-md-3 col-3 col-sm-3">
                    <img src="../images/3.png" alt='img' className="lane1" />
                  </div>
                  <div className="col-md-9 col-9 col-sm-9">
                    <h5 className="lane3">{`Billboard (${billboardcategory.length})`}</h5>
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
                    <h5 className="lane2">Shopping <br />{`Mall (${shoppingMallcategory.length})`}</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-4 divborder" onClick={() => this.hoverAlert(airportAdscategory, 'Airport Ads')}>
                <div className="row">
                  <div className="col-md-3 col-3 col-sm-3">
                    <img src="../images/5.png" alt='img' className="lane1" />
                  </div>
                  <div className="col-md-9 col-9 col-sm-9">
                    <h5 className="lane3">{`Airport Ads (${airportAdscategory.length})`}</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-4 divborder" onClick={() => this.hoverAlert(busShelterAdscategory, 'Bus Shelter')}>
                <div className="row">
                  <div className="col-md-3 col-3 col-sm-3">
                    <img src="../images/6.png" alt='img' className="lane1" />
                  </div>
                  <div className="col-md-9 col-9 col-sm-9">
                    <h5 className="lane2">Bus Shelter <br />{`Ads (${busShelterAdscategory.length})`}</h5>
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
                    <h5 className="lane3">{`Other (${othercategory.length})`}</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-4 divborder" onClick={() => this.hoverAlert(radioAdscategory, 'Radio Ads')}>
                <div className="row">
                  <div className="col-md-3 col-3 col-sm-3">
                    <img src="../images/8.png" alt='img' className="lane1" />
                  </div>
                  <div className="col-md-9 col-9 col-sm-9">
                    <h5 className="lane3">{`Radio Ads (${radioAdscategory.length})`}</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-4 divborder" onClick={() => this.hoverAlert(cinimaAdscategory, 'Total Cinema')}>
                <div className="row">
                  <div className="col-md-3 col-3 col-sm-3">
                    <img src="../images/9.png" alt='img' className="lane1" />
                  </div>
                  <div className="col-md-9 col-9 col-sm-9">
                    <h5 className="lane2">Total Cinema<br />{`Ads (${cinimaAdscategory.length})`}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="container space">
              <div className="col-md-4 divborder"
                onClick={() => this.hoverAlert(steamerMallcategory, 'Streamers')}
              >
                <div className="row">
                  <div className="col-md-3 col-3 col-sm-3">
                    <img src="../images/9.png" alt='img' className="lane1" />
                  </div>
                  <div className="col-md-9 col-9 col-sm-9">
                    <h5 className="lane2">{`Streamers (${steamerMallcategory.length})`}</h5>
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