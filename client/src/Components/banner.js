import React, { Component } from 'react';
import './home.scss';
import { Link } from 'react-router-dom';


class Banner extends Component {
	render() {
		return (
			<div style={{backgoundColor:'#19303a'}}>
				<div className="container animated animatedFadeInUp fadeInUp" style={{ paddingLeft: '0px' }}>
					<div className="row rowcolor" style={{ marginLeft: '0px' }}>
						<div className="col-md-8 col-sm-8 bannercol8">
							<h1 className="weight"><strong><span className="textwhite1">PAKISTAN<br /> OUTDOOR ADVERTISING <br /> PORTAL</span></strong></h1><br />
							<p className="right">Search for Unique Advertising opportising from 128 ad Listing in Pakistan</p><br />
							<button type="button" className="btn btn-lg btncolor1"> <Link rel="noopener noreferrer" to={`/contact`}><span className="contbutton">Contact Us</span></Link></button>
						</div>
						<div className="col-md-4 col-sm-4">
							<img src="../images/bodr-on.png" alt='img' className="tikimage" />
						</div>
					</div>
				</div><br />


			</div>
		);
	}
}

export default Banner;