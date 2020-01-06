import React, { Component } from 'react';
import './bidding.css';
import { Link } from 'react-router-dom';
import { HttpUtils } from '../../Services/HttpUtils';
import moment from 'moment';

class Biddpanel1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			biddingBillboards: []
		}
	}

	componentDidMount() {
		this.getBiddingBillboard()
	}

	componentWillUnmount() {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}

	getBiddingBillboard = async () => {
		let response = await HttpUtils.get('getbiddingbillboard');
		let biddingBillboards = []
		if (response.code == 200) {
			this.interval = setInterval(() => {
				let data = response.content;
				data.map((elem, key) => {
					let elemObj = elem;
					let timeTillDateStart = `${`${elemObj.biddingEndDate}, ${elemObj.biddingEndTime}`}`;
					const now = moment();
					const then = moment(timeTillDateStart);
					// const countdown = moment(then - now);
					// const days = countdown.format('D');
					// const hours = countdown.format('HH');
					// const minutes = countdown.format('mm');
					// const seconds = countdown.format('ss');
					// elemObj.days = days;
					// elemObj.hours = hours;
					// elemObj.minutes = minutes;
					// elemObj.seconds = seconds;

					var totalSec = then.diff(now, 'seconds');
					var hours = parseInt(totalSec / 3600);
					var minutes = parseInt(totalSec / 60) % 60;
					var seconds = totalSec % 60;
					var calculateTime = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
					elemObj.calculateTime = calculateTime;
					biddingBillboards.push(elemObj)
				})
				this.setState({
					biddingBillboards: biddingBillboards
				})
				biddingBillboards = [];
			}, 1000);
			// this.setState({
			// 	biddingBillboards: response.content
			// })
		}
	}
	render() {
		const { biddingBillboards } = this.state;
		return (
			<div>
				<div className="container">
					<div className="row">
						{biddingBillboards && biddingBillboards.map((elem, key) => {
							return (
								<div className="col-12 col-md-4 col-lg-4 col-xl-4">
									<div class="card_bidding">
										<img class="card-img-top cardImag" src={elem.images[0]} alt="Card image" style={{ width: '100%' }} />
										<div class="card-body">
											<h4 class="card-title">{elem.billboardAddress}, {elem.billboardCity}</h4>
											<h4 class="card-title"> </h4>
											<p class="card-text">DEAL EXPIRE IN: 
											<span className="bidTiming"> {`${elem.calculateTime}`}</span>

											{/* <br />
												<span className="bidTiming"> {elem.days}</span> DAYS
													<span className="bidTiming"> {elem.hours}</span> HOURS
													<span className="bidTiming"> {elem.minutes}</span> MINUTES
													<br />
													<span className="bidTiming"> {elem.seconds}</span> SECONDS */}
											{/* From <span className="bidTiming"> {elem.biddingStartDate}, {elem.biddingStartTime}</span> 
											to <span className="bidTiming"> {elem.biddingEndDate}, {elem.biddingEndTime}</span> */}
											</p>
											<Link to={{ pathname: `/bidding_detail/${elem._id}`, state: elem }}>
												<button class="btn btn-primary">
													Start Bidding
										</button>
											</Link>
										</div>
									</div>
								</div>)
						})}

						{/* <div className="col-12 col-md-4 col-lg-4 col-xl-4">
							<div class="card_bidding">
								<img class="card-img-top cardImag" src="./images/bill1.png" alt="Card image" style={{ width: '100%' }} />
								<div class="card-body">
									<h4 class="card-title">Jama cloth, Karachi</h4>
									<p class="card-text">Bidding availability : <br />From <span className="bidTiming">21st Nov 2019, 6:00:00</span> to <span className="bidTiming">28th 2020, 8:00:00</span></p>
									<Link to={`/bidding_detail`}>
										<button class="btn btn-primary">
											Start Bidding
										</button>
									</Link>
								</div>
							</div>
						</div> */}
						{/* <div className="col-12 col-md-4 col-lg-4 col-xl-4">
							<div class="card_bidding">
								<img class="card-img-top cardImag" src="./images/bill1.png" alt="Card image" style={{ width: '100%' }} />
								<div class="card-body">
									<h4 class="card-title">Jama cloth, Karachi</h4>
									<p class="card-text">Bidding availability : <br />From <span className="bidTiming">21st Nov 2019, 6:00:00</span> to <span className="bidTiming">28th 2020, 8:00:00</span></p>
									<Link to={`/bidding_detail`}>
										<button class="btn btn-primary">
											Start Bidding
										</button>
									</Link>
								</div>
							</div>
						</div> */}
					</div>
				</div><br />
			</div>
		);
	}
}

export default Biddpanel1;