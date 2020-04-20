import React, { Component } from 'react';
import './megaSale.scss';
import { Link, Redirect } from 'react-router-dom';
import { HttpUtils } from '../../Services/HttpUtils';
import {
	Checkbox, Form, Row, Col, Input, Radio, Button
} from 'antd';
import moment from 'moment';
import Select from 'react-select';

const CheckboxGroup = Checkbox.Group;

class MegaSalepanel1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			megaSaleBiilboards: [],
			days: undefined,
			hours: undefined,
			minutes: undefined,
			seconds: undefined,
			goForDetail: false,
			billboardData: '',
			megaSaleId: ''
		}
	}
	componentDidMount() {
		this.megaSalebillBoardData()
	}

	componentWillUnmount() {
		if (this.interval) {
			clearInterval(this.interval);
		}
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
					// const countdown = moment(then - now);
					// const days = countdown.format('D');
					// const hours = countdown.format('HH');
					// const minutes = countdown.format('mm');
					// const seconds = countdown.format('ss');
					// elemObj.minutes = minutes;
					// elemObj.seconds = seconds;

					var totalSec = then.diff(now, 'seconds');
					var hours = parseInt(totalSec / 3600);
					var minutes = parseInt(totalSec / 60) % 60;
					var seconds = totalSec % 60;
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


	billboardData = async (data) => {
		let obj = {
			id: data.billboardId
		}
		let response = await HttpUtils.post('getspecificbiddingbillboard', obj);
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

	render() {
		const { megaSaleBiilboards, goForDetail, megaSaleId, billboardData } = this.state;
		if (goForDetail) {
			return (
				<Redirect to={{ pathname: `/megaDetail/${megaSaleId}`, state: billboardData }} />
			)
		}
		return (
			<div>
				<div className="row">
					<div className="col-12 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
					<div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
						<div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 d-none d-sm-block'>
							<h3 className="filterTextHead">Filteration</h3>
							<Radio.Group>
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
									<CheckboxGroup>
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
									<CheckboxGroup>
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
									<CheckboxGroup>
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
									<CheckboxGroup>
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
										// onChange={this.handleChange.bind(this, 'city')}
										// options={cities}
										>
										</Select>
									</Col>
								</Row>

								<div className='filterDivs'>States</div>
								<Row className="fasla1" >
									<Col>
										<Select
										// onChange={this.handleChange.bind(this, 'state')}
										// options={states}
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
											className="megaSaleFilter_Input"
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
											className="megaSaleFilter_Input"
										/>

									</div>
									<div className="col-12 col-md-4 col-lg-4 col-xl-4">
										<button className="btn btn-primary">
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
											className="megaSaleFilter_Input"
										/>

									</div>
									<div className="col-12 col-md-4 col-lg-4 col-xl-4">

										<input
											onChange={this.onChangeMax}
											// value={maxValue}
											type="Number"
											placeholder="Max"
											className="megaSaleFilter_Input"
										/>

									</div>
									<div className="col-12 col-md-2 col-lg-2 col-xl-2">
										<button className="btn btn-primary">
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
											className="megaSaleFilter_Input"
										/>

									</div>
									<div className="col-12 col-md-4 col-lg-4 col-xl-4">

										<input
											onChange={this.onChangeMax}
											// value={maxValue}

											type="Number"
											placeholder="Max"
											className="megaSaleFilter_Input"
										/>

									</div>
									<div className="col-12 col-md-2 col-lg-2 col-xl-2">
										<button className="btn btn-primary">
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
											className="megaSaleFilter_Input"
										/>

									</div>
									<div className="col-12 col-md-4 col-lg-4 col-xl-4">

										<input
											onChange={this.onChangeMax}
											// value={maxValue}

											type="Number"
											placeholder="Max"
											className="megaSaleFilter_Input"
										/>

									</div>
									<div className="col-12 col-md-2 col-lg-2 col-xl-2">
										<button className="btn btn-primary">
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
											className="megaSaleFilter_Input"
										/>

									</div>
									<div className="col-12 col-md-4 col-lg-4 col-xl-4">
										<input
											onChange={this.onChangeMax}
											// value={maxValue}

											type="Number"
											placeholder="Max"
											className="megaSaleFilter_Input"
										/>

									</div>
									<div className="col-12 col-md-2 col-lg-2 col-xl-2">
										<button className="btn btn-primary">
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
											<h3>Filters<img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1587378389/caret-down_aypedv.png" alt='img' className="caret_down"></img></h3>
										</a>
									</div>
									<div id="collapseOne" className="collapse show" data-parent="#accordion">
										<div className="card-body">
											<div className="row">
												<div className="col-1"></div>
												<div className="col-10">
													<Radio.Group>
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
															<CheckboxGroup>
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
															<CheckboxGroup>
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
															<CheckboxGroup>
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
															<CheckboxGroup>
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
																// onChange={this.handleChange.bind(this, 'city')}
																// options={cities}
																>
																</Select>
															</Col>
														</Row>

														<div className='filterDivs'>States</div>
														<Row className="fasla1" >
															<Col>
																<Select
																// onChange={this.handleChange.bind(this, 'state')}
																// options={states}
																>
																</Select>
															</Col>
														</Row>

													</div>

													<Form>
														<div className='filterDivs'>Pricing</div>
														<div className="row fasla1">
															<div className="col-5">

																<input
																	onChange={this.onChangeMin}
																	// value={minValue}
																	type="Number"
																	placeholder="Min"
																	className="megaSaleFilter_Input_mob"
																/>
															</div>
														</div>
														<div className="row fasla1">
															<div className="col-5">

																<input
																	onChange={this.onChangeMax}
																	// value={maxValue}

																	type="Number"
																	placeholder="Max"
																	className="megaSaleFilter_Input_mob"
																/>

															</div>
															<div className="col-2">
																<button className="btn btn-primary">
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
																	className="megaSaleFilter_Input_mob"
																/>

															</div>
															<div className="col-5">

																<input
																	onChange={this.onChangeMax}
																	// value={maxValue}
																	type="Number"
																	placeholder="Max"
																	className="megaSaleFilter_Input_mob"
																/>

															</div>
															<div className="col-2">
																<button className="btn btn-primary">
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
																	className="megaSaleFilter_Input_mob"
																/>

															</div>
															<div className="col-5">

																<input
																	onChange={this.onChangeMax}
																	// value={maxValue}

																	type="Number"
																	placeholder="Max"
																	className="megaSaleFilter_Input_mob"
																/>

															</div>
															<div className="col-2">
																<button className="btn btn-primary">
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
																	className="megaSaleFilter_Input_mob"
																/>

															</div>
															<div className="col-5">

																<input
																	onChange={this.onChangeMax}
																	// value={maxValue}

																	type="Number"
																	placeholder="Max"
																	className="megaSaleFilter_Input_mob"
																/>

															</div>
															<div className="col-2">
																<button className="btn btn-primary">
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
																	className="megaSaleFilter_Input_mob"
																/>

															</div>
															<div className="col-5">
																<input
																	onChange={this.onChangeMax}
																	// value={maxValue}

																	type="Number"
																	placeholder="Max"
																	className="megaSaleFilter_Input_mob"
																/>

															</div>
															<div className="col-2">
																<button className="btn btn-primary">
																	<i class="fa fa-caret-right"></i>
																</button>
															</div>
														</div>
													</Form>
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
						<div className="row">
							{megaSaleBiilboards && megaSaleBiilboards.map((elem, key) => {
								return (
									<div className="col-11 col-sm-6 col-md-6 col-lg-6 col-xl-6">
										<div className="mainMegaCardDiv">
											<img src={elem.images[0]} alt="card" className="megaCardImgs" />
											{/* <p className="discountTag">{elem.percantageOffDisscount.round()}% off</p> */}
											<p className="discountTag">40% off</p>
											<div className="megaDetailCardDiv">
												<p className="megaCardName">{elem.billboardAddress.slice(0, 13)} , {elem.billboardCity}</p>
												<p class="megaCardDisText">Discount Up to <span className="megaCardDisText">{elem.percantageOffDisscount}%</span></p>
												<p class="megaSaleCardText">Billboard availability : <br />From <span className="megaPageTiming">2020-02-15</span> to
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
							})}
							{/* {megaSaleBiilboards && megaSaleBiilboards.map((elem, key) => {
								return (
									<div className="row extra1">
										<div className="col-12 col-md-5 col-lg-5 col-xl-5 card_mega1">
											<img class="card-img-top cardImag_mega" src={elem.images[0]} alt="Card image" />
										</div>
										<div className="col-12 col-md-7 col-lg-7 col-xl-7 card_mega2">
											<div class="card-body">
												<h4 class="card-title">{elem.billboardAddress},{elem.billboardCity} </h4>
												<h4 class="card-title"> </h4>
												<p class="card-text megaPageText">Discount Up to <span className="megaPageTiming">{elem.percantageOffDisscount}%</span></p>
												<p class="card-text megaPageText">Billboard availability : <br />From <span className="megaPageTiming">{elem.billboardAvailabilityFrom}</span> to
												<span className="megaPageTiming"> {elem.billboardAvailabilityTo}</span></p>
												<p class="card-text megaPageText">DEAL EXPIRE IN:
												<span className="megaPageTiming"> {`${elem.calculateTime}`}</span>
												</p>
												<button class="btn btn-primary" onClick={this.billboardData.bind(this, elem)}>
													<span className="moredetailMegabtn">More Details</span>
												</button>
											</div>
										</div>
									</div>
								)
							})} */}
						</div>
					</div>
					<div className="col-12 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
				</div>
			</div>
		);
	}
}

export default MegaSalepanel1;