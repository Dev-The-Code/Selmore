import React, { Component } from 'react';
import './market.css';
import {
    Checkbox, Form, Row, Col, Menu, Dropdown, Button
} from 'antd';
import { HttpUtils } from '../../Services/HttpUtils';
import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");
import image1 from './billboard.jpg';
// import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';


const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group;

class Market extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activePage: 1,
            billboardData: [],
            billboardFilterdData: [],
            filterValue: '',
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

    //pagination function
    handlePageChange = (pageNumber) => {
        const { activePage } = this.state;
        console.log(activePage, 'activePage')
        console.log(pageNumber, 'pageNumber')
        this.setState({
            activePage: pageNumber
        });
    }
    render() {
        const { billboardData, billboardFilterdData } = this.state;
        console.log(this.state.activePage)
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
                        billboardData && billboardData.map((elem, key) => {
                            return (
                                <div className='col-md-3 activeClass'>
                                    <img src={elem[0][0]} className='imgBillBoard' alt={key} />
                                    <p>{elem[23]}</p>
                                    <p>{elem[19]}</p>
                                </div>
                            )
                        })}
                    <div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div>
                    <div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div>
                    <div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div>
                    <div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div>
                    <div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div>
                    <div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div>
                    <div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div>
                    <div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div>
                    <div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div>
                    <div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div>
                    <div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div>
                    <div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div><div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div><div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div><div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div><div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div><div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div><div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div><div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div><div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div><div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div><div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div><div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div><div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div><div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div><div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div><div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div><div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div><div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div><div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div><div className='row '>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div><div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                        <div className='col-md-3'>
                            <img src={image1} className='imgBillBoard' />
                            <p>Billboards</p>
                            <p>Billboards</p>
                        </div>
                    </div>
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
                            {/* <div className='filterDivs'>Billboard Facing</div>
                            <Row>
                                <Col >
                                    <Checkbox value="audianceType">Audiance Type</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="status">Status</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="traffic">Traffic</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="Facing">Facing</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="lightning">Lightning</Checkbox>
                                </Col>
                            </Row> */}
                            {/* <div className='filterDivs'>Size</div>
                            <Row>
                                <Col >
                                    <Checkbox value="size">Size</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="width">Width</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="height">Height</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="type">Type </Checkbox>
                                </Col>
                            </Row> */}
                            {/* <Row>
                            </Row> */}
                            <Row>
                                <div className='filterDivs'>Facing</div>
                                {/* <Col >
                                    <Checkbox value="latitude">Latitude</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="longitude">Longitude</Checkbox>
                                </Col> 
                                <Col >
                                    <Checkbox value="address">Address</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="nearBy">Near By</Checkbox>
                                </Col>*/}
                                <Col >
                                    <Checkbox value="Front">Front Facing</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="back">Back Facing</Checkbox>
                                </Col>
                                <Col >
                                    {/* <Checkbox value="city">City</Checkbox> */}
                                    {/* <Dropdown overlay={menu} placement="City">
                                        <Button>City</Button>
                                    </Dropdown> */}
                                </Col>
                                {/* <Col >
                                    <Checkbox value="state">State</Checkbox>
                                </Col> */}
                                {/* <Col >
                                    <Checkbox value="country">Country</Checkbox>
                                </Col> */}
                            </Row>
                            {/* <div className='filterDivs'>Billboard Rates</div>
                            <Row>
                                <Col >
                                    <Checkbox value="dailyRate">1</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="weeklyRate">Weekly Rate</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="monthlyRate">Monthly Rate</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="yearlyRate">Yearly Rate</Checkbox>
                                </Col>
                            </Row> */}
                        </CheckboxGroup>
                    </div>
                    <div className='col-md-9'>
                        {/* <div className='row '>
                            <div className='col-md-3'>
                                <img src={image1} className='imgBillBoard' />
                                <p>Billboards</p>
                                <p>Billboards</p>
                            </div>
                            <div className='col-md-3'>
                                <img src={image1} className='imgBillBoard' />
                                <p>Billboards</p>
                                <p>Billboards</p>
                            </div>
                            <div className='col-md-3'>
                                <img src={image1} className='imgBillBoard' />
                                <p>Billboards</p>
                                <p>Billboards</p>
                            </div>
                            <div className='col-md-3'>
                                <img src={image1} className='imgBillBoard' />
                                <p>Billboards</p>
                                <p>Billboards</p>
                            </div>
                        </div> */}
                        {billboardRendring}
                        <Pagination
                            pageRangeDisplayed={10}
                            activePage={this.state.activePage}
                            itemsCountPerPage={10}
                            totalItemsCount={5000}
                            onChange={this.handlePageChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
export default Market;