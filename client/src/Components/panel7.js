import React, { Component } from 'react';
import Comman2 from './Comman2/billBoard_market2';
import './home.scss';

class Panel7 extends Component {
	render() {
		return (
			<div>
				<div className="container animated animatedFadeInUp fadeInUp" style={{ "backgroundImage": "url('../images/dropdown2.png')" }}>
					<div className="row">
						<div className="col-2 col-md-4 col-lg-4 col-xl-4"></div>
						<div className="col-8 col-md-4 col-lg-4 col-xl-4 line2"><h2 className="pakola1">FEATURED ADS</h2></div>
						<div className="col-2 col-md-4 col-lg-4 col-xl-4"></div>
					</div>
					<div className="row">
						<div className="col-2 col-md-5 col-lg-5 col-xl-5"></div>
						<div className="col-8 col-md-2 col-lg-2 col-xl-2 hrline"></div>
						<div className="col-2 col-md-5 col-lg-5 col-xl-5"></div>
					</div><br />
					<Comman2 /><br />
				</div><br />
			</div>
		);
	}
}

export default Panel7;
