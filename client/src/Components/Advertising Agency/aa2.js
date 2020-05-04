import React, { Component } from 'react';
import './advertising.scss';

let agency = [
	{
		name: 'Shafiq',
		listing: '7',
		image: './images/demo1.png',
	},
	{
		name: 'Daniyal',
		listing: '15',
		image: './images/demo1.png',
	},
	{
		name: 'Shayan',
		listing: '17',
		image: './images/demo1.png',
	},
	{
		name: 'Farzan',
		listing: '11',
		image: './images/demo1.png',
	},
	{
		name: 'Awais',
		listing: '5',
		image: './images/demo1.png',
	},
	{
		name: 'Waqas',
		listing: '20',
		image: './images/demo1.png',
	},
	{
		name: 'Shafiq',
		listing: '7',
		image: './images/demo1.png',
	},
	{
		name: 'Daniyal',
		listing: '15',
		image: './images/demo1.png',
	},
	{
		name: 'Shayan',
		listing: '17',
		image: './images/demo1.png',
	},
	{
		name: 'Farzan',
		listing: '11',
		image: './images/demo1.png',
	},
	{
		name: 'Awais',
		listing: '5',
		image: './images/demo1.png',
	},
	{
		name: 'Waqas',
		listing: '20',
		image: './images/demo1.png',
	},
	{
		name: 'Shafiq',
		listing: '7',
		image: './images/demo1.png',
	},
	{
		name: 'Daniyal',
		listing: '15',
		image: './images/demo1.png',
	},
	{
		name: 'Shayan',
		listing: '17',
		image: './images/demo1.png',
	},
	{
		name: 'Farzan',
		listing: '11',
		image: './images/demo1.png',
	},
	{
		name: 'Awais',
		listing: '5',
		image: './images/demo1.png',
	},
	{
		name: 'Waqas',
		listing: '20',
		image: './images/demo1.png',
	}
]


class Panel2 extends Component {
	state = {
		mapUpto: 4
	}

	render() {
		return (
			<div>
				<div className="row">
					<div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
					<div className="col-10 col-md-10 col-lg-10 col-xl-10">
						<div className="row" style={{margin:'0'}}>
						{agency.map((elem, key) => {
							return (
							<div key={key} className="col-12 col-md-6 col-lg-4 col-xl-4">
								<div className="row wood4">
									<div className="col-4 col-md-3 col-lg-3 col-xl-3">
										<img src={elem.image} className="cardProfileIcon"  alt='img'/>
									</div>
									<div className="col-4 col-md-6 col-lg-6 col-xl-6">
										<h4 className="free1"><span className="wood8">{elem.name}</span></h4>
										<p className="free2"><span className="wood9">{elem.listing} listings</span></p>
									</div>
									<div className="col-4 col-md-3 col-lg-3 col-xl-3">
										<div className="free3">
										<i class="fa fa-arrow-right free4"></i>
										</div>
									</div>
								</div>
							</div>
							)
						})}
						</div>
					</div>
					<div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
				</div>
			</div>
		);
	}
}
export default Panel2;