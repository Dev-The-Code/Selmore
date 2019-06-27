import React, { Component } from 'react';
import { HttpUtils } from '../../Services/HttpUtils';
import './dashboard.css';
import { Link } from "react-router-dom";

class DashboardData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            billBoradData: []
        }
    }

    componentDidMount() {
        this.billBoradData();
    }
    billBoradData = async () => {
        let response = await HttpUtils.get('getbillboard');
        let arr = [];
        let data = response.content;
        console.log(data)
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
        // console.log(arr)
        this.setState({
            billboardData: arr
        })
    }
    render() {
        const { billboardData } = this.state;
        let tableData;
        if (billboardData) {
            tableData = billboardData.map((elem, i) => {
                console.log(elem)
                return <tbody>
                    <td>{elem[23]}</td>
                    <td>{elem[18]}</td>
                    <td>{elem[3]}</td>
                    <td> <Link to={{ pathname: `/billborad_Militry`, state: elem }}>View</Link></td>
                </tbody>
                // return elem;
            })
            // console.log(tableData)
        }
        return (
            <div className='row'>
                <div className='col-md-4'></div>
                <div className='col-md-8'>
                    <table className='tableData'>
                        <thead >
                            <th className='tableHead'>Company Name</th>
                            <th className='tableHead'>Address</th>
                            <th className='tableHead'>Size</th>
                            <th className='tableHead'>Action</th>
                        </thead>
                        {tableData}
                    </table>
                </div>
            </div>
        )
    }
}

export default DashboardData;