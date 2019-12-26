import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import './megaDetail.css';
import AbBanner from '../About Selmore/abBanner';
import Banner1 from './megaDetailBanner';
import Megapanel1 from './megaDetailPanel1';
import Megapanel2 from './megaDetailPanel2';

class MegaDetail extends Component {
	
	componentWillMount() {
		window.scrollTo(0, 0);
	}
	render() {
		return (
			<div>
				<Header showDropDown={this.props.showDropDown} hideDropDown={this.props.hideDropDown} dropDownUser={this.props.dropDownUser} />
				<Banner1 advertise={'MEGA SALE DETAIL'} bred={'Mega Sale'} />
				<Megapanel1 data={this.props.location.state} />
				<Megapanel2 />
				<Footer />
			</div>
		);
	}
}
export default MegaDetail;