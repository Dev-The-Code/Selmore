import React, { Component } from 'react';
import './market.css';
import {
    Checkbox, Form, Row, Col,
} from 'antd';
import Select from 'react-select';
import { HttpUtils } from '../../Services/HttpUtils';
import { Link } from "react-router-dom"; 
import filtersImg from "./caret-down.png";

const CheckboxGroup = Checkbox.Group;
const option = Select.Option;
const { Option } = Select;

class Market extends Component {
    constructor(props) {
        super(props)
        this.state = {
            billboardData: [],
            billboardFilterdData: [],
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
        const { citiesArr,  statesArr } = this.state;
        
        // rededring the billboard data
        let response = await HttpUtils.get('getbillboard');
        let data = response.content;
        localStorage.setItem('billboardData', JSON.stringify(data))

        //slice for render some data and click on more button then show some next data
        // var billboard = this.state.billboardData.slice(this.state.from, this.state.to)

        //create a range array value of width height daily visitor cities & states
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
        await this.setState({
            billboardData: data,
            rangeValzForDropdown: rangeValues,
            cities: city,
            states: state
        })
    }

    //filtration the data with given values
    filterBillBoard(filter) {
        var arr = []
        if (Array.isArray(filter)) {
            for (var i = 0; i < filter.length; i++) {
                arr.push(filter[i])
            }
        }
        else {
            arr.push(filter)
        }
        this.handleFiltration(arr)
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
                    let data = billboardData[j]
                    // console.log(billboardData[j])
                    for (var k in data) {
                        // console.log(data[k])
                        if (data[k] === value[i]) {
                            // console.log(data)
                            filteredData.push(data)
                            break;
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
        this.filterBillBoard(data.value)
    }

    render() {
        const { billboardData, billboardFilterdData, cities, states, rangeValzForDropdown } = this.state;
        const billboardRendring = (
            <div>
                {/* rendering the filtered billboard data on front end */}
                <div className='row '>
                    {billboardFilterdData.length !== 0 ? billboardFilterdData && billboardFilterdData.map((elem, key) => {
                        return (
                            <div className='col-xl-3 col-lg-3 col-md-4 col-10 activeClass efect'>
                                <Link to={{ pathname: `/billborad_Militry`, state: elem }}>
                                    <img src={elem.images[0]} className='imgBillBoard im_efect' alt={key} /></Link>

                                    

                                    <div className="div_efect">
                                        <div className="text_efect">
                                            <p>{elem.companyName}</p>
                                            <p>{elem.city}</p>
                                        </div>
                                    </div>

                                    <div id="more_efect1">
                                        <div id="more_efect">
                                            <p>{elem.companyName}</p>
                                            <p>{elem.city}</p>
                                        </div>
                                    </div>
                            </div>
                        )
                    })
                        :
                        billboardData && billboardData.map((elem, key) => {
                            return (
                                <div className='col-xl-3 col-lg-3 col-md-4 col-10 activeClass efect'>
                                    <Link to={{ pathname: `/billborad_Militry`, state: elem }}>
                                        <img src={elem.images[0]} className='imgBillBoard im_efect' alt={key} /></Link>
                                    
                                    
                                    


                                    <div className="div_efect">
                                        <div className="text_efect">
                                            <p>{elem.companyName}</p>
                                            <p>{elem.city}</p>
                                        </div>
                                    </div>

                                    <div id="more_efect1">
                                        <div className="more_efect">
                                            <p>{elem.companyName}</p>
                                            <p>{elem.city}</p>
                                        </div>
                                    </div>


                                </div>
                            )
                        })}

                </div>
            </div>
        );
        return (
            <div className="container">
                <div className='row billboard'>
                    {/*<div className="col-md-1"></div>*/}
                    <div className='col-md-4'>Filters</div>
                    <div className='col-md-8'>Billboards</div>
                </div>
                <div className='row filter'>
                    {/*<div className="col-md-1"></div>*/}
                    <div className='col-xl-3 col-lg-3 col-md-4 d-none d-sm-block'>
                        <CheckboxGroup
                            setFieldsValue={this.state.filterValue}
                            onChange={this.filterBillBoard.bind(this)}
                        >
                            <div className='filterDivs'>Types</div>

                            <Row>
                                <Col>
                                    <Checkbox className="fasla" value='Static'>&nbsp;Static</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox className="fasla" value="Classic">&nbsp;Classic</Checkbox>
                                </Col>
                                <Col>
                                    <Checkbox className="fasla" value='Digital'>&nbsp;Digital</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox className="fasla" value="Mobile">&nbsp;Mobile</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox className="fasla" value="Bridge">&nbsp;Bridge</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox className="fasla" value="Vinyl">&nbsp;Vinyl</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox className="fasla" value="Painted">&nbsp;Painted</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox className="fasla" value="Three Dimensional">&nbsp;Three Dimensional</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox className="fasla" value="Scented">&nbsp;Scented</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox className="fasla" value="Lamp post">&nbsp;Lamp Post</Checkbox>
                                </Col>
                            </Row>&emsp;




                            <Row>
                                <div className='filterDivs'>Facing</div>

                                {/*<form action="/action_page.php">
                                    <div class="custom-control custom-checkbox mb-3" value="Front">
                                        <input type="checkbox" class="custom-control-input" id="customCheck" name="example1" value="Front"></input>
                                        <label class="custom-control-label" for="customCheck" value="Front">Front</label>
                                    </div>
                                    
                                </form>
                                <form action="/action_page.php">
                                    
                                    <div class="custom-control custom-checkbox mb-3" value="Back">
                                        <input type="checkbox" class="custom-control-input" id="customCheck1" name="example1" value="Back"></input>
                                        <label class="custom-control-label" for="customCheck1" value="Back">Back</label>
                                    </div>
                                </form>*/}


                                {/*<label className="led">Front
                                    <checkbox type="checkbox" value="Front">
                                    <span id="checkmark"></span>

                                    </checkbox>
                                  </label>

                                <label className="led">Back
                                  <checkbox type="checkbox" value="Front"></checkbox>
                                  <span id="checkmark"></span>
                                </label>*/}


                                
                                <Col >
                                    <Checkbox className="fasla"  value="Front">&nbsp;Front</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox className="fasla"  value="Back">&nbsp;Back</Checkbox>
                                </Col>
                            </Row>





                            <div className='filterDivs'>Lightning</div>
                            <Row>
                                <Col >
                                    <Checkbox className="fasla"  value="Yes">&nbsp;Yes</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox className="fasla"  value="No">&nbsp;No</Checkbox>
                                </Col>
                            </Row>
                            <div className='filterDivs'>Status</div>
                            <Row>
                                <Col >
                                    <Checkbox className="fasla"  value="Available">&nbsp;Available</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox className="fasla"  value="No Available">&nbsp;No Available</Checkbox>
                                </Col>
                            </Row>
                            <div className='filterDivs'>Audience Type</div>
                            <Row>
                                <Col >
                                    <Checkbox className="fasla"  value="All types of people">&nbsp;All types of people</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox className="fasla"  value="Office type of people">&nbsp;Office type of people</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox className="fasla"  value="Labour type people">&nbsp;Labour type people</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox className="fasla"  value="Govt official type people">&nbsp;Govt official type people</Checkbox>
                                </Col>
                            </Row>
                            <div className='col-md-9 dropdown'>
                                <div className='filterDivs'>Width</div>
                                <Row className="fasla1" >
                                    <Col>
                                        <Select onChange={this.handleChange}
                                            options={rangeValzForDropdown}
                                        >
                                        </Select>
                                    </Col>
                                </Row>
                                <div className='filterDivs'>Height</div>
                                <Row className="fasla1" >
                                    <Col>
                                        <Select onChange={this.handleChange}
                                            options={rangeValzForDropdown}
                                        >
                                        </Select>
                                    </Col>
                                </Row>
                                <div className='filterDivs'>Traffic Count</div>
                                <Row className="fasla1" >
                                    <Col>
                                        <Select
                                            onChange={this.handleChange}
                                            options={rangeValzForDropdown}
                                        >
                                        </Select>
                                    </Col>
                                </Row>
                                <div className='filterDivs'>Daily Visitor</div>
                                <Row className="fasla1" >
                                    <Col>
                                        <Select
                                            onChange={this.handleChange}
                                            options={rangeValzForDropdown}
                                        >
                                        </Select>
                                    </Col>
                                </Row>
                                <div className='filterDivs'>Cities</div>
                                <Row className="fasla1" >
                                    <Col>
                                        <Select
                                            onChange={this.handleChange}
                                            options={cities}
                                        >
                                        </Select>
                                    </Col>
                                </Row>
                                <div className='filterDivs'>States</div>
                                <Row className="fasla1" >
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

                    <div className="col-11 d-block d-sm-none">
                        <div id="accordion">
                            <div className="card">
                                <div className="card-header">
                                    <a className="card-link" data-toggle="collapse" href="#collapseOne" style={{color: '#007bff'}}>
                                        <h3>Filters<img src={filtersImg} className="caret_down"></img></h3>
                                    </a>
                                </div>
                                <div id="collapseOne" className="collapse show" data-parent="#accordion">
                                    <div className="card-body">
                                        <CheckboxGroup
                                            setFieldsValue={this.state.filterValue}
                                            onChange={this.filterBillBoard.bind(this)}
                                        >
                                            <div className='filterDivs'>Types</div>

                                            <Row>
                                                <Col>
                                                    <Checkbox className="fasla" value='Static'>&nbsp;Static</Checkbox>
                                                </Col>
                                                <Col >
                                                    <Checkbox className="fasla" value="Classic">&nbsp;Classic</Checkbox>
                                                </Col>
                                                <Col>
                                                    <Checkbox className="fasla" value='Digital'>&nbsp;Digital</Checkbox>
                                                </Col>
                                                <Col >
                                                    <Checkbox className="fasla" value="Mobile">&nbsp;Mobile</Checkbox>
                                                </Col>
                                                <Col >
                                                    <Checkbox className="fasla" value="Bridge">&nbsp;Bridge</Checkbox>
                                                </Col>
                                                <Col >
                                                    <Checkbox className="fasla" value="Vinyl">&nbsp;Vinyl</Checkbox>
                                                </Col>
                                                <Col >
                                                    <Checkbox className="fasla" value="Painted">&nbsp;Painted</Checkbox>
                                                </Col>
                                                <Col >
                                                    <Checkbox className="fasla" value="Three Dimensional">&nbsp;Three Dimensional</Checkbox>
                                                </Col>
                                                <Col >
                                                    <Checkbox className="fasla" value="Scented">&nbsp;Scented</Checkbox>
                                                </Col>
                                                <Col >
                                                    <Checkbox className="fasla" value="Lamp post">&nbsp;Lamp Post</Checkbox>
                                                </Col>
                                            </Row>&emsp;




                                            <Row>
                                                <div className='filterDivs'>Facing</div>

                                                {/*<form action="/action_page.php">
                                                    <div class="custom-control custom-checkbox mb-3" value="Front">
                                                        <input type="checkbox" class="custom-control-input" id="customCheck" name="example1" value="Front"></input>
                                                        <label class="custom-control-label" for="customCheck" value="Front">Front</label>
                                                    </div>
                                                    
                                                </form>
                                                <form action="/action_page.php">
                                                    
                                                    <div class="custom-control custom-checkbox mb-3" value="Back">
                                                        <input type="checkbox" class="custom-control-input" id="customCheck1" name="example1" value="Back"></input>
                                                        <label class="custom-control-label" for="customCheck1" value="Back">Back</label>
                                                    </div>
                                                </form>*/}


                                                {/*<label className="led">Front
                                                    <checkbox type="checkbox" value="Front">
                                                    <span id="checkmark"></span>

                                                    </checkbox>
                                                  </label>

                                                <label className="led">Back
                                                  <checkbox type="checkbox" value="Front"></checkbox>
                                                  <span id="checkmark"></span>
                                                </label>*/}


                                                
                                                <Col >
                                                    <Checkbox className="fasla"  value="Front">&nbsp;Front</Checkbox>
                                                </Col>
                                                <Col >
                                                    <Checkbox className="fasla"  value="Back">&nbsp;Back</Checkbox>
                                                </Col>
                                            </Row>





                                            <div className='filterDivs'>Lightning</div>
                                            <Row>
                                                <Col >
                                                    <Checkbox className="fasla"  value="Yes">&nbsp;Yes</Checkbox>
                                                </Col>
                                                <Col >
                                                    <Checkbox className="fasla"  value="No">&nbsp;No</Checkbox>
                                                </Col>
                                            </Row>
                                            <div className='filterDivs'>Status</div>
                                            <Row>
                                                <Col >
                                                    <Checkbox className="fasla"  value="Available">&nbsp;Available</Checkbox>
                                                </Col>
                                                <Col >
                                                    <Checkbox className="fasla"  value="No Available">&nbsp;No Available</Checkbox>
                                                </Col>
                                            </Row>
                                            <div className='filterDivs'>Audience Type</div>
                                            <Row>
                                                <Col >
                                                    <Checkbox className="fasla"  value="All types of people">&nbsp;All types of people</Checkbox>
                                                </Col>
                                                <Col >
                                                    <Checkbox className="fasla"  value="Office type of people">&nbsp;Office type of people</Checkbox>
                                                </Col>
                                                <Col >
                                                    <Checkbox className="fasla"  value="Labour type people">&nbsp;Labour type people</Checkbox>
                                                </Col>
                                                <Col >
                                                    <Checkbox className="fasla"  value="Govt official type people">&nbsp;Govt official type people</Checkbox>
                                                </Col>
                                            </Row>
                                            <div className='col-md-9 dropdown'>
                                                <div className='filterDivs'>Width</div>
                                                <Row className="fasla1" >
                                                    <Col>
                                                        <Select onChange={this.handleChange}
                                                            options={rangeValzForDropdown}
                                                        >
                                                        </Select>
                                                    </Col>
                                                </Row>
                                                <div className='filterDivs'>Height</div>
                                                <Row className="fasla1" >
                                                    <Col>
                                                        <Select onChange={this.handleChange}
                                                            options={rangeValzForDropdown}
                                                        >
                                                        </Select>
                                                    </Col>
                                                </Row>
                                                <div className='filterDivs'>Traffic Count</div>
                                                <Row className="fasla1" >
                                                    <Col>
                                                        <Select
                                                            onChange={this.handleChange}
                                                            options={rangeValzForDropdown}
                                                        >
                                                        </Select>
                                                    </Col>
                                                </Row>
                                                <div className='filterDivs'>Daily Visitor</div>
                                                <Row className="fasla1" >
                                                    <Col>
                                                        <Select
                                                            onChange={this.handleChange}
                                                            options={rangeValzForDropdown}
                                                        >
                                                        </Select>
                                                    </Col>
                                                </Row>
                                                <div className='filterDivs'>Cities</div>
                                                <Row className="fasla1" >
                                                    <Col>
                                                        <Select
                                                            onChange={this.handleChange}
                                                            options={cities}
                                                        >
                                                        </Select>
                                                    </Col>
                                                </Row>
                                                <div className='filterDivs'>States</div>
                                                <Row className="fasla1" >
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
                                </div>
                            </div>
                            <br/>
                        </div>
                    </div>

                    <div className='col-xl-9 col-lg-9 col-md-8'>
                        {billboardRendring}
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-primary btn-sm" onClick={this.onMoreData}>
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