import React, { Component } from 'react';
import './market.scss';
import {
    Checkbox, Form, Row, Col, Radio, Spin, Icon
} from 'antd';
import Select from 'react-select';
import { HttpUtils } from '../../Services/HttpUtils';
import { Link } from "react-router-dom";
import filtersImg from "./caret-down.png";

const CheckboxGroup = Checkbox.Group;

let status = [];
let filterTypesArr = [];
let filterFacingArr = [];
let filterLightningsArr = [];
let filterAudienceTypeArr = [];
let filterCategoryName = [];
let filterCityName = [];
let filterStateName = [];

class Market extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categoryArr: ['Billboard ', 'Taxi Ads', 'Bus Ads', 'Bus Shelter Ads', 'Airport Ads', 'Shopping Mall', 'Streamers',
                'Total Cinima Ads', 'Radio Ads', 'Other'],
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
            category: [],
            cities: [],
            states: [],
            billboardData: [],
            billboardFilterdData: [],
            headingValue: '',
            i: 0,
            to: 2,
            statusValue: '',
            minValue: '',
            maxValue: '',
            notFoundFilterData: false,
            typesOfBillboard: [],
            facingOfBillboard: [],
            lightningOfBillboard: [],
            audienceTypeOfBillboard: [],
            showRecord: true,
            categoryValue: '',
            cityValue: '',
            stateValue: ''

        }
    }

    componentWillMount() {
        let data = this.props.data;
        let headingValue = this.props.showValueHead;
      
        if (data) {

            this.setState({
                billboardData: data,
                headingValue: headingValue
            })
            // localStorage.setItem('billboardData', JSON.stringify(data))
        }
        else {
            this.billBoradDetails();
        }
        this.getCitiesAndStates()
    }

    billBoradDetails = async () => {
        // rededring the billboard data
        let response = await HttpUtils.get('getbillboard');
        let data = response.content;

        // localStorage.setItem('billboardData', JSON.stringify(data))

        //slice for render some data and click on more button then show some next data
        // var billboard = this.state.billboardData.slice(this.state.from, this.state.to)

        //create a range array value of width height daily visitor cities & states
        if (data) {
            if (response.code == 200) {
                this.setState({
                    billboardData: data,
                })
            }

        }
    }

    getCitiesAndStates = () => {
        const { citiesArr, statesArr, categoryArr } = this.state;

        let city = citiesArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        let state = statesArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        let catee = categoryArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        this.setState({
            cities: city,
            category: catee,
            states: state
        })
    }


    //start of filtration work
    //get status Available or  Not Available
    onChange = (e) => {
        let statusArr = []
        this.setState({
            statusValue: e.target.value
        })
        statusArr.push(e.target.value)
        status = statusArr;
        this.filterKeysGet();
    }

    //get checkboxes values
    onChangeCheckBoxes = (checkboxParam, checkboxValue) => {
        if (checkboxParam == 'type') {
            filterTypesArr = checkboxValue;
        } else if (checkboxParam == 'facing') {
            filterFacingArr = checkboxValue;
        } else if (checkboxParam == 'lightning') {
            filterLightningsArr = checkboxValue;
        } else if (checkboxParam == 'audienceType') {
            filterAudienceTypeArr = checkboxValue;
        }
        this.filterKeysGet();
    }

    //get dropdown values
    handleChange = (dropDownParam, dropDownValueObj) => {
        let dropDownValue = []
        dropDownValue.push(dropDownValueObj.value)
        if (dropDownParam == 'category') {
            filterCategoryName = dropDownValue;
            this.setState({
                categoryValue: dropDownValueObj
            })

        }
        else if (dropDownParam == 'city') {
            filterCityName = dropDownValue;
            this.setState({
                cityValue: dropDownValueObj
            })
        }
        else if (dropDownParam == 'state') {
            filterStateName = dropDownValue;
            this.setState({
                stateValue: dropDownValueObj
            })
        }
        this.filterKeysGet();
    }


    removeValue = (param, value) => {
        let arr = [];
        if (param == "status") {
            status = arr
            this.setState({
                statusValue: ''
            })
        }
        else if (param == "city") {
            filterCityName = arr
            this.setState({
                cityValue: ''
            })
        }
        else if (param == "state") {
            filterStateName = arr
            this.setState({
                stateValue: ''
            })
        }
        else if (param == 'types') {
            let arr1 = [];
            for (var i = 0; i < filterTypesArr.length; i++) {
                if (filterTypesArr[i] != value) {
                    arr1.push(filterTypesArr[i])
                }
            }
            filterTypesArr = arr1;
        }
        else if (param == 'facing') {
            let arr1 = [];
            for (var i = 0; i < filterFacingArr.length; i++) {
                if (filterFacingArr[i] != value) {
                    arr1.push(filterFacingArr[i])
                }
            }
            filterFacingArr = arr1;
        }
        else if (param == 'lightning') {
            let arr1 = [];
            for (var i = 0; i < filterLightningsArr.length; i++) {
                if (filterLightningsArr[i] != value) {
                    arr1.push(filterLightningsArr[i])
                }
            }
            filterLightningsArr = arr1;
        }
        else if (param == 'audienceType') {
            let arr1 = [];
            for (var i = 0; i < filterAudienceTypeArr.length; i++) {
                if (filterAudienceTypeArr[i] != value) {
                    arr1.push(filterAudienceTypeArr[i])
                }
            }
            filterAudienceTypeArr = arr1;
        }
        this.filterKeysGet();

        if (status.length == 0 && filterCityName.length == 0 && filterStateName.length == 0 && filterTypesArr.length == 0 && filterFacingArr.length == 0 &&
            filterLightningsArr.length == 0 && filterAudienceTypeArr.length == 0) {
            this.setState({
                showRecord: true,
                notFoundFilterData: false,
                billboardFilterdData: [],
            })
        }
        else {
            this.filterKeysGet();
        }
    }

    showAllBillboards = () => {
        status = [];
        filterTypesArr = [];
        filterFacingArr = [];
        filterLightningsArr = [];
        filterAudienceTypeArr = [];
        filterCategoryName = [];
        filterCityName = [];
        filterStateName = [];
        this.setState({
            showRecord: true,
            notFoundFilterData: false,
            statusValue: '',
            cityValue: '',
            stateValue: ''
        })
        this.filterKeysGet();

    }




    filterKeysGet = () => {
        let typesOfBillboard = [];
        let facingOfBillboard = [];
        let lightningOfBillboard = [];
        let audienceTypeOfBillboard = [];

        let filterKeys = [];
        if (status.length > 0) {
            filterKeys.push('status')
        }
        if (filterCategoryName.length > 0) {
            filterKeys.push('category')
        }
        if (filterTypesArr.length > 0) {
            filterKeys.push('type')
        }
        if (filterFacingArr.length > 0) {
            filterKeys.push('facing')
        }
        if (filterLightningsArr.length > 0) {
            filterKeys.push('lightning')
        }
        if (filterAudienceTypeArr.length > 0) {
            filterKeys.push('audianceType')
        }
        if (filterCityName.length > 0) {
            filterKeys.push('city')
        }
        if (filterStateName.length > 0) {
            filterKeys.push('state')
        }
        for (var i = 0; i < filterTypesArr.length; i++) {
            typesOfBillboard.push(filterTypesArr[i])
        }
        for (var i = 0; i < filterFacingArr.length; i++) {
            facingOfBillboard.push(filterFacingArr[i])
        }
        for (var i = 0; i < filterLightningsArr.length; i++) {
            lightningOfBillboard.push(filterLightningsArr[i])
        }
        for (var i = 0; i < filterAudienceTypeArr.length; i++) {
            audienceTypeOfBillboard.push(filterAudienceTypeArr[i])
        }
        this.setState({
            typesOfBillboard: typesOfBillboard,
            facingOfBillboard: facingOfBillboard,
            lightningOfBillboard: lightningOfBillboard,
            audienceTypeOfBillboard: audienceTypeOfBillboard,
        })

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
        else if (filterKeys.length == 6) {
            this.filterBillboardDataWithSixKeys(filterKeys)
        }
        else if (filterKeys.length == 7) {
            this.filterBillboardDataWithSevenKeys(filterKeys)
        }
    }

    filterBillboardDataWithOneKey = (filterKeys) => {
        const { billboardData } = this.state;
        let data;
        for (var i = 0; i < filterKeys.length; i++) {
            if (filterKeys[i] == 'status') {
                data = billboardData.filter((elem) => {
                    return elem.status && status.includes(elem.status)
                })
            }
            else if (filterKeys[i] == 'category') {
                data = billboardData.filter((elem) => {
                    return elem.category[0] && filterCategoryName.includes(elem.category[0])
                })
            }
            else if (filterKeys[i] == 'type') {
                data = billboardData.filter((elem) => {
                    return elem.type && filterTypesArr.includes(elem.type)
                })
            }
            else if (filterKeys[i] == 'facing') {
                data = billboardData.filter((elem) => {
                    return elem.facing && filterFacingArr.includes(elem.facing)
                })
            }
            else if (filterKeys[i] == 'lightning') {
                data = billboardData.filter((elem) => {
                    return elem.lightning && filterLightningsArr.includes(elem.lightning)
                })
            }
            else if (filterKeys[i] == 'audianceType') {
                data = billboardData.filter((elem) => {
                    return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                })
            }
            else if (filterKeys[i] == 'city') {
                data = billboardData.filter((elem) => {
                    return elem.city && filterCityName.includes(elem.city)
                })
            }
            else if (filterKeys[i] == 'state') {
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
                if (filterKeys[i] == 'status') {
                    data1 = billboardData.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    data1 = billboardData.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    data1 = billboardData.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    data1 = billboardData.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    data1 = billboardData.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    data1 = billboardData.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    data1 = billboardData.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
                    data1 = billboardData.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 1) {
                if (filterKeys[i] == 'status') {
                    filteredData = data1.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    filteredData = data1.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    filteredData = data1.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    filteredData = data1.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    filteredData = data1.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    filteredData = data1.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    filteredData = data1.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
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
        let data2;
        let filteredData;
        for (var i = 0; i < filterKeys.length; i++) {
            if (i == 0) {
                if (filterKeys[i] == 'status') {
                    data1 = billboardData.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    data1 = billboardData.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    data1 = billboardData.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    data1 = billboardData.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    data1 = billboardData.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    data1 = billboardData.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    data1 = billboardData.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
                    data1 = billboardData.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 1) {
                if (filterKeys[i] == 'status') {
                    data2 = data1.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    data2 = data1.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    data2 = data1.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    data2 = data1.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    data2 = data1.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    data2 = data1.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    data2 = data1.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
                    data2 = data1.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 2) {
                if (filterKeys[i] == 'status') {
                    filteredData = data2.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    filteredData = data2.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    filteredData = data2.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    filteredData = data2.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    filteredData = data2.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    filteredData = data2.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    filteredData = data2.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
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
                if (filterKeys[i] == 'status') {
                    data1 = billboardData.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    data1 = billboardData.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    data1 = billboardData.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    data1 = billboardData.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    data1 = billboardData.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    data1 = billboardData.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    data1 = billboardData.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
                    data1 = billboardData.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 1) {
                if (filterKeys[i] == 'status') {
                    data2 = data1.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    data2 = data1.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    data2 = data1.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    data2 = data1.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    data2 = data1.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    data2 = data1.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    data2 = data1.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
                    data2 = data1.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 2) {
                if (filterKeys[i] == 'status') {
                    data3 = data2.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    data3 = data2.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    data3 = data2.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    data3 = data2.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    data3 = data2.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    data3 = data2.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    data3 = data2.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
                    data3 = data2.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 3) {
                if (filterKeys[i] == 'status') {
                    filteredData = data3.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    filteredData = data3.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    filteredData = data3.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    filteredData = data3.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    filteredData = data3.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    filteredData = data3.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    filteredData = data3.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
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
                if (filterKeys[i] == 'status') {
                    data1 = billboardData.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    data1 = billboardData.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    data1 = billboardData.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    data1 = billboardData.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    data1 = billboardData.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    data1 = billboardData.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    data1 = billboardData.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
                    data1 = billboardData.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 1) {
                if (filterKeys[i] == 'status') {
                    data2 = data1.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    data2 = data1.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    data2 = data1.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    data2 = data1.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    data2 = data1.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    data2 = data1.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    data2 = data1.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
                    data2 = data1.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 2) {
                if (filterKeys[i] == 'status') {
                    data3 = data2.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    data3 = data2.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    data3 = data2.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    data3 = data2.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    data3 = data2.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    data3 = data2.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    data3 = data2.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
                    data3 = data2.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 3) {
                if (filterKeys[i] == 'status') {
                    data4 = data3.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    data4 = data3.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    data4 = data3.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    data4 = data3.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    data4 = data3.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    data4 = data3.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    data4 = data3.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
                    data4 = data3.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 4) {
                if (filterKeys[i] == 'status') {
                    filteredData = data4.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    filteredData = data4.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    filteredData = data4.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    filteredData = data4.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    filteredData = data4.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    filteredData = data4.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    filteredData = data4.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
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


    filterBillboardDataWithSixKeys = (filterKeys) => {
        const { billboardData } = this.state;
        let data1;
        let data2;
        let data3;
        let data4;
        let data5;
        let filteredData;
        for (var i = 0; i < filterKeys.length; i++) {
            if (i == 0) {
                if (filterKeys[i] == 'status') {
                    data1 = billboardData.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    data1 = billboardData.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    data1 = billboardData.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    data1 = billboardData.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    data1 = billboardData.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    data1 = billboardData.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    data1 = billboardData.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
                    data1 = billboardData.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 1) {
                if (filterKeys[i] == 'status') {
                    data2 = data1.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    data2 = data1.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    data2 = data1.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    data2 = data1.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    data2 = data1.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    data2 = data1.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    data2 = data1.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
                    data2 = data1.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 2) {
                if (filterKeys[i] == 'status') {
                    data3 = data2.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    data3 = data2.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    data3 = data2.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    data3 = data2.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    data3 = data2.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    data3 = data2.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    data3 = data2.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
                    data3 = data2.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 3) {
                if (filterKeys[i] == 'status') {
                    data4 = data3.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    data4 = data3.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    data4 = data3.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    data4 = data3.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    data4 = data3.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    data4 = data3.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    data4 = data3.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
                    data4 = data3.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 4) {
                if (filterKeys[i] == 'status') {
                    data5 = data4.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    data5 = data4.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    data5 = data4.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    data5 = data4.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    data5 = data4.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    data5 = data4.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    data5 = data4.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
                    data5 = data4.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 5) {
                if (filterKeys[i] == 'status') {
                    filteredData = data5.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    filteredData = data5.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    filteredData = data5.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    filteredData = data5.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    filteredData = data5.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    filteredData = data5.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    filteredData = data5.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
                    filteredData = data5.filter((elem) => {
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



    filterBillboardDataWithSevenKeys = (filterKeys) => {
        const { billboardData } = this.state;
        let data1;
        let data2;
        let data3;
        let data4;
        let data5;
        let data6;
        let filteredData;
        for (var i = 0; i < filterKeys.length; i++) {
            if (i == 0) {
                if (filterKeys[i] == 'status') {
                    data1 = billboardData.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    data1 = billboardData.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    data1 = billboardData.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    data1 = billboardData.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    data1 = billboardData.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    data1 = billboardData.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    data1 = billboardData.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
                    data1 = billboardData.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 1) {
                if (filterKeys[i] == 'status') {
                    data2 = data1.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    data2 = data1.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    data2 = data1.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    data2 = data1.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    data2 = data1.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    data2 = data1.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    data2 = data1.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
                    data2 = data1.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 2) {
                if (filterKeys[i] == 'status') {
                    data3 = data2.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    data3 = data2.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    data3 = data2.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    data3 = data2.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    data3 = data2.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    data3 = data2.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    data3 = data2.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
                    data3 = data2.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 3) {
                if (filterKeys[i] == 'status') {
                    data4 = data3.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    data4 = data3.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    data4 = data3.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    data4 = data3.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    data4 = data3.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    data4 = data3.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    data4 = data3.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
                    data4 = data3.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 4) {
                if (filterKeys[i] == 'status') {
                    data5 = data4.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    data5 = data4.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    data5 = data4.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    data5 = data4.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    data5 = data4.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    data5 = data4.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    data5 = data4.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
                    data5 = data4.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 5) {
                if (filterKeys[i] == 'status') {
                    data6 = data5.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    data6 = data5.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    data6 = data5.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    data6 = data5.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    data6 = data5.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    data6 = data5.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    data6 = data5.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
                    data6 = data5.filter((elem) => {
                        return elem.state && filterStateName.includes(elem.state)
                    })
                }
            }
            if (i == 6) {
                if (filterKeys[i] == 'status') {
                    filteredData = data6.filter((elem) => {
                        return elem.status && status.includes(elem.status)
                    })
                }
                else if (filterKeys[i] == 'category') {
                    filteredData = data6.filter((elem) => {
                        return elem.category[0] && filterCategoryName.includes(elem.category[0])
                    })
                }
                else if (filterKeys[i] == 'type') {
                    filteredData = data6.filter((elem) => {
                        return elem.type && filterTypesArr.includes(elem.type)
                    })
                }
                else if (filterKeys[i] == 'facing') {
                    filteredData = data6.filter((elem) => {
                        return elem.facing && filterFacingArr.includes(elem.facing)
                    })
                }
                else if (filterKeys[i] == 'lightning') {
                    filteredData = data6.filter((elem) => {
                        return elem.lightning && filterLightningsArr.includes(elem.lightning)
                    })
                }
                else if (filterKeys[i] == 'audianceType') {
                    filteredData = data6.filter((elem) => {
                        return elem.audianceType && filterAudienceTypeArr.includes(elem.audianceType)
                    })
                }
                else if (filterKeys[i] == 'city') {
                    filteredData = data6.filter((elem) => {
                        return elem.city && filterCityName.includes(elem.city)
                    })
                }
                else if (filterKeys[i] == 'state') {
                    filteredData = data6.filter((elem) => {
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

    onChangeMin = (e) => {
        this.setState({
            minValue: e.target.value
        })
    }

    onChangeMax = (e) => {
        this.setState({
            maxValue: e.target.value
        })
    }

    filterBillboardWithMinToMax = (param, e) => {
        const { minValue, maxValue, billboardFilterdData, billboardData } = this.state;
        let rangeValues = [];
        if (billboardFilterdData.length > 0) {
            for (var i = 0; i < billboardFilterdData.length; i++) {
                if (param == 'price') {
                    if (billboardFilterdData[i].monthlyRate >= minValue && billboardFilterdData[i].monthlyRate <= maxValue) {
                        rangeValues.push(billboardFilterdData[i])
                    }
                }
                else if (param == 'width') {
                    if (billboardFilterdData[i].width >= minValue && billboardFilterdData[i].width <= maxValue) {
                        rangeValues.push(billboardFilterdData[i])
                    }
                }
                else if (param == 'height') {
                    if (billboardFilterdData[i].height >= minValue && billboardFilterdData[i].height <= maxValue) {
                        rangeValues.push(billboardFilterdData[i])
                    }
                }
                else if (param == 'trafic') {
                    if (billboardFilterdData[i].traffic >= minValue && billboardFilterdData[i].traffic <= maxValue) {
                        rangeValues.push(billboardFilterdData[i])
                    }
                }
                else if (param == 'visitor') {
                    if (billboardFilterdData[i].dailyVisitor >= minValue && billboardFilterdData[i].dailyVisitor <= maxValue) {
                        rangeValues.push(billboardFilterdData[i])
                    }
                }
            }
            if (rangeValues.length == 0) {
                this.setState({
                    notFoundFilterData: true,
                    billboardFilterdData: rangeValues,
                    showRecord: false

                })
            }
            else {
                this.setState({
                    notFoundFilterData: false,
                    billboardFilterdData: rangeValues,
                    minValue: '',
                    maxValue: '',
                    showRecord: false

                })
            }
        }
        else {
            for (var i = 0; i < billboardData.length; i++) {
                if (param == 'price') {
                    if (billboardData[i].monthlyRate >= minValue && billboardData[i].monthlyRate <= maxValue) {
                        rangeValues.push(billboardData[i])
                    }
                }
                else if (param == 'width') {
                    if (billboardData[i].width >= minValue && billboardData[i].width <= maxValue) {
                        rangeValues.push(billboardData[i])
                    }
                }
                else if (param == 'height') {
                    if (billboardData[i].height >= minValue && billboardData[i].height <= maxValue) {
                        rangeValues.push(billboardData[i])
                    }
                }
                else if (param == 'trafic') {
                    if (billboardData[i].traffic >= minValue && billboardData[i].traffic <= maxValue) {
                        rangeValues.push(billboardData[i])
                    }
                }
                else if (param == 'visitor') {
                    if (billboardData[i].dailyVisitor >= minValue && billboardData[i].dailyVisitor <= maxValue) {
                        rangeValues.push(billboardData[i])
                    }
                }
            }
            if (rangeValues.length == 0) {
                this.setState({
                    notFoundFilterData: true,
                    billboardFilterdData: rangeValues,
                    showRecord: false

                })
            }
            else {
                this.setState({
                    notFoundFilterData: false,
                    billboardFilterdData: rangeValues,
                    minValue: '',
                    maxValue: '',
                    showRecord: false

                })
            }
        }
    }

    //for load more data
    onMoreData = () => {
        const { to } = this.state;
        let total = to + 2
        this.setState({
            form: 0,
            to: total
        })
        this.billBoradDetails();
    }
    //filtration for drop down data

    onFlipData = () => {
        this.setState({
            i: this.state.i + 9
        })
    }

    validateNumber(rule, value, callback) {
        if (isNaN(value)) {
            callback('Please type Numbers');
        } else {
            callback()
        }
    }

    render() {
        const { billboardData, billboardFilterdData, cities, states, i, category, notFoundFilterData, minValue, maxValue, showRecord,
            typesOfBillboard, facingOfBillboard, lightningOfBillboard, audienceTypeOfBillboard, cityValue, stateValue } = this.state;
        const antIcon =
            <Icon type="loading" style={{ fontSize: '110px' }} spin />;

        const billboardRendring = (
            <div>
                {/* rendering the filtered billboard data on front end */}
                {billboardData.length == 0 ?
                    <div style={{ textAlign: 'center' }}> <Spin indicator={antIcon} /> </div>
                    :
                    <div className='row '>
                        {notFoundFilterData && billboardFilterdData.length == 0 ?
                            <div>
                                <p>
                                    No Record Found
                            </p>
                                <button onClick={this.showAllBillboards}>Back</button>
                            </div>
                            : billboardFilterdData && billboardFilterdData.map((elem, key) => {
                                return (
                                    <div className="col-12 col-md-6 col-lg-4 col-xl-4">
                                        <Link rel="noopener noreferrer" to={{ pathname: `/billborad_Militry`, state: elem }}>
                                            <div className="mainNewestBillCardDiv">
                                                <img src={elem.images[0]} alt={key} className="newestBillCardImgs" />
                                                <div className="newestBillDetailCardDiv">
                                                    <p className="newestBillCardName">{elem.companyName.substr(0, 13)}...</p>
                                                    <p className="newestBillCardCity">{elem.nearBy.substr(0, 18)}..</p>
                                                    <p className="newestBillCardCity">{elem.city}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                        }

                        {notFoundFilterData == false && billboardFilterdData.length == 0 && showRecord ?
                            billboardData && billboardData.map((elem, key) => {
                                return (
                                    <div className="col-12 col-md-6 col-lg-4 col-xl-4">
                                        <Link rel="noopener noreferrer" to={{ pathname: `/billborad_Militry`, state: elem }}>
                                            <div className="mainNewestBillCardDiv">
                                                <img src={elem.images[0]} alt={key} className="newestBillCardImgs" />
                                                <div className="newestBillDetailCardDiv">
                                                    <p className="newestBillCardName">{elem.companyName.substr(0, 13)}...</p>
                                                    <p className="newestBillCardCity">{elem.nearBy.substr(0, 18)}</p>
                                                    <p className="newestBillCardCity">{elem.city}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })
                            :
                            null
                        }

                    </div>
                }
            </div>
        );
        return (
            <div className="">

                <div className="row animated animatedFadeInUp fadeInUp" style={{ marginTop: '2vw' }}>
                    <div className="col-12 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-3">
                        <div className="d-none d-sm-block">
                            <h3 className="filteMarkt">Filteration</h3>
                        </div>
                        <div className='col-xl-12 col-lg-12 col-md-12 d-none d-sm-block' style={{ padding: "0" }}>
                            <Radio.Group onChange={this.onChange} value={this.state.statusValue}>
                                <div className='filterDivs'>Status</div>
                                <Row>
                                    <Col>
                                        <Radio className="fasla" value="Available" className="radioText">&nbsp;Available</Radio>
                                    </Col>
                                    <Col>
                                        <Radio className="fasla" value="No Available" className="radioText">&nbsp;No Available</Radio>
                                    </Col>
                                </Row>
                            </Radio.Group>
                            <div className="row">
                                <div className="col-md-11">
                                    <CheckboxGroup
                                        // defaultValue={[typesOfBillboard]}
                                        value={typesOfBillboard}
                                        //   defaultValue={['Static']}
                                        // setFieldsValue={this.state.filterValue}
                                        onChange={this.onChangeCheckBoxes.bind(this, 'type')}
                                    >
                                        <div className='filterDivs'>Types</div>
                                        <Row>
                                            <Col>
                                                <Checkbox className="fasla" value='Static' className="radioText">&nbsp;Static</Checkbox>
                                            </Col>
                                            <Col >
                                                <Checkbox className="fasla" value="Classic" className="radioText">&nbsp;Classic</Checkbox>
                                            </Col>
                                            <Col>
                                                <Checkbox className="fasla" value='Digital' className="radioText">&nbsp;Digital</Checkbox>
                                            </Col>
                                            <Col >
                                                <Checkbox className="fasla" value="Mobile" className="radioText">&nbsp;Mobile</Checkbox>
                                            </Col>
                                            <Col >
                                                <Checkbox className="fasla" value="Bridge" className="radioText">&nbsp;Bridge</Checkbox>
                                            </Col>
                                            <Col >
                                                <Checkbox className="fasla" value="Vinyl" className="radioText">&nbsp;Vinyl</Checkbox>
                                            </Col>
                                            <Col >
                                                <Checkbox className="fasla" value="Painted" className="radioText">&nbsp;Painted</Checkbox>
                                            </Col>
                                            <Col >
                                                <Checkbox className="fasla" value="Three Dimensional" className="radioText">&nbsp;Three Dimensional</Checkbox>
                                            </Col>
                                            <Col >
                                                <Checkbox className="fasla" value="Scented" className="radioText">&nbsp;Scented</Checkbox>
                                            </Col>
                                            <Col >
                                                <Checkbox className="fasla" value="Lamp post" className="radioText">&nbsp;Lamp Post</Checkbox>
                                            </Col>
                                        </Row>&emsp;
                                </CheckboxGroup>
                                </div>
                                <div className="col-md-11">
                                    <CheckboxGroup
                                        value={facingOfBillboard}
                                        onChange={this.onChangeCheckBoxes.bind(this, 'facing')}
                                    >
                                        <Row>
                                            <div className='filterDivs'>Facing</div>
                                            <Col >
                                                <Checkbox className="fasla" value="Front" className="radioText">&nbsp;Front</Checkbox>
                                            </Col>
                                            <Col >
                                                <Checkbox className="fasla" value="Back" className="radioText">&nbsp;Back</Checkbox>
                                            </Col>
                                        </Row>
                                    </CheckboxGroup>
                                </div>
                                <div className="col-md-11">
                                    <CheckboxGroup
                                        value={lightningOfBillboard}
                                        onChange={this.onChangeCheckBoxes.bind(this, 'lightning')}
                                    >
                                        <div className='filterDivs'>Lightning</div>
                                        <Row>
                                            <Col >
                                                <Checkbox className="fasla" value="Yes" className="radioText">&nbsp;Yes</Checkbox>
                                            </Col>
                                            <Col >
                                                <Checkbox className="fasla" value="No" className="radioText">&nbsp;No</Checkbox>
                                            </Col>
                                        </Row>
                                    </CheckboxGroup>
                                </div>
                                <div className="col-md-11">
                                    <CheckboxGroup
                                        value={audienceTypeOfBillboard}
                                        onChange={this.onChangeCheckBoxes.bind(this, 'audienceType')}
                                    >
                                        <div className='filterDivs'>Audience Type</div>
                                        <Row>
                                            <Col >
                                                <Checkbox className="fasla" value="All types of people" className="radioText">&nbsp;All types of people</Checkbox>
                                            </Col>
                                            <Col >
                                                <Checkbox className="fasla" value="Office type of people" className="radioText">&nbsp;Office type of people</Checkbox>
                                            </Col>
                                            <Col >
                                                <Checkbox className="fasla" value="Labour type people" className="radioText">&nbsp;Labour type people</Checkbox>
                                            </Col>
                                            <Col >
                                                <Checkbox className="fasla" value="Govt official type people" className="radioText">&nbsp;Govt official type people</Checkbox>
                                            </Col>
                                        </Row>
                                    </CheckboxGroup>
                                </div>
                            </div>
                            <div className='col-md-11 dropdown'>
                                <div className='filterDivs'>Cities</div>
                                <Row className="fasla1" >
                                    <Col>
                                        <Select
                                            value={cityValue}
                                            onChange={this.handleChange.bind(this, 'city')}
                                            options={cities}
                                        >
                                        </Select>
                                    </Col>
                                </Row>
                                <div className='filterDivs'>States</div>
                                <Row className="fasla1" >
                                    <Col>
                                        <Select
                                            value={stateValue}
                                            onChange={this.handleChange.bind(this, 'state')}
                                            options={states}
                                        >
                                        </Select>
                                    </Col>
                                </Row>
                            </div>
                            <Form>
                                <div className='filterDivs'>Pricing</div>
                                <div className="row fasla1">
                                    <div className="col-12 col-md-8 col-lg-8 col-xl-8">
                                        <input
                                            onChange={this.onChangeMin}
                                            // value={minValue}
                                            type="Number"
                                            placeholder="Min"
                                            className="marketFilter_Input"
                                        />
                                    </div>
                                </div>
                                <div className="row fasla1">
                                    <div className="col-12 col-md-8 col-lg-8 col-xl-8">
                                        <input
                                            onChange={this.onChangeMax}
                                            // value={maxValue}

                                            type="Number"
                                            placeholder="Max"
                                            className="marketFilter_Input"
                                        />
                                    </div>
                                    <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                                        <button className="btn btn-primary" onClick={this.filterBillboardWithMinToMax.bind(this, "price")}>
                                            <i class="fa fa-caret-right"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className='filterDivs'>Width</div>
                                <div className="row fasla1">
                                    <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                                        <input
                                            onChange={this.onChangeMin}
                                            // value={minValue}
                                            type="Number"
                                            placeholder="Min"
                                            className="marketFilter_Input"
                                        />
                                    </div>
                                    <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                                        <input
                                            onChange={this.onChangeMax}
                                            // value={maxValue}
                                            type="Number"
                                            placeholder="Max"
                                            className="marketFilter_Input"
                                        />
                                    </div>
                                    <div className="col-12 col-md-2 col-lg-2 col-xl-2">
                                        <button className="btn btn-primary" onClick={this.filterBillboardWithMinToMax.bind(this, 'width')}>
                                            <i class="fa fa-caret-right"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className='filterDivs'>Height</div>
                                <div className="row fasla1">
                                    <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                                        <input
                                            onChange={this.onChangeMin}
                                            // value={minValue}

                                            type="Number"
                                            placeholder="Min"
                                            className="marketFilter_Input"
                                        />
                                    </div>
                                    <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                                        <input
                                            onChange={this.onChangeMax}
                                            // value={maxValue}

                                            type="Number"
                                            placeholder="Max"
                                            className="marketFilter_Input"
                                        />
                                    </div>
                                    <div className="col-12 col-md-2 col-lg-2 col-xl-2">
                                        <button className="btn btn-primary" onClick={this.filterBillboardWithMinToMax.bind(this, "height")}>
                                            <i class="fa fa-caret-right"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className='filterDivs'>Traffic Count</div>
                                <div className="row fasla1">
                                    <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                                        <input
                                            onChange={this.onChangeMin}
                                            // value={minValue}

                                            type="Number"
                                            placeholder="Min"
                                            className="marketFilter_Input"
                                        />
                                    </div>
                                    <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                                        <input
                                            onChange={this.onChangeMax}
                                            // value={maxValue}

                                            type="Number"
                                            placeholder="Max"
                                            className="marketFilter_Input"
                                        />
                                    </div>
                                    <div className="col-12 col-md-2 col-lg-2 col-xl-2">
                                        <button className="btn btn-primary" onClick={this.filterBillboardWithMinToMax.bind(this, "trafic")}>
                                            <i class="fa fa-caret-right"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className='filterDivs'>Daily Visitor</div>
                                <div className="row fasla1">
                                    <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                                        <input
                                            onChange={this.onChangeMin}
                                            // value={minValue}

                                            type="Number"
                                            placeholder="Min"
                                            className="marketFilter_Input"
                                        />
                                    </div>
                                    <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                                        <input
                                            onChange={this.onChangeMax}
                                            // value={maxValue}

                                            type="Number"
                                            placeholder="Max"
                                            className="marketFilter_Input"
                                        />
                                    </div>
                                    <div className="col-12 col-md-2 col-lg-2 col-xl-2">
                                        <button className="btn btn-primary" onClick={this.filterBillboardWithMinToMax.bind(this, "visitor")}>
                                            <i class="fa fa-caret-right"></i>
                                        </button>
                                    </div>
                                </div>
                            </Form>
                            {/* </CheckboxGroup> */}
                        </div>
                        <div className="col-12 d-block d-sm-none">
                            <div id="accordion">
                                <div className="card">
                                    <div className="card-header">
                                        <a className="card-link" data-toggle="collapse" href="#collapseOne" style={{ color: '#007bff' }}>
                                            <h3>Filters<img src={filtersImg} alt='img' className="caret_down"></img></h3>
                                        </a>
                                    </div>

                                    {this.state.statusValue != '' ?
                                        <div>
                                            <li>{this.state.statusValue}<span class="close"
                                                onClick={this.removeValue.bind(this, 'status')}
                                            >x</span></li>
                                        </div> : null}
                                    {filterCityName && filterCityName.length > 0 ?
                                        <div>
                                            <li>{filterCityName[0]}<span class="close"
                                                onClick={this.removeValue.bind(this, 'city')}
                                            >x</span></li>
                                        </div> : null}
                                    {filterStateName && filterStateName.length > 0 ?
                                        <div>
                                            <li>{filterStateName[0]}<span class="close"
                                                onClick={this.removeValue.bind(this, 'state')}
                                            >x</span></li>
                                        </div> : null}

                                    {typesOfBillboard && typesOfBillboard.length > 0 ?
                                        typesOfBillboard.map((elem, key) => {
                                            return (
                                                <div>
                                                    <li>{elem}<span class="close"
                                                        onClick={this.removeValue.bind(this, 'types', elem)}
                                                    >x</span></li>
                                                </div>)
                                        })
                                        : null}
                                    {facingOfBillboard && facingOfBillboard.length > 0 ?
                                        facingOfBillboard.map((elem, key) => {
                                            return (
                                                <div>
                                                    <li>{elem}<span class="close"
                                                        onClick={this.removeValue.bind(this, 'facing', elem)}
                                                    >x</span></li>
                                                </div>)
                                        })
                                        : null}
                                    {lightningOfBillboard && lightningOfBillboard.length > 0 ?
                                        lightningOfBillboard.map((elem, key) => {
                                            return (
                                                <div>
                                                    <li>{elem}<span class="close"
                                                        onClick={this.removeValue.bind(this, 'lightning', elem)}
                                                    >x</span></li>
                                                </div>)
                                        })
                                        : null}
                                    {audienceTypeOfBillboard && audienceTypeOfBillboard.length > 0 ?
                                        audienceTypeOfBillboard.map((elem, key) => {
                                            return (
                                                <div>
                                                    <li>{elem}<span class="close"
                                                        onClick={this.removeValue.bind(this, 'audienceType', elem)}
                                                    >x</span></li>
                                                </div>)
                                        })
                                        : null}
                                    <div id="collapseOne" className="collapse show" data-parent="#accordion">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-1"></div>
                                                <div className="col-10">


                                                    <Radio.Group onChange={this.onChange} value={this.state.statusValue}>
                                                        <div className='filterDivs'>Status</div>
                                                        <Row>
                                                            <Col >
                                                                <Radio className="fasla" value="Available">&nbsp;Available</Radio>
                                                            </Col>
                                                            <Col >
                                                                <Radio className="fasla" value="No Available">&nbsp;No Available</Radio>
                                                            </Col>
                                                        </Row>
                                                    </Radio.Group>
                                                    <div className="row">
                                                        <div className="col-11">
                                                            <CheckboxGroup
                                                                value={typesOfBillboard}
                                                                // setFieldsValue={this.state.filterValue}
                                                                onChange={this.onChangeCheckBoxes.bind(this, 'type')}
                                                            >
                                                                <div className='filterDivs'>Types</div>
                                                                <Row>
                                                                    <Col>
                                                                        <Checkbox className="fasla" value='Static'>&nbsp;Static</Checkbox>
                                                                    </Col>
                                                                    <Col >
                                                                        <Checkbox className="fasla" value="Classic">&nbsp;Classic</Checkbox>
                                                                    </Col>
                                                                    <Col>
                                                                        <Checkbox className="fasla" value='Digital'>&nbsp;Digital</Checkbox>
                                                                    </Col>
                                                                    <Col >
                                                                        <Checkbox className="fasla" value="Mobile">&nbsp;Mobile</Checkbox>
                                                                    </Col>
                                                                    <Col >
                                                                        <Checkbox className="fasla" value="Bridge">&nbsp;Bridge</Checkbox>
                                                                    </Col>
                                                                    <Col >
                                                                        <Checkbox className="fasla" value="Vinyl">&nbsp;Vinyl</Checkbox>
                                                                    </Col>
                                                                    <Col >
                                                                        <Checkbox className="fasla" value="Painted">&nbsp;Painted</Checkbox>
                                                                    </Col>
                                                                    <Col >
                                                                        <Checkbox className="fasla" value="Three Dimensional">&nbsp;Three Dimensional</Checkbox>
                                                                    </Col>
                                                                    <Col >
                                                                        <Checkbox className="fasla" value="Scented">&nbsp;Scented</Checkbox>
                                                                    </Col>
                                                                    <Col >
                                                                        <Checkbox className="fasla" value="Lamp post">&nbsp;Lamp Post</Checkbox>
                                                                    </Col>
                                                                </Row>&emsp;
                                                </CheckboxGroup>
                                                        </div>
                                                        <div className="col-11">
                                                            <CheckboxGroup
                                                                value={facingOfBillboard}
                                                                onChange={this.onChangeCheckBoxes.bind(this, 'facing')}
                                                            >
                                                                <Row>
                                                                    <div className='filterDivs'>Facing</div>
                                                                    <Col >
                                                                        <Checkbox className="fasla" value="Front">&nbsp;Front</Checkbox>
                                                                    </Col>
                                                                    <Col >
                                                                        <Checkbox className="fasla" value="Back">&nbsp;Back</Checkbox>
                                                                    </Col>
                                                                </Row>
                                                            </CheckboxGroup>
                                                        </div>
                                                        <div className="col-11">
                                                            <CheckboxGroup
                                                                value={lightningOfBillboard}
                                                                onChange={this.onChangeCheckBoxes.bind(this, 'lightning')}
                                                            >
                                                                <div className='filterDivs'>Lightning</div>
                                                                <Row>
                                                                    <Col >
                                                                        <Checkbox className="fasla" value="Yes">&nbsp;Yes</Checkbox>
                                                                    </Col>
                                                                    <Col >
                                                                        <Checkbox className="fasla" value="No">&nbsp;No</Checkbox>
                                                                    </Col>
                                                                </Row>
                                                            </CheckboxGroup>
                                                        </div>
                                                        <div className="col-11">
                                                            <CheckboxGroup
                                                                value={audienceTypeOfBillboard}
                                                                onChange={this.onChangeCheckBoxes.bind(this, 'audienceType')}
                                                            >
                                                                <div className='filterDivs'>Audience Type</div>
                                                                <Row>
                                                                    <Col >
                                                                        <Checkbox className="fasla" value="All types of people">&nbsp;All types of people</Checkbox>
                                                                    </Col>
                                                                    <Col >
                                                                        <Checkbox className="fasla" value="Office type of people">&nbsp;Office type of people</Checkbox>
                                                                    </Col>
                                                                    <Col >
                                                                        <Checkbox className="fasla" value="Labour type people">&nbsp;Labour type people</Checkbox>
                                                                    </Col>
                                                                    <Col >
                                                                        <Checkbox className="fasla" value="Govt official type people">&nbsp;Govt official type people</Checkbox>
                                                                    </Col>
                                                                </Row>
                                                            </CheckboxGroup>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-11 dropdown'>
                                                        <div className='filterDivs'>Cities</div>
                                                        <Row className="fasla1">
                                                            <Col>
                                                                <Select
                                                                    value={cityValue}

                                                                    onChange={this.handleChange.bind(this, 'city')}
                                                                    options={cities}
                                                                >
                                                                </Select>
                                                            </Col>
                                                        </Row>
                                                        <div className='filterDivs'>States</div>
                                                        <Row className="fasla1">
                                                            <Col>
                                                                <Select
                                                                    value={stateValue}

                                                                    onChange={this.handleChange.bind(this, 'state')}
                                                                    options={states}
                                                                >
                                                                </Select>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                    <div className='filterDivs'>Pricing</div>
                                                    <div className="row fasla1">
                                                        <div className="col-8">
                                                            <input
                                                                // value={minValue}
                                                                onChange={this.onChangeMin}
                                                                type="Number"
                                                                placeholder="Min"
                                                                className="marketFilter_Input"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row fasla1">
                                                        <div className="col-8">
                                                            <input
                                                                onChange={this.onChangeMax}
                                                                // value={maxValue}

                                                                type="Number"
                                                                placeholder="Max"
                                                                className="marketFilter_Input"
                                                            />
                                                        </div>
                                                        <div className="col-4">
                                                            <button className="btn btn-primary" onClick={this.filterBillboardWithMinToMax.bind(this, "price")}>
                                                                <i class="fa fa-caret-right"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className='filterDivs'>Width</div>
                                                    <div className="row fasla1">
                                                        <div className="col-5">
                                                            <input
                                                                onChange={this.onChangeMin}
                                                                // value={minValue}

                                                                type="Number"
                                                                placeholder="Min"
                                                                className="marketFilter_Input"
                                                            />
                                                        </div>
                                                        <div className="col-5">
                                                            <input
                                                                onChange={this.onChangeMax}
                                                                // value={maxValue}

                                                                type="Number"
                                                                placeholder="Max"
                                                                className="marketFilter_Input"
                                                            />
                                                        </div>
                                                        <div className="col-2">
                                                            <button className="btn btn-primary" onClick={this.filterBillboardWithMinToMax.bind(this, 'width')}>
                                                                <i class="fa fa-caret-right"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className='filterDivs'>Height</div>
                                                    <div className="row fasla1">
                                                        <div className="col-5">
                                                            <input
                                                                onChange={this.onChangeMin}
                                                                // value={minValue}

                                                                type="Number"
                                                                placeholder="Min"
                                                                className="marketFilter_Input"
                                                            />
                                                        </div>
                                                        <div className="col-5">
                                                            <input
                                                                onChange={this.onChangeMax}
                                                                // value={maxValue}

                                                                type="Number"
                                                                placeholder="Max"
                                                                className="marketFilter_Input"
                                                            />
                                                        </div>
                                                        <div className="col-2">
                                                            <button className="btn btn-primary" onClick={this.filterBillboardWithMinToMax.bind(this, "height")}>
                                                                <i class="fa fa-caret-right"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className='filterDivs'>Traffic Count</div>
                                                    <div className="row fasla1">
                                                        <div className="col-5">
                                                            <input
                                                                onChange={this.onChangeMin}
                                                                // value={minValue}

                                                                type="Number"
                                                                placeholder="Min"
                                                                className="marketFilter_Input"
                                                            />
                                                        </div>
                                                        <div className="col-5">
                                                            <input
                                                                onChange={this.onChangeMax}
                                                                // value={maxValue}
                                                                type="Number"
                                                                placeholder="Max"
                                                                className="marketFilter_Input"
                                                            />
                                                        </div>
                                                        <div className="col-2">
                                                            <button className="btn btn-primary" onClick={this.filterBillboardWithMinToMax.bind(this, "trafic")}>
                                                                <i class="fa fa-caret-right"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className='filterDivs'>Daily Visitor</div>
                                                    <div className="row fasla1">
                                                        <div className="col-5">
                                                            <input
                                                                onChange={this.onChangeMin}
                                                                // value={minValue}

                                                                type="Number"
                                                                placeholder="Min"
                                                                className="marketFilter_Input"
                                                            />
                                                        </div>
                                                        <div className="col-5">
                                                            <input
                                                                onChange={this.onChangeMax}
                                                                // value={maxValue}

                                                                type="Number"
                                                                placeholder="Max"
                                                                className="marketFilter_Input"
                                                            />
                                                        </div>
                                                        <div className="col-2">
                                                            <button className="btn btn-primary" onClick={this.filterBillboardWithMinToMax.bind(this, "visitor")}>
                                                                <i class="fa fa-caret-right"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-1"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                        </div>
                    </div>
                    <div className="col-1 d-block d-sm-none"></div>
                    <div className="col-10 col-sm-6 col-md-6 col-lg-7 col-xl-7">
                        {this.state.headingValue != '' ?
                            <h3 className="billMarkt">{this.state.headingValue}</h3>
                            :
                            <h3 className="billMarkt">BillBoards</h3>
                        }
                        <div>
                            {this.state.statusValue != '' ?
                                <div>
                                    <li>{this.state.statusValue}<span class="close"
                                        onClick={this.removeValue.bind(this, 'status')}
                                    >x</span></li>
                                </div> : null}
                            {filterCityName && filterCityName.length > 0 ?
                                <div>
                                    <li>{filterCityName[0]}<span class="close"
                                        onClick={this.removeValue.bind(this, 'city')}
                                    >x</span></li>
                                </div> : null}
                            {filterStateName && filterStateName.length > 0 ?
                                <div>
                                    <li>{filterStateName[0]}<span class="close"
                                        onClick={this.removeValue.bind(this, 'state')}
                                    >x</span></li>
                                </div> : null}
                            {typesOfBillboard && typesOfBillboard.length > 0 ?
                                typesOfBillboard.map((elem, key) => {
                                    return (
                                        <div>
                                            <li>{elem}<span class="close"
                                                onClick={this.removeValue.bind(this, 'types', elem)}
                                            >x</span></li>
                                        </div>)
                                })
                                : null}
                            {facingOfBillboard && facingOfBillboard.length > 0 ?
                                facingOfBillboard.map((elem, key) => {
                                    return (
                                        <div>
                                            <li>{elem}<span class="close"
                                                onClick={this.removeValue.bind(this, 'facing', elem)}
                                            >x</span></li>
                                        </div>)
                                })
                                : null}
                            {lightningOfBillboard && lightningOfBillboard.length > 0 ?
                                lightningOfBillboard.map((elem, key) => {
                                    return (
                                        <div>
                                            <li>{elem}<span class="close"
                                                onClick={this.removeValue.bind(this, 'lightning', elem)}
                                            >x</span></li>
                                        </div>)
                                })
                                : null}
                            {audienceTypeOfBillboard && audienceTypeOfBillboard.length > 0 ?
                                audienceTypeOfBillboard.map((elem, key) => {
                                    return (
                                        <div>
                                            <li>{elem}<span class="close"
                                                onClick={this.removeValue.bind(this, 'audienceType', elem)}
                                            >x</span></li>
                                        </div>)
                                })
                                : null}
                        </div>
                        <div style={{ marginTop: '2vw' }}>
                            {billboardRendring}
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-primary btn-sm" onClick={this.onFlipData}>
                                Load more
                        </button>
                        </div>

                    </div>
                    <div className="col-1 d-block d-sm-none"></div>
                    <div className="col-12 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                </div>
            </div >
        )
    }
}

const WrappedDynamicFieldSet = Form.create()(Market);
export default WrappedDynamicFieldSet;