import React, { Component } from 'react';
import './megaSale.css';
import { Link } from 'react-router-dom';

class MegaSalepanel1 extends Component {
	render() {
		return (
			<div>
				<div className="container">
					<div className="row">
						<div className="col-10 col-md-12 col-lg-5 col-xl-5">
							<div className="row extra1">
								<div className="col-12 col-md-5 col-lg-5 col-xl-5 card_mega1">
									<img class="card-img-top cardImag_mega" src="./images/bill4.png" alt="Card image" />
								</div>
								<div className="col-12 col-md-7 col-lg-7 col-xl-7 card_mega2">
									<div class="card-body">
										<h4 class="card-title">Mall road, Rawalpindi</h4>
										<p class="card-text megaPageText">Discount Upto <span className="megaPageTiming">70% Off</span></p>
										<p class="card-text megaPageText">Sale availability : <br />From <span className="megaPageTiming">21nd Nov 2019</span> to <span className="megaPageTiming">28th Nov 2019</span></p>
										<p class="card-text megaPageText">Billboard availability : <br />From <span className="megaPageTiming">2nd Nov 2019</span> to <span className="megaPageTiming">8th Nov 2019</span></p> 
										<Link to={`/megaDetail`}>
											<button class="btn btn-primary">
												More Details
										</button>
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="col-10 col-md-12 col-lg-2 col-xl-2"></div>
						<div className="col-10 col-md-12 col-lg-5 col-xl-5">
							<div className="row extra2">
								<div className="col-12 col-md-5 col-lg-5 col-xl-5 card_mega1">
									<img class="card-img-top cardImag_mega" src="./images/bill4.png" alt="Card image" />
								</div>
								<div className="col-12 col-md-7 col-lg-7 col-xl-7 card_mega2">
									<div class="card-body">
										<h4 class="card-title">Mall road, Rawalpindi</h4>
										<p class="card-text megaPageText">Discount Upto <span className="megaPageTiming">70% Off</span></p>
										<p class="card-text megaPageText">Sale availability : <br />From <span className="megaPageTiming">21st Nov 2019</span> to <span className="megaPageTiming">28th Nov 2019</span></p>
										<p class="card-text megaPageText">Billboard availability : <br />From <span className="megaPageTiming">2nd Nov 2019</span> to <span className="megaPageTiming">8th Nov 2019</span></p>
										<Link to={`/megaDetail`}>
											<button class="btn btn-primary">
												More Details
										</button>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div><br /><br />
					<div className="row">
						<div className="col-10 col-md-12 col-lg-5 col-xl-5">
							<div className="row extra1">
								<div className="col-12 col-md-5 col-lg-5 col-xl-5 card_mega1">
									<img class="card-img-top cardImag_mega" src="./images/bill4.png" alt="Card image" />
								</div>
								<div className="col-12 col-md-7 col-lg-7 col-xl-7 card_mega2">
									<div class="card-body">
										<h4 class="card-title">Mall road, Rawalpindi</h4>
										<p class="card-text megaPageText">Discount Upto <span className="megaPageTiming">70% Off</span></p>
										<p class="card-text megaPageText">Sale availability : <br />From <span className="megaPageTiming">21st Nov 2019</span> to <span className="megaPageTiming">28th Nov 2019</span></p>
										<p class="card-text megaPageText">Billboard availability : <br />From <span className="megaPageTiming">2nd Nov 2019</span> to <span className="megaPageTiming">8th Nov 2019</span></p>
										<Link to={`/megaDetail`}>
											<button class="btn btn-primary">
												More Details
										</button>
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="col-10 col-md-12 col-lg-2 col-xl-2"></div>
						<div className="col-10 col-md-12 col-lg-5 col-xl-5">
							<div className="row extra2">
								<div className="col-12 col-md-5 col-lg-5 col-xl-5 card_mega1">
									<img class="card-img-top cardImag_mega" src="./images/bill4.png" alt="Card image" />
								</div>
								<div className="col-12 col-md-7 col-lg-7 col-xl-7 card_mega2">
									<div class="card-body">
										<h4 class="card-title">Mall road, Rawalpindi</h4>
										<p class="card-text megaPageText">Discount Upto <span className="megaPageTiming">70% Off</span></p>
										<p class="card-text megaPageText">Sale availability : <br />From <span className="megaPageTiming">21st Nov 2019</span> to <span className="megaPageTiming">28th Nov 2019</span></p>
										<p class="card-text megaPageText">Billboard availability : <br />From <span className="megaPageTiming">2nd Nov 2019</span> to <span className="megaPageTiming">8th Nov 2019</span></p>
										<Link to={`/megaDetail`}>
											<button class="btn btn-primary">
												More Details
										</button>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div><br />
			</div>
		);
	}
}

export default MegaSalepanel1;