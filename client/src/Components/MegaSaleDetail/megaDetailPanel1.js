import React, { Component } from 'react';
import './megaDetail.css';
import Location from './googlemap';
import { Link } from "react-router-dom";


class Megapanel1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: '',
            images: [],
            admin: false,
            center: null
        }
    }
    // async componentDidMount() {
    //     let data = this.props.data;
    //     console.log(data, 'data')
    //     await this.setState({
    //         data: data,
    //         images: data.images,
    //     })
    // }

    // componentWillMount() {


    // 	let latitude = Number(this.props.data.latitude)
    // 	let longitude = Number(this.props.data.longitude)
    // 	this.setState({
    // 		center:
    // 		{
    // 			center: {
    // 				latitude: latitude,
    // 				longitude: longitude
    // 			},
    // 			zoom: 9,
    // 		}
    // 	});
    // }




    render() {
        const { data, images, center } = this.state;
        let image;
        let adminUser = JSON.parse(localStorage.getItem("userData"));
        if (images.length > 0) {
            image = images.map((elem, key) => {
                if (key == 0) {
                    return <div className="carousel-item active" style={{ width: '720px', height: "450px" }}>
                        <img className="d-block w-100" src={elem} alt={key} style={{ width: '720px', height: "450px" }} />
                    </div>
                }
                else {
                    return <div className="carousel-item" style={{ width: '720px', height: "450px" }}>
                        <img className="d-block w-100" src={elem} alt={key} style={{ width: '720px', height: "450px" }} />
                    </div>
                }
            })
        }
        return (
            <div>
                <div className="container">
                    <div className="row" style={{ margin: '0px' }}>
                        <div className="col-md-1"></div>
                        <div className="col-md-10">
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-12">
                                    <div className="kurta1">
                                        <h3 className="kurta2">SLIDER</h3>
                                    </div>
                                </div>
                            </div><br />
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-2"></div>
                                <div className="col-md-8">
                                    <div className="kurta1">
                                        <h3 className="kurta2">MAP</h3>
                                    </div>
                                </div>
                                <div className="col-md-2"></div>
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
                            {/*fifth panel*/}
                            <div className="row ufone1" style={{ margin: '0px' }}>
                                <span className="ufone2">Military Road City Demographics</span>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Actual price</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">{data.country}</span></div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Percentage of discount</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">{data.state}</span></div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Billboard availibilty</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">{data.city}</span></div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Deal available till</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">{data.city}</span></div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-9"></div>
                                <div className="col-md-3">
                                    <button className="btn btn-primary bookBtn_mega" data-toggle="modal" data-target="#myBook">
                                        Book Now
                                    </button>
                                </div>
                                {/* <div className="col-md-9 ufone6"><span className="ufone4">{data.address}</span></div> */}
                            </div>

                            <div class="modal" id="myBook">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h4 class="modal-title">Book Now</h4>
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                        </div>
                                        <div class="modal-body">
                                            <div className="row">
                                                <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                    <input
                                                        placeholder="Company Name"
                                                        className="bid_Input"
                                                    />
                                                </div>
                                                <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                                    <input type="file" placeholder="upload" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-primary" data-dismiss="modal">Submit</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <br />
                            <div className="row">

                                <div className="col-md-4 col-lg-4 col-xl-4 col-12">
                                    <h3>Contact Details</h3>
                                </div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-12 col-12 ufone8"></div>
                            </div>
                        </div>
                        <div className="col-md-1">
                            {/* {adminUser !== null && adminUser.role == 'admin' ?
                                <Link to={{ pathname: `/list_add`, state: data }}>
                                    <div class="fa fa-pencil" style={{ fontSize: "24px", float: "right", marginLeft: '10px' }}></div>
                                </Link>
                                :
                                null
                            } */}
                            {/* {this.props.data.address && */}
                            <div>
                                {/* <div className="row soldier7" style={{ margin: '0px' }}>
                                    <div><h3>Map</h3></div>

                                </div><br /> */}
                                {/* render a map and show a location of the Billboard */}
                                <div>
                                    {/* <Location 
                                        address={this.props.data.address}
                                        latitude={this.props.data.latitude}
                                        longitude={this.props.data.longitude}
                                    /> */}
                                </div>
                                {/* <div className="row soldier7" style={{ margin: '0px' }}>
                            // 			<h3 style={{ color: 'white' }}>Map</h3>
                            // 		</div> */}
                            </div>
                        </div>
                    </div>
                </div> <br />
            </div>
        );
    }
}
export default Megapanel1;
