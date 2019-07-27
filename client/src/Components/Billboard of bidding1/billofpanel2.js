import React, { Component } from 'react';
import './billofbidding.css';

class Billofpanel2 extends Component {
	render() {
		return (
			<div>
				<div className="container">
					<div className="row" style={{ margin: '0px' }}>
						<div className="col-md-4">
							<nav>
								<div className="nav nav-tabs nav-fill doesit8" id="nav-tab" role="tablist">
									<a className="nav-item nav-link active tikonduxx1" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true"><span className="doesit10">Detail</span></a>
									<a className="nav-item nav-link tikonduxx2" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false"><span className="doesit10">BidHistory (10 Bids)</span></a>
								</div>
							</nav>
						</div>
						<div className="col-md-8"></div>
					</div>
					<div className="row" style={{ margin: '0px' }}>
						<div className="col-md-11 doesit9">
							<div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
								<div className="tab-pane fade show active text-justify" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
									Et et consectetur ipsum labore excepteur est proident excepteur ad velit occaecat qui minim occaecat veniam. Fugiat veniam incididunt anim aliqua enim pariatur veniam sunt est aute sit dolor anim. Velit non irure adipisicing aliqua ullamco irure incididunt irure non esse consectetur nostrud minim non minim occaecat. Amet duis do nisi duis veniam non est eiusmod tempor incididunt tempor dolor ipsum in qui sit. Exercitation mollit sit culpa nisi culpa non adipisicing reprehenderit do dolore. Duis reprehenderit occaecat anim ullamco ad duis occaecat ex.<br />
									Et et consectetur ipsum labore excepteur est proident excepteur ad velit occaecat qui minim occaecat veniam. Fugiat veniam incididunt anim aliqua enim pariatur veniam sunt est aute sit dolor anim. Velit non irure adipisicing aliqua ullamco irure incididunt irure non esse consectetur nostrud minim non minim occaecat. Amet duis do nisi duis veniam non est eiusmod tempor incididunt tempor dolor ipsum in qui sit. Exercitation mollit sit culpa nisi culpa non adipisicing reprehenderit do dolore. Duis reprehenderit occaecat anim ullamco ad duis occaecat ex.<br />
									Et et consectetur ipsum labore excepteur est proident excepteur ad velit occaecat qui minim occaecat veniam. Fugiat veniam incididunt anim aliqua enim pariatur veniam sunt est aute sit dolor anim. Velit non irure adipisicing aliqua ullamco irure incididunt irure non esse consectetur nostrud minim non minim occaecat. Amet duis do nisi duis veniam non est eiusmod tempor incididunt tempor dolor ipsum in qui sit. Exercitation mollit sit culpa nisi culpa non adipisicing reprehenderit do dolore. Duis reprehenderit occaecat anim ullamco ad duis occaecat ex.<br />
								</div>
								<div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
									<table class="table">
										<thead>
											<tr>
												<th>S#N.o</th>
												<th>Bid Date.</th>
												<th>Bid Amount</th>
												<th>Bidder No.</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>1</td>
												<td>Jan 27, 2019 - 6:06:57 PM</td>
												<td>$2045.00</td>
												<td>iJWR234</td>
											</tr>
											<tr>
												<td>2</td>
												<td>Jan 27, 2019 - 6:06:57 PM</td>
												<td>$2045.00</td>
												<td>iJWR234</td>
											</tr>
											<tr>
												<td>3</td>
												<td>Jan 27, 2019 - 6:06:57 PM</td>
												<td>$2045.00</td>
												<td>iJWR234</td>
											</tr>
											<tr>
												<td>4</td>
												<td>Jan 27, 2019 - 6:06:57 PM</td>
												<td>$2045.00</td>
												<td>iJWR234</td>
											</tr>
											<tr>
												<td>5</td>
												<td>Jan 27, 2019 - 6:06:57 PM</td>
												<td>$2045.00</td>
												<td>iJWR234</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div className="col-md-1"></div>
					</div>
				</div>
			</div>
		);
	}
}
export default Billofpanel2;