import React, { Component } from 'react';
import Header from '../Header/mainheader';
import Footer from '../footer';
import './megaDetail.scss';
import AbBanner from '../About Selmore/abBanner';
import Banner1 from './megaDetailBanner';
import Megapanel1 from './megaDetailPanel1';
import Megapanel2 from './megaDetailPanel2';

class MegaDetail extends Component {
	constructor(props) {
		super(props)
		this.state = {
		  dropDownUser: false,
		}
	  }
	
	  componentWillMount() {
		window.scrollTo(0, 0);
	  }
	
	  showDropDown = () => {
		this.setState({
		  dropDownUser: true
		})
	  }
	
	  hideDropDown = () => {
		this.setState({
		  dropDownUser: false
		})
	  }
	
	  render() {
		const { dropDownUser } = this.state;
		return (
			<div>
				<Header showDropDown={this.showDropDown} hideDropDown={this.hideDropDown} dropDownUser={dropDownUser} />
				<Banner1 advertise={'MEGA SALE DETAIL'} bred={'Mega Sale'} />
				<Megapanel1 data={this.props.location.state} />
				<Megapanel2 />
				<Footer />
			</div>
		);
	}
}
export default MegaDetail;