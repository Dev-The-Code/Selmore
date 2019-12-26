import React, { Component } from 'react';
import './megaSale.css';
import { Link } from 'react-router-dom';
import { HttpUtils } from '../../Services/HttpUtils';

class MegaSalepanel1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			megaSaleBiilboards: []
		}
	}
	componentDidMount() {
		this.megaSalebillBoardData()
	}

	megaSalebillBoardData = async () => {
		let response = await HttpUtils.get('getallmegabillboard');
		if (response.code == 200) {
			this.setState({
				megaSaleBiilboards: response.content
			})

		}
	}
	render() {
		const { megaSaleBiilboards } = this.state;
		return (
			<div>
				<div className="container">
					<div className="row">
						{megaSaleBiilboards && megaSaleBiilboards.map((elem, key) => {
							return (
								<div className="col-10 col-md-12 col-lg-5 col-xl-5">
									<div className="row extra1">
										<div className="col-12 col-md-5 col-lg-5 col-xl-5 card_mega1">
											<img class="card-img-top cardImag_mega" src={elem.images[0]} alt="Card image" />
										</div>
										<div className="col-12 col-md-7 col-lg-7 col-xl-7 card_mega2">
											<div class="card-body">
												<h4 class="card-title">{elem.billboardAddress}, </h4>
												<h4 class="card-title"> { elem.billboardCity}</h4>

												<p class="card-text megaPageText">Discount Upto <span className="megaPageTiming">{elem.percantageOffDisscount}</span></p>
												<p class="card-text megaPageText">Sale availability : <br />From <span className="megaPageTiming">{elem.saleStartDate}</span> to
											<span className="megaPageTiming"> {elem.saleEndDate}</span></p>
												<p class="card-text megaPageText">Billboard availability : <br />From <span className="megaPageTiming">{elem.billboardAvailabilityFrom}</span> to
											<span className="megaPageTiming"> {elem.billboardAvailabilityTo}</span></p>
												<Link to={{ pathname: `/megaDetail/${elem._id}`, state: elem }}>
													<button class="btn btn-primary">
														More Details
											</button>
												</Link>
											</div>
										</div>
									</div>
								</div>
							)
						})}
						
						{/* <div className="col-10 col-md-12 col-lg-5 col-xl-5">
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
						<div className="col-10 col-md-12 col-lg-2 col-xl-2"></div> */}

						{/* <div className="col-10 col-md-12 col-lg-5 col-xl-5">
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
						</div> */}
					</div><br /><br />
					{/* <div className="row"> */}
					{/* <div className="col-10 col-md-12 col-lg-5 col-xl-5">
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
						</div> */}
					{/* <div className="col-10 col-md-12 col-lg-2 col-xl-2"></div> */}
					{/* <div className="col-10 col-md-12 col-lg-5 col-xl-5">
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
						</div> */}
					{/* </div> */}
				</div><br />
			</div>
		);
	}
}

export default MegaSalepanel1;