import React, { Component } from 'react';
import './billmilitary.css';
import Location from './googlemap';
import { Link } from "react-router-dom";

class Militarypanel1 extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: '',
			images: [],
			admin: true,
		}
	}
	async componentDidMount() {
		let data = this.props.data;
		await this.setState({
			data: data,
			images: data.images,
		})
	}
	render() {
		const { data, images, admin } = this.state;
		let image;
		if (images.length > 0) {
			console.log('iamges')
			image = images.map((elem, key) => {
				// console.log(key , 'key')
				if (key == 0) {
					return <div class="carousel-item active">
						<img class="d-block w-100" src={elem} alt="Second slide" />
					</div>
				}
				else {
					return <div class="carousel-item">
						<img class="d-block w-100" src={elem} alt="Second slide" />
					</div>
				}
			})
		}
		return (
			<div>
				<div className="container soldier8">
					<div className="row" style={{ margin: '0px' }}>
						<div className="col-md-8">
							<div className="row slidersoldier" style={{ margin: '0px' }}>
								<div className="">
									<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
										<div class="carousel-inner">
											{image}
										</div>
										<a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
											<span class="carousel-control-prev-icon" aria-hidden="true"></span>
											<span class="sr-only">Previous</span>
										</a>
										<a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
											<span class="carousel-control-next-icon" aria-hidden="true"></span>
											<span class="sr-only">Next</span>
										</a>
									</div>
								</div>
							</div><br />

							{/*first panel1*/}
							<div className="row ufone1" style={{ margin: '0px' }}>
								<span className="ufone2">Billboard in {data.city} Millitary Road City Point Details</span>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">Ad Width</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.width}- Feet</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">Ad Height</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.height} - Feet</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">Lightning</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.lightning}</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">Description</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.description}</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone7"><span className="ufone3">Ad Status</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.status}</span></div>
							</div>
							<br />
							{/*Second panel*/}
							<div className="row ufone1" style={{ margin: '0px' }}>
								<span className="ufone2">Military Road City rate Card</span>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">Daily Rate</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.dailyRate}</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">Weely Rate</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.weeklyRate}</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">Monthly Rate</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.monthlyRate}</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone7"><span className="ufone3">Yearly Rate</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.yearlyRate}</span></div>
							</div>
							<br />
							{/*Third panel*/}
							<div className="row ufone1" style={{ margin: '0px' }}>
								<span className="ufone2">Military Road City Demographics</span>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">Audiance Type</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.audianceType}</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">Daily Visitor</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.dailyVisitor}</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone7"><span className="ufone3">Near By</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.nearBy}</span></div>
							</div>
							<br />
							{/*Fourth panel*/}
							<div className="row ufone1" style={{ margin: '0px' }}>
								<span className="ufone2">Military Road City Demographics</span>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">Country</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.country}</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">State</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.state}</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone5"><span className="ufone3">City</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.city}</span></div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-3 ufone7"><span className="ufone3">Address</span></div>
								<div className="col-md-9 ufone6"><span className="ufone4">{data.address}</span></div>
							</div>
							<br />
							<div className="row">
								<div className="col-md-4 col-lg-4 col-xl-4 col-6">
									<p><span className="ufone3">0 Comments</span></p>
								</div>
								<div className="col-md-8 col-lg-8 col-xl-8 col-6" style={{ marginLeft: '-8%' }}>
									<p><span className="ufone3">Selmore</span></p>
								</div>
							</div>
							<div className="row" style={{ margin: '0px' }}>
								<div className="col-md-11 col-10 ufone8"></div>
								<div className="col-md-1 col-2"></div>
							</div>
						</div>
						<div className="col-md-4">
						{admin ?
								<Link to={{ pathname: `/list_add`, state: data }}>
									<div className='editbtn'>
										<i className='fa fa-pencil' style={{ fontSize: "32px" }}></i>
									</div>
								</Link>
								: null
							}
							<div className="row soldier7" style={{ margin: '0px' }}>
								<div><h3>Map</h3></div>

							</div><br />
							{/* render a map and show a location of the Billboard */}
							<div><Location latitude={this.props.data.latitude} longitude={this.props.data.longitude}
								address={this.props.data.address} /></div>
						</div>
					</div>
				</div> <br />
			</div >
		);
	}
}
export default Militarypanel1;