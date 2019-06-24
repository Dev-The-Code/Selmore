import React, { Component } from 'react';
import './market.css';
import {
    Checkbox, Form, Row, Col, Menu, Dropdown, Button, Select, Icon
} from 'antd';
import { HttpUtils } from '../../Services/HttpUtils';
import { Link } from "react-router-dom";

const CheckboxGroup = Checkbox.Group;
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
            valArr: [],
            cities: ["Ahmadpur East", " Ahmed Nager Chatha", " Ali Khan Abad", " Alipur", " Arifwala",
                " Attock", " Bhera", " Bhalwal", " Bahawalnagar", " Bahawalpur", " Bhakkar", " Burewala",
                " Chillianwala", " Choa Saidanshah", " Chakwal", " Chak Jhumra", " Chichawatni", " Chiniot",
                " Chishtian", " Chunian", " Dajkot", " Daska", " Davispur", " Darya Khan", " Dera Ghazi Khan",
                " Dhaular", " Dina", " Dinga", " Dhudial Chakwal", " Dipalpur", " Faisalabad", " Fateh Jang",
                " Ghakhar Mandi", " Gojra", " Gujranwala", " Gujrat", " Gujar Khan", " Harappa", " Hafizabad",
                " Haroonabad", " Hasilpur", " Haveli Lakha", " Jalalpur Jattan", " Jampur", " Jaranwala", " Jhang",
                " Jhelum", " Kallar Syedan", " Kalabagh", " Karor Lal Esan", 'karachi', " Kasur", " Kamalia", " Kāmoke", " Khanewal",
                " Khanpur", " Khanqah Sharif", " Kharian", " Khushab", " Kot Adu", " Jauharabad", " Lahore", " Islamabad",
                " Lalamusa", " Layyah", " Lawa Chakwal", " Liaquat Pur", " Lodhran", " Malakwal", " Mamoori", " Mailsi",
                " Mandi Bahauddin", " Mian Channu", " Mianwali", " Miani", " Multan", " Murree", " Muridke", " Mianwali Bangla",
                " Muzaffargarh", " Narowal", " Nankana Sahib", " Okara", " Renala Khurd", " Pakpattan", " Pattoki",
                " Pindi Bhattian", " Pind Dadan Khan", " Pir Mahal", " Qaimpur", " Qila Didar Singh", " Rabwah",
                " Raiwind", " Rajanpur", " Rahim Yar Khan", " Rawalpindi", " Sadiqabad", " Sagri", " Sahiwal", " Sambrial",
                " Samundri", " Sangla Hill", " Sarai Alamgir", " Sargodha", " Shakargarh", " Sheikhupura", " Shujaabad",
                " Sialkot", " Sohawa", " Soianwala", " Siranwali", " Tandlianwala", " Talagang", " Taxila", " Toba Tek Singh",
                " Vehari", " Wah Cantonment", " Wazirabad", " Yazman", " Zafarwal",],
            states: ['sindh', 'punjab', 'kpk', 'balochistan', 'gilgit', 'azad kashmir']


        }
    }
    componentDidMount() {
        //fetching billboard data
        this.billBoradDetails();
    }
    billBoradDetails = async () => {
        let response = await HttpUtils.get('getbillboard');
        let arr = [];
        let data = response.content;
        console.log(data, 'data')

        // seprate every billboard data in the array from array of objects and objects has an multiple array
        for (var i = 0; i < data.length; i++) {
            let billboardArr1 = [];
            let billboardArr2 = [];
            let billboardObj = data[i];
            for (var j in billboardObj) {
                let billboardFields = [];
                if (j !== 'companyId' && j !== 'companyName' && j !== '_id') {
                    billboardFields = billboardObj[j]
                }
                for (var k = 0; k < billboardFields.length; k++) {
                    if (k == 0) {
                        billboardArr1.push(billboardFields[k])
                    }
                    else {
                        billboardArr2.push(billboardFields[k])
                    }
                }
                if (j == 'companyId') {
                    let companyId = billboardObj["companyId"]
                    let companyName = billboardObj["companyName"]
                    let _id = billboardObj["_id"]
                    billboardArr2.push(companyId, companyName, _id)
                    billboardArr1.push(companyId, companyName, _id)
                }
            }
            arr.push(billboardArr1, billboardArr2)
        }
        this.setState({
            billboardData: arr
        })
        localStorage.setItem('billboardData', JSON.stringify(arr))

        //slice for render some data and click on more button then show some next data
        var billboard = this.state.billboardData.slice(this.state.from, this.state.to)
        this.setState({
            billBorad: billboard
        })
        let widthHeight = [];
        for (var i = 0; i <= 3000; i = i + 500) {
            widthHeight.push(i)
        }
        this.setState({
            valArr: widthHeight
        })
    }

    //filtration the data with given values
    filterBillBoard(filter) {
        // console.log(filter, 'filter Value')
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
                        // console.log(value[i])
                        // console.log(billboardData[j], 'billboard data')
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
    handleChange = (value) => {
        const { billboardData } = this.state;
        console.log(value)
        var filteredData = [];
        for (var i = 0; i < billboardData.length; i++) {
            let data = billboardData[i];
            for (var j = 0; j < data.length; j++) {
                if (data[j] == value) {
                    if (data[7] == value) {
                        filteredData.push(data);
                    }
                    else if (data[8] == value) {
                        filteredData.push(data);
                    }
                    else if (data[j] == value) {
                        filteredData.push(data);
                    }
                }
            }
        }
        this.setState({
            billboardFilterdData: filteredData
        })
    }

    render() {
        const { billBorad, billboardFilterdData, valArr, cities, states } = this.state;
        let option = valArr.map((elem, key) => {
            // return { label: elem, value: elem}
            return <Option value={elem}>{elem}</Option>
            // return <MDBDropdownItem > {elem} </MDBDropdownItem>
        });
        let citiesOfCountary = cities.map((elem, key) => {
            return <Option value={elem}>{elem}</Option>
        });
        let statesOfCountary = states.map((elem, key) => {
            return <Option value={elem}>{elem}</Option>
        });
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
                        billBorad && billBorad.map((elem, key) => {
                            return (
                                <div className='col-md-3 activeClass'>
                                    <Link to={{ pathname: `/billborad_Militry`, state: elem }}>
                                        <img src={elem[0][0]} className='imgBillBoard' alt={key} /></Link>
                                    <p>{elem[23]}</p>
                                    <p>{elem[19]}</p>
                                </div>
                            )
                        })}

                </div>
            </div>
        );
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
                                    <Checkbox value='static'>Static</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="classic">Classic</Checkbox>
                                </Col>
                                <Col>
                                    <Checkbox value='digital'>Digital</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="mobile">Mobile</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="bridge">Bridge</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="vinyl">Vinyl</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="painted">Painted</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="three dimensional">Three Dimensional</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="scented">Scented</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="lamp post">Lamp Post</Checkbox>
                                </Col>
                            </Row>
                            <Row>
                                <div className='filterDivs'>Facing</div>
                                <Col >
                                    <Checkbox value="Front">Front</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="back">Back</Checkbox>
                                </Col>
                            </Row>
                            <div className='filterDivs'>Lightning</div>
                            <Row>
                                <Col >
                                    <Checkbox value="yes">Yes</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="no">No</Checkbox>
                                </Col>
                            </Row>
                            <div className='filterDivs'>Width</div>
                            <Row>
                                <Col>
                                    <Select onChange={this.handleChange}
                                    //  options={this.state.companyName}
                                    >
                                        {option}
                                    </Select>
                                </Col>
                            </Row>
                            <div className='filterDivs'>Height</div>
                            <Row>
                                <Col>
                                    <Select onChange={this.handleChange}>
                                        {option}
                                    </Select>
                                </Col>
                            </Row>
                            <div className='filterDivs'>Cities</div>
                            <Row>
                                <Col>
                                    <Select onChange={this.handleChange}>
                                        {citiesOfCountary}
                                    </Select>
                                </Col>
                            </Row>
                            <div className='filterDivs'>States</div>
                            <Row>
                                <Col>
                                    <Select onChange={this.handleChange}>
                                        {statesOfCountary}
                                    </Select>
                                </Col>
                            </Row>
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