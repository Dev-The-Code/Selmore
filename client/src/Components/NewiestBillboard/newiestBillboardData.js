import React, { Component } from 'react';
import './newiestBillboard.scss';

class NewiestBillData extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { } = this.state;
        return (
            <div>
                <div className="row" style={{ marginTop: '20px' }}>
                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                        <h2 className='filterTextDashboard'>Newiest BillBoards</h2><br/>
                        <div className="scroll_table">
                            <table className='table tableData'>
                                <thead className="thead-dark" style={{ width: '10px' }}>
                                    <th className='tableHead' scope="col">#</th>
                                    <th className='tableHead' scope="col">Company Logo</th>
                                    <th className='tableHead' scope="col">Company Name</th>
                                    <th className='tableHead' scope="col">Address</th>
                                    <th className='tableHead' scope="col">City</th>
                                    <th className='tableHead' scope="col">State</th>
                                    <th className='tableHead' scope="col">Weightage</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">0</th>
                                        {/*if logo is not available than this image come and if logo of compnay than it that will come*/}
                                        <td className='tableTd'>
                                            <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1590097678/demo1_hfw9wh.png" className="companyLogoProfile" alt='img' />
                                        </td>
                                        <td className='tableTd'>Hafiz Brother Media</td>
                                        <td className='tableTd'>Blue Mall lahore MM alam Road</td>
                                        <td className='tableTd'>Karachi</td>
                                        <td className='tableTd'>Sindh</td>
                                        <td className='tableTd'>
                                            <div class="dropdown_dash">
                                                <button className="fa fa-check-circle weightageBtn">

                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td className='tableTd'>
                                            <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1590097678/demo1_hfw9wh.png" className="companyLogoProfile" alt='img' />
                                        </td>
                                        <td className='tableTd'>Hafiz Brother Media</td>
                                        <td className='tableTd'>Blue Mall lahore MM alam Road</td>
                                        <td className='tableTd'>Karachi</td>
                                        <td className='tableTd'>Sindh</td>
                                        <td className='tableTd'>
                                            <div class="dropdown_dash">
                                                <button className="fa fa-check-circle weightageBtn">

                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                </div>
            </div>
        );
    }
}

export default NewiestBillData;
