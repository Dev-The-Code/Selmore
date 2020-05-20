import React, { Component } from 'react';
import './billmilitary.scss';
import Location from './googlemap';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router';
import NumberFormat from 'react-number-format';
import {
	Form,
	Input,
	Select,
	DatePicker,
	Spin,
	Icon
} from 'antd';
import moment from 'moment';
import { HttpUtils } from '../../Services/HttpUtils';

const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item;
const { Option } = Select;

class Militarypanel1 extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: '',
			billboardTotalAmount: 0,
			images: [],
			admin: false,
			center: null,
			loader: false,
			isAlert: false,
			mgs: '',
			redirectMarketPlace: false,
			goForDetailMegaSale: false,
			goForDetailBidding: false,
			dataForDetail: ''
		}
	}
	async componentDidMount() {
		let data = this.props.data;

		console.log(data, 'data from detail');

		if (data.images && data.images.length > 0) {
			if (data.bookFrom != undefined || data.bookFrom != '' && data.bookId != undefined || data.bookId != '') {
				this.getBookedBillboardDetail(data.bookFrom, data.bookId)
			}
			await this.setState({
				data: data,
				images: data.images,
			})

		}
		else {
			let obj = {
				id: data
			}
			let response = await HttpUtils.post('getspecificbillboard', obj);
			if (response) {
				if (response.code == 200) {
					let data = response.content[0];
					if (data.bookFrom != undefined || data.bookFrom != '' && data.bookId != undefined || data.bookId != '') {
						this.getBookedBillboardDetail(data.bookFrom, data.bookId)
					}
					this.setState({
						data: response.content[0],
						images: response.content[0].images
					})
				}
			}

		}
	}


	validateNumber(rule, value, callback) {
		if (isNaN(value)) {
			callback('Please type Numbers');
		} else {
			callback()
		}
	}


	validateDate(rule, value, callback) {
		if (!value.length) {
			callback('Please select your Date Range!');
		} else {
			callback();
		}
	}


	onChangeDate(dates, dateStrings) {
		this.setState({
			dateObj: {
				from: dateStrings[0],
				to: dateStrings[1]
			}
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { fileList } = this.state;
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.setState({
					loader: true,
					isAlert: false,
					redirectMarketPlace: false
				})
				this.calculateAmount(values)
			}
		})
	}

	calculateAmount = (values) => {
		const { data } = this.state;
		let calculateTotalAmount;
		if (values.selectDays == 'days') {
			calculateTotalAmount = Number(data.dailyRate) * Number(values.noOfDays);
			this.setState({ billboardTotalAmount: calculateTotalAmount })

		}
		else if (values.selectDays == 'week') {
			calculateTotalAmount = Number(data.weeklyRate) * Number(values.noOfDays);
			this.setState({ billboardTotalAmount: calculateTotalAmount })

		}
		else if (values.selectDays == 'month') {
			calculateTotalAmount = Number(data.monthlyRate) * Number(values.noOfDays);
			this.setState({ billboardTotalAmount: calculateTotalAmount })
		}
		else if (values.selectDays == 'year') {
			calculateTotalAmount = Number(data.yearlyRate) * Number(values.noOfDays);
			this.setState({ billboardTotalAmount: calculateTotalAmount })
		}

		this.checkCalculateAmount(values)
	}

	checkCalculateAmount = async (values) => {
		const { data } = this.state;
		let updateBillboard = {
			objectId: data._id,
			status: 'No Available'
		}
		let response = await HttpUtils.post('listadd', updateBillboard);
		if (response) {
			if (response.code == 200) {
				this.bookedBillboard(values);

			}
			else {
				this.setState({
					loader: false,
					isAlert: false,
					mgs: response.msg,
					redirectMarketPlace: false
				})
			}
		}
		else {
			this.setState({
				loader: false,
				isAlert: false,
				mgs: response.msg,
				redirectMarketPlace: false

			})
		}

	}

	bookedBillboard = async (values) => {
		const { data, billboardTotalAmount } = this.state;
		let userDetail = JSON.parse(localStorage.getItem('userData'));

		let booked = {}
		booked.companyName = userDetail.companyName;
		booked.companyId = userDetail._id;
		booked.companyEmail = userDetail.email;
		booked.companyLandlineNo = userDetail.landlineNo
		booked.address = data.address;
		booked.city = data.city;
		booked.state = data.state;
		booked.billboardId = data._id
		booked.bookedDays = values.noOfDays;
		booked.selectDays = values.selectDays;
		booked.dateRange = values.dateRange
		booked.amountCharge = billboardTotalAmount;
		booked.objectId = '';
		let response = await HttpUtils.post('postmarketPlaceBookedbillboard', booked);
		if (response) {
			if (response.code == 200) {
				this.setState({
					loader: false,
					isAlert: true,
					mgs: 'We Will contact with you shortly',
					redirectMarketPlace: true
				})
			}
			else {
				this.setState({
					loader: false,
					isAlert: false,
					mgs: response.msg,
					redirectMarketPlace: false
				})
			}
		}
		else {
			this.setState({
				loader: false,
				isAlert: false,
				mgs: response.msg,
				redirectMarketPlace: false
			})
		}
	}

	detailBillboardAvail = async (param) => {
		const { data } = this.state;
		let obj = {
			id: data.avalibleOnId
		}

		if (param == 'megaSale') {
			let response = await HttpUtils.post('getspecificMegaSalebillboard', obj);
			if (response) {
				if (response.code == 200) {
					let dataOfBillboard = {
						megasaleDetail: response.content[0],
						bilboardDetail: data
					}

					this.setState({
						goForDetailMegaSale: true,
						dataForDetail: dataOfBillboard
					})
				}
			}


		}
		else if (param == 'biding') {
			let response = await HttpUtils.post('getspecificBiddingbillboard', obj);
			console.log(response, 'response')
			if (response) {
				if (response.code == 200) {
					let dataOfBillboard = {
						megasaleDetail: response.content[0],
						bilboardDetail: data
					}

					this.setState({
						goForDetailBidding: true,
						dataForDetail: response.content[0]

					})
				}

			}
		}
	}

	getBookedBillboardDetail = async (bookFrom, bookId) => {
		if (bookFrom == 'marketPlace') {
			let obj = {
				id: bookId
			}
			let response = await HttpUtils.post('getspecificMarketPlaceBookedbillboard', obj);
			console.log(response, 'response')
		}
		else if (bookFrom == 'megaSale') {
			let obj = {
				id: bookId
			}
			let response = await HttpUtils.post('getspecificBookedMegaSalebillboard', obj);
			console.log(response, 'response')

		}
		else if (bookFrom == 'bidding') {
			let obj = {
				id: bookId
			}
			let response = await HttpUtils.post('getspecificBookedBidderbillboard', obj);
			console.log(response, 'response')

		}
	}

	render() {
		const { data, images, loader, alert, mgs, redirectMarketPlace, goForDetailMegaSale, goForDetailBidding, dataForDetail } = this.state;
		const { getFieldDecorator } = this.props.form;
		let image;
		let adminUser = JSON.parse(localStorage.getItem("userData"));
		const valueUser = JSON.parse(localStorage.getItem("loggedIn"));
		const antIcon = <Icon type="loading" style={{ fontSize: 24, marginRight: '10px' }} spin />;



		if (images.length > 0) {
			image = images.map((elem, key) => {
				if (key == 0) {
					return <div className="carousel-item active" style={{ width: '720px', height: "450px" }}>
						<img className="d-block w-100" src={elem} alt={key} style={{ width: '720px', height: "450px" }} />
					</div>
				}
				else {
					return <div className="carousel-item" style={{ width: '720px', height: "450px" }}>
						<img className="d-block w-100" src={elem} alt={key} style={{ width: '720px', height: "450px" }} />
					</div>
				}
			})
		}
		if (redirectMarketPlace) {
			return <Redirect to={{ pathname: '/market_place' }} />
		}

		if (goForDetailMegaSale) {
			return (
				<Redirect to={{ pathname: `/megaDetail/${data.avalibleOnId}`, state: dataForDetail }} />
			)
		}
		if (goForDetailBidding) {
			return (
				<Redirect to={{ pathname: `/bidding_detail/${data.avalibleOnId}`, state: dataForDetail }} />
			)
		}
		return (
			<div>
				<div className="container soldier8">
					<div className="row" style={{ margin: '0px' }}>
						<div className="col-md-8">
							<div className="row slidersoldier" style={{ margin: '0px' }}>
								<div className="">
									<div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
										<div className="carousel-inner">
											{image}
										</div>
										<a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
											<span className="carousel-control-prev-icon" aria-hidden="true"></span>
											<span className="sr-only">Previous</span>
										</a>
										<a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
											<span className="carousel-control-next-icon" aria-hidden="true"></span>
											<span className="sr-only">Next</span>
										</a>
									</div>
								</div>
							</div><br />
							{/*first panel1*/}
							<div className="row ufone1" style={{ margin: '0px' }}>
								<span className="ufone2">Billboard in {data.city} Millitary Road City Point Details</span>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">Ad Width</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.width}- Feet</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">Ad Height</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.height} - Feet</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">Lightning</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.lightning}</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">Description</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.description}</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone7"><span className="ufone3">Ad Status</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.status}</span></div>
							</div>
							<br />
							{/*Second panel*/}
							<div className="row ufone1" style={{ margin: '0px' }}>
								<span className="ufone2">Military Road City rate Card</span>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">Daily Rate</span></div>
								<div className="col-md-9 ufone6">
									<NumberFormat value={data.dailyRate} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
								</div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">Weely Rate</span></div>
								<div className="col-md-9 ufone6">
									<NumberFormat value={data.weeklyRate} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
								</div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">Monthly Rate</span></div>
								<div className="col-md-9 ufone6">
									<NumberFormat value={data.monthlyRate} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
								</div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone7"><span className="ufone3">Yearly Rate</span></div>
								<div className="col-md-9 ufone6">
									<NumberFormat value={data.yearlyRate} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
								</div>
							</div>
							<br />
							{/*Third panel*/}
							<div className="row ufone1" style={{ margin: '0px' }}>
								<span className="ufone2">Military Road City Demographics</span>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">Audiance Type</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.audianceType}</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">Daily Visitor</span></div>
								<div className="col-md-9 ufone6">
									<NumberFormat value={data.dailyVisitor} displayType={'text'} thousandSeparator={true} />

								</div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone7"><span className="ufone3">Near By</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.nearBy}</span></div>
							</div>
							<br />
							{/*Fourth panel*/}
							<div className="row ufone1" style={{ margin: '0px' }}>
								<span className="ufone2">Military Road City Demographics</span>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">Country</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.country}</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">State</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.state}</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">City</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.city}</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone7"><span className="ufone3">Address</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.address}</span></div>
							</div>
							<br />
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-9"></div>
								<div className="col-md-3">
									{valueUser && data.status && data.status == 'Available' ?
										<button className="btn btn-primary bookBtn_military" data-toggle="modal" data-target="#myBillBook">Book Now</button>
										:
										data.avalibleOn == 'megaSale' || data.avalibleOn == 'bidding' ?
											<button className="btn btn-primary bookBtn_military" disabled>Avail On Deal</button>

											:
											<button className="btn btn-primary bookBtn_military" data-toggle="modal" data-target="#myBillBook" disabled>Already Booked</button>
									}
									{data.avalibleOn == "megaSale" ?

										<button className="btn btn-primary bookBtn_military" onClick={this.detailBillboardAvail.bind(this, 'megaSale')}>Book From Mega Sale</button>
										:
										null
									}
									{data.avalibleOn == "bidding" ?
										<button className="btn btn-primary bookBtn_military" onClick={this.detailBillboardAvail.bind(this, 'biding')}>Book From Bidding</button>
										: null}
								</div>
							</div>

							{/* billboard booked modal form  */}
							<div class="modal" id="myBillBook">
								<div class="modal-dialog">
									<div class="modal-content">
										<div class="modal-header">
											<h4 class="modal-title">Book Now</h4>

											<button type="button" class="close" data-dismiss="modal">&times;</button>

										</div>
										<Form onSubmit={this.handleSubmit}>
											<div class="modal-body">
												<div className="row">
													<div className="col-12 col-md-12 col-lg-12 col-xl-12">
														<div className='row'>
															<div className="col-3 col-md-3 col-lg-3 col-xl-3">
																<NumberFormat value={data.dailyRate} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
														(per day)
															</div>
															<div className="col-3 col-md-3 col-lg-3 col-xl-3">

																<NumberFormat value={data.weeklyRate} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
														(per week)
															</div>
															<div className="col-3 col-md-3 col-lg-3 col-xl-3">
																<NumberFormat value={data.monthlyRate} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
														(per month)
															</div>
															<div className="col-3 col-md-3 col-lg-3 col-xl-3">
																<NumberFormat value={data.yearlyRate} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
														(per year)
																<div >
																	<label htmlFor="sel1">No Of Days</label>
																	<FormItem>
																		{getFieldDecorator('noOfDays', {
																			// initialValue: contactnumber,
																			rules: [{
																				required: true, message: 'Please input your Number!',
																				whitespace: true
																			},
																			{ validator: this.validateNumber.bind(this) }]
																		})(
																			<Input placeholder='No of Booked' />
																		)}
																	</FormItem>
																</div>
																<div className="form-group">
																	<label htmlFor="sel1">Select Day/Week/Month/Year</label>
																	<FormItem>
																		{getFieldDecorator('selectDays', {
																			// initialValue: contactnumber,
																			rules: [{
																				required: true, message: 'Please input your Number!',
																				whitespace: true
																			},
																				// { validator: this.validateNumber.bind(this) }
																			]
																		})(
																			<Select style={{ width: 70 }} >
																				{data.dailyRate != '0' && <Option value="days">Days</Option>}
																				{data.weeklyRate != '0' && <Option value="week">Week</Option>}
																				{data.monthlyRate != '0' && <Option value="month">Month</Option>}
																				{data.yearlyRate != '0' && <Option value="year">Year</Option>}
																			</Select>
																		)}
																	</FormItem>
																</div>
																<div className="form-group">
																	<label htmlFor="sel1">No Of Days</label>
																	<FormItem style={{ padding: '2% 0%' }}>
																		{getFieldDecorator('dateRange', {
																			rules: [{ validator: this.validateDate.bind(this) }],
																		})(
																			<RangePicker
																				ranges={{
																					Today: [moment(), moment()],
																					'This Month': [moment(), moment().endOf('month')]
																				}}
																				onChange={this.onChangeDate.bind(this)}
																			/>
																		)}
																	</FormItem>
																</div>

															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="modal-footer">
												<div className="col-md-12 col-sm-12 col-xs-12">
													{loader && <Spin className="col-xs-2 col-md-6" indicator={antIcon} />}
													{mgs != '' && <span>{mgs}</span>}
													<button style={{ textAlign: 'center', width: '19%' }}
														disabled={!!this.state.loader}
													>Submit</button>
												</div>
											</div>
										</Form>
									</div>
								</div>
							</div>
							<br />
							<div className="row">

								<div className="col-md-4 col-lg-4 col-xl-4 col-6">
									<h3 className="contactDetailHead">Contact Details</h3>
								</div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-11 col-10 ufone8"></div>
								<div className="col-md-1 col-2"></div>
							</div>
						</div>
						<div className="col-md-4">
							<div></div>
							{adminUser !== null && adminUser.role == 'admin' ?
								<Link to={{ pathname: `/list_add`, state: data }}>
									<div class="fa fa-pencil" style={{ fontSize: "24px", float: "right", marginLeft: '10px' }}></div>
								</Link>
								:
								null
							}
							<div>
								<div className="row soldier7" style={{ margin: '0px' }}>
									<div><h3 className="mapMilitary">Map</h3></div>

								</div><br />
								{/* render a map and show a location of the Billboard */}
								<div>
									{data &&
										<Location
											address={data.address}
											latitude={data.latitude}
											longitude={data.longitude}
										/>
									}
								</div>
							</div>
						</div>
					</div>
				</div> <br />
			</div>
		);
	}
}

const WrappedJobPortalForm = Form.create()(Militarypanel1);
export default WrappedJobPortalForm;
