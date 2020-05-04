import React, { Component } from 'react';
import './topCitiesBillboard.scss';
import { Link, Redirect } from 'react-router-dom';
import { HttpUtils } from '../../../Services/HttpUtils';

class TopCitiesBillboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            citiesArr: [" Lahore", 'Karachi', " Rawalpindi", " Faisalabad", "Hyderabad", " Islamabad", "Peshawar", "Quetta",],
            cities: [],
            i: 0,
            bilboardData: [],
            directMarket: false,
            cityName: '',
            sliceCities: []
        }
    }
    async componentWillMount() {
        const { citiesArr, i } = this.state;

        let response = await HttpUtils.get('getbillboard');
        let data = response.content;
        let cities = []
        let citiesData;
        for (var k = 0; k < citiesArr.length; k++) {
            let city = []
            citiesData = {}
            for (var j in data) {
                if (citiesArr[k] == data[j].city) {
                    city.push(data[j])
                    citiesData[citiesArr[k]] = city;
                }
            }
            if (city.length != 0) {
                cities.push(city)
            }
        }
        let sliceCities = cities.slice(0, i + 8);

        this.setState({
            cities: cities,
            sliceCities: sliceCities,
            i: 8
        })
    }

    billCity = () => {
        const { i, cities } = this.state;
        let addition = i + 8;
        let sliceCities = cities.slice(0, i + 8);

        this.setState({
            i: addition,
            sliceCities: sliceCities,
        })
    }

    redirectToMarketPlace = (e, city) => {
        this.setState({
            directMarket: true,
            bilboardData: e,
            cityName: city
        })
    }
    render() {
        const { bilboardData, directMarket, cityName, sliceCities } = this.state;
        if (directMarket) {
            return <Redirect to={{
                pathname: '/market_place',
                state: { bilboardData: bilboardData, showValueHead: cityName }
            }} />
        }
        return (
            <div className="animated animatedFadeInUp fadeInUp">
                <div className="row mainRwTopCitiesHome">
                    <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-1 col-md-1 col-lg-2 col-xl-2"></div>
                    <div className="col-10 col-md-8 col-lg-6 col-xl-6">
                        <h3 className="TopCitiesHeadHome">Browse Billboards From Top Cities</h3>
                    </div>
                    <div className="col-12 col-md-1 col-lg-2 col-xl-2">
                        <Link to={'/topCities_billboard'}><p className="seeAllTopCities">See All ></p></Link>
                    </div>
                    <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                </div>

                <div className="row mainTopCitiespanelHome">
                    <div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-10 col-md-10 col-lg-10 col-xl-10">
                        <div className="row">
                            {sliceCities && sliceCities.map((elem, key) => {
                                return (
                                    <div className="col-12 col-md-3 col-lg-3 col-xl-3" onClick={this.redirectToMarketPlace.bind(this, elem, elem[0].city)}>
                                        <div className="cityDivBorderHome">
                                            <h3 className="cityNamesHome">{elem[0].city}</h3>
                                            <p className="cityNoAdsHome">{` ${elem.length} Ads available`}</p>
                                        </div>
                                    </div>
                                )
                            })}

                            {/* <div className="col-md-4 col-sm-3 col-12 panel3div citbox divbordered"
                                onClick={this.redirectToMarketPlace.bind(this, elem, elem[0].city)}>
                                <div className=''>
                                    <div className="col-md-2 col-sm-1 col-1 innerdiv">
                                        <i class="material-icons locate_icon">place</i>
                                    </div>
                                    <div className="col-md-10 col-sm-11 col-11 innerdiv cittxt">
                                        <h5 className='divFont'>{elem[0].city}</h5>
                                        <h6 className="hani2">{` ${elem.length} Ads available`}</h6>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
                </div>
            </div>
        );
    }
}

export default TopCitiesBillboard;