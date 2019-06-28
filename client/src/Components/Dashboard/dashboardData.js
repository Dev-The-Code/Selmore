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
        let data = response.content;
        console.log(data)
        this.setState({
            billboardData: data
        })
    }
    render() {
        const { billboardData } = this.state;
        let tableData;
        if (billboardData) {
            tableData = billboardData.map((elem, i) => {
                console.log(elem)
                return <tbody>
                    <td>{i}</td>
                    <td>{elem.companyName}</td>
                    <td>{elem.address}</td>
                    <td>{elem.size}</td>
                    <td> <Link to={{ pathname: `/billborad_Militry`, state: elem }}>View</Link></td>
                </tbody>
                // return elem;
            })
            // console.log(tableData)
        }
        return (
            <div className='row'>
                <div className='col-md-2'></div>
                <div className='col-md-10'>
                    <table className='tableData'>
                        <thead >
                            <th className='tableHead'>#</th>
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