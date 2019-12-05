import React, { Component } from 'react';
import Popform from '../Popform/popform';
import NumberFormat from 'react-number-format';
import './billofbidding.css';

class Billofpanel1 extends Component {
	render() {
		return (
			<div>
				<div className="container">
					<div className="row" style={{ margin: '0px' }}>
						<div className="col-md-1"></div>
						<div className="col-md-10">
							<div className="kurta1">
								<h3 className="kurta2">SLIDER</h3>
							</div>
						</div>
						<div className="col-md-1"></div>
					</div>
					<div className="row" style={{ margin: '0px' }}>
						<div className="col-md-4"></div>
						<div className="col-md-4">
							<div class="input-group">
								<NumberFormat className="form-control kurta3" thousandSeparator={true} prefix={'Rs.'}  placeholder="Enter bid price" />
								{/* <input type="number" className="form-control kurta3" pattern="^\$\d{1,3}(,\d{3})*(\.\d+)?$" placeholder="Post Your Bidding" /> */}
								<div className="input-group-append">
									<button type="button" className="btn btn-primary"><span>Bid</span></button>
								</div>
							</div>
						</div>
						<div className="col-md-4"></div>
					</div>
					<div className="modal" id="myModal">
						<Popform />
					</div>
					<br />
					<div className="row" style={{ margin: '0px' }}>
						<div className="col-md-2"></div>
						<div className="col-md-8">
							<div className="row doesit1" style={{ margin: '0px' }}>
								<span className="doesit2">Billboard in Sukkur Millitary Road City Point Details</span>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 doesit5"><span className="doesit3">Current amount</span></div>
								<div className="col-md-9 doesit6"><span className="doesit4">$ 2600.00</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 doesit5"><span className="doesit3">Current bid</span></div>
								<div className="col-md-9 doesit6"><span className="doesit4">$ 2000.00</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 doesit5"><span className="doesit3">Min.Bid</span></div>
								<div className="col-md-9 doesit6"><span className="doesit4">$ 2500.00</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 doesit5"><span className="doesit3">Bid Increment</span></div>
								<div className="col-md-9 doesit6"><span className="doesit4">% 500</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 doesit5"><span className="doesit3">Time Remaining</span></div>
								<div className="col-md-9 doesit6"><span className="doesit4">10 hour 10 mins 10 second</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 doesit7"><span className="doesit3">Bid End</span></div>
								<div className="col-md-9 doesit6"><span className="doesit4">Friday, 20 Feb - 6:00:00pm ET</span></div>
							</div>
						</div>
						<div className="col-md-2"></div>
					</div>
				</div> <br />
			</div>
		);
	}
}
export default Billofpanel1;