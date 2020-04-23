import React, { Component } from 'react';
import './browseByCate.scss';
import { Link, Redirect } from 'react-router-dom';
import { HttpUtils } from '../../../Services/HttpUtils';


class BrowseByCate extends Component {
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

    routeMarkePlace = (value, nameKey) => {
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
            <div className="animated animatedFadeInUp fadeInUp">
                <div className="row mainRwBrowseCate">
                    <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-12 col-md-2 col-lg-3 col-xl-3"></div>
                    <div className="col-12 col-md-6 col-lg-4 col-xl-4">
                        <h3 className="browseCateHead">Browse By Category</h3>
                    </div>
                    <div className="col-12 col-md-4 col-lg-4 col-xl-4"></div>
                </div>
                <div className="row mainRwBrowseCateImgs">
                    <div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-10 col-md-10 col-lg-10 col-xl-10">
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                <div className="allBillboardAd" onClick={() => this.routeMarkePlace(billboardcategory, 'Billboard')}>
                                    <h4 className="headingTextonImgForLarge">{`Billboards Ad(${billboardcategory.length})`}</h4>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                <div className="streamerAd" onClick={() => this.routeMarkePlace(steamerMallcategory, 'Streamers')}>
                                    <h4 className="headingTextonImgForLarge">{`Streamers Ad(${steamerMallcategory.length})`}</h4>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-4 col-lg-3 col-xl-3">
                                <div className="cinemaAd" onClick={() => this.routeMarkePlace(cinimaAdscategory, 'Total Cinema')}>
                                    <h4 className="headingTextonImg">{`Cinema Ad(${cinimaAdscategory.length})`}</h4>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-3 col-xl-3">
                                <div className="mallAd" onClick={() => this.routeMarkePlace(shoppingMallcategory, 'Shopping')}>
                                    <h4 className="headingTextonImg">{`Mall Ad(${shoppingMallcategory.length})`}</h4>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-3 col-xl-3">
                                <div className="airportAd" onClick={() => this.routeMarkePlace(airportAdscategory, 'Airport Ads')}>
                                    <h4 className="headingTextonImg">{`Airport Ad(${airportAdscategory.length})`}</h4>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-3 col-xl-3">
                                <div className="busStandAd" onClick={() => this.routeMarkePlace(busShelterAdscategory, 'Bus Shelter')}>
                                    <h4 className="headingTextonImg">{`Bus Shelter Ad(${busShelterAdscategory.length})`}</h4>
                                </div>
                            </div>

                            <div className="col-12 col-md-4 col-lg-3 col-xl-3">
                                <div className="taxiCarAd" onClick={() => this.routeMarkePlace(taxiAdscategory, 'Taxi Ads')}>
                                    <h4 className="headingTextonImg">{`Taxi Ad(${taxiAdscategory.length})`}</h4>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-3 col-xl-3">
                                <div className="busTransportAd" onClick={() => this.routeMarkePlace(busAdscategory, 'Bus Ads')}>
                                    <h4 className="headingTextonImg">{`Bus Ad(${busAdscategory.length})`}</h4>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-3 col-xl-3">
                                <div className="RadiominAd" onClick={() => this.routeMarkePlace(radioAdscategory, 'Radio Ads')}>
                                    <h4 className="headingTextonImg">{`Radio Ad(${radioAdscategory.length})`}</h4>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-3 col-xl-3">
                                <div className="otherAd" onClick={() => this.routeMarkePlace(othercategory, 'Other')}>
                                    <h4 className="headingTextonImg">{`Other Ad(${othercategory.length})`}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-11 col-md-1 col-lg-1 col-xl-1"></div>
                </div>
            </div>
        );
    }
}

export default BrowseByCate;