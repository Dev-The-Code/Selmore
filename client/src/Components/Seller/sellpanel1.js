import React, { Component } from 'react';
import Homepanel4 from '../panel4';
import './seller.scss';

class Sellpanel1 extends Component {
	render() {
		return (
			<div><br />
				<div className="container gone1">
					<div>
						<span className="pak1">WELCOME MR.SELLER TO SELMORE</span>
					</div>
					<div className="row">
						<div className="col-md-2 col-5 pak2"></div>
						<div className="col-md-10 col-7"></div>
					</div><br /><br />
					<div>
						<span className="pak1">HOW SELMORE CAN HELP ME AS A SELLER?</span>
					</div>
					<div className="row">
						<div className="col-md-2 col-5 pak2"></div>
						<div className="col-md-10 col-7"></div>
					</div><br />
					<div>
						<ul>
							<li>Make money from new / unique advertising opportunities</li>
							<li>Selmore makes all your advertising space profitable</li>
							<li>Meet Local, National and Global advertising buyers</li>
							<li>Reach beyond buyers in your local market</li>
							<li>More exposure for your advertising space which will surely bring more sales!</li>
							<li>Create an incremental revenue stream for your business</li>
						</ul>
					</div>
				</div><br />
				<Homepanel4 />
			</div>
		);
	}
}

export default Sellpanel1;