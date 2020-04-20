import React, { Component } from 'react';
import './billmilitary.scss';
import Location from './googlemap';
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';


class Militarypanel1 extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: '',
			images: [],
			admin: false,
			center: null,
			billboardAmount: '',
			bookedFor: ''
		}
	}
	async componentDidMount() {
		let data = this.props.data;
		console.log(data, 'data')
		await this.setState({
			data: data,
			images: data.images,
		})
	}

	billboardAmount = (amount, days) => {
		this.setState({
			billboardAmount: amount,
			bookedFor: days
		})
	}

	bookedBillboard = () => {
		const { data, bookedFor, billboardAmount } = this.state;
		let bookedBillboard = [];
		let booked = {}
		let userDetail = JSON.parse(localStorage.getItem('userData'));
		let bookedAvalibleBillboards = JSON.parse(localStorage.getItem('bookedAvalibleBillboards'));
		booked.companyName = userDetail.companyName;
		booked.companyId = userDetail._id;
		booked.address = data.address;
		booked.city = data.city;
		booked.state = data.state;
		booked.booked = bookedFor;
		booked.billboardAmount = billboardAmount;

		if (bookedAvalibleBillboards == null || bookedAvalibleBillboards == undefined) {
			bookedBillboard.push(booked)
			localStorage.setItem('bookedAvalibleBillboards', JSON.stringify(bookedBillboard))
		}
		else {
			for (var i = 0; i < bookedAvalibleBillboards.length; i++) {
				bookedBillboard.push(bookedAvalibleBillboards[i])
			}
			bookedBillboard.push(booked)
			localStorage.setItem('bookedAvalibleBillboards', JSON.stringify(bookedBillboard))
		}
	}



	render() {
		const { data, images, center } = this.state;
		console.log(data.status , 'data')
		// Available
		// No Available
		let image;
		let adminUser = JSON.parse(localStorage.getItem("userData"));
		const valueUser = JSON.parse(localStorage.getItem("loggedIn"));
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

									{/* <span className="ufone4">{data.dailyRate}</span> */}
								</div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">Weely Rate</span></div>
								<div className="col-md-9 ufone6">
									<NumberFormat value={data.weeklyRate} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />

									{/* <span className="ufone4">{data.weeklyRate}</span> */}
								</div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">Monthly Rate</span></div>
								<div className="col-md-9 ufone6">
									<NumberFormat value={data.monthlyRate} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />

									{/* <span className="ufone4">{data.monthlyRate}</span> */}
								</div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone7"><span className="ufone3">Yearly Rate</span></div>
								<div className="col-md-9 ufone6">
									<NumberFormat value={data.yearlyRate} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />

									{/* <span className="ufone4">{data.yearlyRate}</span> */}
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

									{/* <span className="ufone4">{data.dailyVisitor}</span> */}
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
									{valueUser && data.status && data.status == 'Available'?
										<button className="btn btn-primary bookBtn_military" data-toggle="modal" data-target="#myBillBook">Book Now</button>
										:
										<button className="btn btn-primary bookBtn_military" data-toggle="modal" data-target="#myBillBook" disabled>Book Now</button>
									}
								</div>
							</div>
							<div class="modal" id="myBillBook">
								<div class="modal-dialog">
									<div class="modal-content">
										<div class="modal-header">
											<h4 class="modal-title">Book Now</h4>

											<button type="button" class="close" data-dismiss="modal">&times;</button>

										</div>
										<div class="modal-body">
											<div className="row">
												<div className="col-12 col-md-12 col-lg-12 col-xl-12">
													<label class="checkdrn radio-inline">
														<NumberFormat value={data.dailyRate} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
														(per day)
														{/* Rs.{data.dailyRate}  */}
														<input type="radio" name="radio" onChange={this.billboardAmount.bind(this, data.dailyRate, 'day')} />
														<span class="checkmark"></span>
													</label>
													<label class="checkdrn radio-inline">
														<NumberFormat value={data.weeklyRate} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
														(per week)
														{/* Rs.{data.weeklyRate} (per week) */}
														<input type="radio" name="radio" onChange={this.billboardAmount.bind(this, data.weeklyRate, 'week')} />
														<span class="checkmark"></span>
													</label>
													<label class="checkdrn radio-inline">
														<NumberFormat value={data.monthlyRate} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
														(per month)
														{/* Rs.{data.monthlyRate} (per month) */}
														<input type="radio" name="radio" onChange={this.billboardAmount.bind(this, data.monthlyRate, 'month')} />
														<span class="checkmark"></span>
													</label>
													<label class="checkdrn radio-inline">
														<NumberFormat value={data.yearlyRate} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
														(per year)
														{/* Rs.{data.yearlyRate} (per year) */}
														<input type="radio" name="radio" onChange={this.billboardAmount.bind(this, data.yearlyRate, 'year')} />
														<span class="checkmark"></span>
													</label>
												</div>
											</div>
										</div>
										<div class="modal-footer">
											<button type="button" class="btn btn-primary" data-dismiss="modal"
												onClick={this.bookedBillboard}>Submit</button>

										</div>
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
							{/* {this.props.data.address && */}
							<div>
								<div className="row soldier7" style={{ margin: '0px' }}>
									<div><h3 className="mapMilitary">Map</h3></div>

								</div><br />
								{/* render a map and show a location of the Billboard */}
								<div>
									<Location
										address={this.props.data.address}
										latitude={this.props.data.latitude}
										longitude={this.props.data.longitude}
									/>
								</div>
								{/* <div className="row soldier7" style={{ margin: '0px' }}>
								// 			<h3 style={{ color: 'white' }}>Map</h3>
								// 		</div> */}
							</div>
							{/* } */}
						</div>
					</div>
				</div> <br />
			</div>
		);
	}
}
export default Militarypanel1;
