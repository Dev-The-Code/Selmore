import React, { Component } from 'react';
import './megaDetail.css';
import Location from './googlemap';
import { Link } from "react-router-dom";
import { HttpUtils } from '../../Services/HttpUtils';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import './coundown.css';


class Megapanel1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: '',
            billboardData: '',
            admin: false,
            center: null,
            days: undefined,
            hours: undefined,
            minutes: undefined,
            seconds: undefined,
            mapFalse: true
        }
    }

    componentDidMount() {
        this.billboardData()

    }

    componentWillMount() {
        this.countdownTime()
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    countdownTime = () => {
        this.interval = setInterval(() => {
            let data = this.props.data;
            let saleData = data.megasaleDetail
            let timeTillDateStart = `${`${saleData.saleEndDate}, ${saleData.saleEndTime}`}`;
            const now = moment();
            const then = moment(timeTillDateStart);
            const countdown = moment(then - now);
            const days = countdown.format('D');
            const hours = countdown.format('HH');
            const minutes = countdown.format('mm');
            const seconds = countdown.format('ss');
            this.setState({ days, hours, minutes, seconds });
        }, 1000);
    }

    billboardData = async () => {
        let data = this.props.data;
        if (data != undefined) {
            this.setState({
                data: data.megasaleDetail,
                billboardData: data.bilboardDetail
            })
        }

    }

    bookedBillboard = () => {
        const { data, billboardData } = this.state;
        let bookedBillboard = [];
        let booked = {}
        let userDetail = JSON.parse(localStorage.getItem('userData'));
        let bookedMegaSaleBillboards = JSON.parse(localStorage.getItem('bookedMegaSaleBillboards'));
        booked.companyName = userDetail.companyName;
        booked.companyId = userDetail._id;
        booked.address = billboardData.address;
        booked.city = billboardData.city;
        booked.state = billboardData.state;
        booked.billboardAmount = data.discountPrice;

        if (bookedMegaSaleBillboards == null || bookedMegaSaleBillboards == undefined) {
            bookedBillboard.push(booked)
            localStorage.setItem('bookedMegaSaleBillboards', JSON.stringify(bookedBillboard))
        }
        else {
            for (var i = 0; i < bookedMegaSaleBillboards.length; i++) {
                bookedBillboard.push(bookedMegaSaleBillboards[i])
            }
            bookedBillboard.push(booked)
            localStorage.setItem('bookedMegaSaleBillboards', JSON.stringify(bookedBillboard))
        }
    }

    mapfalse = (param) => {
        this.setState({
            mapFalse: param,
        })
    }

    render() {
        const { data, billboardData, days, hours, minutes, seconds, mapFalse } = this.state;

        // Mapping the date values to radius values
        const daysRadius = mapNumber(days, 30, 0, 0, 360);
        const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
        const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
        const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

        if (!seconds) {
            return null;
        }

        let image;
        const value = JSON.parse(localStorage.getItem("loggedIn"));

        if (data.images && data.images.length > 0) {
            image = data.images.map((elem, key) => {
                if (key == 0) {
                    return <div className="carousel-item active">
                        <img className="d-block w-100" src={elem} alt={key} style={{ width: '720px', height: "450px" }} />
                    </div>
                }
                else {
                    return <div className="carousel-item">
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
                                    <h1>Countdown</h1>
                                    <div className="countdown-wrapper">
                                        {days && (
                                            <div className="countdown-item">
                                                <SVGCircle radius={daysRadius} />
                                                {days}
                                                <span>days</span>
                                            </div>
                                        )}
                                        {hours && (
                                            <div className="countdown-item">
                                                <SVGCircle radius={hoursRadius} />
                                                {hours}
                                                <span>hours</span>
                                            </div>
                                        )}
                                        {minutes && (
                                            <div className="countdown-item">
                                                <SVGCircle radius={minutesRadius} />
                                                {minutes}
                                                <span>minutes</span>
                                            </div>
                                        )}
                                        {seconds && (
                                            <div className="countdown-item">
                                                <SVGCircle radius={secondsRadius} />
                                                {seconds}
                                                <span>seconds</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div><br />
                            {/*first panel1*/}

                            <div className="row ufone1" style={{ margin: '0px', backgroundColor: 'black' }}>
                                <span className="ufone2">Military Road {data.billboardCity} City Sale Detail</span>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Actual price</span></div>
                                <div className="col-md-9 ufone6">
                                    <NumberFormat value={data.actualPrice} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
                                </div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Discount price</span></div>
                                <div className="col-md-9 ufone6">
                                    <NumberFormat value={data.discountPrice} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
                                </div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Percentage of discount</span></div>
                                <div className="col-md-9 ufone6">
                                    <span className="ufone4">{data.percantageOffDisscount}%</span>
                                </div>
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
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-12">
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
                            {/* <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-2"></div>
                                <div className="col-md-8">
                                    <div className="kurta1">
                                        {billboardData && <Location
                                            address={billboardData.address}
                                            latitude={billboardData.latitude}
                                            longitude={billboardData.longitude}
                                            mapfalse={this.mapfalse}
                                            mapFalse={mapFalse}
                                        />
                                        }
                                    </div>
                                </div>
                                <div className="col-md-2"></div>
                            </div><br /> */}

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
                                <div className="col-md-9 ufone6">
                                    <NumberFormat value={billboardData.dailyRate} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
                                </div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Weely Rate</span></div>
                                <div className="col-md-9 ufone6">
                                    <NumberFormat value={billboardData.weeklyRate} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
                                </div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone5"><span className="ufone3">Monthly Rate</span></div>
                                <div className="col-md-9 ufone6">
                                    <NumberFormat value={billboardData.monthlyRate} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
                                </div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone7"><span className="ufone3">Yearly Rate</span></div>
                                <div className="col-md-9 ufone6">
                                    <NumberFormat value={billboardData.yearlyRate} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
                                </div>
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
                                <div className="col-md-9 ufone6">
                                    <NumberFormat value={billboardData.dailyVisitor} displayType={'text'} thousandSeparator={true} />
                                </div>
                            </div>
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-3 ufone7"><span className="ufone3">Near By</span></div>
                                <div className="col-md-9 ufone6"><span className="ufone4">{billboardData.nearBy}</span></div>
                            </div>
                            <br />
                            <div className="row" style={{ margin: '0px' }}>
                                <div className="col-md-10"></div>
                                <div className="col-md-2" style={{ textAlign: 'right' }}>
                                    {value ?
                                        <button className="btn btn-primary" onClick={this.bookedBillboard} >Book Now</button>
                                        :
                                        <button className="btn btn-primary" disabled >Book Now</button>}
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

const SVGCircle = ({ radius }) => (
    <svg className="countdown-svg">
        <path
            fill="none"
            stroke="#333"
            stroke-width="4"
        // d={describeArc(50, 50, 48, 0, radius)}
        />
    </svg>
);

// From StackOverflow: https://stackoverflow.cm/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians)
    };
}

function describeArc(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    var d = [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        0,
        end.x,
        end.y
    ].join(' ');

    return d;
}

// From StackOverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers

function mapNumber(number, in_min, in_max, out_min, out_max) {
    return (
        ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
}
