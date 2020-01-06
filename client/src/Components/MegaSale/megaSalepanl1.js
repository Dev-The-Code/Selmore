import React, { Component } from 'react';
import './megaSale.css';
import { Link, Redirect } from 'react-router-dom';
import { HttpUtils } from '../../Services/HttpUtils';
import moment from 'moment';

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
				<div className="container">
					<div className="row">
						<div class="col-1 col-md-2 col-lg-2 col-xl-2"></div>
						<div className="col-10 col-md-8 col-lg-8 col-xl-8">
							{megaSaleBiilboards && megaSaleBiilboards.map((elem, key) => {
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
												{/* <span className="megaPageTiming"> {`${elem.hours}:${elem.minutes}:${elem.seconds}`}</span> */}
												<span className="megaPageTiming"> {`${elem.calculateTime}`}</span>

													{/* <br /> */}
													{/* From <span className="megaPageTiming">{elem.saleStartDate}</span>
													to <span className="megaPageTiming"> {elem.saleEndDate}</span> */}
													{/* <span className="megaPageTiming"> {elem.hours}</span>:
													<span className="megaPageTiming"> {elem.minutes}</span>:
													<span className="megaPageTiming"> {elem.seconds}</span> */}

												</p>
												{/* <Link to={{ pathname: `/megaDetail/${elem._id}`, state: elem }}>
													<button class="btn btn-primary">
														More Details
												</button>
												</Link> */}
												<button class="btn btn-primary" onClick={this.billboardData.bind(this, elem)}>
													More Details
												</button>
											</div>
										</div>
									</div>
								)
							})}
						</div>
						<div class="col-1 col-md-2 col-lg-2 col-xl-2"></div>
					</div>
				</div>
			</div>
		);
	}
}

export default MegaSalepanel1;