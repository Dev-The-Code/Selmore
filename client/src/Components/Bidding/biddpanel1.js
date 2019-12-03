import React, { Component } from 'react';
import './bidding.css';
import { Link } from 'react-router-dom';

class Biddpanel1 extends Component {
	render() {
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col-12 col-md-4 col-lg-4 col-xl-4">
							<div class="card_bidding">
								<img class="card-img-top cardImag" src="./images/bill1.png" alt="Card image" style={{ width: '100%' }} />
								<div class="card-body">
									<h4 class="card-title">Jama cloth, Karachi</h4>
									<p class="card-text">Bidding Available : <br />From <span className="bidTiming">21st Nov 2019</span> to <span className="bidTiming">28th 2020</span></p>
									<Link to={`/bidding_detail`}>
										<button class="btn btn-primary">
											Start Bidding
										</button>
									</Link>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-4 col-lg-4 col-xl-4">
							<div class="card_bidding">
								<img class="card-img-top cardImag" src="./images/bill2.png" alt="Card image" style={{ width: '100%' }} />
								<div class="card-body">
									<h4 class="card-title">Main market, Lahore</h4>
									<p class="card-text">Bidding Available : <br />From <span className="bidTiming">5th Dec 2019</span> to <span className="bidTiming">15th Dec 2020</span></p>
									<Link to={`/bidding_detail`}>
										<button class="btn btn-primary">
											Start Bidding
										</button>
									</Link>
								</div>
							</div>
						</div>
						<div className="col-12 col-md-4 col-lg-4 col-xl-4">
							<div class="card_bidding">
								<img class="card-img-top cardImag" src="./images/bill1.png" alt="Card image" style={{ width: '100%' }} />
								<div class="card-body">
									<h4 class="card-title">Sharah e Faisal, Karachi</h4>
									<p class="card-text">Bidding Available : <br />From <span className="bidTiming">25th Dec 2019</span> to <span className="bidTiming">5 Jan 2020</span></p>
									<Link to={`/bidding_detail`}>
										<button class="btn btn-primary">
											Start Bidding
										</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div><br />
			</div>
		);
	}
}

export default Biddpanel1;