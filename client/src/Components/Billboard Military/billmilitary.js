import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import Militarypanel1 from './militarypanel1';
import Militarypanel2 from './militarypanel2';
import Militarypanel3 from './militarypanel3';
import Militarybanner from './militarybanner';
import './billmilitary.css';
import AbBanner from '../About Selmore/abBanner';

class Billboardmilitary extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<div>
				<Header />
				<AbBanner advertise={'BILLBOARD'} bred={'CATEGORY'} bred2={'> BILLBOARD'} bred3={'> MILITARY ROAD CITY POINT'} />
				<Militarypanel1 data={this.props.location.state} />
				<Militarypanel2 />
				<Militarypanel3 />
			</div>
		);
	}
}
export default Billboardmilitary;