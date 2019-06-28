import React, { Component } from 'react';
import './market.css';
import {
    Checkbox, Form, Row, Col, Menu, Dropdown, Button, Icon
} from 'antd';
import Select from 'react-select';
import { HttpUtils } from '../../Services/HttpUtils';
import { Link } from "react-router-dom";

const CheckboxGroup = Checkbox.Group;
const option = Select.Option;
const { Option } = Select;

class Market extends Component {
    constructor(props) {
        super(props)
        this.state = {
            billboardData: [],
            billboardFilterdData: [],
            billBorad: [],
            filterValue: '',
            from: 0,
            to: 2,
            inputValue: 1,
            value: 0,
            rangeValzForDropdown: [],
            citiesArr: ["Ahmadpur East", " Ahmed Nager Chatha", " Ali Khan Abad", " Alipur", " Arifwala",
                " Attock", " Bhera", " Bhalwal", " Bahawalnagar", " Bahawalpur", " Bhakkar", " Burewala",
                " Chillianwala", " Choa Saidanshah", " Chakwal", " Chak Jhumra", " Chichawatni", " Chiniot",
                " Chishtian", " Chunian", " Dajkot", " Daska", " Davispur", " Darya Khan", " Dera Ghazi Khan",
                " Dhaular", " Dina", " Dinga", " Dhudial Chakwal", " Dipalpur", " Faisalabad", " Fateh Jang",
                " Ghakhar Mandi", " Gojra", " Gujranwala", " Gujrat", " Gujar Khan", " Harappa", " Hafizabad",
                " Haroonabad", " Hasilpur", " Haveli Lakha", " Jalalpur Jattan", " Jampur", " Jaranwala", " Jhang",
                " Jhelum", " Kallar Syedan", " Kalabagh", " Karor Lal Esan", 'Karachi', " Kasur", " Kamalia", " Kāmoke", " Khanewal",
                " Khanpur", " Khanqah Sharif", " Kharian", " Khushab", " Kot Adu", " Jauharabad", " Lahore", " Islamabad",
                " Lalamusa", " Layyah", " Lawa Chakwal", " Liaquat Pur", " Lodhran", " Malakwal", " Mamoori", " Mailsi",
                " Mandi Bahauddin", " Mian Channu", " Mianwali", " Miani", " Multan", " Murree", " Muridke", " Mianwali Bangla",
                " Muzaffargarh", " Narowal", " Nankana Sahib", " Okara", " Renala Khurd", " Pakpattan", " Pattoki",
                " Pindi Bhattian", " Pind Dadan Khan", " Pir Mahal", " Qaimpur", " Qila Didar Singh", " Rabwah",
                " Raiwind", " Rajanpur", " Rahim Yar Khan", " Rawalpindi", " Sadiqabad", " Sagri", " Sahiwal", " Sambrial",
                " Samundri", " Sangla Hill", " Sarai Alamgir", " Sargodha", " Shakargarh", " Sheikhupura", " Shujaabad",
                " Sialkot", " Sohawa", " Soianwala", " Siranwali", " Tandlianwala", " Talagang", " Taxila", " Toba Tek Singh",
                " Vehari", " Wah Cantonment", " Wazirabad", " Yazman", " Zafarwal",],
            statesArr: ['Sindh', 'Punjab', 'KPK', 'Balochistan', 'Gilgit', 'Azad Kashmir'],
            cities: [],
            states: [],
        }
    }
    componentDidMount() {
        //fetching billboard data
        this.billBoradDetails();
        // fetch('./cities.json')
        //     .then(resp => resp.json())
        //     .then(cities => console.log(cities, 'cities'));
    }
    billBoradDetails = async () => {
        const { citiesArr, cities, statesArr } = this.state;
        let response = await HttpUtils.get('getbillboard');
        let arr = [];
        let data = response.content;
        // console.log(data, 'bill board data')

        // seprate every billboard data in the array from array of objects and objects has an multiple array
        // for (var i = 0; i < data.length; i++) {
        // let billboardArr1 = [];
        // let billboardArr2 = [];
        // let billboardObj = data[i];
        // console.log(billboardObj)
        // for (var j in billboardObj) {
        //     let billboardFields = [];
        //     if (j !== 'companyId' && j !== 'companyName' && j !== '_id') {
        //         billboardFields = billboardObj[j]
        //     }
        //     for (var k = 0; k < billboardFields.length; k++) {
        //         if (k == 0) {
        //             billboardArr1.push(billboardFields[k])
        //         }
        //         else {
        //             billboardArr2.push(billboardFields[k])
        //         }
        //     }
        //     if (j == 'companyId') {
        //         let companyId = billboardObj["companyId"]
        //         let companyName = billboardObj["companyName"]
        //         let _id = billboardObj["_id"]
        //         billboardArr2.push(companyId, companyName, _id)
        //         billboardArr1.push(companyId, companyName, _id)
        //     }
        // }
        // arr.push(billboardArr1, billboardArr2)
        this.setState({
            billboardData: data
        })
        // }
        // console.log(this.state.billboardData)
        localStorage.setItem('billboardData', JSON.stringify(data))

        //slice for render some data and click on more button then show some next data
        // var billboard = this.state.billboardData.slice(this.state.from, this.state.to)
        let rangeNumArr = [];
        for (var i = 0; i <= 5000; i = i + 5) {
            rangeNumArr.push(i)
        }
        let rangeValues = rangeNumArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        let city = citiesArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        let state = statesArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        // await this.setState({
        //     billBorad: billboard,
        //     rangeValzForDropdown: rangeValues,
        //     cities: city,
        //     states: state
        // })
        // console.log(cities, 'cities')
    }

    //filtration the data with given values
    filterBillBoard(filter) {
        this.handleFiltration(filter)
    }
    handleFiltration = (value) => {
        //filter data with given values array
        const { billboardData } = this.state;
        var filteredData = [];
        console.log(value, 'value')
        if (value.length >= 1) {
            //if user has filter values the run the code
            for (var i = 0; i < value.length; i++) {
                for (var j in billboardData) {
                    for (var k = 0; k < billboardData[j].length; k++) {
                        if (billboardData[j][k] == value[i]) {
                            filteredData.push(billboardData[j]);
                        }
                    }
                }
            }
            this.setState({
                billboardFilterdData: filteredData
            })
        }
        else {
            // if user have not filter data then render orignal data in the page
            let notFilterd = []
            var billboardDataFromLocalStorage = JSON.parse(localStorage.getItem("billboardData"));
            this.setState({
                billboardData: billboardDataFromLocalStorage,
                billboardFilterdData: notFilterd
            })
        }
    }

    //for load more data
    onMoreData = () => {
        const { to } = this.state;
        let total = to + 2
        this.setState({
            form: 0,
            to: total
        })
        this.billBoradDetails();
    }
    //filtration for drop down data
    handleChange = (data) => {
        const { billboardData } = this.state;
        console.log(data.value)
        var filteredData = [];
        for (var i = 0; i < billboardData.length; i++) {
            let data = billboardData[i];
            for (var j = 0; j < data.length; j++) {
                if (data[j] == data.value) {
                    if (data[7] == data.value) {
                        filteredData.push(data);
                    }
                    else if (data[8] == data.value) {
                        filteredData.push(data);
                    }
                    else if (data[j] == data.value) {
                        filteredData.push(data);
                    }
                }
            }
        }
        console.log(filteredData, 'filteredData')
        this.setState({
            billboardFilterdData: filteredData
        })
    }

    render() {
        const { billboardData, billBorad, billboardFilterdData, cities, states, rangeValzForDropdown } = this.state;
        const billboardRendring = (
            <div>
                {/* rendering the billboard data on front end */}
                <div className='row '>
                    {billboardFilterdData.length !== 0 ? billboardFilterdData && billboardFilterdData.map((elem, key) => {
                        return (
                            <div className='col-md-3'>
                                <Link to={{ pathname: `/billborad_Militry`, state: elem }}>
                                    <img src={elem[0][0]} className='imgBillBoard' alt={key} /></Link>
                                <p>{elem[23]}</p>
                                <p>{elem[19]}</p>
                            </div>
                        )
                    })
                        :
                        billboardData && billboardData.map((elem, key) => {
                            console.log(elem, 'elem')
                            return (
                                <div className='col-md-3 activeClass'>
                                    <Link to={{ pathname: `/billborad_Militry`, state: elem }}>
                                        <img src={elem.images[0]} className='imgBillBoard' alt={key} /></Link>
                                    <p>{elem.companyName}</p>
                                    <p>{elem.city}</p>
                                </div>
                            )
                        })}

                </div>
            </div>
        );
        // console.log(billboardRendring ,'aaaaa' )
        return (
            <div>
                <div className='row billboard'>
                    <div className='col-md-3'>Filters</div>
                    <div className='col-md-9'>Billboards</div>
                </div>
                <div className='row filter'>
                    <div className='col-md-3'>
                        <CheckboxGroup
                            setFieldsValue={this.state.filterValue}
                            onChange={this.filterBillBoard.bind(this)}
                        >
                            <div className='filterDivs'>Types</div>
                            <Row>
                                <Col>
                                    <Checkbox value='Static'>Static</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="Classic">Classic</Checkbox>
                                </Col>
                                <Col>
                                    <Checkbox value='Digital'>Digital</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="Mobile">Mobile</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="Bridge">Bridge</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="Vinyl">Vinyl</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="Painted">Painted</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="Three Dimensional">Three Dimensional</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="Scented">Scented</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="Lamp post">Lamp Post</Checkbox>
                                </Col>
                            </Row>
                            <Row>
                                <div className='filterDivs'>Facing</div>
                                <Col >
                                    <Checkbox value="Front">Front</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="Back">Back</Checkbox>
                                </Col>
                            </Row>
                            <div className='filterDivs'>Lightning</div>
                            <Row>
                                <Col >
                                    <Checkbox value="Yes">Yes</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="No">No</Checkbox>
                                </Col>
                            </Row>
                            <div className='filterDivs'>Status</div>
                            <Row>
                                <Col >
                                    <Checkbox value="Available">Available</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="No Available">No Available</Checkbox>
                                </Col>
                            </Row>
                            <div className='filterDivs'>Audience Type</div>
                            <Row>
                                <Col >
                                    <Checkbox value="All types of people">All types of people</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="Office type of people">Office type of people</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="Labour type people">Labour type people</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="Govt official type people">Govt official type people</Checkbox>
                                </Col>
                            </Row>
                            <div className='col-md-9 dropdown'>
                                <div className='filterDivs'>Width</div>
                                <Row>
                                    <Col>
                                        <Select onChange={this.handleChange}
                                            options={rangeValzForDropdown}
                                        >
                                        </Select>
                                    </Col>
                                </Row>
                                <div className='filterDivs'>Height</div>
                                <Row>
                                    <Col>
                                        <Select onChange={this.handleChange}
                                            options={rangeValzForDropdown}
                                        >
                                        </Select>
                                    </Col>
                                </Row>
                                <div className='filterDivs'>Traffic Count</div>
                                <Row>
                                    <Col>
                                        <Select
                                            onChange={this.handleChange}
                                            options={rangeValzForDropdown}
                                        >
                                        </Select>
                                    </Col>
                                </Row>
                                <div className='filterDivs'>Daily Visitor</div>
                                <Row>
                                    <Col>
                                        <Select
                                            onChange={this.handleChange}
                                            options={rangeValzForDropdown}
                                        >
                                        </Select>
                                    </Col>
                                </Row>
                                <div className='filterDivs'>Cities</div>
                                <Row>
                                    <Col>
                                        <Select
                                            onChange={this.handleChange}
                                            options={cities}
                                        >
                                        </Select>
                                    </Col>
                                </Row>
                                <div className='filterDivs'>States</div>
                                <Row>
                                    <Col>
                                        <Select
                                            onChange={this.handleChange}
                                            options={states}
                                        >
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                        </CheckboxGroup>
                    </div>
                    <div className='col-md-9'>
                        {billboardRendring}
                        <div class="d-flex justify-content-center">
                            <button onClick={this.onMoreData}>
                                Load more
                        </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const WrappedDynamicFieldSet = Form.create()(Market);
export default WrappedDynamicFieldSet;