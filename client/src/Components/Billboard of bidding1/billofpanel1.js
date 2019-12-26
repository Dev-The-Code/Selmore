import React, { Component } from 'react';
import Popform from '../Popform/popform';
import NumberFormat from 'react-number-format';
import './billofbidding.css';
import { HttpUtils } from '../../Services/HttpUtils';

class Billofpanel1 extends Component {
	constructor(props) {
		super(props)
		this.state = {
			lastBidAmount: '',
			bidValue: '',
			enterGreaterAmount: false,
			todayDate: '',
			time: '',
			monthName: ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			billboardData: []
		}
	}

	componentDidMount() {
		let date = new Date().getDate();
		let month = new Date().getMonth() + 1;
		const year = new Date().getFullYear();
		if (month == 1 || month == 2 || month == 3 || month == 4 || month == 5 || month == 6 || month == 7 || month == 8 || month == 9) {
			month = `0${month}`
		}
		if (date == 1 || date == 2 || date == 3 || date == 4 || date == 5 || date == 6 || date == 7 || date == 8 || date == 9) {
			date = `0${date}`
		}
		const hours = new Date().getHours();
		let min = new Date().getMinutes();
		const sec = new Date().getSeconds();
		let time;

		if (min == 0 || min == 1 || min == 2 || min == 3 || min == 4 || min == 5 || min == 6 || min == 7 || min == 8 || min == 9) {
			min = `0${min}`
		}
		if (hours == 12 || hours == 13 || hours == 14 || hours == 15 || hours == 16 || hours == 17 || hours == 18 || hours == 19 || hours == 20 || hours == 21 ||
			hours == 22 || hours == 23) {
			if (hours == 12) {
				time = `12:${min} PM`;
			} else if (hours == 13) {
				time = `1:${min} PM`;
			} else if (hours == 14) {
				time = `2:${min} PM`;
			} else if (hours == 15) {
				time = `3:${min} PM`;
			} else if (hours == 16) {
				time = `4:${min} PM`;
			} else if (hours == 17) {
				time = `5:${min} PM`;
			} else if (hours == 18) {
				time = `6:${min} PM`;
			} else if (hours == 19) {
				time = `7:${min} PM`;
			} else if (hours == 20) {
				time = `8:${min} PM`;
			} else if (hours == 21) {
				time = `9:${min} PM`;
			} else if (hours == 22) {
				time = `10:${min} PM`;
			} else if (hours == 23) {
				time = `11:${min} PM`;
			}
		}
		else {
			if (hours == "00") {
				time = `12:${min} AM`;
			}
			else {
				time = `${hours}:${min} AM`;
			}
		}

		this.setState({
			todayDate: month + '-' + date + '-' + year,
			time: time,
		})

		this.lastBidingAmount()
		this.billboardData()
	}

	lastBidingAmount = () => {
		const { data } = this.props;
		let lastBidAmount = JSON.parse(localStorage.getItem('lastBidAmount'));
		if (lastBidAmount == null || lastBidAmount == undefined) {
			this.setState({
				lastBidAmount: data.minBidAmount
			})
		}
		else {
			this.setState({
				lastBidAmount: lastBidAmount
			})
		}
	}


	billboardData = async () => {
		let data = this.props.data;
		if (data != undefined) {
			let obj = {
				id: data.billboardId
			}
			let response = await HttpUtils.post('getspecificbiddingbillboard', obj);
			if (response.code == 200) {
				this.setState({
					billboardData: response.content[0]
				})

			}
		}
	}

	bidingAmount = () => {
		const { bidValue, lastBidAmount, todayDate, time, billboardData } = this.state;
		const { data } = this.props;

		if (Number(lastBidAmount) >= Number(bidValue)) {
			this.setState({
				enterGreaterAmount: true
			})
		}
		else {
			let usersData = []
			let userDetail = JSON.parse(localStorage.getItem('userData'));
			let bidderDetail = JSON.parse(localStorage.getItem('bidderDetail'));
			let userData = {}
			userData.bidAamount = bidValue;
			userData.bidderId = userDetail._id;
			userData.date = todayDate;
			userData.time = time;
			if (bidderDetail == null || bidderDetail == undefined) {
				usersData.push(userData)
				localStorage.setItem('bidderDetail', JSON.stringify(usersData))
				localStorage.setItem('lastBidAmount', JSON.stringify(bidValue))
				this.setState({
					enterGreaterAmount: false,
					lastBidAmount: bidValue,
					bidValue: ''
				})
			}
			else {
				for (var i = 0; i < bidderDetail.length; i++) {
					usersData.push(bidderDetail[i])
				}
				usersData.push(userData)
				localStorage.setItem('bidderDetail', JSON.stringify(usersData))
				localStorage.setItem('lastBidAmount', JSON.stringify(bidValue))
				this.setState({
					enterGreaterAmount: false,
					lastBidAmount: bidValue,
					bidValue: ''
				})
			}

			let bookedBillboard = [];
			let booked = {}
			let bidBillboards = JSON.parse(localStorage.getItem('bidBillboards'));
			booked.companyName = userDetail.companyName;
			booked.companyId = userDetail._id;
			booked.address = billboardData.address;
			booked.city = billboardData.city;
			booked.state = billboardData.state;
			booked.bidAamount = bidValue;

			if (bidBillboards == null || bidBillboards == undefined) {
				bookedBillboard.push(booked)
				localStorage.setItem('bidBillboards', JSON.stringify(bookedBillboard))
			}
			else {
				for (var i = 0; i < bidBillboards.length; i++) {
					bookedBillboard.push(bidBillboards[i])
				}
				bookedBillboard.push(booked)
				localStorage.setItem('bidBillboards', JSON.stringify(bookedBillboard))
			}

		}
	}

	onChange = (e) => {
		const { enterGreaterAmount } = this.state;

		if (enterGreaterAmount) {
			this.setState({
				enterGreaterAmount: false,
			})
		}

		this.setState({
			bidValue: e.target.value,
		})
	}

	render() {
		const { lastBidAmount, enterGreaterAmount, bidValue } = this.state;
		const { data } = this.props;

		let image;
		if (data.images && data.images.length > 0) {
			image = data.images.map((elem, key) => {
				if (key == 0) {
					return <div className="carousel-item active">
						<img className="d-block w-100" src={elem} alt={key} style={{ width: '720px', height: "450px" }} />
					</div>
				}
				else {
					return <div className="carousel-item">
						<img className="d-block w-100" src={elem} alt={key} style={{ width: '720px', height: "450px" }} />
					</div>
				}
			})
		}
		return (
			<div>
				<div className="container">
					{enterGreaterAmount ? alert("Please Enter Greater amount from current bid amount") : null}
					<div className="row" style={{ margin: '0px', marginBottom: '1vw' }}>
						<div className="col-md-1"></div>
						<div className="col-md-10">
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
						<div className="col-md-1"></div>
					</div>
					<div className="row" style={{ margin: '0px' }}>
						<div className="col-md-4"></div>
						<div className="col-md-4">
							<div class="input-group">
								<input type="Number" className="form-control kurta3" placeholder="Enter bid price" value={bidValue} onChange={this.onChange} />
								<div className="input-group-append">
									<button type="button" className="btn btn-primary" onClick={this.bidingAmount}><span>Bid</span></button>
								</div>
							</div>
						</div>
						<div className="col-md-4"></div>
					</div>
					<br />
					<div className="row" style={{ margin: '0px' }}>
						<div className="col-md-2"></div>
						<div className="col-md-8">
							<div className="row doesit1" style={{ margin: '0px' }}>
								<span className="doesit2">Billboard in {data.billboardCity} Millitary Road City Point Details</span>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 doesit5"><span className="doesit3">Current amount</span></div>
								<div className="col-md-9 doesit6"><span className="doesit4">Rs. {lastBidAmount}</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 doesit5"><span className="doesit3">Min.Bid</span></div>
								<div className="col-md-9 doesit6"><span className="doesit4">Rs. {data.minBidAmount}</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 doesit7"><span className="doesit3">Bid Start</span></div>
								<div className="col-md-9 doesit6"><span className="doesit4">{data.biddingStartDate} - {data.biddingStartTime}</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 doesit7"><span className="doesit3">Bid End</span></div>
								<div className="col-md-9 doesit6"><span className="doesit4">{data.biddingEndDate} - {data.biddingEndTime}</span></div>
							</div>
							{/* <div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 doesit5"><span className="doesit3">Time Remaining</span></div>
								<div className="col-md-9 doesit6"><span className="doesit4">10 hour 10 mins 10 second</span></div>
							</div> */}
						</div>
						<div className="col-md-2"></div>
					</div>
				</div> <br />
			</div>
		);
	}
}
export default Billofpanel1;