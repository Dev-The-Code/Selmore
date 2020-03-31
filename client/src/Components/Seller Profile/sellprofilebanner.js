import React, { Component } from 'react';
import './sellprofile.scss';

class Sellprofilebanner extends Component {
	render() {
		return (
			<div>
				<div className="row" style={{ margin: '0px' }}>
					<img src="./images/about-banner.png" alt='img' className="wire1" />
				</div>
				<div>
					<div className="container wire2">
						<h4><span className="wire3">SELLER PROFILE</span></h4>
					</div>
				</div>
				<div className="cable4">
					<div className="container cable5">
						<ol>
							<ul className="cable1"><a href="#"><span className="cable3">HOME</span></a></ul>
							<ul className="cable2"><a href="#"><span className="cable3">> CATEGORY</span></a></ul>
							<ul className="cable2"><a href="#"><span className="cable3">> BILLBOARD</span></a></ul>
							<ul className="cable2"><a href="#"><span className="cable3">> SELLER PROFILE</span></a></ul>
						</ol>
					</div>
				</div>
			</div>
		);
	}
}
export default Sellprofilebanner;