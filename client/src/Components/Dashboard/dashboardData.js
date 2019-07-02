import React, { Component } from 'react';
import {
    Checkbox, Form, Row, Col,
} from 'antd';
import Select from 'react-select';
import { HttpUtils } from '../../Services/HttpUtils';
import './dashboard.css';
import { Link } from "react-router-dom";

var arr = []

class DashboardData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            billBoradData: [],
            billboardFilterdData: [],
            typeArr: ['Static', 'Classic', 'Digital', 'Mobile', 'Bridge',
                'Vinyl', 'Painted', 'Three Dimensional', 'Scented', 'Lamp Post'],
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
            companyName: [],
            types: [],
            rangeValzForDropdown: [],
            address: [],
            cities: [],
            states: []
        }
    }

    async componentDidMount() {
        this.billBoradData();
        await this.gettingDropDownValues();
    }
    billBoradData = async () => {
        let response = await HttpUtils.get('getbillboard');
        let data = response.content;
        this.setState({
            billboardData: data
        })
        localStorage.setItem('billboardData', JSON.stringify(data))
    }
    gettingDropDownValues = async () => {
        let { companyName, citiesArr, typeArr, statesArr, address,
            types, cities, states } = this.state;
        let rangeNumArr = [];
        for (var i = 0; i <= 5000; i = i + 5) {
            rangeNumArr.push(i)
        }
        let response = await HttpUtils.get('getcompanyname');
        let responseBillboardData = await HttpUtils.get('getbillboard');
        companyName = response.content.map((elem, i) => {
            return { label: elem.companyName, value: elem.companyName, id: elem._id }
        })
        types = typeArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        let rangeValues = rangeNumArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        address = responseBillboardData.content.map((elem, i) => {
            return { label: elem.address, value: elem.address, id: elem._id }
        })
        cities = citiesArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        states = statesArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        await this.setState({
            companyName: companyName,
            types: types,
            rangeValzForDropdown: rangeValues,
            address: address,
            cities: cities,
            states: states
        });
    }
    handleChange = (data) => {
        const { billboardData } = this.state;
        var filteredData = [];
        arr.push(data.value)
        if (arr.length >= 1) {
            //if user has filter values the run the code
            for (var i = 0; i < arr.length; i++) {
                for (var j in billboardData) {
                    let data = billboardData[j]
                    for (var k in data) {
                        if (data[k] == arr[i]) {
                            filteredData.push(data)
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
    render() {
        const { billboardData, companyName, types, rangeValzForDropdown, address, cities, states, billboardFilterdData } = this.state;
        let tableData;
        const billboardRendring = (
            <div>
                {billboardFilterdData.length !== 0 ? tableData = billboardFilterdData.map((elem, key) => {
                        return (<tbody>
                            <tr>
                                <th scope="row">{key}</th>
                                <td className='tableTd'>{elem.companyName}</td>
                                <td className='tableTd'>{elem.address}</td>
                                <td className='tableTd'>{elem.city}</td>
                                <td className='tableTd'>{elem.state}</td>
                                <td className='tableTd'>{elem.size}</td>
                                <td className='tableTd'> <Link to={{ pathname: `/billborad_Militry`, state: elem }}>View</Link></td>
                            </tr>
                        </tbody>
                        )
                    })
                    :
                    tableData =billboardData && billboardData.map((elem, key) => {
                        return (<tbody>
                            <tr>
                                <th scope="row">{key}</th>
                                <td className='tableTd'>{elem.companyName}</td>
                                <td className='tableTd'>{elem.address}</td>
                                <td className='tableTd'>{elem.city}</td>
                                <td className='tableTd'>{elem.state}</td>
                                <td className='tableTd'>{elem.size}</td>
                                <td className='tableTd'> <Link to={{ pathname: `/billborad_Militry`, state: elem }}>View</Link></td>
                            </tr>
                        </tbody>)
                    })
                }
            </div>
        );

        // billboardFilterdData.length !== 0 ? billboardFilterdData && billboardFilterdData.map((elem, key) => {
        //     tableData = billboardData && billboardData.map((elem, i) => {
        //         return (<tbody>
        //             <tr>
        //                 <th scope="row">{i}</th>
        //                 <td className='tableTd'>{elem.companyName}</td>
        //                 <td className='tableTd'>{elem.address}</td>
        //                 <td className='tableTd'>{elem.city}</td>
        //                 <td className='tableTd'>{elem.state}</td>
        //                 <td className='tableTd'>{elem.size}</td>
        //                 <td className='tableTd'> <Link to={{ pathname: `/billborad_Militry`, state: elem }}>View</Link></td>
        //             </tr>
        //         </tbody>
        //         )
        //     })
        // : 
        // tableData = billboardData && billboardData.map((elem, i) => {
        //             return (<tbody>
        //                 <tr>
        //                     <th scope="row">{i}</th>
        //                     <td className='tableTd'>{elem.companyName}</td>
        //                     <td className='tableTd'>{elem.address}</td>
        //                     <td className='tableTd'>{elem.city}</td>
        //                     <td className='tableTd'>{elem.state}</td>
        //                     <td className='tableTd'>{elem.size}</td>
        //                     <td className='tableTd'> <Link to={{ pathname: `/billborad_Militry`, state: elem }}>View</Link></td>
        //                 </tr>
        //             </tbody>)
        //         })

        return (
            <div>
                <div></div>
                <div className='row'>
                    <div className='filter'>
                        <div className='col-xs-12 col-sm-3 col-md-3'>
                        </div>
                        <div className='filter'>
                            <div>
                                <h4 className='text_topFilter'>Company Name</h4>
                            </div>
                            <div>
                                <Select onChange={this.handleChange}
                                    options={companyName}
                                >
                                </Select>
                            </div>
                        </div><br />
                        <div className='filter'>
                            <div>
                                <h4 className='text_topFilter'>BillBoard Type</h4>
                            </div>
                            <div>
                                <Select onChange={this.handleChange}
                                    options={types}
                                >
                                </Select>
                            </div>
                        </div><br />
                        <div className='filter'>
                            <div>
                                <h4 className='text_topFilter'>Size</h4>
                            </div>
                            <div>
                                <Select onChange={this.handleChange}
                                    options={rangeValzForDropdown}
                                >
                                </Select>
                            </div>
                        </div><br />
                        <div className='filter'>
                            <div>
                                <h4 className='text_topFilter'>Address</h4>
                            </div>
                            <div>
                                <Select onChange={this.handleChange}
                                    options={address}
                                >
                                </Select>
                            </div>
                        </div><br />
                        <div className='filter'>
                            <div>
                                <h4 className='text_topFilter'>City</h4>
                            </div>
                            <div>
                                <Select onChange={this.handleChange}
                                    options={cities}
                                >
                                </Select>
                            </div>
                        </div><br />
                        <div className='filter'>
                            <div>
                                <h4 className='text_topFilter'>State</h4>
                            </div>
                            <div>
                                <Select onChange={this.handleChange}
                                    options={states}
                                >
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className='col-xs-12 col-sm-9 col-md-9'>
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