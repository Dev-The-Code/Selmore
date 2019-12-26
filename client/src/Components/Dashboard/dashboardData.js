import React, { Component } from 'react';
import Select from 'react-select';
import NumberFormat from 'react-number-format';
import { HttpUtils } from '../../Services/HttpUtils';
import './dashboard.css';
import { Link } from "react-router-dom";
import {
    DatePicker, Form, Input, Icon, Button, Upload, Modal, notification, Cascader, TimePicker,
} from 'antd';
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
            states: [],
            billboardImage: [],
            billboardId: '',
            billboardAddress: '',
            billboardCity: '',
            megaSaleFormShow: false,
            biddingFormShow: false
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
        var filteredData = [];
        if (filteredObj.companyName !== undefined && filteredObj.type !== undefined && filteredObj.address !== undefined &&
            filteredObj.city !== undefined && filteredObj.state !== undefined) {
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

    validateNumber(rule, value, callback) {
        if (isNaN(value)) {
            callback('Please type Numbers');
        } else {
            callback()
        }
    }

    billboardImageAndId = (billboardDetail, param, e) => {
        console.log(param, 'param')
        if (param == 'megaSale') {
            this.setState({
                billboardImage: billboardDetail.images,
                billboardId: billboardDetail._id,
                billboardAddress: billboardDetail.address,
                billboardCity: billboardDetail.city,
                megaSaleFormShow: true,
                biddingFormShow: false
            })
        }
        else if (param == 'bidding') {
            this.setState({
                billboardImage: billboardDetail.images,
                billboardId: billboardDetail._id,
                billboardAddress: billboardDetail.address,
                billboardCity: billboardDetail.city,
                biddingFormShow: true,
                megaSaleFormShow: false
            })
        }


    }

    handleSubmitMegaSale = e => {
        const { billboardImage, billboardId, billboardAddress, billboardCity } = this.state;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.images = billboardImage;
                values.billboardId = billboardId;
                values.billboardAddress = billboardAddress;
                values.billboardCity = billboardCity;
                values.objectId = ''
                let disscount = values.actualPrice - values.discountPrice;
                let percantageOffDisscount = (disscount / values.actualPrice) * 100;
                values.percantageOffDisscount = percantageOffDisscount;
                this.megaSaleUpload(values)
            }
        });
    };

    handleSubmitBidding = e => {
        const { billboardImage, billboardId, billboardAddress, billboardCity } = this.state;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.images = billboardImage;
                values.billboardId = billboardId;
                values.billboardAddress = billboardAddress;
                values.billboardCity = billboardCity;
                values.objectId = ''
                this.biddingUpload(values)
            }
        });
    };

    megaSaleUpload = async (values) => {
        let response = await HttpUtils.post('sendmegabillboard', values);
        console.log(response, 'response')

    }

    biddingUpload = async (values) => {
        console.log(values, 'values bidding billboard')
        let response = await HttpUtils.post('postbiddingbillboard', values);
        console.log(response, 'response')

    }

    render() {
        const { billboardData, companyName, types, address, cities, states, billboardFilterdData, megaSaleFormShow, biddingFormShow } = this.state;
        const { getFieldDecorator } = this.props.form;

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
                                    <td className='tableTd'>
                                        <div class="dropdown_dash">
                                            <button class="dropbtn_dash">Select <i class="fa fa-angle-down arowIcon"></i></button>
                                            <div class="dropdown-content_dash">
                                                <Link to={{ pathname: `/billborad_Militry`, state: elem }}><span className="dropText">View</span></Link>
                                                <a href="#" data-toggle="modal" data-target="#megaForm"><span className="dropText" onClick={this.billboardImageAndId.bind(this, elem, 'megaSale')}>Mega Sale</span></a>
                                                <a href="#" data-toggle="modal" data-target="#biddingForm"><span className="dropText" onClick={this.billboardImageAndId.bind(this, elem, 'bidding')}>Bidding</span></a>
                                            </div>
                                        </div>
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
                                        <td className='tableTd'>
                                            <div class="dropdown_dash">
                                                <button class="dropbtn_dash">Select <i class="fa fa-angle-down arowIcon"></i></button>
                                                <div class="dropdown-content_dash">
                                                    <Link to={{ pathname: `/billborad_Militry`, state: elem }}><span className="dropText">View</span></Link>
                                                    <a data-toggle="modal" data-target="#megaForm" onClick={this.billboardImageAndId.bind(this, elem, 'megaSale')}>
                                                        <span className="dropText" >Mega Sale</span>
                                                    </a>
                                                    <a data-toggle="modal" data-target="#biddingForm" onClick={this.billboardImageAndId.bind(this, elem, 'bidding')}>
                                                        <span className="dropText" >Bidding</span>
                                                    </a>
                                                </div>
                                            </div>
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
                {megaSaleFormShow ?
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

                                            <Form onSubmit={this.handleSubmitMegaSale}>
                                                <div className="row">
                                                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label className="modeLForm_labeL"> Actual Price :
                                                    <Form.Item>
                                                                {getFieldDecorator(`actualPrice`, {
                                                                    // initialValue: this.state.width,
                                                                    rules: [{
                                                                        required: true,
                                                                        message: 'Please enter Actual Price',
                                                                        whitespace: true
                                                                    },
                                                                    { validator: this.validateNumber.bind(this) }]
                                                                })(
                                                                    <Input
                                                                        className="form-control modeLForm_Input"
                                                                        placeholder="Actual price" />
                                                                )}
                                                            </Form.Item>
                                                        </label>
                                                    </div>
                                                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label className="modeLForm_labeL"> Discount Price :


                                                    <Form.Item>
                                                                {getFieldDecorator(`discountPrice`, {
                                                                    // initialValue: this.state.width,
                                                                    rules: [{
                                                                        required: true,
                                                                        message: 'Please enter Discount Price',
                                                                        whitespace: true
                                                                    },
                                                                    { validator: this.validateNumber.bind(this) }]
                                                                })(
                                                                    <Input
                                                                        className="form-control modeLForm_Input"
                                                                        placeholder="Discount price" />
                                                                )}
                                                            </Form.Item>

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
                                                        <Form.Item>
                                                            {getFieldDecorator(`billboardAvailabilityFrom`, {
                                                                // initialValue: this.state.width,
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please select date',
                                                                    whitespace: true
                                                                }]
                                                            })(
                                                                <Input type="date" name="" className="form-control modeLForm_Input" />
                                                            )}
                                                        </Form.Item>

                                                    </div>
                                                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label className="modaLSmalLable">To</label>
                                                        <Form.Item>
                                                            {getFieldDecorator(`billboardAvailabilityTo`, {
                                                                // initialValue: this.state.width,
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please select date',
                                                                    whitespace: true
                                                                }]
                                                            })(
                                                                <Input type="date" name="" className="form-control modeLForm_Input" />
                                                            )}
                                                        </Form.Item>
                                                    </div>
                                                </div>
                                                <div className="row" style={{ marginTop: '0.4vw' }}>
                                                    <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                                                        <label className="modeLForm_labeL">Sale Availability :</label>
                                                    </div>
                                                </div>
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
                                                        <Form.Item>
                                                            {getFieldDecorator(`saleStartDate`, {
                                                                // initialValue: this.state.width,
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please select date',
                                                                    whitespace: true
                                                                }]
                                                            })(
                                                                <Input type="date" name="bday" className="form-control modeLForm_Input" placeholder="" />
                                                            )}
                                                        </Form.Item>
                                                    </div>
                                                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label className="modaLSmalLable">Start Time</label>
                                                        <Form.Item>
                                                            {getFieldDecorator(`saleStartTime`, {
                                                                // initialValue: this.state.width,
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please select date',
                                                                    whitespace: true
                                                                }]
                                                            })(
                                                                <Input type="time" name="" className="form-control modeLForm_Input" placeholder="" />
                                                            )}
                                                        </Form.Item>
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
                                                        <Form.Item>
                                                            {getFieldDecorator(`saleEndDate`, {
                                                                // initialValue: this.state.width,
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please select date',
                                                                    whitespace: true
                                                                }]
                                                            })(
                                                                <Input type="date" name="bday" className="form-control modeLForm_Input" placeholder="" />
                                                            )}
                                                        </Form.Item>

                                                    </div>
                                                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label className="modaLSmalLable">End Time</label>
                                                        <Form.Item>
                                                            {getFieldDecorator(`saleEndTime`, {
                                                                // initialValue: this.state.width,
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please select date',
                                                                    whitespace: true
                                                                }]
                                                            })(
                                                                <Input type="time" name="" className="form-control modeLForm_Input" placeholder="" />
                                                            )}
                                                        </Form.Item>

                                                    </div>
                                                </div>
                                                <div className="row" style={{ marginTop: '0.5vw' }}>
                                                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                    </div>
                                                    <div className="col-12 col-md-6 col-lg-6 col-xl-6" style={{ textAlign: 'right' }}>
                                                        <Form.Item>
                                                            <Button className="btn btn-primary"
                                                                type="primary" htmlType="submit"
                                                            >Submit</Button>
                                                        </Form.Item>
                                                    </div>
                                                </div>
                                            </Form>

                                        </div>
                                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                                    </div>
                                    <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                    : null
                }
                {/* </div> */}

                {biddingFormShow ?
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

                                            <Form onSubmit={this.handleSubmitBidding}>
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
                                                        <Form.Item>
                                                            {getFieldDecorator(`biddingStartDate`, {
                                                                // initialValue: this.state.width,
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please select date',
                                                                    whitespace: true
                                                                }]
                                                            })(
                                                                <Input type="date" name="bday" className="form-control modeLForm_Input" placeholder="" />
                                                            )}
                                                        </Form.Item>
                                                        {/* <input type="date" name="bday" className="form-control modeLForm_Input" placeholder="" /> */}

                                                    </div>
                                                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label className="modaLSmalLable">Start Time</label>
                                                        <Form.Item>
                                                            {getFieldDecorator(`biddingStartTime`, {
                                                                // initialValue: this.state.width,
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please select date',
                                                                    whitespace: true
                                                                }]
                                                            })(
                                                                <Input type="time" name="" className="form-control modeLForm_Input" placeholder="" />
                                                            )}
                                                        </Form.Item>
                                                        {/* <input type="time" name="" className="form-control modeLForm_Input" placeholder="" /> */}
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
                                                        <Form.Item>
                                                            {getFieldDecorator(`biddingEndDate`, {
                                                                // initialValue: this.state.width,
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please select date',
                                                                    whitespace: true
                                                                }]
                                                            })(
                                                                <Input type="date" name="bday" className="form-control modeLForm_Input" placeholder="" />
                                                            )}
                                                        </Form.Item>
                                                        {/* <input type="date" name="bday" className="form-control modeLForm_Input" placeholder="" /> */}

                                                    </div>
                                                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label className="modaLSmalLable">End Time</label>
                                                        <Form.Item>
                                                            {getFieldDecorator(`biddingEndTime`, {
                                                                // initialValue: this.state.width,
                                                                rules: [{
                                                                    required: true,
                                                                    message: 'Please select date',
                                                                    whitespace: true
                                                                }]
                                                            })(
                                                                <Input type="time" name="" className="form-control modeLForm_Input" placeholder="" />
                                                            )}
                                                        </Form.Item>
                                                        {/* <input type="time" name="" className="form-control modeLForm_Input" placeholder="" /> */}

                                                    </div>
                                                </div>
                                                <div className="row" style={{ marginTop: '0.6vw' }}>
                                                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                        <label className="modeLForm_labeL"> Min bid amount :
                                                        <Form.Item>
                                                                {getFieldDecorator(`minBidAmount`, {
                                                                    // initialValue: this.state.width,
                                                                    rules: [{
                                                                        required: true,
                                                                        message: 'Please enter Min bid amount ',
                                                                        whitespace: true
                                                                    },
                                                                    { validator: this.validateNumber.bind(this) }]
                                                                })(
                                                                    <Input
                                                                        className="form-control modeLForm_Input"
                                                                        placeholder="Discount price" />
                                                                )}
                                                            </Form.Item>
                                                        </label>
                                                    </div>
                                                    <div className="col-12 col-md-6 col-lg-6 col-xl-6" style={{ textAlign: 'right', marginTop: '2vw' }}>
                                                        <Form.Item>
                                                            <Button className="btn btn-primary"
                                                                type="primary" htmlType="submit"
                                                            >Submit</Button>
                                                        </Form.Item>
                                                    </div>
                                                </div>
                                            </Form>

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
                    : null
                }
            </div >
        )
    }
}
const WrappedDynamicFieldSet = Form.create()(DashboardData);
export default WrappedDynamicFieldSet;
