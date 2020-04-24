import React, { Component } from 'react';
import './billofbidding.scss';
import { HttpUtils } from '../../Services/HttpUtils';
import NumberFormat from 'react-number-format';

class Billofpanel2 extends Component {
	constructor(props) {
		super(props)
		this.state = {
			billboardData: '',
			biddersCompanyDetails: []
		}
	}

	componentDidMount() {
		this.billboardData()
		this.biddersDetails()
	}

	billboardData = async () => {
		let data = this.props.data;
		if (data != undefined) {
			let obj = {
				id: data.billboardId
			}
			let response = await HttpUtils.post('getspecificbillboard', obj);
			if (response.code == 200) {
				this.setState({
					billboardData: response.content[0]
				})

			}
		}
	}

	biddersDetails = async () => {
		const { data } = this.props;
		let obj = {
			id: data._id
		}
		let response = await HttpUtils.post('getspecificBiddingbillboardHistory', obj);
		if (response) {
			if (response.code == 200) {
				this.setState({
					biddersCompanyDetails: response.content
				})
			}
		}
	}

	render() {
		const { billboardData, biddersCompanyDetails } = this.state;
		return (
			<div>
				<div className="container">
					<div className="row" style={{ margin: '0px' }}>
						<div className="col-md-4">
							<nav>
								<div className="nav nav-tabs nav-fill doesit8" id="nav-tab" role="tablist">
									<a className="nav-item nav-link active tikonduxx1" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true"><span className="doesit10">Detail</span></a>
									<a className="nav-item nav-link tikonduxx2" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false"><span className="doesit10">Bid History</span></a>
								</div>
							</nav>
						</div>
						<div className="col-md-8"></div>
					</div>
					<div className="row" style={{ margin: '0px' }}>
						<div className="col-md-11 doesit9">
							<div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
								<div className="tab-pane fade show active text-justify" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
									<div className="row ufone1" style={{ margin: '0px' }}>
										<span className="ufone2">Billboard in {billboardData.city} Millitary Road City Point Details</span>
									</div>
									<div className="row" style={{ margin: '0px' }}>
										<div className="col-md-3 ufone5"><span className="ufone3">Ad Width</span></div>
										<div className="col-md-9 ufone6"><span className="ufone4">{billboardData.width} - Feet</span></div>
									</div>
									<div className="row" style={{ margin: '0px' }}>
										<div className="col-md-3 ufone5"><span className="ufone3">Ad Height</span></div>
										<div className="col-md-9 ufone6"><span className="ufone4">{billboardData.height} - Feet</span></div>
									</div>
									<div className="row" style={{ margin: '0px' }}>
										<div className="col-md-3 ufone5"><span className="ufone3">Lightning</span></div>
										<div className="col-md-9 ufone6"><span className="ufone4">{billboardData.lightning}</span></div>
									</div>
									<div className="row" style={{ margin: '0px' }}>
										<div className="col-md-3 ufone5"><span className="ufone3">Description</span></div>
										<div className="col-md-9 ufone6"><span className="ufone4">{billboardData.description}</span></div>
									</div>
									<div className="row" style={{ margin: '0px' }}>
										<div className="col-md-3 ufone7"><span className="ufone3">Ad Status</span></div>
										<div className="col-md-9 ufone6"><span className="ufone4">{billboardData.status}</span></div>
									</div>
									<br />
									{/*Second panel*/}
									<div className="row ufone1" style={{ margin: '0px' }}>
										<span className="ufone2">Military Road City rate Card</span>
									</div>
									<div className="row" style={{ margin: '0px' }}>
										<div className="col-md-3 ufone5"><span className="ufone3">Daily Rate</span></div>
										<div className="col-md-9 ufone6">
											<NumberFormat value={billboardData.dailyRate} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />

											{/* <span className="ufone4">Rs.{billboardData.dailyRate}</span> */}
										</div>
									</div>
									<div className="row" style={{ margin: '0px' }}>
										<div className="col-md-3 ufone5"><span className="ufone3">Weely Rate</span></div>
										<div className="col-md-9 ufone6">
											<NumberFormat value={billboardData.weeklyRate} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />

											{/* <span className="ufone4">Rs.{billboardData.weeklyRate}</span> */}
										</div>
									</div>
									<div className="row" style={{ margin: '0px' }}>
										<div className="col-md-3 ufone5"><span className="ufone3">Monthly Rate</span></div>
										<div className="col-md-9 ufone6">
											<NumberFormat value={billboardData.monthlyRate} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />

											{/* <span className="ufone4">Rs.{billboardData.monthlyRate}</span> */}
										</div>
									</div>
									<div className="row" style={{ margin: '0px' }}>
										<div className="col-md-3 ufone7"><span className="ufone3">Yearly Rate</span></div>
										<div className="col-md-9 ufone6">
											<NumberFormat value={billboardData.yearlyRate} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />

											{/* <span className="ufone4">Rs.{billboardData.yearlyRate}</span> */}
										</div>
									</div>
									<br />
									{/*Third panel*/}
									<div className="row ufone1" style={{ margin: '0px' }}>
										<span className="ufone2">Military Road City Demographics</span>
									</div>
									<div className="row" style={{ margin: '0px' }}>
										<div className="col-md-3 ufone5"><span className="ufone3">Audiance Type</span></div>
										<div className="col-md-9 ufone6"><span className="ufone4">{billboardData.audianceType}</span></div>
									</div>
									<div className="row" style={{ margin: '0px' }}>
										<div className="col-md-3 ufone5"><span className="ufone3">Daily Visitor</span></div>
										<div className="col-md-9 ufone6">
											<NumberFormat value={billboardData.dailyVisitor} displayType={'text'} thousandSeparator={true} />

											{/* <span className="ufone4">{billboardData.dailyVisitor}</span> */}
										</div>
									</div>
									<div className="row" style={{ margin: '0px' }}>
										<div className="col-md-3 ufone7"><span className="ufone3">Near By</span></div>
										<div className="col-md-9 ufone6"><span className="ufone4">{billboardData.nearBy}</span></div>
									</div>
									<br />
									{/*Fourth panel*/}
									<div className="row ufone1" style={{ margin: '0px' }}>
										<span className="ufone2">Military Road City Demographics</span>
									</div>
									<div className="row" style={{ margin: '0px' }}>
										<div className="col-md-3 ufone5"><span className="ufone3">Address</span></div>
										<div className="col-md-9 ufone6"><span className="ufone4">{billboardData.address}</span></div>
									</div>
									<div className="row" style={{ margin: '0px' }}>
										<div className="col-md-3 ufone5"><span className="ufone3">City</span></div>
										<div className="col-md-9 ufone6"><span className="ufone4">{billboardData.city}</span></div>
									</div>
									<div className="row" style={{ margin: '0px' }}>
										<div className="col-md-3 ufone5"><span className="ufone3">State</span></div>
										<div className="col-md-9 ufone6"><span className="ufone4">{billboardData.state}</span></div>
									</div>
									<div className="row" style={{ margin: '0px' }}>
										<div className="col-md-3 ufone5"><span className="ufone3">Country</span></div>
										<div className="col-md-9 ufone6"><span className="ufone4">{billboardData.country}</span></div>
									</div>
								</div>
								<div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
									<table class="table" style={{ textAlign: 'center' }}>
										<thead>
											<tr>
												<th className="BidhistoryTH">S#N.o</th>
												<th className="BidhistoryTH">Bid Date.</th>
												<th className="BidhistoryTH">Bid Amount</th>
												<th className="BidhistoryTH">Bidder ID</th>
											</tr>
										</thead>

										{biddersCompanyDetails && biddersCompanyDetails.map((elem, key) => {
											return (
												<tbody>
													<tr>
														<td className="BidhistoryTH">{key + 1}</td>
														<td className="BidhistoryTH">{elem.date} - {elem.time}</td>
														<td className="BidhistoryTH">
															<NumberFormat value={elem.bidAamount} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />

															{/* Rs.{elem.bidAamount} */}
														</td>
														<td className="BidhistoryTH">{elem.companyId}</td>
													</tr>
												</tbody>
											)
										})}
									</table>
								</div>
							</div>
						</div>
						<div className="col-md-1"></div>
					</div>
				</div>
			</div>
		);
	}
}
export default Billofpanel2;