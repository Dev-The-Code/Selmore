import React, { Component } from 'react';
import './billmilitary.scss';

class Militarybanner extends Component {
	render() {
		return (
			<div>
				<div className="row" style={{ margin: '0px' }}>
					<img src="./images/about-banner.png" alt='img' className="soldier1" />
				</div>
				<div>
					<div className="container soldier2">
						<h4><span className="soldier3">BILLBOARDS</span></h4>
					</div>
				</div>
				<div className="soldier7">
					<div className="container soldier8">
						<ol>
							<ul className="soldier4"><a href="#"><span className="soldier6">HOME</span></a></ul>
							<ul className="soldier5"><a href="#"><span className="soldier6">> CATEGORY</span></a></ul>
							<ul className="soldier5"><a href="#"><span className="soldier6">> BILLBOARDS</span></a></ul>
							<ul className="soldier5"><a href="#"><span className="soldier6">> MILITARY ROAD CITY POINT</span></a></ul>
						</ol>
					</div>
				</div>
			</div>
		);
	}
}
export default Militarybanner;