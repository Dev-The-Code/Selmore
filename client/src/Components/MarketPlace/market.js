import React, { Component } from 'react';
import './market.css';
import {
    Checkbox, Form, Row, Col, Menu, Dropdown, Button, Select
} from 'antd';
import { HttpUtils } from '../../Services/HttpUtils';
import InputRange from 'react-input-range';
import Slider, { Range } from 'rc-slider';

// import Pagination from "react-js-pagination";
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

class Market extends Component {
    constructor(props) {
        super(props)
        this.state = {
            billboardData: [],
            billboardFilterdData: [],
            billBorad: [],
            filterValue: '',
            // pageRangeDisplayed: 1,
            // activePage: 1,
            // itemsCountPerPage: 1,
            // totalItemsCount: 3,
            from: 0,
            to: 2,
            inputValue: 1,
            value: 0,
            companyName: [0, 100, 150, 200]
        }
    }
    componentDidMount() {
        //fetching billboard data
        this.billBoradDetails();
    }
    billBoradDetails = async () => {
        let response = await HttpUtils.get('getbillboard');
        // console.log(response, 'response');
        let arr = [];
        let data = response.content;

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
                        // console.log(j, billboardFields[k], 'billboardFields[k]')
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
        // console.log(billboard)
        this.setState({
            billBorad: billboard
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
                        console.log(value[i])
                        console.log(billboardData[j], 'billboard data')
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

    //pagination function
    // handlePageChange = (pageNumber) => {
    //     const { activePage, billboardData } = this.state;
    //     var billboardDataFromLocalStorage = JSON.parse(localStorage.getItem("billboardData"));
    //     let total = billboardDataFromLocalStorage.length
    //     // console.log(activePage, 'activePage')
    //     // console.log(pageNumber, 'pageNumber')
    //     console.log(billboardDataFromLocalStorage, 'billboardDataFromLocalStorage')
    //     // this.setState({
    //     //     billboardData: billboardDataFromLocalStorage,
    //     //     activePage: billboardDataFromLocalStorage[0][1],
    //     //     itemsCountPerPage: 2,
    //     //     totalItemsCount: 2
    //     // });
    // }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { billBorad, billboardFilterdData, inputValue } = this.state;
        console.log(billBorad, 'billBorad')
        const billboardRendring = (
            <div>
                {/* rendering the billboard data on front end */}
                <div className='row '>
                    {billboardFilterdData.length !== 0 ? billboardFilterdData && billboardFilterdData.map((elem, key) => {
                        return (
                            <div className='col-md-3'>
                                <img src={elem[0][0]} className='imgBillBoard' alt={key} />
                                <p>{elem[23]}</p>
                                <p>{elem[19]}</p>
                            </div>
                        )
                    })
                        :
                        billBorad && billBorad.map((elem, key) => {
                            return (
                                <div className='col-md-3 activeClass'>
                                    <img src={elem[0][0]} className='imgBillBoard' alt={key} />
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
                                    <Checkbox value="painted">Painted</Checkbox>
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
                                <Col >
                                    {/* <Checkbox value="city">City</Checkbox> */}
                                    {/* <Dropdown overlay={menu} placement="City">
                                        <Button>City</Button>
                                    </Dropdown> */}
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
                                {/* <Col >
                                    <Checkbox value="0 - 500">0 - 500</Checkbox>
                                </Col> */}
                                {/* <InputRange
                                    maxValue={20}
                                    minValue={0}
                                    value={this.state.value}
                                    onChange={value => this.setState({ value })} /> */}
                                {/* <Slider defaultValue={0}  /> */}
                                <Col>
                                    {/* <Slider
                                        min={1}
                                        max={20}
                                        onChange={this.onChange}
                                        value={typeof inputValue === 'number' ? inputValue : 0}
                                    /> */}
                                    {/* <Slider />
                                    <Range /> */}
                                    {/* <Slider
                                        value={this.state.value}
                                        onChange={this.onSliderChange}
                                        onAfterChange={this.onAfterChange}
                                    /> */}
                                    {/* <Select
                                        onChange={this.handleChange}
                                        options={this.state.companyName}
                                    ></Select> */}
                                    <Form.Item>
                                        <p>Company Name:</p>
                                        {getFieldDecorator('company', {
                                            initialValue: this.state.compaNames,
                                            //  defaultValue: option.initialValue,
                                            rules: [{
                                                required: true,
                                                message: 'Please enter your company name!',
                                            }],
                                        })(
                                            <Select
                                                // defaultValue={Option.initialValue}
                                                onChange={this.handleChange}
                                                options={this.state.companyName}
                                            // value={this.state.companyName}
                                            ></Select>
                                            // <Select>
                                            //     {optionItems}
                                            // </Select>
                                        )}
                                    </Form.Item>
                                </Col>
                                {/* <Col >
                                    <Checkbox value="500 - 1000">501 - 1000</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="1001 - 1500">1001 - 1500</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="1500 - 2000">1500 - 2000</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="2000 >">2000 ></Checkbox>
                                </Col> */}
                            </Row>
                        </CheckboxGroup>
                    </div>
                    <div className='col-md-9'>
                        {billboardRendring}
                        {/* <div class="d-flex justify-content-center">
                            <Pagination
                                pageRangeDisplayed={this.state.pageRangeDisplayed}
                                activePage={this.state.activePage}
                                itemsCountPerPage={this.state.itemsCountPerPage}
                                totalItemsCount={this.state.totalItemsCount}
                                onChange={this.handlePageChange}
                                itemClass='page-item'
                                linkClass='page-link'
                            />
                        </div> */}
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