import React, { Component } from 'react';
import NumberFormat from 'react-number-format';
import './billofbidding.scss';
import { HttpUtils } from '../../Services/HttpUtils';
import moment from 'moment';
import { Input, Spin, Icon, notification } from 'antd';

class Billofpanel1 extends Component {
	constructor(props) {
		super(props)
		this.state = {
			lastBidAmount: '',
			bidValue: '',
			enterGreaterAmount: false,
			todayDate: '',
			time: '',
			monthName: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			billboardData: [],
			days: undefined,
			hours: undefined,
			minutes: undefined,
			seconds: undefined,
			loader: false,
			mgs: '',
			isAlert: false,
		}
	}

	componentDidMount() {
		const { monthName } = this.state;
		let date = new Date().getDate();
		let month = new Date().getMonth();
		const year = new Date().getFullYear();
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
			todayDate: date + '-' + monthName[month] + '-' + year,
			time: time,
		})

		this.lastBidingData()
		this.billboardData()
		this.countdownTime()
	}

	lastBidingData = async () => {
		const { data } = this.props;
		let obj = {
			id: data._id
		}
		let biddingBiggerAmount = 0;
		let response = await HttpUtils.post('getspecificBiddingbillboardHistory', obj);
		if (response) {
			if (response.code == 200) {
				if (response.content.length > 0) {
					let biddingData = response.content;
					for (var i in biddingData) {
						if (Number(biddingData[i].bidAamount) > Number(biddingBiggerAmount)) {
							biddingBiggerAmount = biddingData[i].bidAamount;
							this.setState({
								lastBidAmount: biddingBiggerAmount
							})
						}
					}
				}
				else {
					this.setState({
						lastBidAmount: data.minBidAmount
					})
				}
			}
		}
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
					billboardData: response.content[0],
				})

			}
		}
	}

	countdownTime = () => {
		this.interval = setInterval(() => {
			let data = this.props.data;
			let timeTillDateStart = `${`${data.biddingEndDate}, ${data.biddingEndTime}`}`;
			const now = moment();
			const then = moment(timeTillDateStart);
			let duration = moment.duration(then.diff(now))
			const days = (duration._data.days < 10 ? "0" + duration._data.days : duration._data.days);
			const hours = (duration._data.hours < 10 ? "0" + duration._data.hours : duration._data.hours);
			const minutes = (duration._data.minutes < 10 ? "0" + duration._data.minutes : duration._data.minutes);
			const seconds = (duration._data.seconds < 10 ? "0" + duration._data.seconds : duration._data.seconds);
			this.setState({ days, hours, minutes, seconds });
		}, 1000);
	}

	onChange = (e) => {
		this.setState({
			bidValue: e.target.value,
		})
	}



	bidingAmount = async () => {
		const { bidValue, lastBidAmount, todayDate, time, billboardData } = this.state;
		const { data } = this.props;
		this.setState({
			loader: false
		})
		if (Number(bidValue) > Number(lastBidAmount)) {
			this.setState({
				enterGreaterAmount: false
			})
			let userDetail = JSON.parse(localStorage.getItem('userData'));
			let bidderData = {}
			bidderData.bidAamount = bidValue;
			bidderData.date = todayDate;
			bidderData.time = time;
			bidderData.biddingBillboardId = data._id;
			bidderData.billboardAvailabilityFrom = data.billboardAvailabilityFrom;
			bidderData.billboardAvailabilityTo = data.billboardAvailabilityTo;
			bidderData.companyName = userDetail.companyName;
			bidderData.companyEmail = userDetail.email;
			bidderData.companyLandlineNo = userDetail.landlineNo;
			bidderData.companyId = userDetail._id;
			bidderData.address = billboardData.address;
			bidderData.city = billboardData.city;
			bidderData.state = billboardData.state;
			bidderData.billboardId = billboardData._id;
			bidderData.objectId = '';

			let response = await HttpUtils.post('biddingHistory', bidderData);

			if (response) {
				if (response.code == 200) {
					this.setState({
						loader: false,
					})
					this.openNotification()
				}
			}

		}
		else {
			this.setState({
				enterGreaterAmount: true
			})
		}
	}

	openNotification() {
		notification.open({
			message: 'Success ',
			description: 'Your amount simitted succesfully',
		});
		window.location.reload(true);
	};


	componentWillUnmount() {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}

	render() {
		const { lastBidAmount, enterGreaterAmount, bidValue, days, hours, minutes, seconds, loader } = this.state;
		const { data } = this.props;

		// Mapping the date values to radius values
		const daysRadius = mapNumber(days, 30, 0, 0, 360);
		const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
		const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
		const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

		const value = JSON.parse(localStorage.getItem("loggedIn"));
		const antIcon = <Icon type="loading" style={{ fontSize: 24, marginRight: '10px' }} spin />;

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
					{/* {enterGreaterAmount ? alert("Please Enter Greater amount from current bid amount") : null} */}

					<div className="row" style={{ margin: '0px' }}>
						<div className="col-md-12">
							<h1 className="countDownMega">Countdown</h1>
							<div className="countdown-wrapper">
								{days && (
									<div className="countdown-item">
										<SVGCircle radius={daysRadius} />
										{days}
										<span>days</span>
									</div>
								)}
								{hours && (
									<div className="countdown-item">
										<SVGCircle radius={hoursRadius} />
										{hours}
										<span>hours</span>
									</div>
								)}
								{minutes && (
									<div className="countdown-item">
										<SVGCircle radius={minutesRadius} />
										{minutes}
										<span>minutes</span>
									</div>
								)}
								{seconds && (
									<div className="countdown-item">
										<SVGCircle radius={secondsRadius} />
										{seconds}
										<span>seconds</span>
									</div>
								)}
							</div>
						</div>
					</div><br />
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
								<Input type="Number" className="form-control kurta3" placeholder="Enter bid price" value={bidValue} onChange={this.onChange} />
								<div className="input-group-append">
									{value && !loader ?
										<button type="button" className="btn btn-primary" onClick={this.bidingAmount}><span>Bid</span></button>
										:
										<button type="button" className="btn btn-primary" disabled><span>Bid</span></button>
									}
								</div>
								{loader && <Spin className="col-xs-2 col-md-6" indicator={antIcon} />}

							</div>
							{enterGreaterAmount ? <span>Please Enter Greater amount from current bid amount</span> : null}

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
								<div className="col-md-9 doesit6">
									<NumberFormat value={lastBidAmount} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />

									{/* <span className="doesit4">Rs. {lastBidAmount}</span> */}
								</div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 doesit5"><span className="doesit3">Min.Bid</span></div>
								<div className="col-md-9 doesit6">
									<span className="doesit4">Not Met</span>
								</div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 doesit7"><span className="doesit3">Bid Start</span></div>
								<div className="col-md-9 doesit6"><span className="doesit4">{data.biddingStartDate} - {data.biddingStartTime}</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 doesit7"><span className="doesit3">Bid End</span></div>
								<div className="col-md-9 doesit6"><span className="doesit4">{data.biddingEndDate} - {data.biddingEndTime}</span></div>
							</div>
						</div>
						<div className="col-md-2"></div>
					</div>
				</div> <br />
			</div>
		);
	}
}
export default Billofpanel1;


const SVGCircle = ({ radius }) => (
	<svg className="countdown-svg">
		<path
			fill="none"
			stroke="#333"
			stroke-width="4"
		// d={describeArc(50, 50, 48, 0, radius)}
		/>
	</svg>
);

// From StackOverflow: https://stackoverflow.cm/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
	var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

	return {
		x: centerX + radius * Math.cos(angleInRadians),
		y: centerY + radius * Math.sin(angleInRadians)
	};
}

function describeArc(x, y, radius, startAngle, endAngle) {
	var start = polarToCartesian(x, y, radius, endAngle);
	var end = polarToCartesian(x, y, radius, startAngle);
	var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
	var d = [
		'M',
		start.x,
		start.y,
		'A',
		radius,
		radius,
		0,
		largeArcFlag,
		0,
		end.x,
		end.y
	].join(' ');

	return d;
}

// From StackOverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers

function mapNumber(number, in_min, in_max, out_min, out_max) {
	return (
		((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
	);
}
