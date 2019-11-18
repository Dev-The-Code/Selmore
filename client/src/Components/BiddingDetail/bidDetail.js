import React, { Component } from 'react';
import Header from '../header';
import './bidDetail.css';
import AbBanner from '../About Selmore/abBanner';
import DetailPanel1 from './bid-detailPanel1';
import DetailPanel2 from './bid-detailPanel2';

class BidDetail extends Component {
	constructor(props) {
		super(props)
	}
	componentWillMount() {
        window.scrollTo(0,0);
    }
	render() {
		return (
			<div>
				<Header showDropDown={this.props.showDropDown} hideDropDown={this.props.hideDropDown} dropDownUser={this.props.dropDownUser} />
				<AbBanner advertise={'BILLBOARD'} bred={'CATEGORY'} bred2={'> BILLBOARD'} bred3={'> MEGA SALE'} />
                <DetailPanel1 data={this.props.location.state}/>
				<DetailPanel2 />
            </div>
		);
	}
}
export default BidDetail;