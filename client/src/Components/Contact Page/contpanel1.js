import React, { Component } from 'react';
import Homepanel4 from '../panel4';
import './contact.scss';

class Contpanel1 extends Component {
	render() {
		return (
			<div>
				<div className="container proroute">
					<div>
						<span className="ball2">ADD YOUR ADVERTISING COMPANY AT SELMORE.COM<br />
							AND GRAB YOUR CLIENTS EASILY!</span>
					</div>
					<div className="row">
						<div className="col-md-1 col-5 ball3"></div>
						<div className="col-md-11 col-7"></div>
					</div>
					<div>
						<p style={{ marginTop: '1%' }}><span className="ghupshap1">If your intrested in listing your ads on Selmore.com get listed today,just contact us.<br />
							Phone: +92-232-000000 or +92-234-000000 <br />
							Email: support@selmore.com</span></p>
					</div><br />
					<div>
						<span className="ball2">YOUR BENEFITS AS A VERIFIED SELLER ON SELMORE.COM</span>
					</div>
					<div className="row">
						<div className="col-md-1 col-5 ball3"></div>
						<div className="col-md-11 col-7"></div>
					</div>
					<div>
						<p style={{ marginTop: '1%' }}><span className="ghupshap1">List your ads free<br />
							Opportunity to reach millions of customers<br />
							Meet Local,National revenue stream for your business<br />
							and many more</span></p>
					</div><br />
					<div>
						<span className="ball2">If you have any other query please respond to us at support@selmore.com</span>
					</div>
				</div>	<br />
				<Homepanel4 />
			</div>
		);
	}
}
export default Contpanel1;