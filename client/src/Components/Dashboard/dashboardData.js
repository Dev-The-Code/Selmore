import React, { Component } from 'react';
import Select from 'react-select';
import { HttpUtils } from '../../Services/HttpUtils';
import './dashboard.scss';
import { Link } from "react-router-dom";
import {
    DatePicer, Form, Input, Icon, Button, Upload, Modal, notification, Cascader, TimePicker, Spin
} from 'antd';

let filterCompanyNameArr = [];
let filterTypesArr = [];
let filterAddresArr = [];
let filterCityName = [];
let filterStateName = [];

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
                " Haroonabad", " Hasilpur", " Haveli Lakha", " Islamabad", " Jalalpur Jattan", " Jampur", " Jaranwala", " Jhang",
                " Jhelum", " Kallar Syedan", " Kalabagh", " Karor Lal Esan", 'Karachi', " Kasur", " Kamalia", " Kāmoke", " Khanewal",
                " Khanpur", " Khanqah Sharif", " Kharian", " Khushab", " Kot Adu", " Jauharabad", " Lahore",
                "Larkana", " Lalamusa", " Layyah", " Lawa Chakwal", " Liaquat Pur", " Lodhran", " Malakwal", " Mamoori", " Mailsi",
                " Mandi Bahauddin", " Mian Channu", " Mianwali", " Miani", 'Mirpur', 'Mangla Cantt', " Multan", " Murree", " Muridke",
                " Mianwali Bangla", " Muzaffargarh", " Narowal", " Nankana Sahib", " Okara", "Peshawar", " Pakpattan", " Pattoki", " Pindi Bhattian",
                " Pind Dadan Khan", " Pir Mahal", " Qaimpur", " Qila Didar Singh", "Quetta", " Renala Khurd", " Rabwah", " Raiwind", " Rajanpur",
                " Rahim Yar Khan", 'Rawalakot', " Rawalpindi", " Sadiqabad", " Sagri", " Sahiwal", " Sambrial",
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
            biddingFormShow: false,
            loader: false,
            isAlert: false,
            mgs: '',
            redirectDashboard: false,
            billboardType: '',
            billboardFacing: '',
            billboardLighting: '',
            billboardAudienceType: '',
            billboardState: '',
            companyNameValue: '',
            typeValue: '',
            addressValue: '',
            cityValue: '',
            stateValue: '',
            notFoundFilterData: false,
            showRecord: true,
            oneBillboardData: ''
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
        if (response) {
            companyName = response.content.map((elem, i) => {
                return { label: elem.companyName, value: elem.companyName, id: elem._id }
            })
        }
        types = typeArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        let rangeValues = rangeNumArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        if (responseBillboardData) {
            address = responseBillboardData.content.map((elem, i) => {
                return { label: elem.address, value: elem.address, id: elem._id }
            })
        }
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

    handleChange = (dropDownParam, dropDownValueObj) => {

        let dropDownValue = []
        dropDownValue.push(dropDownValueObj.value);

        if (dropDownParam == 'companyName') {
            filterCompanyNameArr = dropDownValue;
            this.setState({
                companyNameValue: dropDownValueObj
            })
        }
        else if (dropDownParam == 'billboardType') {
            filterTypesArr = dropDownValue;
            this.setState({
                typeValue: dropDownValueObj
            })
        }
        else if (dropDownParam == 'billboardAddres') {
            filterAddresArr = dropDownValue;
            this.setState({
                addressValue: dropDownValueObj
            })
        }
        else if (dropDownParam == 'billboardCity') {
            filterCityName = dropDownValue;
            this.setState({
                cityValue: dropDownValueObj
            })
        }
        else if (dropDownParam == 'billboardState') {
            filterStateName = dropDownValue;
            this.setState({
                stateValue: dropDownValueObj
            })
        }
        this.filterKeysGet();
    }


    removeValue = (param, value) => {
        let arr = [];
        if (param == "compamyName") {
            filterCompanyNameArr = arr
            this.setState({
                companyNameValue: ''
            })
        }
        else if (param == "billboardType") {
            filterTypesArr = arr
            this.setState({
                typeValue: ''
            })
        }
        else if (param == 'billboardAddres') {
            filterAddresArr = arr;
            this.setState({
                addressValue: ''
            })

        }
        else if (param == 'billboardCity') {
            filterCityName = arr;
            this.setState({
                cityValue: ''
            })
        }
        else if (param == 'billboardState') {
            filterStateName = arr;
            this.setState({
                stateValue: ''
            })
        }

        this.filterKeysGet();
        if (filterCompanyNameArr.length == 0 && filterTypesArr.length == 0 && filterAddresArr.length == 0
            && filterCityName.length == 0 && filterStateName.length == 0) {
            this.setState({
                showRecord: true,
                notFoundFilterData: false,
                billboardFilterdData: [],
            })
        }
        else {
            console.log('else condition true')
            this.filterKeysGet();
        }
    }

    showAllRooms = () => {
        filterCompanyNameArr = [];
        filterTypesArr = [];
        filterAddresArr = [];
        filterCityName = [];
        filterStateName = [];

        this.setState({
            showRecord: true,
            notFoundFilterData: false,
            companyNameValue: '',
            typeValue: '',
            addressValue: '',
            cityValue: '',
            stateValue: ''
        })
        this.filterKeysGet();
    }


    filterKeysGet = () => {
        let filterKeys = [];
        if (filterCompanyNameArr.length > 0) {
            filterKeys.push('companyName')
        }
        if (filterTypesArr.length > 0) {
            filterKeys.push('billboardType')
        }
        if (filterAddresArr.length > 0) {
            filterKeys.push('billboardAddres')
        }
        if (filterCityName.length > 0) {
            filterKeys.push('billboardCity')
        }
        if (filterStateName.length > 0) {
            filterKeys.push('billboardState')
        }


        this.filterBillboardData(filterKeys)
    }

    filterBillboardData = (filterKeys) => {
        if (filterKeys.length == 1) {
            this.filterBillboardDataWithOneKey(filterKeys);
        }
        else if (filterKeys.length == 2) {
            this.filterBillboardDataWithTwoKeys(filterKeys);
        }
        else if (filterKeys.length == 3) {
            this.filterBillboardDataWithThreeKeys(filterKeys);
        }
        else if (filterKeys.length == 4) {
            this.filterBillboardDataWithFourKeys(filterKeys)
        }
        else if (filterKeys.length == 5) {
            this.filterBillboardDataWithFiveKeys(filterKeys)
        }
    }

    filterBillboardDataWithOneKey = (filterKeys) => {
        const { billboardData } = this.state;
        let data;
        for (var i = 0; i < filterKeys.length; i++) {
            if (filterKeys[i] == 'companyName') {
                data = billboardData.filter((elem) => {
                    return elem.companyName && filterCompanyNameArr.includes(elem.companyName)
                })
            }
            else if (filterKeys[i] == 'billboardType') {
                data = billboardData.filter((elem) => {
                    return elem.type && filterTypesArr.includes(elem.type)
                })
            }
            else if (filterKeys[i] == 'billboardAddres') {
                data = billboardData.filter((elem) => {
                    return elem.address && filterAddresArr.includes(elem.address)
                })
            }
            else if (filterKeys[i] == 'billboardCity') {
                data = billboardData.filter((elem) => {
                    return elem.city && filterCityName.includes(elem.city)
                })
            }
            else if (filterKeys[i] == 'billboardState') {
                data = billboardData.filter((elem) => {
                    return elem.state && filterStateName.includes(elem.state)
                })
            }
        }

        if (data.length == 0) {
            this.setState({
                notFoundFilterData: true,
                billboardFilterdData: data,
                showRecord: false
            })
        }
        else {
            this.setState({
                notFoundFilterData: false,
                billboardFilterdData: data,
                showRecord: false
            })
        }


    }

    filterBillboardDataWithTwoKeys = (filterKeys) => {
        const { billboardData } = this.state;
        let data1;
        let filteredData;

        for (var i = 0; i < filterKeys.length; i++) {
            if (i == 0) {
                if (filterKeys[i] == 'companyName') {
                    data1 = billboardData.filter((elem) => {
                        return elem.companyName && filterCompanyNameArr.includes(elem.companyName)
                    })
                }
                else if (filterKeys[i] == 'billboardType') {
                    data1 = billboardData.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'billboardAddres') {
                    data1 = billboardData.filter((elem) => {
                        return elem.address && filterAddresArr.includes(elem.address)
                    })
                }
                else if (filterKeys[i] == 'billboardCity') {
                    data1 = billboardData.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'billboardState') {
                    data1 = billboardData.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 1) {
                if (filterKeys[i] == 'companyName') {
                    filteredData = data1.filter((elem) => {
                        return elem.companyName && filterCompanyNameArr.includes(elem.companyName)
                    })
                }
                else if (filterKeys[i] == 'billboardType') {
                    filteredData = data1.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'billboardAddres') {
                    filteredData = data1.filter((elem) => {
                        return elem.address && filterAddresArr.includes(elem.address)
                    })
                }
                else if (filterKeys[i] == 'billboardCity') {
                    filteredData = data1.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'billboardState') {
                    filteredData = data1.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
        }

        if (filteredData.length == 0) {
            this.setState({
                notFoundFilterData: true,
                billboardFilterdData: filteredData,
                showRecord: false
            })
        }
        else {
            this.setState({
                notFoundFilterData: false,
                billboardFilterdData: filteredData,
                showRecord: false

            })
        }

    }

    filterBillboardDataWithThreeKeys = (filterKeys) => {
        const { billboardData } = this.state;
        let data1;
        let data2
        let filteredData;

        for (var i = 0; i < filterKeys.length; i++) {
            if (i == 0) {
                if (filterKeys[i] == 'companyName') {
                    data1 = billboardData.filter((elem) => {
                        return elem.companyName && filterCompanyNameArr.includes(elem.companyName)
                    })
                }
                else if (filterKeys[i] == 'billboardType') {
                    data1 = billboardData.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'billboardAddres') {
                    data1 = billboardData.filter((elem) => {
                        return elem.address && filterAddresArr.includes(elem.address)
                    })
                }
                else if (filterKeys[i] == 'billboardCity') {
                    data1 = billboardData.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'billboardState') {
                    data1 = billboardData.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 1) {
                if (filterKeys[i] == 'companyName') {
                    data2 = data1.filter((elem) => {
                        return elem.companyName && filterCompanyNameArr.includes(elem.companyName)
                    })
                }
                else if (filterKeys[i] == 'billboardType') {
                    data2 = data1.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'billboardAddres') {
                    data2 = data1.filter((elem) => {
                        return elem.address && filterAddresArr.includes(elem.address)
                    })
                }
                else if (filterKeys[i] == 'billboardCity') {
                    data2 = data1.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'billboardState') {
                    data2 = data1.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 2) {
                if (filterKeys[i] == 'companyName') {
                    filteredData = data2.filter((elem) => {
                        return elem.companyName && filterCompanyNameArr.includes(elem.companyName)
                    })
                }
                else if (filterKeys[i] == 'billboardType') {
                    filteredData = data2.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'billboardAddres') {
                    filteredData = data2.filter((elem) => {
                        return elem.address && filterAddresArr.includes(elem.address)
                    })
                }
                else if (filterKeys[i] == 'billboardCity') {
                    filteredData = data2.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'billboardState') {
                    filteredData = data2.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
        }

        if (filteredData.length == 0) {
            this.setState({
                notFoundFilterData: true,
                billboardFilterdData: filteredData,
                showRecord: false
            })
        }
        else {
            this.setState({
                notFoundFilterData: false,
                billboardFilterdData: filteredData,
                showRecord: false

            })
        }

    }

    filterBillboardDataWithFourKeys = (filterKeys) => {
        const { billboardData } = this.state;
        let data1;
        let data2;
        let data3;
        let filteredData;

        for (var i = 0; i < filterKeys.length; i++) {
            if (i == 0) {
                if (filterKeys[i] == 'companyName') {
                    data1 = billboardData.filter((elem) => {
                        return elem.companyName && filterCompanyNameArr.includes(elem.companyName)
                    })
                }
                else if (filterKeys[i] == 'billboardType') {
                    data1 = billboardData.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'billboardAddres') {
                    data1 = billboardData.filter((elem) => {
                        return elem.address && filterAddresArr.includes(elem.address)
                    })
                }
                else if (filterKeys[i] == 'billboardCity') {
                    data1 = billboardData.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'billboardState') {
                    data1 = billboardData.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 1) {
                if (filterKeys[i] == 'companyName') {
                    data2 = data1.filter((elem) => {
                        return elem.companyName && filterCompanyNameArr.includes(elem.companyName)
                    })
                }
                else if (filterKeys[i] == 'billboardType') {
                    data2 = data1.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'billboardAddres') {
                    data2 = data1.filter((elem) => {
                        return elem.address && filterAddresArr.includes(elem.address)
                    })
                }
                else if (filterKeys[i] == 'billboardCity') {
                    data2 = data1.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'billboardState') {
                    data2 = data1.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 2) {
                if (filterKeys[i] == 'companyName') {
                    data3 = data2.filter((elem) => {
                        return elem.companyName && filterCompanyNameArr.includes(elem.companyName)
                    })
                }
                else if (filterKeys[i] == 'billboardType') {
                    data3 = data2.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'billboardAddres') {
                    data3 = data2.filter((elem) => {
                        return elem.address && filterAddresArr.includes(elem.address)
                    })
                }
                else if (filterKeys[i] == 'billboardCity') {
                    data3 = data2.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'billboardState') {
                    data3 = data2.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 3) {
                if (filterKeys[i] == 'companyName') {
                    filteredData = data3.filter((elem) => {
                        return elem.companyName && filterCompanyNameArr.includes(elem.companyName)
                    })
                }
                else if (filterKeys[i] == 'billboardType') {
                    filteredData = data3.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'billboardAddres') {
                    filteredData = data3.filter((elem) => {
                        return elem.address && filterAddresArr.includes(elem.address)
                    })
                }
                else if (filterKeys[i] == 'billboardCity') {
                    filteredData = data3.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'billboardState') {
                    filteredData = data3.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
        }

        if (filteredData.length == 0) {
            this.setState({
                notFoundFilterData: true,
                billboardFilterdData: filteredData,
                showRecord: false
            })
        }
        else {
            this.setState({
                notFoundFilterData: false,
                billboardFilterdData: filteredData,
                showRecord: false

            })
        }

    }

    filterBillboardDataWithFiveKeys = (filterKeys) => {
        const { billboardData } = this.state;
        let data1;
        let data2;
        let data3;
        let data4;
        let filteredData;

        for (var i = 0; i < filterKeys.length; i++) {
            if (i == 0) {
                if (filterKeys[i] == 'companyName') {
                    data1 = billboardData.filter((elem) => {
                        return elem.companyName && filterCompanyNameArr.includes(elem.companyName)
                    })
                }
                else if (filterKeys[i] == 'billboardType') {
                    data1 = billboardData.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'billboardAddres') {
                    data1 = billboardData.filter((elem) => {
                        return elem.address && filterAddresArr.includes(elem.address)
                    })
                }
                else if (filterKeys[i] == 'billboardCity') {
                    data1 = billboardData.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'billboardState') {
                    data1 = billboardData.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 1) {
                if (filterKeys[i] == 'companyName') {
                    data2 = data1.filter((elem) => {
                        return elem.companyName && filterCompanyNameArr.includes(elem.companyName)
                    })
                }
                else if (filterKeys[i] == 'billboardType') {
                    data2 = data1.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'billboardAddres') {
                    data2 = data1.filter((elem) => {
                        return elem.address && filterAddresArr.includes(elem.address)
                    })
                }
                else if (filterKeys[i] == 'billboardCity') {
                    data2 = data1.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'billboardState') {
                    data2 = data1.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 2) {
                if (filterKeys[i] == 'companyName') {
                    data3 = data2.filter((elem) => {
                        return elem.companyName && filterCompanyNameArr.includes(elem.companyName)
                    })
                }
                else if (filterKeys[i] == 'billboardType') {
                    data3 = data2.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'billboardAddres') {
                    data3 = data2.filter((elem) => {
                        return elem.address && filterAddresArr.includes(elem.address)
                    })
                }
                else if (filterKeys[i] == 'billboardCity') {
                    data3 = data2.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'billboardState') {
                    data3 = data2.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 3) {
                if (filterKeys[i] == 'companyName') {
                    data4 = data3.filter((elem) => {
                        return elem.companyName && filterCompanyNameArr.includes(elem.companyName)
                    })
                }
                else if (filterKeys[i] == 'billboardType') {
                    data4 = data3.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'billboardAddres') {
                    data4 = data3.filter((elem) => {
                        return elem.address && filterAddresArr.includes(elem.address)
                    })
                }
                else if (filterKeys[i] == 'billboardCity') {
                    data4 = data3.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'billboardState') {
                    data4 = data3.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 4) {
                if (filterKeys[i] == 'companyName') {
                    filteredData = data4.filter((elem) => {
                        return elem.companyName && filterCompanyNameArr.includes(elem.companyName)
                    })
                }
                else if (filterKeys[i] == 'billboardType') {
                    filteredData = data4.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'billboardAddres') {
                    filteredData = data4.filter((elem) => {
                        return elem.address && filterAddresArr.includes(elem.address)
                    })
                }
                else if (filterKeys[i] == 'billboardCity') {
                    filteredData = data4.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'billboardState') {
                    filteredData = data4.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
        }

        if (filteredData.length == 0) {
            this.setState({
                notFoundFilterData: true,
                billboardFilterdData: filteredData,
                showRecord: false
            })
        }
        else {
            this.setState({
                notFoundFilterData: false,
                billboardFilterdData: filteredData,
                showRecord: false

            })
        }

    }


    validateNumber(rule, value, callback) {
        if (isNaN(value)) {
            callback('Please type Numbers');
        } else {
            callback()
        }
    }

    billboardImageAndId = (billboardDetail, param, e) => {
        if (param == 'megaSale') {
            this.setState({
                billboardImage: billboardDetail.images,
                billboardId: billboardDetail._id,
                billboardAddress: billboardDetail.address,
                billboardCity: billboardDetail.city,
                megaSaleFormShow: true,
                biddingFormShow: false,
                billboardType: billboardDetail.type,
                billboardFacing: billboardDetail.facing,
                billboardLighting: billboardDetail.lightning,
                billboardAudienceType: billboardDetail.audianceType,
                billboardState: billboardDetail.state,
                oneBillboardData: billboardDetail,
                loader: false,
                isAlert: false,
                mgs: '',
            }
                ,
                () => {
                    document.getElementById('megaForm').click();
                })

        }
        else if (param == 'bidding') {
            this.setState({
                billboardImage: billboardDetail.images,
                billboardId: billboardDetail._id,
                billboardAddress: billboardDetail.address,
                billboardCity: billboardDetail.city,
                biddingFormShow: true,
                megaSaleFormShow: false,
                billboardType: billboardDetail.type,
                billboardFacing: billboardDetail.facing,
                billboardLighting: billboardDetail.lightning,
                billboardAudienceType: billboardDetail.audianceType,
                billboardState: billboardDetail.state,
                oneBillboardData: billboardDetail,
                loader: false,
                isAlert: false,
                mgs: '',

            },
                () => {
                    document.getElementById('biddingForm').click();
                })
        }


    }

    handleSubmitMegaSale = e => {
        const { billboardImage, billboardId, billboardAddress, billboardCity, billboardType, billboardFacing, billboardLighting,
            billboardAudienceType, billboardState } = this.state;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({
                    loader: true,
                    isAlert: false,
                    mgs: '',
                    redirectDashboard: false
                })
                values.billboardStatus = 'Available';
                values.billboardCity = billboardCity;
                values.billboardType = billboardType;
                values.billboardFacing = billboardFacing;
                values.billboardLighting = billboardLighting;
                values.billboardAudienceType = billboardAudienceType;
                values.billboardState = billboardState;
                values.billboardAddress = billboardAddress;
                values.images = billboardImage;
                values.billboardId = billboardId;
                values.objectId = '';
                let disscount = values.actualPrice - values.discountPrice;
                let percantageOffDisscount = Math.round((disscount / values.actualPrice) * 100);
                values.percantageOffDisscount = percantageOffDisscount;
                this.megaSaleUpload(values)
            }
        });
    };

    handleSubmitBidding = e => {
        const { billboardImage, billboardId, billboardAddress, billboardCity, billboardType, billboardFacing, billboardLighting,
            billboardAudienceType, billboardState } = this.state;
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({
                    loader: true,
                    isAlert: false,
                    mgs: '',
                    redirectDashboard: false
                })
                values.images = billboardImage;
                values.billboardId = billboardId;
                values.billboardAddress = billboardAddress;
                values.billboardCity = billboardCity;
                values.billboardType = billboardType;
                values.billboardFacing = billboardFacing;
                values.billboardLighting = billboardLighting;
                values.billboardAudienceType = billboardAudienceType;
                values.billboardState = billboardState;
                values.objectId = ''
                this.biddingUpload(values)
            }
        });
    };

    megaSaleUpload = async (values) => {
        const { billboardId, oneBillboardData } = this.state;

        if (oneBillboardData.status == 'No Available' || oneBillboardData.avalibleOn == "megaSale" || oneBillboardData.avalibleOn == "bidding") {
            this.setState({
                loader: false,
                isAlert: true,
                mgs: "This billboard is not avalible for mega Sale kindly select another one",
                redirectDashboard: false
            })
        }
        else {
            let response = await HttpUtils.post('sendmegabillboard', values);
            if (response) {
                if (response.code == 200) {
                    let obj = {
                        objectId: billboardId,
                        avalibleOn: 'megaSale',
                        avalibleOnId: response.content._id,
                        status: "No Available",
                    }
                    let resp = await HttpUtils.post('listadd', obj);
                    if (resp) {
                        if (resp.code == 200) {
                            this.setState({
                                loader: false,
                                isAlert: true,
                                mgs: 'Your billboard has been publish on mega sale',
                                redirectDashboard: true
                            })
                            window.location.reload(true);
                        }
                    }

                }
                else {
                    this.setState({
                        loader: false,
                        isAlert: true,
                        mgs: response.msg,
                        redirectDashboard: false
                    })
                }
            }
            else {
                this.setState({
                    loader: false,
                    isAlert: true,
                    mgs: 'Kindly check your connection',
                    redirectDashboard: false

                })
            }
        }



    }

    biddingUpload = async (values) => {
        const { billboardId, oneBillboardData } = this.state;
        if (oneBillboardData.status == 'No Available' || oneBillboardData.avalibleOn == "megaSale" || oneBillboardData.avalibleOn == "bidding") {
            this.setState({
                loader: false,
                isAlert: true,
                mgs: "This billboard is not avalible for bidding kindly select another one",
                redirectDashboard: false
            })
        }
        else {

            let response = await HttpUtils.post('postbiddingbillboard', values);
            if (response) {
                if (response.code == 200) {
                    let obj = {
                        objectId: billboardId,
                        avalibleOn: 'bidding',
                        avalibleOnId: response.content._id,
                        status: "No Available",
                    }
                    let resp = await HttpUtils.post('listadd', obj);
                    if (resp) {
                        if (resp.code == 200) {
                            this.setState({
                                loader: false,
                                isAlert: true,
                                mgs: 'Your billboard has been publish on bidding',
                                redirectDashboard: true
                            })
                            window.location.reload(true);
                        }
                    }
                }
                else {
                    this.setState({
                        loader: false,
                        isAlert: true,
                        mgs: response.msg,
                        redirectDashboard: false
                    })
                }
            }
            else {
                this.setState({
                    loader: false,
                    isAlert: true,
                    mgs: 'Kindly check your connection',
                    redirectDashboard: false

                })
            }
        }
    }

    render() {
        const { billboardData, companyName, types, address, cities, states, billboardFilterdData, megaSaleFormShow, companyNameValue,
            typeValue, addressValue, cityValue, stateValue, notFoundFilterData, showRecord, biddingFormShow } = this.state;
        const { getFieldDecorator } = this.props.form;

        const antIcon =
            <Icon type="loading" style={{ fontSize: '110px' }} spin />;
        const billboardRendring = (
            <div>
                <div className={billboardData !== 0 ? "scroll_table" : "scroll_tableAfter"}>
                    <table className='table tableData'>
                        <thead className="thead-dark" style={{ width: '10px' }}>
                            <th className='tableHead' scope="col">#</th>
                            <th className='tableHead' scope="col">Company Name</th>
                            <th className='tableHead' scope="col">Address</th>
                            <th className='tableHead' scope="col">City</th>
                            <th className='tableHead' scope="col">State</th>
                            <th className='tableHead' scope="col">Action</th>
                        </thead>
                        {/* filterd data render */}
                        {notFoundFilterData && billboardFilterdData.length == 0 ?
                            <div className="row">
                                <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                                    <div className="noRecrdTxt">
                                        <p className="noRecordText">
                                            No Record Found
                                        </p>
                                        <button
                                            className="backBtn"
                                            onClick={this.showAllRooms}
                                        >Back</button>
                                    </div>
                                </div>
                            </div>
                            :
                            billboardFilterdData && billboardFilterdData.map((elem, key) => {
                                return (
                                    <tbody>
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
                        }


                        {/* all data render */}
                        {notFoundFilterData == false && billboardFilterdData.length == 0 && showRecord ?
                            billboardData && billboardData.map((elem, key) => {

                                return (
                                    <tbody>
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
                            : null
                        }
                    </table>
                </div>
            </div>
        );
        return (
            <div>
                <div className='row' style={{ marginTop: '1.5vw' }}>
                    <div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-10 col-md-10 col-lg-10 col-xl-10">
                        <div>
                            <h2 className='filterTextDashboard'>Filteration</h2>
                        </div>
                        <div className="filterBackColor">
                            <div className="row" style={{ margin: '0' }}>
                                <div className='col-12 col-md-2 col-lg-2 col-xl-2'>
                                    <div>
                                        <h4 className='text_topFilter'>Company Name</h4>
                                    </div>
                                    <div>
                                        <Select
                                            onChange={this.handleChange.bind(this, 'companyName')}
                                            // onChange={this.handleChangeCompany}
                                            options={companyName}
                                            value={companyNameValue}
                                        >
                                        </Select>
                                    </div>
                                </div>
                                <div className='col-12 col-md-2 col-lg-2 col-xl-2'>
                                    <div>
                                        <h4 className='text_topFilter'>BillBoard Type</h4>
                                    </div>
                                    <div>
                                        <Select
                                            onChange={this.handleChange.bind(this, 'billboardType')}
                                            // onChange={this.handleChangeType}
                                            options={types}
                                            value={typeValue}
                                        >
                                        </Select>
                                    </div>
                                </div>
                                <div className='col-12 col-md-4 col-lg-4 col-xl-4'>
                                    <div>
                                        <h4 className='text_topFilter'>Address</h4>
                                    </div>
                                    <div>
                                        <Select
                                            onChange={this.handleChange.bind(this, 'billboardAddres')}
                                            // onChange={this.handleChangeAddress}
                                            options={address}
                                            value={addressValue}
                                        >
                                        </Select>
                                    </div>
                                </div>
                                <div className='col-12 col-md-2 col-lg-2 col-xl-2'>
                                    <div>
                                        <h4 className='text_topFilter'>City</h4>
                                    </div>
                                    <div>
                                        <Select
                                            onChange={this.handleChange.bind(this, 'billboardCity')}
                                            // onChange={this.handleChangeCity}
                                            options={cities}
                                            value={cityValue}
                                        >
                                        </Select>
                                    </div>
                                </div>
                                <div className='col-12 col-md-2 col-lg-2 col-xl-2'>
                                    <div>
                                        <h4 className='text_topFilter'>State</h4>
                                    </div>
                                    <div>
                                        <Select
                                            onChange={this.handleChange.bind(this, 'billboardState')}
                                            // onChange={this.handleChangeState}
                                            options={states}
                                            value={stateValue}
                                        >
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ margin: '0' }}>
                                {companyNameValue != "" &&
                                    <div className='col-6 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                                        <div className="cross-card">
                                            <li className="liStyleFilter">
                                                {companyNameValue.value}
                                                <span class="close crossBtnExlpre"
                                                    onClick={this.removeValue.bind(this, 'compamyName', companyNameValue)}
                                                >x</span>
                                            </li>
                                        </div>
                                    </div>
                                }
                                {typeValue != '' &&
                                    <div className='col-6 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                                        <div className="cross-card">
                                            <li className="liStyleFilter">
                                                {typeValue.value}
                                                <span class="close crossBtnExlpre"
                                                    onClick={this.removeValue.bind(this, 'billboardType', typeValue)}
                                                >x</span>
                                            </li>
                                        </div>
                                    </div>
                                }
                                {addressValue != '' &&
                                    <div className='col-6 col-sm-4 col-md-4 col-lg-4 col-xl-4'>
                                        <div className="cross-card">
                                            <li className="liStyleFilter">
                                                {addressValue.value}
                                                <span class="close crossBtnExlpre"
                                                    onClick={this.removeValue.bind(this, 'billboardAddres', addressValue)}
                                                >x</span>
                                            </li>
                                        </div>
                                    </div>
                                }
                                {cityValue != '' &&
                                    <div className='col-6 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                                        <div className="cross-card">
                                            <li className="liStyleFilter">
                                                {cityValue.value}
                                                <span class="close crossBtnExlpre"
                                                    onClick={this.removeValue.bind(this, 'billboardCity', cityValue)}
                                                >x</span>
                                            </li>
                                        </div>
                                    </div>
                                }
                                {stateValue != '' &&
                                    <div className='col-6 col-sm-2 col-md-2 col-lg-2 col-xl-2'>
                                        <div className="cross-card">
                                            <li className="liStyleFilter">
                                                {stateValue.value}
                                                <span class="close crossBtnExlpre"
                                                    onClick={this.removeValue.bind(this, 'billboardState', stateValue)}
                                                >x</span>
                                            </li>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div>
                            {billboardRendring}
                        </div>
                        <div style={{ marginTop: '2vw' }}>
                            {billboardData && billboardData.length == 0 ?
                                <div style={{ textAlign: 'center' }}> <Spin indicator={antIcon} /> </div>
                                :
                                null}
                        </div>
                    </div>
                    <div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
                </div>

                {/* Mega Sale Form in modal */}

                <div class="modal fade" id="megaForm">
                    <div class="modal-dialog">
                        <div class="modal-content modal_width">
                            <div class="modal-header">
                                <h4 class="modal-title">Mega Sale</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                {megaSaleFormShow ?
                                    //                     {/* biddingFormShow */ }
                                    // {/* megaSaleFormShow: false, */}
                                    <div className="row padInModal">
                                        <div className="col-12 col-md-5 col-lg-5 col-xl-5">
                                            <img src="../images/log-in.png" alt='img' style={{ width: '100%', height: '257px' }} />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                            <Form onSubmit={this.handleSubmitMegaSale}>
                                                <div>
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
                                                </div>
                                            </Form>
                                        </div>
                                        <div className="col-12 col-md-1 col-lg-1 col-xl-1">

                                        </div>
                                    </div>
                                    : null}

                                <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            {this.state.isAlert ?
                                <div class="alert alert-danger" role="alert">
                                    {this.state.mgs}
                                </div>
                                : null}
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                        {this.state.isLoader ? <div class="loading">   </div>
                            : null
                        }
                    </div>
                </div>


                {/* bidding Form in modal */}

                <div class="modal fade" id="biddingForm">
                    <div class="modal-dialog">
                        <div class="modal-content modal_width">
                            <div class="modal-header">
                                <h4 class="modal-title">Bidding</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div class="modal-body">
                                {biddingFormShow ?
                                    <div className="row padInModal">
                                        <div className="col-12 col-md-5 col-lg-5 col-xl-5">
                                            <img src="../images/log-in.png" alt='img' style={{ width: '100%', height: '257px' }} />
                                        </div>
                                        <div className="col-12 col-md-6 col-lg-6 col-xl-6">

                                            <Form onSubmit={this.handleSubmitBidding}>



                                                <div>
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
                                                </div>
                                            </Form>

                                        </div>
                                        <div className="col-12 col-md-1 col-lg-1 col-xl-1">

                                        </div>
                                    </div>
                                    : null}

                                <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            {this.state.isAlert ?
                                <div class="alert alert-danger" role="alert">
                                    {this.state.mgs}
                                </div>
                                : null}
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                        {this.state.isLoader ? <div class="loading">   </div>
                            : null
                        }
                    </div>
                </div>

            </div >
        )
    }
}
const WrappedDynamicFieldSet = Form.create()(DashboardData);
export default WrappedDynamicFieldSet;
