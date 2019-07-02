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
                return <tbody>
                    <tr>
                        <th scope="row">{i}</th>
                        <td className='tableTd'>{elem.companyName}</td>
                        <td className='tableTd'>{elem.address}</td>
                        <td className='tableTd'>{elem.city}</td>
                        <td className='tableTd'>{elem.state}</td>
                        <td className='tableTd'>{elem.size}</td>
                        <td className='tableTd'> <Link to={{ pathname: `/billborad_Militry`, state: elem }}>View</Link></td>
                    </tr>
                </tbody>
            })
        }
        return (
            <div>
                <div className='row'>
                    <div className='col-md-1'></div>
                    <div className='col-md-10'>
                        <table className='tableData table'>
                            <thead className="thead-dark">
                                <th className='tableHead' scope="col">#</th>
                                <th className='tableHead' scope="col">Company Name</th>
                                <th className='tableHead' scope="col">Address</th>
                                <th className='tableHead' scope="col">City</th>
                                <th className='tableHead' scope="col">State</th>
                                <th className='tableHead' scope="col">Size</th>
                                <th className='tableHead' scope="col">Action</th>
                            </thead>
                            {tableData}
                        </table>
                    </div>
                    <div className='col-md-1'></div>
                </div>
            </div>
        )
    }
}

export default DashboardData;