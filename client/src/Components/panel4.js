import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './home.scss';

class Panel4 extends Component {
	render() {
		return (
			<div>
				<div className="row exi2 animated animatedFadeInUp fadeInUp" style={{ margin: '0px' }}>
					<div className="container exi2">
						<div className="row">
							<div className="col-md-1"></div>
							<div className="col-md-8 pakola3">
								<h4 className="exi3">ARE YOU INTERESTED IN LISTING YOUR ADS?</h4>
								<p className="cell2"><span className="exi4">if you are ads/media owner and interested in listing your add on selmore.com ,
						Just Click on Get Started<br /> and start listing you add</span></p>
							</div>
							<div className="col-md-2"></div>
							<div className="col-md-0"></div>
						</div>
						<div className="row">
							<div className="col-md-1"></div>
							<div className="col-md-8"></div>
							<div className="col-md-2 cell5 moon5" style={{ marginLeft: '-2%', marginTop: '-2%' }}>
								<button type="button" className="btn cell3"> <Link rel="noopener noreferrer" to={`/contact`}><span className="cell4">GET STARTED</span></Link></button>
							</div>
							<div className="col-md-1"></div>
						</div>
					</div>
				</div>	<br />
			</div>
		);
	}
}

export default Panel4;
