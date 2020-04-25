import React, { Component } from 'react';
import './about.scss';

class Panel1 extends Component {
	render() {
		return (
			<div>
				<div className="row aboutMainImg">
					<div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
					<div className="col-10 col-md-8 col-lg-7 col-xl-7">
						<h4 className="tissue1">
							ABOUT SELMORE
						</h4>
						<p className="tissue2">To built a world-class, result oriented company,
						by providing accurate and cost-effective, Out-of-Home Communication solutions,
						with growlers quality in real time and client centric services, by developing
						and using the best advertising tools, devices and systems through a team of
						energetic and motivated professionals, with world-class talent and skill
						necessary to make “SELMORE ADVERTISING” the leading Out-of-Home
						Communication Specialist
						</p>
					</div>
					<div className="col-1 col-md-3 col-lg-4 col-xl-4"></div>
				</div>
			</div>
		);
	}
}

export default Panel1;