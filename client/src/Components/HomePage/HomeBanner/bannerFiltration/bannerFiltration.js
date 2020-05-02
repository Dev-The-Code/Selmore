import React, { Component } from 'react';
import './bannerFiltration.scss';
import { Cascader, Checkbox, Form, Row, Col, Input, Radio, Button } from 'antd';
import { Redirect } from "react-router-dom";

class HomeBanner extends Component {

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
            statesArr: ['Sindh', 'Punjab', 'KPK', 'Balochistan', 'Gilgit', 'Azad Kashmir'],
            cities: [],
            states: [],
            selectCity: [],
            selectState: [],
            pageName: '',
            routeBidding: false,
            routeSale: false,
            data: ''
        }
    }

    componentDidMount() {
        this.getCitiesAndStates()
    }

    getCitiesAndStates = () => {
        const { citiesArr, statesArr } = this.state;

        let city = citiesArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        let state = statesArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        this.setState({
            cities: city,
            states: state
        })
    }


    onChange = (param, value) => {
        if (param == 'city') {
            this.setState({
                selectCity: value
            })
        }
        else if (param == 'state') {
            this.setState({
                selectState: value
            })
        }
    }

    onChangeCheckBox = (e) => {
        this.setState({
            pageName: e.target.value
        })
    }

    routeAndFilter = () => {
        const { selectCity, selectState, pageName } = this.state;

        if (pageName == 'Bidding') {

            let obj = {
                city: selectCity,
                state: selectState
            }
            this.setState({
                data: obj,
                routeBidding: true
            })
        }
        else if (pageName == 'On Sale') {
            let obj = {
                city: selectCity,
                state: selectState
            }
            this.setState({
                data: obj,
                routeSale: true
            })
        }

    }


    render() {
        const { cities, states, selectCity, selectState, pageName, data, routeBidding, routeSale } = this.state;
        if (routeBidding) {
            return <Redirect to={{ pathname: `bidding`, state: data }} />;
        }

        if (routeSale) {
            return <Redirect to={{ pathname: `megaSale`, state: data }} />;
        }
        return (
            <div className="animated animatedFadeInUp fadeInUp">
                <div className="row filterUpWthBaner">
                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 filterPanel">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <h3 className="filterPanelHeading">Browse Media</h3>
                            </div>
                        </div>
                        <div className="row" style={{ paddingBottom: '1vw' }}>
                            <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                <Cascader
                                    value={selectCity}
                                    options={cities}
                                    className="selectDropDown"
                                    onChange={this.onChange.bind(this, 'city')}
                                    placeholder="Please select City" />
                            </div>
                            <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                <Cascader
                                    value={selectState}
                                    options={states}
                                    className="selectDropDown"
                                    onChange={this.onChange.bind(this, 'state')}
                                    placeholder="Please select State" />
                            </div>
                            <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3" style={{ textAlign: 'center' }}>
                                <Radio.Group className="radioCheckBanner" onChange={this.onChangeCheckBox} value={pageName}>
                                    <Row>
                                        <Col >
                                            <Radio className="checkBoxText" value="On Sale">On Sale</Radio>
                                            <Radio className="checkBoxText" value="Bidding">Bidding</Radio>
                                        </Col>
                                    </Row>
                                </Radio.Group>
                            </div>
                            <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                <button
                                    className="btn broweBTnBanner"
                                    type="button"
                                    onClick={this.routeAndFilter}
                                >
                                    <span>Browse</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                </div>
            </div>
        );
    }
}

export default HomeBanner;