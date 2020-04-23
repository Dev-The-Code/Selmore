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
        // console.log(response, 'response')
        let responseMegaSaleData = await HttpUtils.get('getallbookedMeagSalebillboard');
        // console.log(respon , 'respon')
        // let bookedAvalibleBillboards = JSON.parse(localStorage.getItem('bookedAvalibleBillboards'));
        // let bookedMegaSaleBillboards = JSON.parse(localStorage.getItem('bookedMegaSaleBillboards'));
        let bidBillboards = JSON.parse(localStorage.getItem('bidBillboards'));

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

        if (bidBillboards != null || bidBillboards != undefined) {
            this.setState({
                bidBillboards: bidBillboards
            })
        }

    }
    render() {
        const { bidBillboards, megaSaleBillboard, avalibleBillboard } = this.state;
        return (
            <div>
                <div className="container" style={{ marginTop: '3vw' }}>
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
                            <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                <div className="tab-pane fade show active text-justify" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                    <table class="table" style={{ textAlign: 'center' }}>
                                        <thead className="tablee_Head">
                                            <tr>
                                                <th className="BidhistoryTH">#</th>
                                                <th className="BidhistoryTH">Company name</th>
                                                <th className="BidhistoryTH">Company Email</th>
                                                <th className="BidhistoryTH">Company Phone</th>
                                                <th className="BidhistoryTH">Address</th>
                                                <th className="BidhistoryTH">City</th>
                                                <th className="BidhistoryTH">State</th>
                                                <th className="BidhistoryTH">Booked days</th>
                                                <th className="BidhistoryTH">Date Range</th>
                                                <th className="BidhistoryTH">Amount</th>
                                                <th className="BidhistoryTH">View</th>

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

                                                        <td className="tablee_td">{elem.address}</td>
                                                        <td className="tablee_td">{elem.city}</td>
                                                        <td className="tablee_td">{elem.state}</td>
                                                        <td className="tablee_th">{`${elem.bookedDays} ${elem.selectDays}`}</td>
                                                        <td className="tablee_th">{`From ${elem.dateRange[0].slice(0, 10)} To ${elem.dateRange[1].slice(0, 10)}`}</td>

                                                        <td className="tablee_td">
                                                            <NumberFormat value={elem.amountCharge} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
                                                        </td>
                                                        <td className="tablee_th">
                                                            <Link to={{ pathname: `/billborad_Militry`, state: elem.billboardId }}><span className="dropText">View</span></Link>
                                                        </td>

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
                                                <th className="BidhistoryTH">City</th>
                                                <th className="BidhistoryTH">State</th>
                                                <th className="BidhistoryTH">Book Date</th>
                                                <th className="BidhistoryTH">Sale Amount</th>
                                                <th className="BidhistoryTH">View</th>
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
                                                        <td className="tablee_td">{elem.address}</td>
                                                        <td className="tablee_td">{elem.city}</td>
                                                        <td className="tablee_td">{elem.state}</td>
                                                        <td className="tablee_td">{elem.bookedDate}</td>
                                                        <td className="tablee_td">
                                                            <NumberFormat value={elem.billboardAmount} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
                                                        </td>
                                                        <td className="tablee_th">
                                                            <Link to={{ pathname: `/billborad_Militry`, state: elem.billboardId }}><span className="dropText">View</span></Link>
                                                        </td>
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
                                                <th>#</th>
                                                <th>Company name</th>
                                                <th>Address</th>
                                                <th>City</th>
                                                <th>State</th>
                                                <th>Bid Amount</th>
                                                {/* <th>Action</th> */}
                                            </tr>
                                        </thead>
                                        {bidBillboards && bidBillboards.map((elem, key) => {
                                            return (
                                                <tbody>
                                                    <tr>
                                                        <td className="tablee_th">{key}</td>
                                                        <td className="tablee_td">{elem.companyName}</td>
                                                        <td className="tablee_td">{elem.address}</td>
                                                        <td className="tablee_td">{elem.city}</td>
                                                        <td className="tablee_td">{elem.state}</td>
                                                        <td className="tablee_td">
                                                            <NumberFormat value={elem.bidAamount} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />

                                                            {/* Rs.{elem.bidAamount} */}
                                                        </td>
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
            </div>
        );
    }
}
export default CartPanel1;
