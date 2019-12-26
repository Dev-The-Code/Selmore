import React, { Component } from 'react';
import './megaDetail.css';
import Location from './googlemap';
import { Link } from "react-router-dom";
import { HttpUtils } from '../../Services/HttpUtils';


class Megapanel1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: '',
            billboardData: '',
            admin: false,
            center: null
        }
    }

    componentDidMount() {
        this.billboardData()

    }
    billboardData = async () => {
        let data = this.props.data;
        if (data != undefined) {
            let obj = {
                id: data.billboardId
            }
            let response = await HttpUtils.post('getspecificbiddingbillboard', obj);
            if (response.code == 200) {
                this.setState({
                    data: data,
                    billboardData: response.content[0]
                })

            }
        }
    }


    render() {
        const { data, billboardData } = this.state;

        let image;
        if (data.images && data.images.length > 0) {
            image = data.images.map((elem, key) => {
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
                                        <div className="row slidersoldier" style={{ margin: '0px' }}>
                                            <div className="">
                                                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                                    <div className="carousel-inner">
                                                        {image}
                                                    </div>
                                                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                        <span className="sr-only">Previous</span>
                                                    </a>
                                                    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                        <span className="sr-only">Next</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div><br />
                                        {/* <h3 className="kurta2">SLIDER</h3> */}
                                    </div>
                                </div>
                            </div><br />
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-2"></div>
                                <div className="col-md-8">
                                    <div className="kurta1">
                                        {billboardData && <Location
                                            address={billboardData.address}
                                            latitude={billboardData.latitude}
                                            longitude={billboardData.longitude}
                                        />
                                        }
                                        {/* <h3 className="kurta2">MAP</h3> */}
                                    </div>
                                </div>
                                <div className="col-md-2"></div>
                            </div><br />
                            {/*first panel1*/}
                            <div className="row ufone1" style={{ margin: '0px', backgroundColor: 'black' }}>
                                <span className="ufone2">Military Road {data.billboardCity} City Sale Detail</span>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Actual price</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">Rs.{data.actualPrice}</span></div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Discount price</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">Rs.{data.discountPrice}</span></div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Percentage of discount</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">{data.percantageOffDisscount}%</span></div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Billboard availibilty</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">{data.billboardAvailabilityFrom} to {data.billboardAvailabilityTo} </span></div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Deal Start </span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">{data.saleStartDate} , {data.saleStartTime}</span></div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Deal End </span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">{data.saleEndDate} , {data.saleEndTime}</span></div>
                            </div>
                            {/* <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Deal available till</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">10 hour 10 mins 10 second</span></div>
                            </div> */}
                            <br />
                            {/*second panel*/}
                            <div className="row ufone1" style={{ margin: '0px' }}>
                                <span className="ufone2">Military Road City Demographics</span>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone7"><span className="ufone3">Address</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">{billboardData.address}</span></div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">City</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">{billboardData.city}</span></div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">State</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">{billboardData.state}</span></div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Country</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">{billboardData.country}</span></div>
                            </div>
                            <br />
                            {/*third panel*/}
                            <div className="row ufone1" style={{ margin: '0px' }}>
                                <span className="ufone2">Billboard in {data.billboardCity} Millitary Road City Point Details</span>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Ad Width</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">{billboardData.width}- Feet</span></div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Ad Height</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4"> {billboardData.height}- Feet</span></div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Lightning</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">{billboardData.lightning}</span></div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Description</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">{billboardData.description}</span></div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone7"><span className="ufone3">Ad Status</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">{billboardData.status}</span></div>
                            </div>
                            <br />

                            {/*fourth panel*/}
                            <div className="row ufone1" style={{ margin: '0px' }}>
                                <span className="ufone2">Military Road City rate Card</span>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Daily Rate</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">{billboardData.dailyRate}</span></div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Weely Rate</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">{billboardData.weeklyRate}</span></div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Monthly Rate</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">{billboardData.monthlyRate}</span></div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone7"><span className="ufone3">Yearly Rate</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">{billboardData.yearlyRate}</span></div>
                            </div>
                            <br />

                            {/*Fifth panel*/}
                            <div className="row ufone1" style={{ margin: '0px' }}>
                                <span className="ufone2">Military Road City Demographics</span>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Audiance Type</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">{billboardData.audianceType}</span></div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Daily Visitor</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">{billboardData.dailyVisitor}</span></div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone7"><span className="ufone3">Near By</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">{billboardData.nearBy}</span></div>
                            </div>
                            <br />
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-10"></div>
                                <div className="col-md-2" style={{ textAlign: 'right' }}>
                                    <button className="btn btn-primary">Book Now</button>
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
                        </div>
                    </div>
                </div> <br />
            </div>
        );
    }
}
export default Megapanel1;
