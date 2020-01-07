import React, { Component } from 'react';
import './market.css';
import {
    Checkbox, Form, Row, Col, Input, Radio
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
            maxValue: ''
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
            localStorage.setItem('billboardData', JSON.stringify(data))
        }
        else {
            this.billBoradDetails();
        }
    }

    billBoradDetails = async () => {
        const { citiesArr, statesArr, categoryArr } = this.state;
        // rededring the billboard data
        let response = await HttpUtils.get('getbillboard');
        let data = response.content;
        localStorage.setItem('billboardData', JSON.stringify(data))

        //slice for render some data and click on more button then show some next data
        // var billboard = this.state.billboardData.slice(this.state.from, this.state.to)

        //create a range array value of width height daily visitor cities & states
        let city = citiesArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        let catee = categoryArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        let state = statesArr.map((elem, i) => {
            return { label: elem, value: elem, id: i }
        })
        await
            this.setState({
                billboardData: data,
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

    removeValue = (param) => {
        let arr = []
        if (param == "status") {
            this.setState({
                statusValue: ''
            })
            status = arr
        }
        else if (param == "city") {
            filterCityName = arr
        }
        else if (param == "state") {
            filterStateName = arr
        }
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

        }
        else if (dropDownParam == 'city') {
            filterCityName = dropDownValue;

        }
        else if (dropDownParam == 'state') {
            filterStateName = dropDownValue;
        }
        this.filterKeysGet();
    }


    filterKeysGet = () => {
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
        console.log(filterKeys, 'filterKeys')
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
        else if (filterKeys.length == 8) {
            this.filterBillboardDataWithEightKeys(filterKeys)
        }
    }

    filterBillboardDataWithOneKey = (filterKeys) => {
        const { billboardData } = this.state;
        let filteredData = [];
        for (var i = 0; i < filterKeys.length; i++) {
            if (filterKeys[i] == 'status') {
                for (var j = 0; j < status.length; j++) {
                    billboardData.map((elem, key) => {
                        if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                            filteredData.push(elem)
                        }
                    })
                }
            }
            else if (filterKeys[i] == 'category') {
                for (var j = 0; j < filterCategoryName.length; j++) {
                    billboardData.map((elem, key) => {
                        if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                            filteredData.push(elem)
                        }
                    })
                }
            }
            else if (filterKeys[i] == 'type') {
                for (var j = 0; j < filterTypesArr.length; j++) {
                    billboardData.map((elem, key) => {
                        if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                            filteredData.push(elem)
                        }
                    })
                }
            }
            else if (filterKeys[i] == 'facing') {
                for (var j = 0; j < filterFacingArr.length; j++) {
                    billboardData.map((elem, key) => {
                        if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                            filteredData.push(elem)
                        }
                    })
                }
            }
            else if (filterKeys[i] == 'lightning') {
                for (var j = 0; j < filterLightningsArr.length; j++) {
                    billboardData.map((elem, key) => {
                        if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                            filteredData.push(elem)
                        }
                    })
                }
            }
            else if (filterKeys[i] == 'audianceType') {
                for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                    billboardData.map((elem, key) => {
                        if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                            filteredData.push(elem)
                        }
                    })
                }
            }
            else if (filterKeys[i] == 'city') {
                for (var j = 0; j < filterCityName.length; j++) {
                    billboardData.map((elem, key) => {
                        if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                            filteredData.push(elem)
                        }
                    })
                }
            }
            else if (filterKeys[i] == 'state') {
                for (var j = 0; j < filterStateName.length; j++) {
                    billboardData.map((elem, key) => {
                        if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                            filteredData.push(elem)
                        }
                    })
                }
            }
        }
        console.log(filteredData, 'filteredData')
        this.setState({
            billboardFilterdData: filteredData
        })

    }


    filterBillboardDataWithTwoKeys = (filterKeys) => {
        const { billboardData } = this.state;
        let arr1 = [];
        let filteredData = [];
        for (var i = 0; i < filterKeys.length; i++) {
            console.log(i, 'i')
            if (i == 0) {
                console.log('get first value')
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
            }
            if (i == 1) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
            }
        }
        console.log(filteredData, 'filteredData')
        this.setState({
            billboardFilterdData: filteredData
        })

    }


    filterBillboardDataWithThreeKeys = (filterKeys) => {
        const { billboardData } = this.state;
        let arr1 = [];
        let arr2 = [];
        let filteredData = [];
        for (var i = 0; i < filterKeys.length; i++) {
            if (i == 0) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
            }
            if (i == 1) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
            }
            if (i == 2) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
            }
        }
        console.log(filteredData, 'filteredData')
        this.setState({
            billboardFilterdData: filteredData
        })

    }

    filterBillboardDataWithFourKeys = (filterKeys) => {
        const { billboardData } = this.state;
        let arr1 = [];
        let arr2 = [];
        let arr3 = [];
        let filteredData = [];
        for (var i = 0; i < filterKeys.length; i++) {
            if (i == 0) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
            }
            if (i == 1) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
            }
            if (i == 2) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
            }
            if (i == 3) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
            }
        }
        console.log(filteredData, 'filteredData')
        this.setState({
            billboardFilterdData: filteredData
        })

    }


    filterBillboardDataWithFiveKeys = (filterKeys) => {
        const { billboardData } = this.state;
        let arr1 = [];
        let arr2 = [];
        let arr3 = [];
        let arr4 = [];
        let filteredData = [];
        for (var i = 0; i < filterKeys.length; i++) {
            if (i == 0) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
            }
            if (i == 1) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
            }
            if (i == 2) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
            }
            if (i == 3) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                arr4.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                arr4.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                arr4.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                arr4.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                arr4.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                arr4.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                arr4.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                arr4.push(elem)
                            }
                        })
                    }
                }
            }
            if (i == 4) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        arr4.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        arr4.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        arr4.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        arr4.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        arr4.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        arr4.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        arr4.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        arr4.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
            }
        }
        console.log(filteredData, 'filteredData')
        this.setState({
            billboardFilterdData: filteredData
        })
    }

    
    filterBillboardDataWithSixKeys = (filterKeys) => {
        const { billboardData } = this.state;
        let arr1 = [];
        let arr2 = [];
        let arr3 = [];
        let arr4 = [];
        let arr5 = [];
        let filteredData = [];
        for (var i = 0; i < filterKeys.length; i++) {
            if (i == 0) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
            }
            if (i == 1) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
            }
            if (i == 2) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
            }
            if (i == 3) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                arr4.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                arr4.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                arr4.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                arr4.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                arr4.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                arr4.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                arr4.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                arr4.push(elem)
                            }
                        })
                    }
                }
            }
            if (i == 4) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        arr4.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                arr5.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        arr4.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                arr5.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        arr4.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                arr5.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        arr4.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                arr5.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        arr4.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                arr5.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        arr4.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                arr5.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        arr4.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                arr5.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        arr4.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                arr5.push(elem)
                            }
                        })
                    }
                }
            }
            if (i == 5) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        arr5.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        arr5.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        arr5.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        arr5.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        arr5.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        arr5.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        arr5.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        arr5.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
            }
        }
        console.log(filteredData, 'filteredData')
        this.setState({
            billboardFilterdData: filteredData
        })

    }


    
    filterBillboardDataWithSevenKeys = (filterKeys) => {
        const { billboardData } = this.state;
        let arr1 = [];
        let arr2 = [];
        let arr3 = [];
        let arr4 = [];
        let arr5 = [];
        let arr6 = [];
        let filteredData = [];
        for (var i = 0; i < filterKeys.length; i++) {
            if (i == 0) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        billboardData.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                arr1.push(elem)
                            }
                        })
                    }
                }
            }
            if (i == 1) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        arr1.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                arr2.push(elem)
                            }
                        })
                    }
                }
            }
            if (i == 2) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        arr2.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                arr3.push(elem)
                            }
                        })
                    }
                }
            }
            if (i == 3) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                arr4.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                arr4.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                arr4.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                arr4.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                arr4.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                arr4.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                arr4.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        arr3.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                arr4.push(elem)
                            }
                        })
                    }
                }
            }
            if (i == 4) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        arr4.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                arr5.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        arr4.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                arr5.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        arr4.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                arr5.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        arr4.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                arr5.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        arr4.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                arr5.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        arr4.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                arr5.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        arr4.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                arr5.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        arr4.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                arr5.push(elem)
                            }
                        })
                    }
                }
            }
            if (i == 5) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        arr5.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                arr6.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        arr5.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                arr6.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        arr5.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                arr6.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        arr5.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                arr6.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        arr5.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                arr6.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        arr5.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                arr6.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        arr5.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                arr6.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        arr5.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                arr6.push(elem)
                            }
                        })
                    }
                }
            }
            if (i == 6) {
                if (filterKeys[i] == 'status') {
                    for (var j = 0; j < status.length; j++) {
                        arr6.map((elem, key) => {
                            if (elem.status.toLowerCase() == status[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'category') {
                    for (var j = 0; j < filterCategoryName.length; j++) {
                        arr6.map((elem, key) => {
                            if (elem.category[0].toLowerCase() == filterCategoryName[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'type') {
                    for (var j = 0; j < filterTypesArr.length; j++) {
                        arr6.map((elem, key) => {
                            if (elem.type.toLowerCase() == filterTypesArr[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'facing') {
                    for (var j = 0; j < filterFacingArr.length; j++) {
                        arr6.map((elem, key) => {
                            if (elem.facing.toLowerCase() == filterFacingArr[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'lightning') {
                    for (var j = 0; j < filterLightningsArr.length; j++) {
                        arr6.map((elem, key) => {
                            if (elem.lightning.toLowerCase() == filterLightningsArr[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'audianceType') {
                    for (var j = 0; j < filterAudienceTypeArr.length; j++) {
                        arr6.map((elem, key) => {
                            if (elem.audianceType.toLowerCase() == filterAudienceTypeArr[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'city') {
                    for (var j = 0; j < filterCityName.length; j++) {
                        arr6.map((elem, key) => {
                            if (elem.city.toLowerCase() == filterCityName[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
                else if (filterKeys[i] == 'state') {
                    for (var j = 0; j < filterStateName.length; j++) {
                        arr6.map((elem, key) => {
                            if (elem.state.toLowerCase() == filterStateName[j].toLowerCase()) {
                                filteredData.push(elem)
                            }
                        })
                    }
                }
            }
        }
        console.log(filteredData, 'filteredData')
        this.setState({
            billboardFilterdData: filteredData
        })

    }
    // filterBillboardData = (filterKeys) => {
    //     if (filterKeys.length == 1) {
    //         if (filterKeys[0] == 'status') {
    //             this.filterBillboardDataWithOneKey(status, 'status');
    //         }
    //         // else if (filterKeys[0] == 'category') {
    //         //     this.filterBillboardDataWithOneKey(filterCategoryName, 'category');
    //         // }
    //         else if (filterKeys[0] == 'type') {
    //             this.filterBillboardDataWithOneKey(filterTypesArr, 'type');
    //         }
    //         else if (filterKeys[0] == 'facing') {
    //             this.filterBillboardDataWithOneKey(filterFacingArr, 'facing');
    //         }
    //         else if (filterKeys[0] == 'lightning') {
    //             this.filterBillboardDataWithOneKey(filterLightningsArr, 'lightning');
    //         }
    //         else if (filterKeys[0] == 'audianceType') {
    //             this.filterBillboardDataWithOneKey(filterAudienceTypeArr, 'audianceType');
    //         }
    //         else if (filterKeys[0] == 'city') {
    //             this.filterBillboardDataWithOneKey(filterCityName, 'city');
    //         }
    //         else if (filterKeys[0] == 'state') {
    //             this.filterBillboardDataWithOneKey(filterStateName, 'state');
    //         }
    //     }
    //     else if (filterKeys.length == 2) {
    //         // if (filterKeys[0] == 'status' && filterKeys[1] == 'category') {
    //         //     this.filterBillboardDataWithTwoKey(status, filterKeys[0], filterCategoryName, filterKeys[1]);
    //         // }
    //         // else 
    //         if (filterKeys[0] == 'status' && filterKeys[1] == 'type') {
    //             this.filterBillboardDataWithTwoKey(status, filterKeys[0], filterTypesArr, filterKeys[1]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'facing') {
    //             this.filterBillboardDataWithTwoKey(status, filterKeys[0], filterFacingArr, filterKeys[1]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'lightning') {
    //             this.filterBillboardDataWithTwoKey(status, filterKeys[0], filterLightningsArr, filterKeys[1]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'audianceType') {
    //             this.filterBillboardDataWithTwoKey(status, filterKeys[0], filterAudienceTypeArr, filterKeys[1]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'city') {
    //             this.filterBillboardDataWithTwoKey(status, filterKeys[0], filterCityName, filterKeys[1]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'state') {
    //             this.filterBillboardDataWithTwoKey(status, filterKeys[0], filterStateName, filterKeys[1]);
    //         }
    //         // else if (filterKeys[0] == 'category' && filterKeys[0] == 'type') {
    //         //     this.filterBillboardDataWithTwoKey(filterCategoryName, filterKeys[0], filterTypesArr, filterKeys[1]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'facing') {
    //         //     this.filterBillboardDataWithTwoKey(filterCategoryName, filterKeys[0], filterFacingArr, filterKeys[1]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'lightning') {
    //         //     this.filterBillboardDataWithTwoKey(filterCategoryName, filterKeys[0], filterLightningsArr, filterKeys[1]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'audianceType') {
    //         //     this.filterBillboardDataWithTwoKey(filterCategoryName, filterKeys[0], filterAudienceTypeArr, filterKeys[1]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'city') {
    //         //     this.filterBillboardDataWithTwoKey(filterCategoryName, filterKeys[0], filterCityName, filterKeys[1]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'state') {
    //         //     this.filterBillboardDataWithTwoKey(filterCategoryName, filterKeys[0], filterStateName, filterKeys[1]);
    //         // }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'facing') {
    //             this.filterBillboardDataWithTwoKey(filterTypesArr, filterKeys[0], filterFacingArr, filterKeys[1]);
    //         }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'lightning') {
    //             this.filterBillboardDataWithTwoKey(filterTypesArr, filterKeys[0], filterLightningsArr, filterKeys[1]);
    //         }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'audianceType') {
    //             this.filterBillboardDataWithTwoKey(filterTypesArr, filterKeys[0], filterAudienceTypeArr, filterKeys[1]);
    //         }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'city') {
    //             this.filterBillboardDataWithTwoKey(filterTypesArr, filterKeys[0], filterCityName, filterKeys[1]);
    //         }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'state') {
    //             this.filterBillboardDataWithTwoKey(filterTypesArr, filterKeys[0], filterStateName, filterKeys[1]);
    //         }
    //         else if (filterKeys[0] == 'facing' && filterKeys[1] == 'lightning') {
    //             this.filterBillboardDataWithTwoKey(filterFacingArr, filterKeys[0], filterLightningsArr, filterKeys[1]);
    //         }
    //         else if (filterKeys[0] == 'facing' && filterKeys[1] == 'audianceType') {
    //             this.filterBillboardDataWithTwoKey(filterFacingArr, filterKeys[0], filterAudienceTypeArr, filterKeys[1]);
    //         }
    //         else if (filterKeys[0] == 'facing' && filterKeys[1] == 'city') {
    //             this.filterBillboardDataWithTwoKey(filterFacingArr, filterKeys[0], filterCityName, filterKeys[1]);
    //         }
    //         else if (filterKeys[0] == 'facing' && filterKeys[1] == 'state') {
    //             this.filterBillboardDataWithTwoKey(filterFacingArr, filterKeys[0], filterStateName, filterKeys[1]);
    //         }
    //         else if (filterKeys[0] == 'lightning' && filterKeys[1] == 'audianceType') {
    //             this.filterBillboardDataWithTwoKey(filterLightningsArr, filterKeys[0], filterAudienceTypeArr, filterKeys[1]);
    //         }
    //         else if (filterKeys[0] == 'lightning' && filterKeys[1] == 'city') {
    //             this.filterBillboardDataWithTwoKey(filterLightningsArr, filterKeys[0], filterCityName, filterKeys[1]);
    //         }
    //         else if (filterKeys[0] == 'lightning' && filterKeys[1] == 'state') {
    //             this.filterBillboardDataWithTwoKey(filterLightningsArr, filterKeys[0], filterStateName, filterKeys[1]);
    //         }
    //         else if (filterKeys[0] == 'audianceType' && filterKeys[1] == 'city') {
    //             this.filterBillboardDataWithTwoKey(filterAudienceTypeArr, filterKeys[0], filterCityName, filterKeys[1]);
    //         }
    //         else if (filterKeys[0] == 'audianceType' && filterKeys[1] == 'state') {
    //             this.filterBillboardDataWithTwoKey(filterAudienceTypeArr, filterKeys[0], filterStateName, filterKeys[1]);
    //         }
    //         else if (filterKeys[0] == 'city' && filterKeys[1] == 'state') {
    //             this.filterBillboardDataWithTwoKey(filterCityName, filterKeys[0], filterStateName, filterKeys[1]);
    //         }
    //     }
    //     else if (filterKeys.length == 3) {
    //         // if (filterKeys[0] == 'status' && filterKeys[1] == 'category' && filterKeys[2] == 'type') {
    //           
    //         //     this.filterBillboardDataWithThreeKey(status, filterKeys[0], filterCategoryName, filterKeys[1], filterTypesArr, filterKeys[2]);
    //         // }
    //         // else if (filterKeys[0] == 'status' && filterKeys[1] == 'category' && filterKeys[2] == 'facing') {
    //         //     this.filterBillboardDataWithThreeKey(status, filterKeys[0], filterCategoryName, filterKeys[1], filterFacingArr, filterKeys[2]);
    //         // }
    //         // else if (filterKeys[0] == 'status' && filterKeys[1] == 'category' && filterKeys[2] == 'lightning') {
    //         //     this.filterBillboardDataWithThreeKey(status, filterKeys[0], filterCategoryName, filterKeys[1], filterLightningsArr, filterKeys[2]);
    //         // }
    //         // else if (filterKeys[0] == 'status' && filterKeys[1] == 'category' && filterKeys[2] == 'audianceType') {
    //         //     this.filterBillboardDataWithThreeKey(status, filterKeys[0], filterCategoryName, filterKeys[1], filterAudienceTypeArr, filterKeys[2]);
    //         // }
    //         // else if (filterKeys[0] == 'status' && filterKeys[1] == 'category' && filterKeys[2] == 'city') {
    //         //     this.filterBillboardDataWithThreeKey(status, filterKeys[0], filterCategoryName, filterKeys[1], filterCityName, filterKeys[2]);
    //         // }
    //         // else if (filterKeys[0] == 'status' && filterKeys[1] == 'category' && filterKeys[2] == 'state') {
    //         //     this.filterBillboardDataWithThreeKey(status, filterKeys[0], filterCategoryName, filterKeys[1], filterStateName, filterKeys[2]);
    //         // }
    //         // else 
    //         if (filterKeys[0] == 'status' && filterKeys[1] == 'type' && filterKeys[2] == 'facing') {
    //             this.filterBillboardDataWithThreeKey(status, filterKeys[0], filterTypesArr, filterKeys[1], filterFacingArr, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'type' && filterKeys[2] == 'lightning') {
    //             this.filterBillboardDataWithThreeKey(status, filterKeys[0], filterTypesArr, filterKeys[1], filterLightningsArr, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'type' && filterKeys[2] == 'audianceType') {
    //             this.filterBillboardDataWithThreeKey(status, filterKeys[0], filterTypesArr, filterKeys[1], filterAudienceTypeArr, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'type' && filterKeys[2] == 'city') {
    //             this.filterBillboardDataWithThreeKey(status, filterKeys[0], filterTypesArr, filterKeys[1], filterCityName, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'type' && filterKeys[2] == 'state') {
    //             this.filterBillboardDataWithThreeKey(status, filterKeys[0], filterTypesArr, filterKeys[1], filterStateName, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'facing' && filterKeys[2] == 'lightning') {
    //             this.filterBillboardDataWithThreeKey(status, filterKeys[0], filterFacingArr, filterKeys[1], filterLightningsArr, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'facing' && filterKeys[2] == 'audianceType') {
    //             this.filterBillboardDataWithThreeKey(status, filterKeys[0], filterFacingArr, filterKeys[1], filterAudienceTypeArr, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'facing' && filterKeys[2] == 'city') {
    //             this.filterBillboardDataWithThreeKey(status, filterKeys[0], filterFacingArr, filterKeys[1], filterCityName, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'facing' && filterKeys[2] == 'state') {
    //             this.filterBillboardDataWithThreeKey(status, filterKeys[0], filterFacingArr, filterKeys[1], filterStateName, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'lightning' && filterKeys[2] == 'audianceType') {
    //             this.filterBillboardDataWithThreeKey(status, filterKeys[0], filterLightningsArr, filterKeys[1], filterAudienceTypeArr, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'lightning' && filterKeys[2] == 'city') {
    //             this.filterBillboardDataWithThreeKey(status, filterKeys[0], filterLightningsArr, filterKeys[1], filterCityName, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'lightning' && filterKeys[2] == 'state') {
    //             this.filterBillboardDataWithThreeKey(status, filterKeys[0], filterLightningsArr, filterKeys[1], filterStateName, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'audianceType' && filterKeys[2] == 'city') {
    //             this.filterBillboardDataWithThreeKey(status, filterKeys[0], filterAudienceTypeArr, filterKeys[1], filterCityName, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'audianceType' && filterKeys[2] == 'state') {
    //             this.filterBillboardDataWithThreeKey(status, filterKeys[0], filterAudienceTypeArr, filterKeys[1], filterStateName, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'city' && filterKeys[2] == 'state') {
    //             this.filterBillboardDataWithThreeKey(status, filterKeys[0], filterCityName, filterKeys[1], filterStateName, filterKeys[2]);
    //         }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'type' && filterKeys[2] == 'facing') {
    //         //     this.filterBillboardDataWithThreeKey(filterCategoryName, filterKeys[0], filterTypesArr, filterKeys[1], filterFacingArr, filterKeys[2]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'type' && filterKeys[2] == 'lightning') {
    //         //     this.filterBillboardDataWithThreeKey(filterCategoryName, filterKeys[0], filterTypesArr, filterKeys[1], filterLightningsArr, filterKeys[2]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'type' && filterKeys[2] == 'audianceType') {
    //         //     this.filterBillboardDataWithThreeKey(filterCategoryName, filterKeys[0], filterTypesArr, filterKeys[1], filterAudienceTypeArr, filterKeys[2]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'type' && filterKeys[2] == 'city') {
    //         //     this.filterBillboardDataWithThreeKey(filterCategoryName, filterKeys[0], filterTypesArr, filterKeys[1], filterCityName, filterKeys[2]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'type' && filterKeys[2] == 'state') {
    //         //     this.filterBillboardDataWithThreeKey(filterCategoryName, filterKeys[0], filterTypesArr, filterKeys[1], filterStateName, filterKeys[2]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'facing' && filterKeys[2] == 'lightning') {
    //         //     this.filterBillboardDataWithThreeKey(filterCategoryName, filterKeys[0], filterFacingArr, filterKeys[1], filterLightningsArr, filterKeys[2]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'facing' && filterKeys[2] == 'audianceType') {
    //         //     this.filterBillboardDataWithThreeKey(filterCategoryName, filterKeys[0], filterFacingArr, filterKeys[1], filterAudienceTypeArr, filterKeys[2]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'facing' && filterKeys[2] == 'city') {
    //         //     this.filterBillboardDataWithThreeKey(filterCategoryName, filterKeys[0], filterFacingArr, filterKeys[1], filterCityName, filterKeys[2]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'facing' && filterKeys[2] == 'state') {
    //         //     this.filterBillboardDataWithThreeKey(filterCategoryName, filterKeys[0], filterFacingArr, filterKeys[1], filterStateName, filterKeys[2]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'lightning' && filterKeys[2] == 'audianceType') {
    //         //     this.filterBillboardDataWithThreeKey(filterCategoryName, filterKeys[0], filterLightningsArr, filterKeys[1], filterAudienceTypeArr, filterKeys[2]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'lightning' && filterKeys[2] == 'city') {
    //         //     this.filterBillboardDataWithThreeKey(filterCategoryName, filterKeys[0], filterLightningsArr, filterKeys[1], filterCityName, filterKeys[2]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'lightning' && filterKeys[2] == 'state') {
    //         //     this.filterBillboardDataWithThreeKey(filterCategoryName, filterKeys[0], filterLightningsArr, filterKeys[1], filterStateName, filterKeys[2]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'audianceType' && filterKeys[2] == 'city') {
    //         //     this.filterBillboardDataWithThreeKey(filterCategoryName, filterKeys[0], filterAudienceTypeArr, filterKeys[1], filterCityName, filterKeys[2]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'audianceType' && filterKeys[2] == 'state') {
    //         //     this.filterBillboardDataWithThreeKey(filterCategoryName, filterKeys[0], filterAudienceTypeArr, filterKeys[1], filterStateName, filterKeys[2]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'city' && filterKeys[2] == 'state') {
    //         //     this.filterBillboardDataWithThreeKey(filterCategoryName, filterKeys[0], filterCityName, filterKeys[1], filterStateName, filterKeys[2]);
    //         // }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'facing' && filterKeys[2] == 'lightning') {
    //             this.filterBillboardDataWithThreeKey(filterTypesArr, filterKeys[0], filterFacingArr, filterKeys[1], filterLightningsArr, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'facing' && filterKeys[2] == 'audianceType') {
    //             this.filterBillboardDataWithThreeKey(filterTypesArr, filterKeys[0], filterFacingArr, filterKeys[1], filterAudienceTypeArr, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'facing' && filterKeys[2] == 'city') {
    //             this.filterBillboardDataWithThreeKey(filterTypesArr, filterKeys[0], filterFacingArr, filterKeys[1], filterCityName, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'facing' && filterKeys[2] == 'state') {
    //             this.filterBillboardDataWithThreeKey(filterTypesArr, filterKeys[0], filterFacingArr, filterKeys[1], filterStateName, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'lightning' && filterKeys[2] == 'audianceType') {
    //             this.filterBillboardDataWithThreeKey(filterTypesArr, filterKeys[0], filterLightningsArr, filterKeys[1], filterAudienceTypeArr, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'lightning' && filterKeys[2] == 'city') {
    //             this.filterBillboardDataWithThreeKey(filterTypesArr, filterKeys[0], filterLightningsArr, filterKeys[1], filterCityName, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'lightning' && filterKeys[2] == 'state') {
    //             this.filterBillboardDataWithThreeKey(filterTypesArr, filterKeys[0], filterLightningsArr, filterKeys[1], filterStateName, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'audianceType' && filterKeys[2] == 'city') {
    //             this.filterBillboardDataWithThreeKey(filterTypesArr, filterKeys[0], filterAudienceTypeArr, filterKeys[1], filterCityName, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'audianceType' && filterKeys[2] == 'state') {
    //             this.filterBillboardDataWithThreeKey(filterTypesArr, filterKeys[0], filterAudienceTypeArr, filterKeys[1], filterStateName, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'city' && filterKeys[2] == 'state') {
    //             this.filterBillboardDataWithThreeKey(filterTypesArr, filterKeys[0], filterCityName, filterKeys[1], filterStateName, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'facing' && filterKeys[1] == 'lightning' && filterKeys[2] == 'audianceType') {
    //             this.filterBillboardDataWithThreeKey(filterFacingArr, filterKeys[0], filterLightningsArr, filterKeys[1], filterAudienceTypeArr, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'facing' && filterKeys[1] == 'lightning' && filterKeys[2] == 'city') {
    //             this.filterBillboardDataWithThreeKey(filterFacingArr, filterKeys[0], filterLightningsArr, filterKeys[1], filterCityName, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'facing' && filterKeys[1] == 'lightning' && filterKeys[2] == 'state') {
    //             this.filterBillboardDataWithThreeKey(filterFacingArr, filterKeys[0], filterLightningsArr, filterKeys[1], filterStateName, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'facing' && filterKeys[1] == 'audianceType' && filterKeys[2] == 'city') {
    //             this.filterBillboardDataWithThreeKey(filterFacingArr, filterKeys[0], filterAudienceTypeArr, filterKeys[1], filterCityName, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'facing' && filterKeys[1] == 'audianceType' && filterKeys[2] == 'state') {
    //             this.filterBillboardDataWithThreeKey(filterFacingArr, filterKeys[0], filterAudienceTypeArr, filterKeys[1], filterStateName, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'facing' && filterKeys[1] == 'city' && filterKeys[2] == 'state') {
    //             this.filterBillboardDataWithThreeKey(filterFacingArr, filterKeys[0], filterCityName, filterKeys[1], filterStateName, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'lightning' && filterKeys[1] == 'audianceType' && filterKeys[2] == 'city') {
    //             this.filterBillboardDataWithThreeKey(filterLightningsArr, filterKeys[0], filterAudienceTypeArr, filterKeys[1], filterCityName, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'lightning' && filterKeys[1] == 'audianceType' && filterKeys[2] == 'state') {
    //             this.filterBillboardDataWithThreeKey(filterLightningsArr, filterKeys[0], filterAudienceTypeArr, filterKeys[1], filterStateName, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'lightning' && filterKeys[1] == 'city' && filterKeys[2] == 'state') {
    //             this.filterBillboardDataWithThreeKey(filterLightningsArr, filterKeys[0], filterCityName, filterKeys[1], filterStateName, filterKeys[2]);
    //         }
    //         else if (filterKeys[0] == 'audianceType' && filterKeys[1] == 'city' && filterKeys[2] == 'state') {
    //             this.filterBillboardDataWithThreeKey(filterAudienceTypeArr, filterKeys[0], filterCityName, filterKeys[1], filterStateName, filterKeys[2]);
    //         }
    //     }
    //     else if (filterKeys.length == 4) {
    //         // if (filterKeys[0] == 'status' && filterKeys[1] == 'category' && filterKeys[2] == 'type' && filterKeys[3] == 'facing') {
    //         //     this.filterBillboardDataWithFourKey(status, filterKeys[0], filterCategoryName, filterKeys[1],
    //         //         filterTypesArr, filterKeys[2], filterFacingArr, filterKeys[3]);
    //         // }
    //         // else if (filterKeys[0] == 'status' && filterKeys[1] == 'category' && filterKeys[2] == 'type' && filterKeys[3] == 'lightning') {
    //         //     this.filterBillboardDataWithFourKey(status, filterKeys[0], filterCategoryName, filterKeys[1],
    //         //         filterTypesArr, filterKeys[2], filterLightningsArr, filterKeys[3]);
    //         // }
    //         // else if (filterKeys[0] == 'status' && filterKeys[1] == 'category' && filterKeys[2] == 'type' && filterKeys[3] == 'audianceType') {
    //         //     this.filterBillboardDataWithFourKey(status, filterKeys[0], filterCategoryName, filterKeys[1],
    //         //         filterTypesArr, filterKeys[2], filterAudienceTypeArr, filterKeys[3]);
    //         // }
    //         // else if (filterKeys[0] == 'status' && filterKeys[1] == 'category' && filterKeys[2] == 'type' && filterKeys[3] == 'city') {
    //         //     this.filterBillboardDataWithFourKey(status, filterKeys[0], filterCategoryName, filterKeys[1],
    //         //         filterTypesArr, filterKeys[2], filterCityName, filterKeys[3]);
    //         // }
    //         // else if (filterKeys[0] == 'status' && filterKeys[1] == 'category' && filterKeys[2] == 'type' && filterKeys[3] == 'state') {
    //         //     this.filterBillboardDataWithFourKey(status, filterKeys[0], filterCategoryName, filterKeys[1],
    //         //         filterTypesArr, filterKeys[2], filterStateName, filterKeys[3]);
    //         // }
    //         // else 
    //         if (filterKeys[0] == 'status' && filterKeys[1] == 'type' && filterKeys[2] == 'facing' && filterKeys[3] == 'lightning') {
    //             this.filterBillboardDataWithFourKey(status, filterKeys[0], filterTypesArr, filterKeys[1],
    //                 filterFacingArr, filterKeys[2], filterLightningsArr, filterKeys[3]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'type' && filterKeys[2] == 'facing' && filterKeys[3] == 'audianceType') {
    //             this.filterBillboardDataWithFourKey(status, filterKeys[0], filterTypesArr, filterKeys[1],
    //                 filterFacingArr, filterKeys[2], filterAudienceTypeArr, filterKeys[3]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'type' && filterKeys[2] == 'facing' && filterKeys[3] == 'city') {
    //             this.filterBillboardDataWithFourKey(status, filterKeys[0], filterTypesArr, filterKeys[1],
    //                 filterFacingArr, filterKeys[2], filterCityName, filterKeys[3]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'type' && filterKeys[2] == 'facing' && filterKeys[3] == 'state') {
    //             this.filterBillboardDataWithFourKey(status, filterKeys[0], filterTypesArr, filterKeys[1],
    //                 filterFacingArr, filterKeys[2], filterStateName, filterKeys[3]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'facing' && filterKeys[2] == 'lightning' && filterKeys[3] == 'audianceType') {
    //             this.filterBillboardDataWithFourKey(status, filterKeys[0], filterFacingArr, filterKeys[1],
    //                 filterLightningsArr, filterKeys[2], filterAudienceTypeArr, filterKeys[3]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'facing' && filterKeys[2] == 'lightning' && filterKeys[3] == 'city') {
    //             this.filterBillboardDataWithFourKey(status, filterKeys[0], filterFacingArr, filterKeys[1],
    //                 filterLightningsArr, filterKeys[2], filterCityName, filterKeys[3]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'facing' && filterKeys[2] == 'lightning' && filterKeys[3] == 'state') {
    //             this.filterBillboardDataWithFourKey(status, filterKeys[0], filterFacingArr, filterKeys[1],
    //                 filterLightningsArr, filterKeys[2], filterStateName, filterKeys[3]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'lightning' && filterKeys[2] == 'audianceType' && filterKeys[3] == 'city') {
    //             this.filterBillboardDataWithFourKey(status, filterKeys[0], filterLightningsArr, filterKeys[1],
    //                 filterAudienceTypeArr, filterKeys[2], filterCityName, filterKeys[3]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'lightning' && filterKeys[2] == 'audianceType' && filterKeys[3] == 'state') {
    //             this.filterBillboardDataWithFourKey(status, filterKeys[0], filterLightningsArr, filterKeys[1],
    //                 filterAudienceTypeArr, filterKeys[2], filterStateName, filterKeys[3]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'audianceType' && filterKeys[2] == 'city' && filterKeys[3] == 'state') {
    //             this.filterBillboardDataWithFourKey(status, filterKeys[0], filterAudienceTypeArr, filterKeys[1],
    //                 filterCityName, filterKeys[2], filterStateName, filterKeys[3]);
    //         }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'type' && filterKeys[2] == 'facing' && filterKeys[3] == 'lightning') {
    //         //     this.filterBillboardDataWithFourKey(filterCategoryName, filterKeys[0], filterTypesArr, filterKeys[1],
    //         //         filterFacingArr, filterKeys[2], filterLightningsArr, filterKeys[3]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'type' && filterKeys[2] == 'facing' && filterKeys[3] == 'audianceType') {
    //         //     this.filterBillboardDataWithFourKey(filterCategoryName, filterKeys[0], filterTypesArr, filterKeys[1],
    //         //         filterFacingArr, filterKeys[2], filterAudienceTypeArr, filterKeys[3]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'type' && filterKeys[2] == 'facing' && filterKeys[3] == 'city') {
    //         //     this.filterBillboardDataWithFourKey(filterCategoryName, filterKeys[0], filterTypesArr, filterKeys[1],
    //         //         filterFacingArr, filterKeys[2], filterCityName, filterKeys[3]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'type' && filterKeys[2] == 'facing' && filterKeys[3] == 'state') {
    //         //     this.filterBillboardDataWithFourKey(filterCategoryName, filterKeys[0], filterTypesArr, filterKeys[1],
    //         //         filterFacingArr, filterKeys[2], filterStateName, filterKeys[3]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'facing' && filterKeys[2] == 'lightning' && filterKeys[3] == 'audianceType') {
    //         //     this.filterBillboardDataWithFourKey(filterCategoryName, filterKeys[0], filterFacingArr, filterKeys[1],
    //         //         filterLightningsArr, filterKeys[2], filterAudienceTypeArr, filterKeys[3]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'facing' && filterKeys[2] == 'lightning' && filterKeys[3] == 'city') {
    //         //     this.filterBillboardDataWithFourKey(filterCategoryName, filterKeys[0], filterFacingArr, filterKeys[1],
    //         //         filterLightningsArr, filterKeys[2], filterCityName, filterKeys[3]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'facing' && filterKeys[2] == 'lightning' && filterKeys[3] == 'state') {
    //         //     this.filterBillboardDataWithFourKey(filterCategoryName, filterKeys[0], filterFacingArr, filterKeys[1],
    //         //         filterLightningsArr, filterKeys[2], filterStateName, filterKeys[3]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'lightning' && filterKeys[2] == 'audianceType' && filterKeys[3] == 'city') {
    //         //     this.filterBillboardDataWithFourKey(filterCategoryName, filterKeys[0], filterLightningsArr, filterKeys[1],
    //         //         filterAudienceTypeArr, filterKeys[2], filterCityName, filterKeys[3]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'lightning' && filterKeys[2] == 'audianceType' && filterKeys[3] == 'state') {
    //         //     this.filterBillboardDataWithFourKey(filterCategoryName, filterKeys[0], filterLightningsArr, filterKeys[1],
    //         //         filterAudienceTypeArr, filterKeys[2], filterStateName, filterKeys[3]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'audianceType' && filterKeys[2] == 'city' && filterKeys[3] == 'state') {
    //         //     this.filterBillboardDataWithFourKey(filterCategoryName, filterKeys[0], filterAudienceTypeArr, filterKeys[1],
    //         //         filterCityName, filterKeys[2], filterStateName, filterKeys[3]);
    //         // }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'facing' && filterKeys[2] == 'lightning' && filterKeys[3] == 'audianceType') {
    //             this.filterBillboardDataWithFourKey(filterTypesArr, filterKeys[0], filterFacingArr, filterKeys[1],
    //                 filterLightningsArr, filterKeys[2], filterAudienceTypeArr, filterKeys[3]);
    //         }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'facing' && filterKeys[2] == 'lightning' && filterKeys[3] == 'city') {
    //             this.filterBillboardDataWithFourKey(filterTypesArr, filterKeys[0], filterFacingArr, filterKeys[1],
    //                 filterLightningsArr, filterKeys[2], filterCityName, filterKeys[3]);
    //         }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'facing' && filterKeys[2] == 'lightning' && filterKeys[3] == 'state') {
    //             this.filterBillboardDataWithFourKey(filterTypesArr, filterKeys[0], filterFacingArr, filterKeys[1],
    //                 filterLightningsArr, filterKeys[2], filterStateName, filterKeys[3]);
    //         }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'lightning' && filterKeys[2] == 'audianceType' && filterKeys[3] == 'city') {
    //             this.filterBillboardDataWithFourKey(filterTypesArr, filterKeys[0], filterLightningsArr, filterKeys[1],
    //                 filterAudienceTypeArr, filterKeys[2], filterCityName, filterKeys[3]);
    //         }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'lightning' && filterKeys[2] == 'audianceType' && filterKeys[3] == 'state') {
    //             this.filterBillboardDataWithFourKey(filterTypesArr, filterKeys[0], filterLightningsArr, filterKeys[1],
    //                 filterAudienceTypeArr, filterKeys[2], filterStateName, filterKeys[3]);
    //         }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'audianceType' && filterKeys[2] == 'city' && filterKeys[3] == 'state') {
    //             this.filterBillboardDataWithFourKey(filterTypesArr, filterKeys[0], filterAudienceTypeArr, filterKeys[1],
    //                 filterCityName, filterKeys[2], filterStateName, filterKeys[3]);
    //         }
    //         else if (filterKeys[0] == 'facing' && filterKeys[1] == 'lightning' && filterKeys[2] == 'audianceType' && filterKeys[3] == 'city') {
    //             this.filterBillboardDataWithFourKey(filterFacingArr, filterKeys[0], filterLightningsArr, filterKeys[1],
    //                 filterAudienceTypeArr, filterKeys[2], filterCityName, filterKeys[3]);
    //         }
    //         else if (filterKeys[0] == 'facing' && filterKeys[1] == 'lightning' && filterKeys[2] == 'audianceType' && filterKeys[3] == 'state') {
    //             this.filterBillboardDataWithFourKey(filterFacingArr, filterKeys[0], filterLightningsArr, filterKeys[1],
    //                 filterAudienceTypeArr, filterKeys[2], filterStateName, filterKeys[3]);
    //         }
    //         else if (filterKeys[0] == 'facing' && filterKeys[1] == 'audianceType' && filterKeys[2] == 'city' && filterKeys[3] == 'state') {
    //             this.filterBillboardDataWithFourKey(filterFacingArr, filterKeys[0], filterAudienceTypeArr, filterKeys[1],
    //                 filterCityName, filterKeys[2], filterStateName, filterKeys[3]);
    //         }
    //         else if (filterKeys[0] == 'lightning' && filterKeys[1] == 'audianceType' && filterKeys[2] == 'city' && filterKeys[3] == 'state') {
    //             this.filterBillboardDataWithFourKey(filterLightningsArr, filterKeys[0], filterAudienceTypeArr, filterKeys[1],
    //                 filterCityName, filterKeys[2], filterStateName, filterKeys[3]);
    //         }
    //     }
    //     else if (filterKeys.length == 5) {
    //         // if (filterKeys[0] == 'status' && filterKeys[1] == 'category' && filterKeys[2] == 'type' &&
    //         //     filterKeys[3] == 'facing', filterKeys[4] == 'lightning') {
    //         //     this.filterBillboardDataWithFiveKey(status, filterKeys[0], filterCategoryName, filterKeys[1], filterTypesArr, filterKeys[2],
    //         //         filterFacingArr, filterKeys[3], filterLightningsArr, filterKeys[4]);
    //         // }
    //         // else if (filterKeys[0] == 'status' && filterKeys[1] == 'category' && filterKeys[2] == 'type' &&
    //         //     filterKeys[3] == 'facing', filterKeys[4] == 'audianceType') {
    //         //     this.filterBillboardDataWithFiveKey(status, filterKeys[0], filterCategoryName, filterKeys[1], filterTypesArr, filterKeys[2],
    //         //         filterFacingArr, filterKeys[3], filterAudienceTypeArr, filterKeys[4]);
    //         // }
    //         // else if (filterKeys[0] == 'status' && filterKeys[1] == 'category' && filterKeys[2] == 'type' &&
    //         //     filterKeys[3] == 'facing', filterKeys[4] == 'city') {
    //         //     this.filterBillboardDataWithFiveKey(status, filterKeys[0], filterCategoryName, filterKeys[1], filterTypesArr, filterKeys[2],
    //         //         filterFacingArr, filterKeys[3], filterCityName, filterKeys[4]);
    //         // }
    //         // else if (filterKeys[0] == 'status' && filterKeys[1] == 'category' && filterKeys[2] == 'type' &&
    //         //     filterKeys[3] == 'facing', filterKeys[4] == 'state') {
    //         //     this.filterBillboardDataWithFiveKey(status, filterKeys[0], filterCategoryName, filterKeys[1], filterTypesArr, filterKeys[2],
    //         //         filterFacingArr, filterKeys[3], filterStateName, filterKeys[4]);
    //         // }
    //         // else 
    //         if (filterKeys[0] == 'status' && filterKeys[1] == 'type' && filterKeys[2] == 'facing' &&
    //             filterKeys[3] == 'lightning', filterKeys[4] == 'audianceType') {
    //             console.log('one')
    //                 this.filterBillboardDataWithFiveKey(status, filterKeys[0], filterTypesArr, filterKeys[1], filterFacingArr, filterKeys[2],
    //                 filterLightningsArr, filterKeys[3], filterAudienceTypeArr, filterKeys[4]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'type' && filterKeys[2] == 'facing' &&
    //             filterKeys[3] == 'lightning', filterKeys[4] == 'city') {
    //                 console.log('two')

    //             this.filterBillboardDataWithFiveKey(status, filterKeys[0], filterTypesArr, filterKeys[1], filterFacingArr, filterKeys[2],
    //                 filterLightningsArr, filterKeys[3], filterCityName, filterKeys[4]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'type' && filterKeys[2] == 'facing' &&
    //             filterKeys[3] == 'lightning', filterKeys[4] == 'state') {
    //                 console.log('three')

    //             this.filterBillboardDataWithFiveKey(status, filterKeys[0], filterTypesArr, filterKeys[1], filterFacingArr, filterKeys[2],
    //                 filterLightningsArr, filterKeys[3], filterStateName, filterKeys[4]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'facing' && filterKeys[2] == 'lightning' &&
    //             filterKeys[3] == 'audianceType', filterKeys[4] == 'city') {
    //                 console.log('four')

    //             this.filterBillboardDataWithFiveKey(status, filterKeys[0], filterFacingArr, filterKeys[1], filterLightningsArr, filterKeys[2],
    //                 filterAudienceTypeArr, filterKeys[3], filterCityName, filterKeys[4]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'facing' && filterKeys[2] == 'lightning' &&
    //             filterKeys[3] == 'audianceType', filterKeys[4] == 'state') {
    //             this.filterBillboardDataWithFiveKey(status, filterKeys[0], filterFacingArr, filterKeys[1], filterLightningsArr, filterKeys[2],
    //                 filterAudienceTypeArr, filterKeys[3], filterStateName, filterKeys[4]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'lightning' && filterKeys[2] == 'audianceType' &&
    //             filterKeys[3] == 'city', filterKeys[4] == 'state') {
    //             this.filterBillboardDataWithFiveKey(status, filterKeys[0], filterLightningsArr, filterKeys[1],
    //                 filterAudienceTypeArr, filterKeys[2], filterCityName, filterKeys[3], filterStateName, filterKeys[4]);
    //         }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'type' && filterKeys[2] == 'facing' &&
    //         //     filterKeys[3] == 'lightning', filterKeys[4] == 'audianceType') {
    //         //     this.filterBillboardDataWithFiveKey(filterCategoryName, filterKeys[0], filterTypesArr, filterKeys[1], filterFacingArr, filterKeys[2],
    //         //         filterLightningsArr, filterKeys[3], filterAudienceTypeArr, filterKeys[4]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'type' && filterKeys[2] == 'facing' &&
    //         //     filterKeys[3] == 'lightning', filterKeys[4] == 'city') {
    //         //     this.filterBillboardDataWithFiveKey(filterCategoryName, filterKeys[0], filterTypesArr, filterKeys[1], filterFacingArr, filterKeys[2],
    //         //         filterLightningsArr, filterKeys[3], filterCityName, filterKeys[4]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'type' && filterKeys[2] == 'facing' &&
    //         //     filterKeys[3] == 'lightning', filterKeys[4] == 'state') {
    //         //     this.filterBillboardDataWithFiveKey(filterCategoryName, filterKeys[0], filterTypesArr, filterKeys[1], filterFacingArr, filterKeys[2],
    //         //         filterLightningsArr, filterKeys[3], filterStateName, filterKeys[4]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'facing' && filterKeys[2] == 'lightning' &&
    //         //     filterKeys[3] == 'audianceType', filterKeys[4] == 'city') {
    //         //     this.filterBillboardDataWithFiveKey(filterCategoryName, filterKeys[0], filterFacingArr, filterKeys[1], filterLightningsArr, filterKeys[2],
    //         //         filterAudienceTypeArr, filterKeys[3], filterCityName, filterKeys[4]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'facing' && filterKeys[2] == 'lightning' &&
    //         //     filterKeys[3] == 'audianceType', filterKeys[4] == 'state') {
    //         //     this.filterBillboardDataWithFiveKey(filterCategoryName, filterKeys[0], filterFacingArr, filterKeys[1], filterLightningsArr, filterKeys[2],
    //         //         filterAudienceTypeArr, filterKeys[3], filterStateName, filterKeys[4]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'lightning' && filterKeys[2] == 'audianceType' &&
    //         //     filterKeys[3] == 'city', filterKeys[4] == 'state') {
    //         //     this.filterBillboardDataWithFiveKey(filterCategoryName, filterKeys[0], filterLightningsArr, filterKeys[1], filterAudienceTypeArr, filterKeys[2],
    //         //         filterCityName, filterKeys[3], filterStateName, filterKeys[4]);
    //         // }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'facing' && filterKeys[2] == 'lightning' &&
    //             filterKeys[3] == 'audianceType', filterKeys[4] == 'city') {
    //             this.filterBillboardDataWithFiveKey(filterTypesArr, filterKeys[0], filterFacingArr, filterKeys[1], filterLightningsArr, filterKeys[2],
    //                 filterAudienceTypeArr, filterKeys[3], filterCityName, filterKeys[4]);
    //         }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'facing' && filterKeys[2] == 'lightning' &&
    //             filterKeys[3] == 'audianceType', filterKeys[4] == 'state') {
    //             this.filterBillboardDataWithFiveKey(filterTypesArr, filterKeys[0], filterFacingArr, filterKeys[1], filterLightningsArr, filterKeys[2],
    //                 filterAudienceTypeArr, filterKeys[3], filterStateName, filterKeys[4]);
    //         }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'lightning' && filterKeys[2] == 'audianceType' &&
    //             filterKeys[3] == 'city', filterKeys[4] == 'state') {
    //             this.filterBillboardDataWithFiveKey(filterTypesArr, filterKeys[0], filterLightningsArr, filterKeys[1], filterAudienceTypeArr, filterKeys[2],
    //                 filterCityName, filterKeys[3], filterStateName, filterKeys[4]);
    //         }
    //         else if (filterKeys[0] == 'facing' && filterKeys[1] == 'lightning' && filterKeys[2] == 'audianceType' &&
    //             filterKeys[3] == 'city', filterKeys[4] == 'state') {
    //             this.filterBillboardDataWithFiveKey(filterFacingArr, filterKeys[0], filterLightningsArr, filterKeys[1], filterAudienceTypeArr, filterKeys[2],
    //                 filterCityName, filterKeys[3], filterStateName, filterKeys[4]);
    //         }
    //     }
    //     else if (filterKeys.length == 6) {
    //         // if (filterKeys[0] == 'status' && filterKeys[1] == 'category' && filterKeys[2] == 'type' && filterKeys[3] == 'facing' &&
    //         //     filterKeys[4] == 'lightning' && filterKeys[5] == 'audianceType') {
    //         //     this.filterBillboardDataWithSixKey(status, filterKeys[0], filterCategoryName, filterKeys[1], filterTypesArr, filterKeys[2],
    //         //         filterFacingArr, filterKeys[3], filterLightningsArr, filterKeys[4], filterAudienceTypeArr, filterKeys[5]);
    //         // }
    //         // else if (filterKeys[0] == 'status' && filterKeys[1] == 'category' && filterKeys[2] == 'type' && filterKeys[3] == 'facing' &&
    //         //     filterKeys[4] == 'lightning' && filterKeys[5] == 'city') {
    //         //     this.filterBillboardDataWithSixKey(status, filterKeys[0], filterCategoryName, filterKeys[1], filterTypesArr, filterKeys[2],
    //         //         filterFacingArr, filterKeys[3], filterLightningsArr, filterKeys[4], filterCityName, filterKeys[5]);
    //         // }
    //         // else if (filterKeys[0] == 'status' && filterKeys[1] == 'category' && filterKeys[2] == 'type' && filterKeys[3] == 'facing' &&
    //         //     filterKeys[4] == 'lightning' && filterKeys[5] == 'state') {
    //         //     this.filterBillboardDataWithSixKey(status, filterKeys[0], filterCategoryName, filterKeys[1], filterTypesArr, filterKeys[2],
    //         //         filterFacingArr, filterKeys[3], filterLightningsArr, filterKeys[4], filterStateName, filterKeys[5]);
    //         // }
    //         // else 
    //         if (filterKeys[0] == 'status' && filterKeys[1] == 'type' && filterKeys[2] == 'facing' && filterKeys[3] == 'lightning' &&
    //             filterKeys[4] == 'audianceType' && filterKeys[5] == 'city') {
    //             this.filterBillboardDataWithSixKey(status, filterKeys[0], filterTypesArr, filterKeys[1], filterFacingArr, filterKeys[2],
    //                 filterLightningsArr, filterKeys[3], filterAudienceTypeArr, filterKeys[4], filterCityName, filterKeys[5]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'type' && filterKeys[2] == 'facing' && filterKeys[3] == 'lightning' &&
    //             filterKeys[4] == 'audianceType' && filterKeys[5] == 'state') {
    //             this.filterBillboardDataWithSixKey(status, filterKeys[0], filterTypesArr, filterKeys[1], filterFacingArr, filterKeys[2],
    //                 filterLightningsArr, filterKeys[3], filterAudienceTypeArr, filterKeys[4], filterStateName, filterKeys[5]);
    //         }
    //         else if (filterKeys[0] == 'status' && filterKeys[1] == 'facing' && filterKeys[2] == 'lightning' && filterKeys[3] == 'audianceType' &&
    //             filterKeys[4] == 'city' && filterKeys[5] == 'state') {
    //             this.filterBillboardDataWithSixKey(status, filterKeys[0], filterFacingArr, filterKeys[1], filterLightningsArr, filterKeys[2],
    //                 filterAudienceTypeArr, filterKeys[3], filterCityName, filterKeys[4], filterStateName, filterKeys[5]);
    //         }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'type' && filterKeys[2] == 'facing' &&
    //         //     filterKeys[3] == 'lightning' && filterKeys[4] == 'audianceType' && filterKeys[5] == 'city') {
    //         //     this.filterBillboardDataWithSixKey(filterCategoryName, filterKeys[0], filterTypesArr, filterKeys[1],
    //         //         filterFacingArr, filterKeys[2], filterLightningsArr, filterKeys[3], filterAudienceTypeArr, filterKeys[4], filterCityName, filterKeys[5]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'type' && filterKeys[2] == 'facing' &&
    //         //     filterKeys[3] == 'lightning' && filterKeys[4] == 'audianceType' && filterKeys[5] == 'state') {
    //         //     this.filterBillboardDataWithSixKey(filterCategoryName, filterKeys[0], filterTypesArr, filterKeys[1],
    //         //         filterFacingArr, filterKeys[2], filterLightningsArr, filterKeys[3], filterAudienceTypeArr, filterKeys[4], filterStateName, filterKeys[5]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'facing' &&
    //         //     filterKeys[2] == 'lightning' && filterKeys[3] == 'audianceType' && filterKeys[4] == 'city' && filterKeys[5] == 'state') {
    //         //     this.filterBillboardDataWithSixKey(filterCategoryName, filterKeys[0],
    //         //         filterFacingArr, filterKeys[1], filterLightningsArr, filterKeys[2], filterAudienceTypeArr, filterKeys[3],
    //         //         filterCityName, filterKeys[4], filterStateName, filterKeys[5]);
    //         // }
    //         else if (filterKeys[0] == 'type' && filterKeys[1] == 'facing' &&
    //             filterKeys[2] == 'lightning' && filterKeys[3] == 'audianceType' && filterKeys[4] == 'city' && filterKeys[5] == 'state') {
    //             this.filterBillboardDataWithSixKey(filterTypesArr, filterKeys[0],
    //                 filterFacingArr, filterKeys[1], filterLightningsArr, filterKeys[2], filterAudienceTypeArr, filterKeys[3],
    //                 filterCityName, filterKeys[4], filterStateName, filterKeys[5]);
    //         }
    //     }
    //     else if (filterKeys.length == 7) {
    //         this.filterBillboardDataWithSevenKey(status, filterKeys[0], filterTypesArr, filterKeys[1],
    //             filterFacingArr, filterKeys[2], filterLightningsArr, filterKeys[3], filterAudienceTypeArr, filterKeys[4], filterCityName, filterKeys[5], filterStateName, filterKeys[6]);
    //         // if (filterKeys[0] == 'status' && filterKeys[1] == 'category' && filterKeys[2] == 'type' && filterKeys[3] == 'facing' &&
    //         //     filterKeys[4] == 'lightning' && filterKeys[5] == 'audianceType' && filterKeys[6] == 'city') {
    //         //     this.filterBillboardDataWithSevenKey(status, filterKeys[0], filterCategoryName, filterKeys[1], filterTypesArr, filterKeys[2],
    //         //         filterFacingArr, filterKeys[3], filterLightningsArr, filterKeys[4], filterAudienceTypeArr, filterKeys[5], filterCityName, filterKeys[6]);
    //         // }
    //         // else if (filterKeys[0] == 'status' && filterKeys[1] == 'category' && filterKeys[2] == 'type' && filterKeys[3] == 'facing' &&
    //         //     filterKeys[4] == 'lightning' && filterKeys[5] == 'audianceType' && filterKeys[6] == 'state') {
    //         //     this.filterBillboardDataWithSevenKey(status, filterKeys[0], filterCategoryName, filterKeys[1], filterTypesArr, filterKeys[2],
    //         //         filterFacingArr, filterKeys[3], filterLightningsArr, filterKeys[4], filterAudienceTypeArr, filterKeys[5], filterStateName, filterKeys[6]);
    //         // }
    //         // else if (filterKeys[0] == 'status' && filterKeys[1] == 'type' && filterKeys[2] == 'facing' && filterKeys[3] == 'lightning' &&
    //         //     filterKeys[4] == 'audianceType' && filterKeys[5] == 'city' && filterKeys[6] == 'state') {
    //         //     this.filterBillboardDataWithSevenKey(status, filterKeys[0], filterTypesArr, filterKeys[1], filterFacingArr, filterKeys[2],
    //         //         filterLightningsArr, filterKeys[3], filterAudienceTypeArr, filterKeys[4], filterCityName, filterKeys[5], filterStateName, filterKeys[6]);
    //         // }
    //         // else if (filterKeys[0] == 'status' && filterKeys[1] == 'category' && filterKeys[2] == 'facing' && filterKeys[3] == 'lightning' &&
    //         //     filterKeys[4] == 'audianceType' && filterKeys[5] == 'city' && filterKeys[6] == 'state') {
    //         //     this.filterBillboardDataWithSevenKey(status, filterKeys[0], filterCategoryName, filterKeys[1], filterFacingArr, filterKeys[2],
    //         //         filterLightningsArr, filterKeys[3], filterAudienceTypeArr, filterKeys[4], filterCityName, filterKeys[5], filterStateName, filterKeys[6]);
    //         // }
    //         // else if (filterKeys[0] == 'status' && filterKeys[1] == 'category' && filterKeys[2] == 'type' && filterKeys[3] == 'lightning' &&
    //         //     filterKeys[4] == 'audianceType' && filterKeys[5] == 'city' && filterKeys[6] == 'state') {
    //         //     this.filterBillboardDataWithSevenKey(status, filterKeys[0], filterCategoryName, filterKeys[1], filterTypesArr, filterKeys[2],
    //         //         filterLightningsArr, filterKeys[3], filterAudienceTypeArr, filterKeys[4], filterCityName, filterKeys[5], filterStateName, filterKeys[6]);
    //         // }
    //         // else if (filterKeys[0] == 'status' && filterKeys[1] == 'category' && filterKeys[2] == 'type' && filterKeys[3] == 'facing' &&
    //         //     filterKeys[4] == 'lightning' && filterKeys[5] == 'city' && filterKeys[6] == 'state') {
    //         //     this.filterBillboardDataWithSevenKey(status, filterKeys[0], filterCategoryName, filterKeys[1], filterTypesArr, filterKeys[2],
    //         //         filterFacingArr, filterKeys[3], filterLightningsArr, filterKeys[4], filterCityName, filterKeys[5], filterStateName, filterKeys[6]);
    //         // }
    //         // else if (filterKeys[0] == 'category' && filterKeys[1] == 'type' && filterKeys[2] == 'facing' && filterKeys[3] == 'lightning' &&
    //         //     filterKeys[4] == 'audianceType' && filterKeys[5] == 'city' && filterKeys[6] == 'state') {
    //         //     this.filterBillboardDataWithSevenKey(filterCategoryName, filterKeys[0], filterTypesArr, filterKeys[1], filterFacingArr, filterKeys[2],
    //         //         filterLightningsArr, filterKeys[3], filterAudienceTypeArr, filterKeys[4], filterCityName, filterKeys[5], filterStateName, filterKeys[6]);
    //         // }
    //     }
    //     // else if (filterKeys.length == 8) {
    //     //     this.filterBillboardDataWithEightKey(status, filterKeys[0], filterCategoryName, filterKeys[1], filterTypesArr, filterKeys[2],
    //     //         filterFacingArr, filterKeys[3], filterLightningsArr, filterKeys[4], filterAudienceTypeArr, filterKeys[5], filterCityName, filterKeys[6], filterStateName, filterKeys[7]);
    //     // }
    // }

    // filterBillboardDataWithOneKey = (values, filterKey) => {
    //     const { billboardData } = this.state;
    //     let filteredData = [];
    //     for (var i = 0; i < values.length; i++) {
    //         billboardData.map((elem, key) => {
    //             if (elem[filterKey].toLowerCase() == values[i].toLowerCase()) {
    //                 filteredData.push(elem)
    //             }
    //         })
    //     }
    //     this.setState({
    //         billboardFilterdData: filteredData
    //     })
    //     console.log(filteredData, 'filteredData')
    // }

    // filterBillboardDataWithTwoKey = (values1, filterKey1, values2, filterKey2) => {
    //     const { billboardData } = this.state;
    //     let arr1 = [];
    //     let filteredData = [];
    //     for (var i = 0; i < values1.length; i++) {
    //         billboardData.map((elem, key) => {
    //             if (elem[filterKey1].toLowerCase() == values1[i].toLowerCase()) {
    //                 arr1.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values2.length; i++) {
    //         arr1.map((elem, key) => {
    //             if (elem[filterKey2].toLowerCase() == values2[i].toLowerCase()) {
    //                 filteredData.push(elem)
    //             }
    //         })
    //     }
    //     this.setState({
    //         billboardFilterdData: filteredData
    //     })
    //     console.log(filteredData, 'filteredData')
    // }

    // filterBillboardDataWithThreeKey = (values1, filterKey1, values2, filterKey2, values3, filterKey3) => {
    //     const { billboardData } = this.state;
    //     let arr1 = [];
    //     let arr2 = [];
    //     let filteredData = [];
    //     for (var i = 0; i < values1.length; i++) {
    //         billboardData.map((elem, key) => {
    //             if (elem[filterKey1].toLowerCase() == values1[i].toLowerCase()) {
    //                 arr1.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values2.length; i++) {
    //         arr1.map((elem, key) => {
    //             if (elem[filterKey2].toLowerCase() == values2[i].toLowerCase()) {
    //                 arr2.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values3.length; i++) {
    //         arr2.map((elem, key) => {
    //             if (elem[filterKey3].toLowerCase() == values3[i].toLowerCase()) {
    //                 filteredData.push(elem)
    //             }
    //         })
    //     }
    //     this.setState({
    //         billboardFilterdData: filteredData
    //     })
    //     console.log(filteredData, 'filteredData')
    // }


    // filterBillboardDataWithFourKey = (values1, filterKey1, values2, filterKey2, values3, filterKey3, values4, filterKey4) => {
    //     const { billboardData } = this.state;
    //     let arr1 = [];
    //     let arr2 = [];
    //     let arr3 = [];
    //     let filteredData = [];
    //     for (var i = 0; i < values1.length; i++) {
    //         billboardData.map((elem, key) => {
    //             if (elem[filterKey1].toLowerCase() == values1[i].toLowerCase()) {
    //                 arr1.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values2.length; i++) {
    //         arr1.map((elem, key) => {
    //             if (elem[filterKey2].toLowerCase() == values2[i].toLowerCase()) {
    //                 arr2.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values3.length; i++) {
    //         arr2.map((elem, key) => {
    //             if (elem[filterKey3].toLowerCase() == values3[i].toLowerCase()) {
    //                 arr3.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values4.length; i++) {
    //         arr3.map((elem, key) => {
    //             if (elem[filterKey4].toLowerCase() == values4[i].toLowerCase()) {
    //                 filteredData.push(elem)
    //             }
    //         })
    //     }
    //     this.setState({
    //         billboardFilterdData: filteredData
    //     })
    //     console.log(filteredData, 'filteredData')
    // }

    // filterBillboardDataWithFiveKey = (values1, filterKey1, values2, filterKey2, values3, filterKey3, values4, filterKey4, values5, filterKey5) => {
    //     const { billboardData } = this.state;
    //     let arr1 = [];
    //     let arr2 = [];
    //     let arr3 = [];
    //     let arr4 = [];
    //     let filteredData = [];
    //     for (var i = 0; i < values1.length; i++) {
    //         billboardData.map((elem, key) => {
    //             if (elem[filterKey1].toLowerCase() == values1[i].toLowerCase()) {
    //                 arr1.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values2.length; i++) {
    //         arr1.map((elem, key) => {
    //             if (elem[filterKey2].toLowerCase() == values2[i].toLowerCase()) {
    //                 arr2.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values3.length; i++) {
    //         arr2.map((elem, key) => {
    //             if (elem[filterKey3].toLowerCase() == values3[i].toLowerCase()) {
    //                 arr3.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values4.length; i++) {
    //         arr3.map((elem, key) => {
    //             if (elem[filterKey4].toLowerCase() == values4[i].toLowerCase()) {
    //                 arr4.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values5.length; i++) {
    //         arr4.map((elem, key) => {
    //             if (elem[filterKey5].toLowerCase() == values5[i].toLowerCase()) {
    //                 filteredData.push(elem)
    //             }
    //         })
    //     }
    //     this.setState({
    //         billboardFilterdData: filteredData
    //     })
    //     console.log(filteredData, 'filteredData')
    // }

    // filterBillboardDataWithSixKey = (values1, filterKey1, values2, filterKey2, values3, filterKey3, values4, filterKey4, values5, filterKey5, values6, filterKey6) => {
    //     const { billboardData } = this.state;
    //     let arr1 = [];
    //     let arr2 = [];
    //     let arr3 = [];
    //     let arr4 = [];
    //     let arr5 = [];
    //     let filteredData = [];
    //     for (var i = 0; i < values1.length; i++) {
    //         billboardData.map((elem, key) => {
    //             if (elem[filterKey1].toLowerCase() == values1[i].toLowerCase()) {
    //                 arr1.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values2.length; i++) {
    //         arr1.map((elem, key) => {
    //             if (elem[filterKey2].toLowerCase() == values2[i].toLowerCase()) {
    //                 arr2.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values3.length; i++) {
    //         arr2.map((elem, key) => {
    //             if (elem[filterKey3].toLowerCase() == values3[i].toLowerCase()) {
    //                 arr3.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values4.length; i++) {
    //         arr3.map((elem, key) => {
    //             if (elem[filterKey4].toLowerCase() == values4[i].toLowerCase()) {
    //                 arr4.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values5.length; i++) {
    //         arr4.map((elem, key) => {
    //             if (elem[filterKey5].toLowerCase() == values5[i].toLowerCase()) {
    //                 arr5.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values6.length; i++) {
    //         arr5.map((elem, key) => {
    //             if (elem[filterKey6].toLowerCase() == values6[i].toLowerCase()) {
    //                 filteredData.push(elem)
    //             }
    //         })
    //     }
    //     this.setState({
    //         billboardFilterdData: filteredData
    //     })
    //     console.log(filteredData, 'filteredData')
    // }
    // filterBillboardDataWithSevenKey = (values1, filterKey1, values2, filterKey2, values3, filterKey3, values4, filterKey4, values5, filterKey5, values6, filterKey6, values7, filterKey7) => {
    //     const { billboardData } = this.state;
    //     let arr1 = [];
    //     let arr2 = [];
    //     let arr3 = [];
    //     let arr4 = [];
    //     let arr5 = [];
    //     let arr6 = [];
    //     let filteredData = [];
    //     for (var i = 0; i < values1.length; i++) {
    //         billboardData.map((elem, key) => {
    //             if (elem[filterKey1].toLowerCase() == values1[i].toLowerCase()) {
    //                 arr1.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values2.length; i++) {
    //         arr1.map((elem, key) => {
    //             if (elem[filterKey2].toLowerCase() == values2[i].toLowerCase()) {
    //                 arr2.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values3.length; i++) {
    //         arr2.map((elem, key) => {
    //             if (elem[filterKey3].toLowerCase() == values3[i].toLowerCase()) {
    //                 arr3.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values4.length; i++) {
    //         arr3.map((elem, key) => {
    //             if (elem[filterKey4].toLowerCase() == values4[i].toLowerCase()) {
    //                 arr4.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values5.length; i++) {
    //         arr4.map((elem, key) => {
    //             if (elem[filterKey5].toLowerCase() == values5[i].toLowerCase()) {
    //                 arr5.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values6.length; i++) {
    //         arr5.map((elem, key) => {
    //             if (elem[filterKey6].toLowerCase() == values6[i].toLowerCase()) {
    //                 arr6.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values7.length; i++) {
    //         arr6.map((elem, key) => {
    //             if (elem[filterKey7].toLowerCase() == values7[i].toLowerCase()) {
    //                 filteredData.push(elem)
    //             }
    //         })
    //     }
    //     this.setState({
    //         billboardFilterdData: filteredData
    //     })
    //     console.log(filteredData, 'filteredData')
    // }

    // filterBillboardDataWithEightKey = (values1, filterKey1, values2, filterKey2, values3, filterKey3, values4, filterKey4, values5, filterKey5, values6, filterKey6, values7, filterKey7, values8, filterKey8) => {
    //     const { billboardData } = this.state;
    //     let arr1 = [];
    //     let arr2 = [];
    //     let arr3 = [];
    //     let arr4 = [];
    //     let arr5 = [];
    //     let arr6 = [];
    //     let arr7 = [];
    //     let filteredData = [];
    //     for (var i = 0; i < values1.length; i++) {
    //         billboardData.map((elem, key) => {
    //             if (elem[filterKey1].toLowerCase() == values1[i].toLowerCase()) {
    //                 arr1.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values2.length; i++) {
    //         arr1.map((elem, key) => {
    //             if (elem[filterKey2].toLowerCase() == values2[i].toLowerCase()) {
    //                 arr2.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values3.length; i++) {
    //         arr2.map((elem, key) => {
    //             if (elem[filterKey3].toLowerCase() == values3[i].toLowerCase()) {
    //                 arr3.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values4.length; i++) {
    //         arr3.map((elem, key) => {
    //             if (elem[filterKey4].toLowerCase() == values4[i].toLowerCase()) {
    //                 arr4.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values5.length; i++) {
    //         arr4.map((elem, key) => {
    //             if (elem[filterKey5].toLowerCase() == values5[i].toLowerCase()) {
    //                 arr5.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values6.length; i++) {
    //         arr5.map((elem, key) => {
    //             if (elem[filterKey6].toLowerCase() == values6[i].toLowerCase()) {
    //                 arr6.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values7.length; i++) {
    //         arr6.map((elem, key) => {
    //             if (elem[filterKey7].toLowerCase() == values7[i].toLowerCase()) {
    //                 arr7.push(elem)
    //             }
    //         })
    //     }
    //     for (var i = 0; i < values8.length; i++) {
    //         arr7.map((elem, key) => {
    //             if (elem[filterKey8].toLowerCase() == values8[i].toLowerCase()) {
    //                 filteredData.push(elem)
    //             }
    //         })
    //     }
    //     this.setState({
    //         billboardFilterdData: filteredData
    //     })
    //     console.log(filteredData, 'filteredData')
    // }

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
            this.setState({
                billboardFilterdData: rangeValues,
                minValue: '',
                maxValue: ''
            })
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
            this.setState({
                billboardFilterdData: rangeValues,
                minValue: '',
                maxValue: ''
            })
        }
        console.log(rangeValues, 'rangeValues')
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
        const { billboardData, billboardFilterdData, cities, states, i, category } = this.state;

        let flexxData = billboardData.slice(0, i + 9);
        let filterPoint = billboardFilterdData.slice(0, i + 9);
        const billboardRendring = (
            <div>
                {/* rendering the filtered billboard data on front end */}
                <div className='row '>
                    {filterPoint.length !== 0 ? filterPoint && filterPoint.map((elem, key) => {
                        return (
                            <div className='col-xl-3 col-lg-3 col-md-4 col-10 activeClass efect'>
                                <Link to={{ pathname: `/billborad_Militry`, state: elem }}>
                                    <img src={elem.images[0]} className='imgBillBoard im_efect' alt={key} /></Link>
                                <div className="div_efect">
                                    <div className="text_efect">
                                        <Link to={{ pathname: `/billborad_Militry`, state: elem }}>
                                            <p><a href="" className="crdtxt1">{elem.companyName}</a></p>
                                            <p><a href="" className="crdtxt1">{elem.city}</a></p></Link>
                                    </div>
                                </div>

                                <div id="more_efect1" className="card">
                                    <div id="more_efect card-body slow">
                                        <p className="crdtxt2">{elem.companyName}</p>
                                        <p className="crdtxt2">{elem.city}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                        :
                        flexxData && flexxData.map((elem, key) => {
                            return (
                                <div className='col-xl-3 col-lg-3 col-md-4 col-10 activeClass efect animated animatedFadeInUp fadeInUp'>
                                    <Link to={{ pathname: `/billborad_Militry`, state: elem }}>
                                        <img src={elem.images[0]} className='imgBillBoard im_efect' alt={key} /></Link>
                                    <div className="div_efect">
                                        <div className="text_efect">
                                            <Link to={{ pathname: `/billborad_Militry`, state: elem }}>
                                                <p><a href="" className="crdtxt1">{elem.companyName}</a></p>
                                                <p><a href="" className="crdtxt1">{elem.city}</a></p></Link>
                                        </div>
                                    </div>

                                    <div id="more_efect1" className="card">
                                        <div className="more_efect card-body slow">
                                            <p className="crdtxt">{elem.companyName}</p>
                                            <p className="crdtxt">{elem.city}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                </div>
            </div>
        );
        return (
            <div className="container">
                <div className='row billboard animated animatedFadeInUp fadeInUp'>
                    <div className='col-xl-3 col-lg-3 col-md-4 d-none d-sm-block'>Filters</div>
                    {this.state.headingValue != '' ?
                        <div className='col-xl-8 col-lg-8 col-md-8 d-none d-sm-block'>{this.state.headingValue}</div>
                        :
                        <div className='col-xl-8 col-lg-8 col-md-8 d-none d-sm-block'>BillBoards</div>
                    }
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
                {filterCityName && filterStateName.length > 0 ?
                    <div>
                        <li>{filterStateName[0]}<span class="close"
                            onClick={this.removeValue.bind(this, 'state')}
                        >x</span></li>
                    </div> : null}
                <div className='row filter animated animatedFadeInUp fadeInUp'>
                    <div className='col-xl-3 col-lg-3 col-md-4 d-none d-sm-block pnl'>
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

                        <CheckboxGroup
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

                        <CheckboxGroup
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

                        <CheckboxGroup
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

                        <CheckboxGroup
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

                        <div className='col-md-11 dropdown'>
                            <div className='filterDivs'>Cities</div>
                            <Row className="fasla1" >
                                <Col>
                                    <Select
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

                                        type="Number"
                                        placeholder="Max"
                                        className="marketFilter_Input"
                                    />

                                </div>
                                <div className="col-12 col-md-2 col-lg-2 col-xl-2">
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

                                        type="Number"
                                        placeholder="Min"
                                        className="marketFilter_Input"
                                    />

                                </div>
                                <div className="col-12 col-md-4 col-lg-4 col-xl-4">

                                    <input
                                        onChange={this.onChangeMax}

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

                                        type="Number"
                                        placeholder="Min"
                                        className="marketFilter_Input"
                                    />

                                </div>
                                <div className="col-12 col-md-4 col-lg-4 col-xl-4">

                                    <input
                                        onChange={this.onChangeMax}

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

                                        type="Number"
                                        placeholder="Min"
                                        className="marketFilter_Input"
                                    />

                                </div>
                                <div className="col-12 col-md-4 col-lg-4 col-xl-4">

                                    <input
                                        onChange={this.onChangeMax}

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

                                        type="Number"
                                        placeholder="Min"
                                        className="marketFilter_Input"
                                    />

                                </div>
                                <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                                    <input
                                        onChange={this.onChangeMax}

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
                                <div id="collapseOne" className="collapse show" data-parent="#accordion">
                                    <div className="card-body">
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
                                        <CheckboxGroup
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

                                        <CheckboxGroup
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

                                        <CheckboxGroup
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

                                        <CheckboxGroup
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
                                        <div className='col-md-11 dropdown'>
                                            <div className='filterDivs'>Cities</div>
                                            <Row className="fasla1" >
                                                <Col>
                                                    <Select
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
                                                        onChange={this.handleChange.bind(this, 'state')}
                                                        options={states}
                                                    >
                                                    </Select>
                                                </Col>
                                            </Row>

                                        </div>

                                        orm>
                            <div className='filterDivs'>Pricing</div>
                                        <div className="row fasla1">
                                            <div className="col-12 col-md-8 col-lg-8 col-xl-8">

                                                <input
                                                    onChange={this.onChangeMin}
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

                                                    type="Number"
                                                    placeholder="Max"
                                                    className="marketFilter_Input"
                                                />

                                            </div>
                                            <div className="col-12 col-md-2 col-lg-2 col-xl-2">
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

                                                    type="Number"
                                                    placeholder="Min"
                                                    className="marketFilter_Input"
                                                />

                                            </div>
                                            <div className="col-12 col-md-4 col-lg-4 col-xl-4">

                                                <input
                                                    onChange={this.onChangeMax}

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

                                                    type="Number"
                                                    placeholder="Min"
                                                    className="marketFilter_Input"
                                                />

                                            </div>
                                            <div className="col-12 col-md-4 col-lg-4 col-xl-4">

                                                <input
                                                    onChange={this.onChangeMax}

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

                                                    type="Number"
                                                    placeholder="Min"
                                                    className="marketFilter_Input"
                                                />

                                            </div>
                                            <div className="col-12 col-md-4 col-lg-4 col-xl-4">

                                                <input
                                                    onChange={this.onChangeMax}

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

                                                    type="Number"
                                                    placeholder="Min"
                                                    className="marketFilter_Input"
                                                />

                                            </div>
                                            <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                                                <input
                                                    onChange={this.onChangeMax}

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



                                    </div>
                                </div>
                            </div>
                            <br />
                        </div>
                    </div>
                    <div className='col-xl-9 col-lg-9 col-md-8'>
                        <div className='col-12 d-block d-sm-none' style={{ fontSize: '30px' }}>Billboards</div>
                        {billboardRendring}
                        <div className="d-flex justify-content-center">
                            <button type="button" className="btn btn-primary btn-sm" onClick={this.onFlipData}>
                                Load more
                        </button>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}
const WrappedDynamicFieldSet = Form.create()(Market);
export default WrappedDynamicFieldSet;