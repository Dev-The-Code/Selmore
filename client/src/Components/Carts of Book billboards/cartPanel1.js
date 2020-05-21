import React, { Component } from 'react';
import './carts.scss';
import NumberFormat from 'react-number-format';
import { HttpUtils } from '../../Services/HttpUtils'
import { Link } from "react-router-dom";

class CartPanel1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            bidBillboards: [],
            megaSaleBillboard: [],
            avalibleBillboard: []
        }
    }

    componentDidMount() {
        this.getBokkedBillboards()
    }

    componentWillMount() {
        window.scrollTo(0, 0);
    }

    getBokkedBillboards = async () => {
        let responseBookedData = await HttpUtils.get('getallbookedbillboard');
        let responseMegaSaleData = await HttpUtils.get('getallbookedMeagSalebillboard');
        let responsebidderData = await HttpUtils.get('getallbidderBookbillboard');

        if (responseBookedData) {
            if (responseBookedData.code == 200) {
                this.setState({
                    avalibleBillboard: responseBookedData.content
                })

            }
        }
        if (responseMegaSaleData) {
            if (responseMegaSaleData.code == 200) {
                this.setState({
                    megaSaleBillboard: responseMegaSaleData.content
                })

            }
        }

        if (responsebidderData) {
            if (responsebidderData.code == 200) {
                this.setState({
                    bidBillboards: responsebidderData.content
                })
            }
        }

    }

    paymentPaid = async (paymentStatus, bookFrom, data) => {

        if (bookFrom == 'marketPlace') {
            if (paymentStatus == 'paid') {
                let obj = {
                    objectId: data._id,
                    paymentStatus: paymentStatus,
                }
                let response = await HttpUtils.post('postmarketPlaceBookedbillboard', obj);
                console.log(response , 'response')

                if (response) {
                    if (response.code == 200) {
                        let updateMarketPlace = {
                            objectId: data.billboardId,
                            avalibleOn: '',
                            avalibleOnId: '',
                            status: "No Available",
                            bookFrom: bookFrom,
                            bookId: data._id

                        }
                        let respMatkietPlace = await HttpUtils.post('listadd', updateMarketPlace);
                        console.log(respMatkietPlace, 'market place')
                    }
                }

            }
            else if (paymentStatus == 'unpaid') {

                let obj = {
                    objectId: data._id,
                    paymentStatus: paymentStatus,
                }
                let response = await HttpUtils.post('postmarketPlaceBookedbillboard', obj);
                console.log(response , 'response')

                if (response) {
                    if (response.code == 200) {
                        let updateMarketPlace = {
                            objectId: data.billboardId,
                            avalibleOn: '',
                            avalibleOnId: '',
                            status: "Available",
                            bookFrom: '',
                            bookId: ''

                        }
                        let respMatkietPlace = await HttpUtils.post('listadd', updateMarketPlace);
                        console.log(respMatkietPlace, 'market place')

                    }
                }

            }
        }
        else if (bookFrom == 'megaSale') {

            if (paymentStatus == 'paid') {
                let obj = {
                    objectId: data._id,
                    paymentStatus: paymentStatus,
                }
                let response = await HttpUtils.post('postMegaSalebillboard', obj);
                console.log(response , 'response')

                if (response) {
                    if (response.code == 200) {
                        let updateMarketPlace = {
                            objectId: data.billboardId,
                            avalibleOn: '',
                            avalibleOnId: '',
                            status: "No Available",
                            bookFrom: bookFrom,
                            bookId: data._id

                        }
                        let respMatkietPlace = await HttpUtils.post('listadd', updateMarketPlace);
                        console.log(respMatkietPlace, 'market place')
                    }
                }

            }
            else if (paymentStatus == 'unpaid') {

                let obj = {
                    objectId: data._id,
                    paymentStatus: paymentStatus,
                }
                let response = await HttpUtils.post('postMegaSalebillboard', obj);
                console.log(response , 'response')

                if (response) {
                    if (response.code == 200) {
                        let updateMarketPlace = {
                            objectId: data.billboardId,
                            avalibleOn: '',
                            avalibleOnId: '',
                            status: "Available",
                            bookFrom: '',
                            bookId: ''

                        }
                        let respMatkietPlace = await HttpUtils.post('listadd', updateMarketPlace);
                        console.log(respMatkietPlace, 'market place')

                    }
                }

            }

        }
        else if (bookFrom == 'bidding') {
            if (paymentStatus == 'paid') {
                let obj = {
                    objectId: data._id,
                    paymentStatus: paymentStatus,
                }
                let response = await HttpUtils.post('bidderBillboardBooked', obj);
                console.log(response , 'response')
                if (response) {
                    if (response.code == 200) {
                        let updateMarketPlace = {
                            objectId: data.billboardId,
                            avalibleOn: '',
                            avalibleOnId: '',
                            status: "No Available",
                            bookFrom: bookFrom,
                            bookId: data._id,

                        }
                        let respMatkietPlace = await HttpUtils.post('listadd', updateMarketPlace);
                        console.log(respMatkietPlace, 'market place')
                    }
                }

            }
            else if (paymentStatus == 'unpaid') {

                let obj = {
                    objectId: data._id,
                    paymentStatus: paymentStatus,
                }
                let response = await HttpUtils.post('bidderBillboardBooked', obj);
                console.log(response , 'response')

                if (response) {
                    if (response.code == 200) {
                        let updateMarketPlace = {
                            objectId: data.billboardId,
                            avalibleOn: '',
                            avalibleOnId: '',
                            status: "Available",
                            bookFrom: '',
                            bookId: ''

                        }
                        let respMatkietPlace = await HttpUtils.post('listadd', updateMarketPlace);
                        console.log(respMatkietPlace, 'market place')

                    }
                }

            }

        }




    }

    render() {
        const { bidBillboards, megaSaleBillboard, avalibleBillboard } = this.state;
        return (
            <div>
                <div className="row" style={{ marginTop: '3vw' }}>
                    <div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-10 col-md-10 col-lg-10 col-xl-10">
                        <div className="row" style={{ margin: '0px' }}>
                            <div className="col-md-3"></div>
                            <div className="col-md-6">
                                <nav>
                                    <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                        <a className="nav-item nav-link active tablee_Navtab" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true"><span className="doesit10">Regular</span></a>
                                        <a className="nav-item nav-link tablee_Navtab" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false"><span className="doesit10">Mega Sale</span></a>
                                        <a className="nav-item nav-link tablee_Navtab" id="nav-bid-tab" data-toggle="tab" href="#nav-bid" role="tab" aria-controls="nav-bid" aria-selected="false"><span className="doesit10">Bidding</span></a>
                                    </div>
                                </nav>
                            </div>
                            <div className="col-md-3"></div>
                        </div>
                        <div className="row" style={{ margin: '0px' }}>
                            <div className="col-12 col-md-12 col-lg-12 col-xl-12 userDataPlace">
                                <div className="tab-content py-2 px-2 px-sm-0" id="nav-tabContent">
                                    <div className="tab-pane fade show active text-justify" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                        <table class="table" style={{ textAlign: 'center' }}>
                                            <thead className="tablee_Head">
                                                <tr>
                                                    <th className="BidhistoryTH">#</th>
                                                    <th className="BidhistoryTH">Company name</th>
                                                    <th className="BidhistoryTH">Company Email</th>
                                                    <th className="BidhistoryTH">Company Phone</th>
                                                    <th className="BidhistoryTH">Address</th>
                                                    <th className="BidhistoryTH">Booked days</th>
                                                    <th className="BidhistoryTH">Date Range</th>
                                                    <th className="BidhistoryTH">Amount</th>
                                                    <th className="BidhistoryTH">View</th>

                                                    <th className="BidhistoryTH">Payment</th>

                                                    {/* <th>Action</th> */}
                                                </tr>
                                            </thead>
                                            {avalibleBillboard && avalibleBillboard.map((elem, key) => {
                                                return (
                                                    <tbody>
                                                        <tr>
                                                            <td className="tablee_th">{key + 1}</td>
                                                            <td className="tablee_td">{elem.companyName}</td>
                                                            <td className="tablee_td">{elem.companyEmail}</td>
                                                            <td className="tablee_td">{elem.companyLandlineNo}</td>

                                                            <td className="tablee_td">{elem.address}, {elem.city}, {elem.state}</td>
                                                            <td className="tablee_th">{`${elem.bookedDays} ${elem.selectDays}`}</td>
                                                            <td className="tablee_th">{`From ${elem.dateRange[0].slice(0, 10)} To ${elem.dateRange[1].slice(0, 10)}`}</td>

                                                            <td className="tablee_td">
                                                                <NumberFormat value={elem.amountCharge} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
                                                            </td>
                                                            <td className="tablee_th">
                                                                <Link to={{ pathname: `/billborad_Militry`, state: elem.billboardId }}><span className="dropText">View</span></Link>
                                                            </td>
                                                            <tr>
                                                                <td className="tablee_td"><button class="fa fa-check-circle" style={{ fontSize: '17px', color: 'green' }}
                                                                    onClick={this.paymentPaid.bind(this, 'paid', 'marketPlace', elem)}
                                                                >Paid</button></td>
                                                                <td className="tablee_td"><button class="fa fa-close" style={{ fontSize: '17px', color: 'red' }}
                                                                    onClick={this.paymentPaid.bind(this, 'unpaid', 'marketPlace', elem)}
                                                                >Unpaid</button></td>
                                                            </tr>
                                                        </tr>
                                                    </tbody>
                                                )
                                            })}
                                        </table>
                                    </div>
                                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                        <table class="table" style={{ textAlign: 'center' }}>
                                            <thead className="tablee_Head">
                                                <tr>
                                                    <th className="BidhistoryTH">#</th>
                                                    <th className="BidhistoryTH">Company Name</th>
                                                    <th className="BidhistoryTH">Company Email</th>
                                                    <th className="BidhistoryTH">Company Phone</th>
                                                    <th className="BidhistoryTH">Address</th>
                                                    <th className="BidhistoryTH">Book Date</th>
                                                    <th className="BidhistoryTH">Sale Amount</th>
                                                    <th className="BidhistoryTH">View</th>
                                                    <th className="BidhistoryTH">Payment</th>
                                                </tr>
                                            </thead>
                                            {megaSaleBillboard && megaSaleBillboard.map((elem, key) => {
                                                return (
                                                    <tbody>
                                                        <tr>
                                                            <td className="tablee_th">{key}</td>
                                                            <td className="tablee_td">{elem.companyName}</td>
                                                            <td className="tablee_td">{elem.companyEmail}</td>
                                                            <td className="tablee_td">{elem.companyLandlineNo}</td>
                                                            <td className="tablee_td">{elem.address}, {elem.city}, {elem.state}</td>
                                                            <td className="tablee_td">{elem.bookedDate}</td>
                                                            <td className="tablee_td">
                                                                <NumberFormat value={elem.billboardAmount} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
                                                            </td>
                                                            <td className="tablee_th">
                                                                <Link to={{ pathname: `/billborad_Militry`, state: elem.billboardId }}><span className="dropText">View</span></Link>
                                                            </td>
                                                            <tr>
                                                                <td className="tablee_td"><button class="fa fa-check-circle" style={{ fontSize: '17px', color: 'green' }}
                                                                    onClick={this.paymentPaid.bind(this, 'paid', 'megaSale', elem)}
                                                                >Paid</button></td>
                                                                <td className="tablee_td"><button class="fa fa-close" style={{ fontSize: '17px', color: 'red' }}
                                                                    onClick={this.paymentPaid.bind(this, 'unpaid', 'megaSale', elem)}
                                                                >Unpaid</button></td>
                                                            </tr>
                                                        </tr>
                                                    </tbody>
                                                )
                                            })}

                                        </table>
                                    </div>
                                    <div className="tab-pane fade" id="nav-bid" role="tabpanel" aria-labelledby="nav-bid-tab">
                                        <table class="table" style={{ textAlign: 'center' }}>
                                            <thead className="tablee_Head">
                                                <tr>
                                                    <th className="BidhistoryTH">#</th>
                                                    <th className="BidhistoryTH">Company Name</th>
                                                    <th className="BidhistoryTH">Company Email</th>
                                                    <th className="BidhistoryTH">Company Phone</th>
                                                    <th className="BidhistoryTH">Address</th>
                                                    <th className="BidhistoryTH">Book Date</th>
                                                    <th className="BidhistoryTH">Bid Amount</th>
                                                    <th className="BidhistoryTH">Bidding Time</th>
                                                    <th className="BidhistoryTH">View</th>
                                                    <th className="BidhistoryTH">Payment</th>

                                                </tr>
                                            </thead>
                                            {bidBillboards && bidBillboards.map((elem, key) => {
                                                return (
                                                    <tbody>
                                                        <tr>
                                                            <td className="tablee_th">{key}</td>
                                                            <td className="tablee_td">{elem.companyName}</td>
                                                            <td className="tablee_td">{elem.companyEmail}</td>
                                                            <td className="tablee_td">{elem.companyLandlineNo}</td>
                                                            <td className="tablee_td">{elem.address}, {elem.city}, {elem.state}</td>
                                                            <td className="tablee_td">{`From ${elem.billboardAvailabilityFrom} To ${elem.billboardAvailabilityTo}`}</td>
                                                            <td className="tablee_td">
                                                                <NumberFormat value={elem.bidAamount} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
                                                            </td>
                                                            <td className="tablee_td">{`${elem.date} ${elem.time}`}</td>
                                                            <td className="tablee_th">
                                                                <Link to={{ pathname: `/billborad_Militry`, state: elem.billboardId }}><span className="dropText">View</span></Link>
                                                            </td>
                                                            <tr>
                                                                <td className="tablee_td"><button class="fa fa-check-circle" style={{ fontSize: '17px', color: 'green' }}
                                                                    onClick={this.paymentPaid.bind(this, 'paid', 'bidding', elem)}
                                                                >Paid</button></td>
                                                                <td className="tablee_td"><button class="fa fa-close" style={{ fontSize: '17px', color: 'red' }}
                                                                    onClick={this.paymentPaid.bind(this, 'unpaid', 'bidding', elem)}
                                                                >Unpaid</button></td>
                                                            </tr>
                                                        </tr>
                                                    </tbody>
                                                )
                                            })}
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
                </div>
            </div>
        );
    }
}
export default CartPanel1;
