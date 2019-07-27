import React, { Component } from 'react';
import './bidding.css';
import { Link } from 'react-router-dom';

class Biddpanel1 extends Component {
	render() {
		return (
			<div>
				<div className="row" style={{ margin: '0px' }}>
					<div className="col-md-4 note1">
						<div className="note2  bango2  shah2">
							<img src="./images/bill1.png" alt ='img' className="picsize" />
							<div id="shah1">
								<div className="bango1">
									<p>Price: 1500/month<br />
										Listed on: 2019-1-20<br />
										Location: sukkar<br />
										Status: Available
				      			</p>
								</div>
							</div>
						</div>
						<div className="note3" style={{ color: 'white' }}>
							<div>
								<p className="secure1">Lahore</p>
								<p className="secure2"><button type="button" className="btn btn-primary secure3"><Link rel="noopener noreferrer" to={`/bidding_karachi`} style={{ color: "white" }}>BIDDING</Link></button></p>
							</div>
						</div>
					</div>
					<div className="col-md-4 text-center">
						<div className="note2  bango2  shah2">
							<img src="./images/bill2.png" alt ='img' className="picsize" />
							<div id="shah1">
								<div className="bango3">
									<p>Price: 1500/month<br />
										Listed on: 2019-1-20<br />
										Location: sukkar<br />
										Status: Available
				      			</p>
								</div>
							</div>
						</div>
						<div className="note4">
							<div style={{ color: 'white' }}>
								<p className="secure1">Shabbi</p>
								<p className="secure2"><button type="button" className="btn btn-primary secure3">BIDDING</button></p>
							</div>
						</div>
					</div>
					<div className="col-md-4 secure4">
						<div className="note2  bango2  shah2">
							<img src="./images/bill3.png" alt ='img' className="picsize" />
							<div id="shah1">
								<div className="bango3">
									<p>Price: 1500/month<br />
										Listed on: 2019-1-20<br />
										Location: sukkar<br />
										Status: Available
				      			</p>
								</div>
							</div>
						</div>
						<div className="note5">
							<div style={{ color: 'white' }}>
								<p className="secure1">Karachi</p>
								<p className="secure2"><button type="button" className="btn btn-primary secure3">BIDDING</button></p>
							</div>
						</div>
					</div>
				</div>
				<div className="row" style={{ margin: '0px' }}>
					<div className="col-md-4 note1">
						<div className="note2  bango2  shah2">
							<img src="./images/bill1.png" alt ='img' className="picsize" />
							<div id="shah1">
								<div className="bango1">
									<p>Price: 1500/month<br />
										Listed on: 2019-1-20<br />
										Location: sukkar<br />
										Status: Available
				      			</p>
								</div>
							</div>
						</div>
						<div className="note3">
							<div style={{ color: 'white' }}>
								<p className="secure1">Lahore</p>
								<p className="secure2"><button type="button" className="btn btn-primary secure3">BIDDING</button></p>
							</div>
						</div>
					</div>
					<div className="col-md-4 text-center">
						<div className="note2  bango2  shah2">
							<img src="./images/bill2.png" alt ='img' className="picsize" />
							<div id="shah1">
								<div className="bango3">
									<p>Price: 1500/month<br />
										Listed on: 2019-1-20<br />
										Location: sukkar<br />
										Status: Available
				      			</p>
								</div>
							</div>
						</div>
						<div className="note4">
							<div style={{ color: 'white' }}>
								<p className="secure1">Shabbi</p>
								<p className="secure2"><button type="button" className="btn btn-primary secure3">BIDDING</button></p>
							</div>
						</div>
					</div>
					<div className="col-md-4 secure4">
						<div className="note2  bango2  shah2">
							<img src="./images/bill3.png" alt ='img' className="picsize" />
							<div id="shah1">
								<div className="bango3">
									<p>Price: 1500/month<br />
										Listed on: 2019-1-20<br />
										Location: sukkar<br />
										Status: Available
				      			</p>
								</div>
							</div>
						</div>
						<div className="note5">
							<div style={{ color: 'white' }}>
								<p className="secure1">Karachi</p>
								<p className="secure2"><button type="button" className="btn btn-primary secure3">BIDDING</button></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Biddpanel1;
