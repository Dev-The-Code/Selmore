import React, { Component } from 'react';
import './faq.scss';
import SelmoreCom from './selmoreCom.js';
import ItWork from './itWork.js';
import Charges from './charges.js';
import Space from './space';


class Faqbannerfoot extends Component {
	render() {
		return (
			<div>
				<div className="row" style={{ marginTop: '2vw' }}>
					<div className="col-1 col-md-3 col-lg-3 col-xl-3"></div>
					<div className="col-10 col-md-6 col-lg-6 col-xl-6">
						<h2 className="water4">FREQUENTLY ASKED QUESTIONS</h2>
						<div className="row" style={{ margin: '0', marginBottom: '15px' }}>
							<div className="col-md-1 col-4 water5"></div>
							<div className="col-md-11 col-8"></div>
						</div>
						<div className="row">
							<div className="col-12 col-md-12 col-lg-12 col-xl-12">
								<h4 className="water6">WHAT IS SELMORE.COM?</h4>
								<p className="water7">
									Lorem Ipsum is simply dummy text of the printing and typesetting
									industry. Lorem Ipsum has been the industry's standard dummy text ever
									since the 1500s, when an unknown printer took a galley of type and scrambled
									it to make a type specimen book. It has survived not only five centuries,
									but also the leap into electronic typesetting, remaining essentially unchanged.
									It was popularised in the 1960s with the release of Letraset sheets
									containing Lorem Ipsum passages, an	more recently with desktop
									publishing software like Aldus PageMaker including versions of Lorem Ipsum.
								</p>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-12 col-lg-12 col-xl-12">
								<h4 className="water6">HOW DOES IT WORK?</h4>
								<p className="water7">
									Lorem Ipsum is simply dummy text of the printing and typesetting
									industry. Lorem Ipsum has been the industry's standard dummy text ever
									since the 1500s, when an unknown printer took a galley of type and scrambled
									it to make a type specimen book. It has survived not only five centuries,
									but also the leap into electronic typesetting, remaining essentially unchanged.
									It was popularised in the 1960s with the release of Letraset sheets
									containing Lorem Ipsum passages, an	more recently with desktop
									publishing software like Aldus PageMaker including versions of Lorem Ipsum.
								</p>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-12 col-lg-12 col-xl-12">
								<h4 className="water6">ARE THERE ANY FEES AND CHARGES TO USE SELMORE.COM?</h4>
								<p className="water7">
									Lorem Ipsum is simply dummy text of the printing and typesetting
									industry. Lorem Ipsum has been the industry's standard dummy text ever
									since the 1500s, when an unknown printer took a galley of type and scrambled
									it to make a type specimen book. It has survived not only five centuries,
									but also the leap into electronic typesetting, remaining essentially unchanged.
									It was popularised in the 1960s with the release of Letraset sheets
									containing Lorem Ipsum passages, an	more recently with desktop
									publishing software like Aldus PageMaker including versions of Lorem Ipsum.
								</p>
							</div>
						</div>
						<div className="row">
							<div className="col-12 col-md-12 col-lg-12 col-xl-12">
								<h4 className="water6">HOW DO I BUY ADVERTISING SPACE ON SELMORE.COM</h4>
								<p className="water7">
									Lorem Ipsum is simply dummy text of the printing and typesetting
									industry. Lorem Ipsum has been the industry's standard dummy text ever
									since the 1500s, when an unknown printer took a galley of type and scrambled
									it to make a type specimen book. It has survived not only five centuries,
									but also the leap into electronic typesetting, remaining essentially unchanged.
									It was popularised in the 1960s with the release of Letraset sheets
									containing Lorem Ipsum passages, an	more recently with desktop
									publishing software like Aldus PageMaker including versions of Lorem Ipsum.
								</p>
							</div>
						</div>
					</div>
					<div className="col-1 col-md-3 col-lg-3 col-xl-3"></div>
				</div>
			</div>
		);
	}
}

export default Faqbannerfoot;