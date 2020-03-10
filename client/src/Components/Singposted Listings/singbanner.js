import React, { Component } from 'react';
import './singposted.scss';

class Singbanner extends Component {
	render() {
		return (
			<div>
				<div className="row" style={{ margin: '0px' }}>
					<img src="./images/about-banner.png" alt='img' className="flyover1" />
				</div>
				<div>
					<div className="container flyover2">
						<h4><span className="flyover3">SINGNPOSTED LISTINGS</span></h4>
					</div>
				</div>
				<div className="flyover7">
					<div className="container flyover8">
						<ol>
							<ul className="flyover4"><a href="#"><span className="flyover6">HOME</span></a></ul>
							<ul className="flyover5"><a href="#"><span className="flyover6">> CATEGORY</span></a></ul>
							<ul className="flyover5"><a href="#"><span className="flyover6">> BILLBOARDS</span></a></ul>
							<ul className="flyover5"><a href="#"><span className="flyover6">> SINGNPOSTED LISTINGS</span></a></ul>
						</ol>
					</div>
				</div>
			</div>
		);
	}
}
export default Singbanner;