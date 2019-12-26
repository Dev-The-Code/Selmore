import React, { Component } from 'react';
import './bidding.css';
import { Link } from 'react-router-dom';
import { HttpUtils } from '../../Services/HttpUtils';

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

	getBiddingBillboard = async () => {
		let response = await HttpUtils.get('getbiddingbillboard');
		console.log(response, 'response')
		if (response.code == 200) {
			this.setState({
				biddingBillboards: response.content
			})
		}
	}
	render() {
		const { biddingBillboards } = this.state;
		console.log(biddingBillboards, 'biddingBillboards')
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
											<h4 class="card-title">{elem.billboardAddress},</h4>
											<h4 class="card-title"> {elem.billboardCity}</h4>
											<p class="card-text">Bidding availability : <br />From
									<span className="bidTiming"> {elem.biddingStartDate}, {elem.biddingStartTime}</span> to
									<span className="bidTiming"> {elem.biddingEndDate}, {elem.biddingEndTime}</span></p>
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