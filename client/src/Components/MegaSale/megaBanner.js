import React, { Component } from 'react';
import './megaSale.scss';

class MegaSalebanner extends Component {
	render() {
		return (
			<div>
				<div className="row" style={{ margin: '0px' }}>
					<img src="./images/megaSale.jpg" alt ='img' className="bannerImgg" />
				</div>
				<div>
					<div className="container baner_text">
						<h4><span className="bannr_txtbid">MEGA SALE</span></h4>
					</div>
				</div>
				<div className="cultus4">
					<div className="container baner_bot_tag">
						<ol className="tag_listt">
							<ul className="cultus5"><a href="/"><span className="cultus7">HOME</span></a></ul>
							<ul className="cultus6"><a href=""><span className="cultus7">> Mega Sale</span></a></ul>
						</ol>
					</div>
				</div><br />
			</div>
		);
	}
}

export default MegaSalebanner;