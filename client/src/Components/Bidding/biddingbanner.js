import React, { Component } from 'react';
import './bidding.scss';

class Biddingbanner extends Component {
	render() {
		return (
			<div>
				<div className="row mainBannerBidding">
					<div className="col-1 col-md-1 col-sm-1 col-lg-1 col-xl-1"></div>
					<div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
						<h4 className="biddingHeadTextbanner">
							Bidding
						</h4>
					</div>
					<div className="col-1 col-md-1 col-sm-1 col-lg-1 col-xl-1"></div>
				</div>
				{/* <div className="row" style={{ margin: '0px' }}>
					<img src="./images/biddingbaner.jpg" alt ='img' className="bannerImgg" />
				</div>
				<div>
					<div className="container baner_text">
						<h4><span className="bannr_txtbid">BIDDING</span></h4>
					</div>
				</div>
				<div className="cultus4">
					<div className="container baner_bot_tag">
						<ol className="tag_listt">
							<ul className="cultus5"><a href="/"><span className="cultus7">HOME</span></a></ul>
							<ul className="cultus6"><a href=""><span className="cultus7">> BIDDING</span></a></ul>
						</ol>
					</div>
				</div><br /> */}
			</div>
		);
	}
}

export default Biddingbanner;