import React, { Component } from 'react';
import Header from '../Header/mainheader';
import Footer from '../Footer/mainFooter';
import './browseBillFromTopCities.scss';
import { Link, Redirect } from 'react-router-dom';
import { Spin, Icon } from 'antd';
import { HttpUtils } from '../../Services/HttpUtils';


class BrowseBillFromTopCities extends Component {
    constructor(props) {
        super(props)
        this.state = {
            citiesArr: ["Abbottabad", "Ahmadpur East", " Ahmed Nager Chatha", " Ali Khan Abad", " Alipur", " Arifwala",
                " Attock", " Bhera", " Bhalwal", " Bahawalnagar", " Bahawalpur", " Bhakkar", 'Bhimber', " Burewala",
                " Chillianwala", " Choa Saidanshah", " Chakwal", " Chak Jhumra", " Chichawatni", " Chiniot",
                " Chishtian", " Chunian", " Dajkot", " Daska", " Davispur", " Darya Khan", " Dera Ghazi Khan", "Dera Ismail Khan",
                " Dhaular", " Dina", " Dinga", " Dhudial Chakwal", " Dipalpur", " Faisalabad", " Fateh Jang",
                " Ghakhar Mandi", " Gojra", " Gujranwala", " Gujrat", " Gujar Khan", " Harappa", 'Haripur', " Hafizabad", "Hyderabad",
                " Haroonabad", " Hasilpur", " Haveli Lakha", " Islamabad", " Jalalpur Jattan", " Jampur", " Jaranwala", " Jhang",
                " Jhelum", " Kallar Syedan", " Kalabagh", " Karor Lal Esan", 'Karachi', " Kasur", " Kamalia", " Kāmoke", " Khanewal",
                " Khanpur", " Khanqah Sharif", " Kharian", " Khushab", " Kot Adu", " Jauharabad", " Lahore",
                "Larkana", " Lalamusa", " Layyah", " Lawa Chakwal", " Liaquat Pur", " Lodhran", " Malakwal", " Mamoori", " Mailsi",
                " Mandi Bahauddin", " Mian Channu", " Mianwali", " Miani", 'Mirpur', 'Mangla Cantt', " Multan", " Murree", " Muridke",
                " Mianwali Bangla", " Muzaffargarh", " Narowal", " Nankana Sahib", " Okara", "Peshawar", " Pakpattan", " Pattoki", " Pindi Bhattian",
                " Pind Dadan Khan", " Pir Mahal", " Qaimpur", " Qila Didar Singh", "Quetta", " Renala Khurd", " Rabwah", " Raiwind", " Rajanpur",
                " Rahim Yar Khan", 'Rawalakot', " Rawalpindi", " Sadiqabad", " Sagri", " Sahiwal", " Sambrial",
                " Samundri", " Sangla Hill", " Sarai Alamgir", " Sargodha", " Shakargarh", " Sheikhupura", " Shujaabad",
                " Sialkot", " Sohawa", " Soianwala", " Siranwali", "Sukkur", " Tandlianwala", " Talagang", " Taxila", " Toba Tek Singh",
                " Vehari", " Wah Cantonment", " Wazirabad", " Yazman", " Zafarwal"],
            cities: [],
            i: 0,
            bilboardData: [],
            directMarket: false,
            cityName: '',
            sliceCities: [],
            dropDownUser: false,
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
        window.scrollTo(0, 0);
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
        const { bilboardData, directMarket, cityName, sliceCities, dropDownUser, cities } = this.state;
        if (directMarket) {
            return <Redirect to={{
                pathname: '/market_place',
                state: { bilboardData: bilboardData, showValueHead: cityName }
            }} />
        }
        const antIcon =
            <Icon type="loading" style={{ fontSize: '110px' }} spin />;
        return (
            <div className="animated animatedFadeInUp fadeInUp">

                <Header showDropDown={this.showDropDown} hideDropDown={this.hideDropDown} dropDownUser={dropDownUser} />

                <div className="row mainRwTopCities">
                    <div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-10 col-md-10 col-lg-10 col-xl-10">
                        <h3 className="TopCitiesHead">Browse Billboards From Top Cities</h3>
                    </div>
                    <div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
                </div>

                <div className="row mainTopCitiespanel">
                    <div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-10 col-md-10 col-lg-10 col-xl-10">
                        {cities.length == 0 ?
                            <div style={{ textAlign: 'center' }}> <Spin indicator={antIcon} /> </div>
                            : null}
                        <div className="row">
                            {cities && cities.map((elem, key) => {
                                return (
                                    <div className="col-12 col-md-4 col-lg-3 col-xl-3" onClick={this.redirectToMarketPlace.bind(this, elem, elem[0].city)}>
                                        <div className="cityDivBorder">
                                            <h3 className="cityNames">{elem[0].city}</h3>
                                            <p className="cityNoAds">{` ${elem.length} Ads available`}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
                </div>

                <Footer />
            </div>
        );
    }
}

export default BrowseBillFromTopCities;