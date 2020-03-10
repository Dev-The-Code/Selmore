import React, { Component } from 'react';
import './billboards.scss';

class Billboardsbanner extends Component {
	render() {
		return (
			<div>
				<div className="row" style={{ margin: '0px' }}>
					<img src="./images/about-banner.png" alt='img' className="envato1" />
				</div>
				<div>
					<div className="container envato2">
						<h4><span className="envato3">BILLBOARDS</span></h4>
					</div>
				</div>
				<div className="envato7">
					<div className="container envato8">
						<ol>
							<ul className="envato4"><a href="#"><span className="envato6">HOME</span></a></ul>
							<ul className="envato5"><a href="#"><span className="envato6">> CATEGORY</span></a></ul>
							<ul className="envato5"><a href="#"><span className="envato6">> BILLBOARDS</span></a></ul>
						</ol>
					</div>
				</div>
			</div>
		);
	}
}
export default Billboardsbanner;