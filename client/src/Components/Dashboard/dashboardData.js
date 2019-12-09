import React, { Component } from 'react';
import Select from 'react-select';
import NumberFormat from 'react-number-format';
import { Input } from 'antd';
import { HttpUtils } from '../../Services/HttpUtils';
import './dashboard.css';
import { Link } from "react-router-dom";
var filteredObj = {};

class DashboardData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            billBoradData: [],
            billboardFilterdData: [],
            typeArr: ['Static', 'Classic', 'Digital', 'Mobile', 'Bridge',
                'Vinyl', 'Painted', 'Three Dimensional', 'Scented', 'Lamp Post'],
            citiesArr: ["Abbottabad", "Ahmadpur East", " Ahmed Nager Chatha", " Ali Khan Abad", " Alipur", " Arifwala",
                " Attock", " Bhera", " Bhalwal", " Bahawalnagar", " Bahawalpur", " Bhakkar", 'Bhimber', " Burewala",
                " Chillianwala", " Choa Saidanshah", " Chakwal", " Chak Jhumra", " Chichawatni", " Chiniot",
                " Chishtian", " Chunian", " Dajkot", " Daska", " Davispur", " Darya Khan", " Dera Ghazi Khan", "Dera Ismail Khan",
                " Dhaular", " Dina", " Dinga", " Dhudial Chakwal", " Dipalpur", " Faisalabad", " Fateh Jang",
                " Ghakhar Mandi", " Gojra", " Gujranwala", " Gujrat", " Gujar Khan", " Harappa", 'Haripur', " Hafizabad", "Hyderabad",
                " Ghakhar Mandi", " Gojra", " Gujranwala", " Gujrat", " Gujar Khan", " Harappa", " Hafizabad", "Hyderabad",
                " Haroonabad", " Hasilpur", " Haveli Lakha", " Jalalpur Jattan", " Jampur", " Jaranwala", " Jhang",
                " Jhelum", " Kallar Syedan", " Kalabagh", " Karor Lal Esan", 'Karachi', " Kasur", " Kamalia", " Kāmoke", " Khanewal",
                " Khanpur", " Khanqah Sharif", " Kharian", " Khushab", " Kot Adu", " Jauharabad", " Lahore", " Islamabad",
                "Larkana", " Lalamusa", " Layyah", " Lawa Chakwal", " Liaquat Pur", " Lodhran", " Malakwal", " Mamoori", " Mailsi",
                " Mandi Bahauddin", " Mian Channu", " Mianwali", " Miani", 'Mirpur', 'Mangla Cantt', " Multan", " Murree", " Muridke", " Mianwali Bangla",
                " Muzaffargarh", " Narowal", " Nankana Sahib", " Okara", "Peshawar", " Renala Khurd", " Pakpattan", " Pattoki",
                " Pindi Bhattian", " Pind Dadan Khan", " Pir Mahal", " Qaimpur", " Qila Didar Singh", "Quetta", " Rabwah",
                " Raiwind", " Rajanpur", " Rahim Yar Khan", 'Rawalakot', " Rawalpindi", " Sadiqabad", " Sagri", " Sahiwal", " Sambrial",
                " Samundri", " Sangla Hill", " Sarai Alamgir", " Sargodha", " Shakargarh", " Sheikhupura", " Shujaabad",
                " Sialkot", " Sohawa", " Soianwala", " Siranwali", "Sukkur", " Tandlianwala", " Talagang", " Taxila", " Toba Tek Singh",
                " Vehari", " Wah Cantonment", " Wazirabad", " Yazman", " Zafarwal"],
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
        console.log(statesArr, 'statesArr')
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
        // console.log(billboardData , 'billboardData')
        // console.log(filteredObj , 'filteredObj')
        var filteredData = [];
        if (filteredObj.companyName !== undefined && filteredObj.type !== undefined
            // && 
            // filteredObj.size !== undefined
            && filteredObj.address !== undefined && filteredObj.city !== undefined && filteredObj.state !== undefined) {
            console.log('true condition')
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
        this.setState({
            billboardFilterdData: filteredData
        })
    }

    render() {
        const { billboardData, companyName, types, rangeValzForDropdown, address, cities, states, billboardFilterdData } = this.state;
        console.log(billboardFilterdData, 'billboardFilterdData')
        const billboardRendring = (
            <div>
                <br />
                <div className="scroll_table">
                    <table className='tableData table'>
                        <thead className="thead-dark" style={{ width: '10px' }}>
                            <th className='tableHead' scope="col">#</th>
                            <th className='tableHead' scope="col">Company Name</th>
                            <th className='tableHead' scope="col">Address</th>
                            <th className='tableHead' scope="col">City</th>
                            <th className='tableHead' scope="col">State</th>
                            {/* <th className='tableHead' scope="col">Size</th> */}
                            <th className='tableHead' scope="col">Action</th>
                        </thead>
                        {billboardFilterdData.length !== 0 ? billboardFilterdData && billboardFilterdData.map((elem, key) => {
                            return (<tbody>
                                <tr>
                                    <th scope="row">{key}</th>
                                    <td className='tableTd'>{elem.companyName}</td>
                                    <td className='tableTd'>{elem.address}</td>
                                    <td className='tableTd'>{elem.city}</td>
                                    <td className='tableTd'>{elem.state}</td>
                                    {/* <td className='tableTd'>{elem.size}</td> */}
                                    <td className='tableTd'>
                                            <div class="dropdown_dash">
                                                <button class="dropbtn_dash">Select <i class="fa fa-angle-down arowIcon"></i></button>
                                                <div class="dropdown-content_dash">
                                                    <Link to={{ pathname: `/billborad_Militry`, state: elem }}><span className="dropText">View</span></Link>
                                                    <a href="#" data-toggle="modal" data-target="#megaForm"><span className="dropText">Mega Sale</span></a>
                                                    <a href="#"data-toggle="modal" data-target="#biddingForm"><span className="dropText">Bidding</span></a>
                                                </div>
                                            </div>
                                        {/* <Link to={{ pathname: `/billborad_Militry`, state: elem }}>View</Link> */}
                                    </td>
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
                                        {/* <td className='tableTd'>{elem.size}</td> */}
                                        <td className='tableTd'>
                                            <div class="dropdown_dash">
                                                <button class="dropbtn_dash">Select <i class="fa fa-angle-down arowIcon"></i></button>
                                                <div class="dropdown-content_dash">
                                                    <Link to={{ pathname: `/billborad_Militry`, state: elem }}><span className="dropText">View</span></Link>
                                                    <a href="#" data-toggle="modal" data-target="#megaForm"><span className="dropText">Mega Sale</span></a>
                                                    <a href="#"data-toggle="modal" data-target="#biddingForm"><span className="dropText">Bidding</span></a>
                                                </div>
                                            </div>
                                            {/*  */}
                                        </td>
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
                <div className='row' style={{ marginLeft: '0px' }}>
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
                            {/* <div className='col-xl-3 col-md-3 col-5 filterOne'>
                                <div className="filture">
                                    <h4 className='text_topFilter'>Size</h4>
                                </div>
                                <div>
                                    <Select onChange={this.handleChangeSize}
                                        options={rangeValzForDropdown}
                                    >
                                    </Select>
                                </div>
                            </div> */}
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
                            {/* <div className='col-lg-2'>
                                <div>
                                    <h4 className='text_topFilter'>Size</h4>
                                </div>
                                <div>
                                    <Select onChange={this.handleChangeSize}
                                        options={rangeValzForDropdown}
                                    >
                                    </Select>
                                </div>
                            </div> */}
                            <div className='col-lg-4'>
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
                <div class="modal fade" id="megaForm">
                    <div class="modal-dialog">
                        <div class="modal-content modal_width">
                            <div class="modal-header">
                                <h4 class="modal-title">Mega Sale</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <div className="row padInModal">
                                    <div className="col-12 col-md-5 col-lg-5 col-xl-5">
                                        <img src="../images/log-in.png" alt='img' style={{ width: '100%', height: '257px' }} />
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                        <div className="row">
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                <label className="modeLForm_labeL"> Actual Price :
                                            <NumberFormat thousandSeparator={true} prefix={'Rs.'} className="form-control modeLForm_Input" placeholder="Actual price" />
                                                </label>
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                <label className="modeLForm_labeL"> Discount Price :
                                            <NumberFormat thousandSeparator={true} prefix={'Rs.'} className="form-control modeLForm_Input" placeholder="Discount price" />
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row" style={{ marginTop: '0.4vw' }}>
                                            <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                                                <label className="modeLForm_labeL">Billboard Availability :</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                <label className="modaLSmalLable">From</label>
                                                <input type="date" name="" className="form-control modeLForm_Input" />
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                <label className="modaLSmalLable">To</label>
                                                <input type="date" name="" className="form-control modeLForm_Input"  />
                                            </div>
                                        </div>
                                        <div className="row" style={{ marginTop: '0.4vw' }}>
                                            <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                                                <label className="modeLForm_labeL">Sale Availability :</label>
                                            </div>
                                        </div>
                                        {/* <div className="row">
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                <input type="date" name="bday" className="form-control modeLForm_Input" placeholder="Actual price" />
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                <input type="date" name="bday" className="form-control modeLForm_Input" placeholder="Discount price" />
                                            </div>
                                        </div> */}
                                        <div className="row">
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                <label className="modeLForm_timlable">From</label><br />
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                <label className="modaLSmalLable">Start Date</label>
                                                <input type="date" name="bday" className="form-control modeLForm_Input" placeholder="" />

                                            </div>
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                <label className="modaLSmalLable">Start Time</label>
                                                <input type="time" name="" className="form-control modeLForm_Input" placeholder="" />

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                <label className="modeLForm_timlable">To</label><br />
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                <label className="modaLSmalLable">End Date</label>
                                                <input type="date" name="bday" className="form-control modeLForm_Input" placeholder="" />

                                            </div>
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                <label className="modaLSmalLable">End Time</label>
                                                <input type="time" name="" className="form-control modeLForm_Input" placeholder="" />

                                            </div>
                                        </div>
                                        <div className="row" style={{ marginTop: '0.5vw' }}>
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6" style={{ textAlign: 'right' }}>
                                                <button className="btn btn-primary">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div class="modal fade" id="biddingForm">
                    <div class="modal-dialog">
                        <div class="modal-content modal_width">
                            <div class="modal-header">
                                <h4 class="modal-title">Bidding</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                <div className="row padInModal">
                                    <div className="col-12 col-md-5 col-lg-5 col-xl-5">
                                        <img src="../images/log-in.png" alt='img' style={{ width: '100%', height: '257px' }} />
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                        <div className="row">
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                <label className="modeLForm_labeL"> Min bid amount :
                                            <NumberFormat thousandSeparator={true} prefix={'Rs.'} className="form-control modeLForm_Input" placeholder="Min bid amount" />
                                                </label>
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                <label className="modeLForm_labeL"> Current Bid amount :
                                            <NumberFormat thousandSeparator={true} prefix={'Rs.'} className="form-control modeLForm_Input" placeholder="Current amount" />
                                                </label>
                                            </div>
                                        </div>
                                        {/* <div className="row" style={{marginTop:'0.5vw'}}>
                                            <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                                                <label className="modeLForm_labeL">Bidding Availability Date:</label>
                                            </div>
                                        </div> */}
                                        <div className="row">
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                <label className="modeLForm_timlable">From</label><br />
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                <label className="modaLSmalLable">Start Date</label>
                                                <input type="date" name="bday" className="form-control modeLForm_Input" placeholder="" />

                                            </div>
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                <label className="modaLSmalLable">Start Time</label>
                                                <input type="time" name="" className="form-control modeLForm_Input" placeholder="" />

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                <label className="modeLForm_timlable">To</label><br />
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                <label className="modaLSmalLable">End Date</label>
                                                <input type="date" name="bday" className="form-control modeLForm_Input" placeholder="" />

                                            </div>
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                <label className="modaLSmalLable">End Time</label>
                                                <input type="time" name="" className="form-control modeLForm_Input" placeholder="" />

                                            </div>
                                        </div>
                                        <div className="row" style={{ marginTop: '0.6vw' }}>
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-6 col-xl-6" style={{ textAlign: 'right' }}>
                                                <button className="btn btn-primary">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default DashboardData;
