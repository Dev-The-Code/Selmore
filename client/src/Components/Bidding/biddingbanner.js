import React, { Component } from 'react';
import './bidding.css';

class Biddingbanner extends Component {
	render() {
		return (
			<div>
				<div className="row" style={{ margin: '0px' }}>
					<img src="./images/about-banner.png" alt ='img' className="cultus1" />
				</div>
				<div>
					<div className="container cultus2">
						<h4><span className="cultus3">BIDDING</span></h4>
					</div>
				</div>
				<div className="cultus4">
					<div className="container cultus8">
						<ol>
							<ul className="cultus5"><a href="#"><span className="cultus7">HOME</span></a></ul>
							<ul className="cultus6"><a href="#"><span className="cultus7">> LISTINGS</span></a></ul>
						</ol>
					</div>
				</div><br />
			</div>
		);
	}
}

export default Biddingbanner;