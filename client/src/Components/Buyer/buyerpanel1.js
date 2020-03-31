import React, { Component } from 'react';
import Homepanel4 from '../panel4';
import './buyer.scss';

class Buyerpanel1 extends Component {
	render() {
		return (
			<div>
				<br />
				<div className="container gone4">
					<div>
						<span className="apple9">SO YOU ARE MR.BUYER ? WELCOME TO SELMOER</span>
					</div>
					<div className="row">
						<div className="col-md-2 col-5 apple10"></div>
						<div className="col-md-10 col-7"></div>
					</div>
					<div>
						<p><span className="">here you will find your desire add space quicly and easily</span></p>
					</div><br />
					<div>
						<span className="apple9">WHAT CAN I GET FROM SELMORE ?</span>
					</div>
					<div className="row">
						<div className="col-md-2 col-5 apple10"></div>
						<div className="col-md-10 col-7"></div>
					</div><br />
					<div>
						<ul style={{ marginLeft: '-3%' }}>
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

export default Buyerpanel1;