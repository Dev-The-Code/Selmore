import React, { Component } from 'react';
import Select from 'react-select';
import { HttpUtils } from '../../Services/HttpUtils';
import './dashboard.css';
import { Link } from "react-router-dom";

// import { fileToObject } from 'antd/lib/upload/utils';
// import filterImg from "./caret-down.png";

var filteredObj = {};

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
        console.log(response)
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
    handleChangeCompany = (data) => {
        filteredObj.companyName = data.value;
        this.filteredData();
    }
    handleChangeType = (data) => {
        filteredObj.type = data.value;
        this.filteredData();
    }
    handleChangeSize = (data) => {
        filteredObj.size = data.value;
        this.filteredData();
    }
    handleChangeAddress = (data) => {
        filteredObj.address = data.value;
        this.filteredData();
    }
    handleChangeCity = (data) => {
        filteredObj.city = data.value;
        this.filteredData();
    }
    handleChangeState = (data) => {
        filteredObj.state = data.value;
        this.filteredData();
    }
    filteredData = () => {
        const { billboardData } = this.state;
        console.log(filteredObj)
        var filteredData = [];

        if (filteredObj.companyName !== undefined && filteredObj.type !== undefined && filteredObj.size !== undefined
            && filteredObj.address !== undefined && filteredObj.city !== undefined && filteredObj.state !== undefined) {
            for (var i in billboardData) {
                let data = billboardData[i]
                for (var j in data) {
                    if (filteredObj.companyName == data[j]) {
                        let checkingCompany = data;
                        for (var address in checkingCompany) {
                            if (filteredObj.address == checkingCompany[address]) {
                                let checkingAddres = checkingCompany
                                for (var type in checkingAddres) {
                                    if (filteredObj.type == checkingAddres[type]) {
                                        let CheckingType = checkingAddres;
                                        for (var city in CheckingType) {
                                            if (filteredObj.city == CheckingType[city]) {
                                                let checkingCity = CheckingType;
                                                for (var state in checkingCity) {
                                                    if (filteredObj.state == checkingCity[state]) {
                                                        let cheakingState = checkingCity;
                                                        if (filteredObj.size == cheakingState.size) {
                                                            filteredData.push(cheakingState)
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        this.setState({
            billboardFilterdData: filteredData
        })
    }

    render() {
        const { billboardData, companyName, types, rangeValzForDropdown, address, cities, states, billboardFilterdData } = this.state;
        console.log(billboardFilterdData, 'billboardFilterdData')
        const billboardRendring = (
            <div>
                <br/>
                <div className="scroll_table">
                    <table className='tableData table'>
                        <thead className="thead-dark" style={{width: '10px'}}>
                            <th className='tableHead' scope="col">#</th>
                            <th className='tableHead' scope="col">Company Name</th>
                            <th className='tableHead' scope="col">Address</th>
                            <th className='tableHead' scope="col">City</th>
                            <th className='tableHead' scope="col">State</th>
                            <th className='tableHead' scope="col">Size</th>
                            <th className='tableHead' scope="col">Action</th>
                        </thead>
                        {/* {tableData} */}

                        {billboardFilterdData.length !== 0 ? billboardFilterdData && billboardFilterdData.map((elem, key) => {
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
                            billboardData && billboardData.map((elem, key) => {
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
                    </table>
                </div>
            </div>
        );
        return (
            <div className="container">

                
                <div className='row' style={{marginLeft: '0px'}}>

                    <div className='col-xl-12 col-lg-12 col-md-12 col-11'>
                        <div>
                            <h2 className='text_topFilter filteration'>Filter</h2>
                        </div>
                        
                    </div>
                    <div className='d-lg-none d-xl-none d-block filterOne scrolling-wrapper' > 
                        
                        <div className="row">
                            <div className='col-xl-3 col-md-3 col-5 filterOne'>
                                <div className="filture">
                                    <h4 className='text_topFilter'>Company Name</h4>
                                </div>
                                <div>
                                    <Select onChange={this.handleChangeCompany}
                                        options={companyName}
                                    >
                                    </Select>
                                </div>
                            </div>
                            <div className='col-xl-3 col-md-3 col-5 filterOne'>
                                <div className="filture">
                                    <h4 className='text_topFilter'>BillBoard Type</h4>
                                </div>
                                <div>
                                    <Select onChange={this.handleChangeType}
                                        options={types}
                                    >
                                    </Select>
                                </div>
                            </div>
                            <div className='col-xl-3 col-md-3 col-5 filterOne'>
                                <div className="filture">
                                    <h4 className='text_topFilter'>Size</h4>
                                </div>
                                <div>
                                    <Select onChange={this.handleChangeSize}
                                        options={rangeValzForDropdown} 
                                    >
                                    </Select>
                                </div>
                            </div>
                            <div className='col-xl-3 col-md-3 col-5 filterOne'>
                                <div className="filture">
                                    <h4 className='text_topFilter'>Address</h4>
                                </div>
                                <div>
                                    <Select onChange={this.handleChangeAddress}
                                        options={address}
                                    >
                                    </Select>
                                </div>
                            </div>
                            <div className='col-xl-3 col-md-3 col-5 filterOne'>
                                <div className="filture">
                                    <h4 className='text_topFilter'>City</h4>
                                </div>
                                <div>
                                    <Select onChange={this.handleChangeCity}
                                        options={cities}
                                    >
                                    </Select>
                                </div>
                            </div>
                            <div className='col-xl-3 col-md-3 col-5 filterOne'>
                                <div className="filture">
                                    <h4 className='text_topFilter'>State</h4>
                                </div>
                                <div>
                                    <Select onChange={this.handleChangeState}
                                        options={states}
                                    >
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='col-lg-12 d-none d-lg-block d-xl-block'>

                        <div className="row">
                            <div className='col-lg-2'>
                                <div>
                                    <h4 className='text_topFilter'>Company Name</h4>
                                </div>
                                <div>
                                    <Select onChange={this.handleChangeCompany}
                                        options={companyName}
                                    >
                                    </Select>
                                </div>
                            </div>
                            <div className='col-lg-2'>
                                <div>
                                    <h4 className='text_topFilter'>BillBoard Type</h4>
                                </div>
                                <div>
                                    <Select onChange={this.handleChangeType}
                                        options={types}
                                    >
                                    </Select>
                                </div>
                            </div>
                            <div className='col-lg-2'>
                                <div>
                                    <h4 className='text_topFilter'>Size</h4>
                                </div>
                                <div>
                                    <Select onChange={this.handleChangeSize}
                                        options={rangeValzForDropdown} 
                                    >
                                    </Select>
                                </div>
                            </div>
                            <div className='col-lg-2'>
                                <div>
                                    <h4 className='text_topFilter'>Address</h4>
                                </div>
                                <div>
                                    <Select onChange={this.handleChangeAddress}
                                        options={address}
                                    >
                                    </Select>
                                </div>
                            </div>
                            <div className='col-lg-2'>
                                <div>
                                    <h4 className='text_topFilter'>City</h4>
                                </div>
                                <div>
                                    <Select onChange={this.handleChangeCity}
                                        options={cities}
                                    >
                                    </Select>
                                </div>
                            </div>
                            <div className='col-lg-2'>
                                <div>
                                    <h4 className='text_topFilter'>State</h4>
                                </div>
                                <div>
                                    <Select onChange={this.handleChangeState}
                                        options={states}
                                    >
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className='col-xl-12 col-lg-12 col-md-12 col-11'>
                        {billboardRendring}
                    </div>
            </div>
        )
    }
}
export default DashboardData;