import React, { Component } from 'react';
import './buyer.scss';

class Buyerbanner extends Component {
	render() {
		return (
			<div>
				<div className="row" style={{ margin: '0px' }}>
					<img src="./images/about-banner.png" alt='img' className="apple1" />
				</div>
				<div>
					<div className="container apple2">
						<h4><span className="apple3">BUYER</span></h4>
					</div>
				</div>
			</div>
		);
	}
}

export default Buyerbanner;