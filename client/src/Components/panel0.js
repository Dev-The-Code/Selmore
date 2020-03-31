import React, { Component } from 'react';
import './home.scss';
import { Link } from 'react-router-dom';
import CommanMarket from './Comman/billBoard_marketPlace';

class Panel0 extends Component {
	render() {
		return (
			<div>
				<div className="container animated animatedFadeInUp fadeInUp">
					<div className="row">
						<div className="col-md-4"></div>
						<div className="col-md-4 line2"><h2 className="pakola1">BILLBOARDS</h2></div>
						<div className="col-md-4"></div>
					</div>
					<div className="row">
						<div className="col-md-5 col-4"></div>
						<div className="col-md-2 col-4 hrline"></div>
						<div className="col-md-5 col-4"></div>
					</div><br />
					<CommanMarket />
					<div className="row moon2">
						<div className="container fanta4">
							<Link to={`/market_place`}><button type="button" className="btn btn-light yup"><span className="moon">SEE MORE</span></button></Link>
						</div>
					</div>
				</div>
				<br/>
				
				<div className="container animated animatedFadeInUp fadeInUp">
					<div className="row">
						<div className="col-md-4"></div>
						<div className="col-md-4 line2"><h2 className="pakola1">Mega Sale</h2></div>
						<div className="col-md-4"></div>
					</div>
					<div className="row">
						<div className="col-md-5 col-4"></div>
						<div className="col-md-2 col-4 hrline"></div>
						<div className="col-md-5 col-4"></div>
					</div><br />
					<CommanMarket />
					<div className="row moon2">
						<div className="container fanta4">
							<Link to={`/market_place`}><button type="button" className="btn btn-light yup"><span className="moon">SEE MORE</span></button></Link>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Panel0;