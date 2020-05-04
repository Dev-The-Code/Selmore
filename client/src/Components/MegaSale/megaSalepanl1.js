import React, { Component } from 'react';
import './megaSale.scss';
import { Redirect } from 'react-router-dom';
import { HttpUtils } from '../../Services/HttpUtils';
import {
	Checkbox, Row, Col, Radio, Spin, Icon
} from 'antd';
import moment from 'moment';
import Select from 'react-select';

const CheckboxGroup = Checkbox.Group;

let status = [];
let filterTypesArr = [];
let filterFacingArr = [];
let filterLightningsArr = [];
let filterAudienceTypeArr = [];
let filterCityName = [];
let filterStateName = [];

class MegaSalepanel1 extends Component {
	constructor(props) {
		super(props);
		this.state = {

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
			cities: [],
			states: [],
			megaSaleBiilboards: [],
			days: undefined,
			hours: undefined,
			minutes: undefined,
			seconds: undefined,
			goForDetail: false,
			billboardData: '',
			megaSaleId: '',

			statusValue: '',
			typesOfBillboard: [],
			facingOfBillboard: [],
			lightningOfBillboard: [],
			audienceTypeOfBillboard: [],
			filteredData: [],
			notFoundFilterData: false,
			showRecord: true,
			cityValue: '',
			stateValue: '',
			i: 0
		}
	}


	componentWillUpdate() {
		const { i } = this.state;
		let dataForFilter = this.props.filterData;

		if (dataForFilter && i == 0) {
			filterCityName = dataForFilter.city;
			filterStateName = dataForFilter.state;
			let cityDropValue = {
				label: dataForFilter.city[0],
				value: dataForFilter.city[0]
			}
			let stateDropValue = {
				label: dataForFilter.state[0],
				value: dataForFilter.state[0]
			}
			this.setState({
				cityValue: cityDropValue,
				stateValue: stateDropValue,
				i: 1
			})
			this.filterKeysGet()
		}
	}

	componentWillMount() {
		this.megaSalebillBoardData();
		this.getCitiesAndStates();
	}

	componentWillUnmount() {
		if (this.interval) {
			clearInterval(this.interval);
		}

	}

	getCitiesAndStates = () => {
		const { citiesArr, statesArr } = this.state;

		let city = citiesArr.map((elem, i) => {
			return { label: elem, value: elem, id: i }
		})
		let state = statesArr.map((elem, i) => {
			return { label: elem, value: elem, id: i }
		})
		this.setState({
			cities: city,
			states: state
		})
	}

	megaSalebillBoardData = async () => {
		let response = await HttpUtils.get('getallmegabillboard');

		let MegaSaleBillboards = [];
		if (response.code == 200) {
			this.interval = setInterval(() => {
				let data = response.content;
				data.map((elem, key) => {
					let elemObj = elem;
					let timeTillDateStart = `${`${elemObj.saleEndDate}, ${elemObj.saleEndTime}`}`;
					const now = moment();
					const then = moment(timeTillDateStart);
					var totalSec = then.diff(now, 'seconds');
					var hours = parseInt(totalSec / 3600);
					var minutes = parseInt(totalSec / 60) % 60;
					var seconds = totalSec % 60;
					if (hours <= 0 && minutes <= 0 && seconds <= 0) {
						this.removedData(elem._id)
					}
					var calculateTime = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
					elemObj.calculateTime = calculateTime;
					MegaSaleBillboards.push(elemObj)
				})
				this.setState({
					megaSaleBiilboards: MegaSaleBillboards
				})
				MegaSaleBillboards = [];


			}, 1000);

		}



	}

	removedData = async (objectId) => {
		let booked = {
			objectId: objectId
		}
		let response = await HttpUtils.post('megaSaleDelete', booked);

		if (response) {
			if (response.code == 200) {
				window.location.reload(true);
			}
		}

	}

	billboardData = async (data) => {
		let obj = {
			id: data.billboardId
		}
		let response = await HttpUtils.post('getspecificbillboard', obj);
		let dataOfBillboard = {
			megasaleDetail: data,
			bilboardDetail: response.content[0]
		}
		if (response.code == 200) {
			this.setState({
				billboardData: dataOfBillboard,
				goForDetail: true,
				megaSaleId: data._id
			})

		}

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
		if (dropDownParam == 'city') {
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
		else if (param == 'type') {
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
		if (status.length == 0 && filterCityName.length == 0 && filterStateName.length == 0 && filterTypesArr.length == 0
			&& filterFacingArr.length == 0 && filterLightningsArr.length == 0 && filterAudienceTypeArr.length == 0) {
			this.setState({
				showRecord: true,
				notFoundFilterData: false,
				filteredData: [],
			})
		}
		else {
			this.filterKeysGet();
		}
	}

	showAllRooms = () => {
		status = [];
		filterTypesArr = [];
		filterFacingArr = [];
		filterLightningsArr = [];
		filterAudienceTypeArr = [];
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
		const { megaSaleBiilboards } = this.state;
		let data;
		for (var i = 0; i < filterKeys.length; i++) {
			if (filterKeys[i] == 'status') {
				data = megaSaleBiilboards.filter((elem) => {
					return elem.billboardStatus && status.includes(elem.billboardStatus)
				})
			}
			else if (filterKeys[i] == 'type') {
				data = megaSaleBiilboards.filter((elem) => {
					return elem.billboardType && filterTypesArr.includes(elem.billboardType)
				})
			}
			else if (filterKeys[i] == 'facing') {
				data = megaSaleBiilboards.filter((elem) => {
					return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
				})
			}
			else if (filterKeys[i] == 'lightning') {
				data = megaSaleBiilboards.filter((elem) => {
					return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
				})
			}
			else if (filterKeys[i] == 'audianceType') {
				data = megaSaleBiilboards.filter((elem) => {
					return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
				})
			}
			else if (filterKeys[i] == 'city') {
				data = megaSaleBiilboards.filter((elem) => {
					return elem.billboardCity && filterCityName.includes(elem.billboardCity)
				})
			}
			else if (filterKeys[i] == 'state') {
				data = megaSaleBiilboards.filter((elem) => {
					return elem.billboardState && filterStateName.includes(elem.billboardState)
				})
			}
		}
		if (data.length == 0) {
			this.setState({
				notFoundFilterData: true,
				filteredData: data,
				showRecord: false
			})
		}
		else {
			this.setState({
				notFoundFilterData: false,
				filteredData: data,
				showRecord: false
			})
		}

	}

	filterBillboardDataWithTwoKeys = (filterKeys) => {
		const { megaSaleBiilboards } = this.state;
		let data1;
		let filteredData;

		for (var i = 0; i < filterKeys.length; i++) {
			if (i == 0) {
				if (filterKeys[i] == 'status') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
			if (i == 1) {
				if (filterKeys[i] == 'status') {
					filteredData = data1.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					filteredData = data1.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					filteredData = data1.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					filteredData = data1.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					filteredData = data1.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					filteredData = data1.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					filteredData = data1.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
		}
		if (filteredData.length == 0) {
			this.setState({
				notFoundFilterData: true,
				filteredData: filteredData,
				showRecord: false
			})
		}
		else {
			this.setState({
				notFoundFilterData: false,
				filteredData: filteredData,
				showRecord: false

			})
		}
	}

	filterBillboardDataWithThreeKeys = (filterKeys) => {
		const { megaSaleBiilboards } = this.state;
		let data1;
		let data2
		let filteredData;

		for (var i = 0; i < filterKeys.length; i++) {
			if (i == 0) {
				if (filterKeys[i] == 'status') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
			if (i == 1) {
				if (filterKeys[i] == 'status') {
					data2 = data1.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					data2 = data1.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					data2 = data1.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					data2 = data1.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					data2 = data1.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					data2 = data1.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					data2 = data1.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
			if (i == 2) {
				if (filterKeys[i] == 'status') {
					filteredData = data2.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					filteredData = data2.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					filteredData = data2.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					filteredData = data2.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					filteredData = data2.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					filteredData = data2.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					filteredData = data2.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
		}

		if (filteredData.length == 0) {
			this.setState({
				notFoundFilterData: true,
				filteredData: filteredData,
				showRecord: false
			})
		}
		else {
			this.setState({
				notFoundFilterData: false,
				filteredData: filteredData,
				showRecord: false

			})
		}

	}

	filterBillboardDataWithFourKeys = (filterKeys) => {
		const { megaSaleBiilboards } = this.state;
		let data1;
		let data2;
		let data3;
		let filteredData;

		for (var i = 0; i < filterKeys.length; i++) {
			if (i == 0) {
				if (filterKeys[i] == 'status') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
			if (i == 1) {
				if (filterKeys[i] == 'status') {
					data2 = data1.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					data2 = data1.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					data2 = data1.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					data2 = data1.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					data2 = data1.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					data2 = data1.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					data2 = data1.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
			if (i == 2) {
				if (filterKeys[i] == 'status') {
					data3 = data2.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					data3 = data2.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					data3 = data2.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					data3 = data2.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					data3 = data2.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					data3 = data2.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					data3 = data2.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
			if (i == 3) {
				if (filterKeys[i] == 'status') {
					filteredData = data3.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					filteredData = data3.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					filteredData = data3.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					filteredData = data3.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					filteredData = data3.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					filteredData = data3.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					filteredData = data3.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
		}

		if (filteredData.length == 0) {
			this.setState({
				notFoundFilterData: true,
				filteredData: filteredData,
				showRecord: false
			})
		}
		else {
			this.setState({
				notFoundFilterData: false,
				filteredData: filteredData,
				showRecord: false

			})
		}

	}

	filterBillboardDataWithFiveKeys = (filterKeys) => {
		const { megaSaleBiilboards } = this.state;
		let data1;
		let data2;
		let data3;
		let data4;
		let filteredData;

		for (var i = 0; i < filterKeys.length; i++) {
			if (i == 0) {
				if (filterKeys[i] == 'status') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
			if (i == 1) {
				if (filterKeys[i] == 'status') {
					data2 = data1.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					data2 = data1.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					data2 = data1.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					data2 = data1.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					data2 = data1.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					data2 = data1.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					data2 = data1.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
			if (i == 2) {
				if (filterKeys[i] == 'status') {
					data3 = data2.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					data3 = data2.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					data3 = data2.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					data3 = data2.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					data3 = data2.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					data3 = data2.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					data3 = data2.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
			if (i == 3) {
				if (filterKeys[i] == 'status') {
					data4 = data3.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					data4 = data3.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					data4 = data3.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					data4 = data3.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					data4 = data3.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					data4 = data3.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					data4 = data3.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
			if (i == 4) {
				if (filterKeys[i] == 'status') {
					filteredData = data3.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					filteredData = data4.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					filteredData = data4.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					filteredData = data4.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					filteredData = data4.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					filteredData = data4.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					filteredData = data4.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
		}

		if (filteredData.length == 0) {
			this.setState({
				notFoundFilterData: true,
				filteredData: filteredData,
				showRecord: false
			})
		}
		else {
			this.setState({
				notFoundFilterData: false,
				filteredData: filteredData,
				showRecord: false

			})
		}

	}


	filterBillboardDataWithSixKeys = (filterKeys) => {
		const { megaSaleBiilboards } = this.state;
		let data1;
		let data2;
		let data3;
		let data4;
		let data5;
		let filteredData;

		for (var i = 0; i < filterKeys.length; i++) {
			if (i == 0) {
				if (filterKeys[i] == 'status') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
			if (i == 1) {
				if (filterKeys[i] == 'status') {
					data2 = data1.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					data2 = data1.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					data2 = data1.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					data2 = data1.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					data2 = data1.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					data2 = data1.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					data2 = data1.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
			if (i == 2) {
				if (filterKeys[i] == 'status') {
					data3 = data2.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					data3 = data2.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					data3 = data2.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					data3 = data2.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					data3 = data2.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					data3 = data2.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					data3 = data2.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
			if (i == 3) {
				if (filterKeys[i] == 'status') {
					data4 = data3.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					data4 = data3.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					data4 = data3.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					data4 = data3.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					data4 = data3.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					data4 = data3.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					data4 = data3.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
			if (i == 4) {
				if (filterKeys[i] == 'status') {
					data5 = data3.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					data5 = data4.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					data5 = data4.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					data5 = data4.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					data5 = data4.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					data5 = data4.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					data5 = data4.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
			if (i == 5) {
				if (filterKeys[i] == 'status') {
					filteredData = data3.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					filteredData = data5.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					filteredData = data5.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					filteredData = data5.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					filteredData = data5.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					filteredData = data5.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					filteredData = data5.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
		}

		if (filteredData.length == 0) {
			this.setState({
				notFoundFilterData: true,
				filteredData: filteredData,
				showRecord: false
			})
		}
		else {
			this.setState({
				notFoundFilterData: false,
				filteredData: filteredData,
				showRecord: false

			})
		}

	}


	filterBillboardDataWithSevenKeys = (filterKeys) => {
		const { megaSaleBiilboards } = this.state;
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
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					data1 = megaSaleBiilboards.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
			if (i == 1) {
				if (filterKeys[i] == 'status') {
					data2 = data1.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					data2 = data1.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					data2 = data1.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					data2 = data1.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					data2 = data1.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					data2 = data1.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					data2 = data1.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
			if (i == 2) {
				if (filterKeys[i] == 'status') {
					data3 = data2.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					data3 = data2.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					data3 = data2.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					data3 = data2.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					data3 = data2.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					data3 = data2.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					data3 = data2.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
			if (i == 3) {
				if (filterKeys[i] == 'status') {
					data4 = data3.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					data4 = data3.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					data4 = data3.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					data4 = data3.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					data4 = data3.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					data4 = data3.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					data4 = data3.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
			if (i == 4) {
				if (filterKeys[i] == 'status') {
					data5 = data3.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					data5 = data4.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					data5 = data4.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					data5 = data4.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					data5 = data4.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					data5 = data4.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					data5 = data4.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
			if (i == 5) {
				if (filterKeys[i] == 'status') {
					data6 = data3.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					data6 = data5.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					data6 = data5.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					data6 = data5.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					data6 = data5.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					data6 = data5.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					data6 = data5.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
			if (i == 6) {
				if (filterKeys[i] == 'status') {
					filteredData = data3.filter((elem) => {
						return elem.billboardStatus && status.includes(elem.billboardStatus)
					})
				}
				else if (filterKeys[i] == 'type') {
					filteredData = data6.filter((elem) => {
						return elem.billboardType && filterTypesArr.includes(elem.billboardType)
					})
				}
				else if (filterKeys[i] == 'facing') {
					filteredData = data6.filter((elem) => {
						return elem.billboardFacing && filterFacingArr.includes(elem.billboardFacing)
					})
				}
				else if (filterKeys[i] == 'lightning') {
					filteredData = data6.filter((elem) => {
						return elem.billboardLighting && filterLightningsArr.includes(elem.billboardLighting)
					})
				}
				else if (filterKeys[i] == 'audianceType') {
					filteredData = data6.filter((elem) => {
						return elem.billboardAudienceType && filterAudienceTypeArr.includes(elem.billboardAudienceType)
					})
				}
				else if (filterKeys[i] == 'city') {
					filteredData = data6.filter((elem) => {
						return elem.billboardCity && filterCityName.includes(elem.billboardCity)
					})
				}
				else if (filterKeys[i] == 'state') {
					filteredData = data6.filter((elem) => {
						return elem.billboardState && filterStateName.includes(elem.billboardState)
					})
				}
			}
		}

		if (filteredData.length == 0) {
			this.setState({
				notFoundFilterData: true,
				filteredData: filteredData,
				showRecord: false
			})
		}
		else {
			this.setState({
				notFoundFilterData: false,
				filteredData: filteredData,
				showRecord: false

			})
		}

	}


	render() {
		const { megaSaleBiilboards, goForDetail, megaSaleId, billboardData, statusValue, typesOfBillboard,
			facingOfBillboard, lightningOfBillboard, audienceTypeOfBillboard, cities, states, notFoundFilterData, filteredData, showRecord,
			cityValue, stateValue } = this.state;
		if (goForDetail) {
			return (
				<Redirect to={{ pathname: `/megaDetail/${megaSaleId}`, state: billboardData }} />
			)
		}
		const antIcon =
			<Icon type="loading" style={{ fontSize: '110px' }} spin />;
		return (
			<div>
				<div className="row">
					<div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3"></div>
					{status && status.length > 0 && <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
						{status.map((elem, key) => {
							return (
								<div className="cross-card">
									<li>{elem}<span class="close crossBtnExlpre"
										onClick={this.removeValue.bind(this, 'status', elem)}
									>x</span></li>
								</div>)
						})}
					</div>}
					{typesOfBillboard && typesOfBillboard.length > 0 && <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
						{typesOfBillboard.map((elem, key) => {
							return (
								<div className="cross-card">
									<li>{elem}<span class="close crossBtnExlpre"
										onClick={this.removeValue.bind(this, 'type', elem)}
									>x</span></li>
								</div>)
						})}
					</div>}
					{facingOfBillboard && facingOfBillboard.length > 0 && <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
						{facingOfBillboard.map((elem, key) => {
							return (
								<div className="cross-card">
									<li>{elem}<span class="close crossBtnExlpre"
										onClick={this.removeValue.bind(this, 'facing', elem)}
									>x</span></li>
								</div>)
						})}
					</div>}
					{lightningOfBillboard && lightningOfBillboard.length > 0 && <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
						{lightningOfBillboard.map((elem, key) => {
							return (
								<div className="cross-card">
									<li>{elem}<span class="close crossBtnExlpre"
										onClick={this.removeValue.bind(this, 'lightning', elem)}
									>x</span></li>
								</div>)
						})}
					</div>}
					{audienceTypeOfBillboard && audienceTypeOfBillboard.length > 0 && <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
						{audienceTypeOfBillboard.map((elem, key) => {
							return (
								<div className="cross-card">
									<li>{elem}<span class="close crossBtnExlpre"
										onClick={this.removeValue.bind(this, 'audienceType', elem)}
									>x</span></li>
								</div>)
						})}
					</div>}
					{filterCityName && filterCityName.length > 0 && <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
						{filterCityName.map((elem, key) => {
							return (
								<div className="cross-card">
									<li>{elem}<span class="close crossBtnExlpre"
										onClick={this.removeValue.bind(this, 'city', elem)}
									>x</span></li>
								</div>)
						})}
					</div>}
					{filterStateName && filterStateName.length > 0 && <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
						{filterStateName.map((elem, key) => {
							return (
								<div className="cross-card">
									<li>{elem}<span class="close crossBtnExlpre"
										onClick={this.removeValue.bind(this, 'state', elem)}
									>x</span></li>
								</div>)
						})}
					</div>}


				</div>
				<div className="row">
					<div className="col-12 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
					<div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
						<div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 d-none d-sm-block'>
							<h3 className="filterTextHead">Filteration</h3>
							<Radio.Group onChange={this.onChange} value={statusValue}>
								<div className='filterDivs'>Status</div>
								<Row>
									<Col >
										<Radio className="fasla" value="Available" className="radioText">&nbsp;Available</Radio>
									</Col>
									<Col >
										<Radio className="fasla" value="No Available" className="radioText">&nbsp;No Available</Radio>
									</Col>
								</Row>
							</Radio.Group>
							<div className="row">
								<div className="col-md-11">
									<CheckboxGroup
										onChange={this.onChangeCheckBoxes.bind(this, 'type')}
										value={typesOfBillboard}
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
						</div>
						<div className="col-12 d-block d-sm-none">
							<div id="accordion">
								<div className="card">
									<div className="card-header">
										<a className="card-link" data-toggle="collapse" href="#collapseOne" style={{ color: '#007bff' }}>
											<h3>Filters<img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1587378389/caret-down_aypedv.png" alt='img' className="caret_down"></img></h3>
										</a>
									</div>
									<div id="collapseOne" className="collapse show" data-parent="#accordion">
										<div className="card-body">
											<div className="row">
												<div className="col-1"></div>
												<div className="col-10">
													<Radio.Group onChange={this.onChange} value={statusValue}>
														<div className='filterDivs'>Status</div>
														<Row>
															<Col >
																<Radio className="fasla" value="Available" className="radioText">&nbsp;Available</Radio>
															</Col>
															<Col >
																<Radio className="fasla" value="No Available" className="radioText">&nbsp;No Available</Radio>
															</Col>
														</Row>
													</Radio.Group>
													<div className="row">
														<div className="col-11">
															<CheckboxGroup
																onChange={this.onChangeCheckBoxes.bind(this, 'type')}
																value={typesOfBillboard}
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
														<div className="col-11">
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
														<div className="col-11">
															<CheckboxGroup value={lightningOfBillboard}
																onChange={this.onChangeCheckBoxes.bind(this, 'lightning')}>
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
														<div className="col-11">
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
													<div className='col-11 dropdown'>
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

					<div className="col-12 col-sm-7 col-md-7 col-lg-7 col-xl-7">
						{megaSaleBiilboards.length == 0 ?
							<div style={{ textAlign: 'center' }}> <Spin indicator={antIcon} /> </div>
							:
							<div className="row">
								{/* filterd data render */}
								{notFoundFilterData && filteredData.length == 0 ?
									<div className="noRecrdTxt">
										<p className="noRecordText">
											No Record Found
                                </p>
										<button
											className="backBtn"
											onClick={this.showAllRooms}
										>Back</button>
									</div>
									:
									filteredData && filteredData.map((elem, key) => {
										return (
											<div className="col-11 col-sm-6 col-md-6 col-lg-6 col-xl-6">
												<div className="mainMegaCardDiv">
													<img src={elem.images[0]} alt="card" className="megaCardImgs" />
													<p className="discountTag">{`${elem.percantageOffDisscount}% off`}</p>

													<div className="megaDetailCardDiv">
														<p className="megaCardName">{elem.billboardAddress.slice(0, 13)} , {elem.billboardCity}</p>
														<p class="megaSaleCardText">Billboard availability : <br />From <span className="megaPageTiming">{elem.billboardAvailabilityFrom} </span> to
												<span className="megaPageTiming">{elem.billboardAvailabilityTo}</span></p>
														<p class="megaSaleCardText">DEAL EXPIRE IN:
												<span className="megaPageTiming"> {`${elem.calculateTime}`}</span>
														</p>
														<button class="btn btn-primary" onClick={this.billboardData.bind(this, elem)}>
															<span className="moredetailMegabtn">More Details</span>
														</button>
													</div>
												</div>
											</div>
										)
									})
								}


								{/* all data render */}
								{notFoundFilterData == false && filteredData.length == 0 && showRecord ?
									megaSaleBiilboards && megaSaleBiilboards.map((elem, key) => {

										return (
											<div className="col-11 col-sm-6 col-md-6 col-lg-6 col-xl-6">
												<div className="mainMegaCardDiv">
													<img src={elem.images[0]} alt="card" className="megaCardImgs" />
													<p className="discountTag">{`${elem.percantageOffDisscount}% off`}</p>

													<div className="megaDetailCardDiv">
														<p className="megaCardName">{elem.billboardAddress.slice(0, 13)} , {elem.billboardCity}</p>
														<p class="megaSaleCardText">Billboard availability : <br />From <span className="megaPageTiming">{elem.billboardAvailabilityFrom} </span> to
												<span className="megaPageTiming">{elem.billboardAvailabilityTo}</span></p>
														<p class="megaSaleCardText">DEAL EXPIRE IN:
												<span className="megaPageTiming"> {`${elem.calculateTime}`}</span>
														</p>
														<button class="btn btn-primary" onClick={this.billboardData.bind(this, elem)}>
															<span className="moredetailMegabtn">More Details</span>
														</button>
													</div>
												</div>
											</div>
										)
									})
									: null
								}
							</div>
						}
					</div>
					<div className="col-12 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
				</div>
			</div>
		);
	}
}

export default MegaSalepanel1;