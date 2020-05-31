import React, { Component } from 'react';
import './profileView.scss';
import { HttpUtils } from '../../Services/HttpUtils'
import NumberFormat from 'react-number-format';

class ProfileView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paid: [],
            unpaid: [],
            expire: [],
            pendingData: []
        }
    }


    componentDidMount() {
        this.getUserBillboardData()
    }

    getUserBillboardData = async () => {
        let userData = JSON.parse(localStorage.getItem("userData"));
        let paidData = [];
        let unPaidData = [];
        let expireData = [];
        let pendingData = [];

        if (userData) {
            let obj = {
                id: userData._id
            }
            let responseMarketPlace = await HttpUtils.post('getspecificUserMarketPlaceBookedbillboard', obj);
            if (responseMarketPlace) {
                if (responseMarketPlace.code == 200) {
                    let data = responseMarketPlace.content;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].paymentStatus == 'paid') {
                            let obj = {
                                bookedFrom: 'Market Place',
                                address: data[i].address,
                                city: data[i].city,
                                state: data[i].state,
                                payment: data[i].amountCharge,
                                billboardId: data[i].billboardId,
                                dateBookedFrom: data[i].dateRange[0],
                                dateBookedTo: data[i].dateRange[1],

                            }
                            paidData.push(obj)
                        }
                        else if (data[i].paymentStatus == 'unPaid') {
                            let obj = {
                                bookedFrom: 'Market Place',
                                address: data[i].address,
                                city: data[i].city,
                                state: data[i].state,
                                payment: data[i].amountCharge,
                                billboardId: data[i].billboardId,
                                dateBookedFrom: data[i].dateRange[0],
                                dateBookedTo: data[i].dateRange[1],

                            }
                            unPaidData.push(obj)
                        }
                        else if (data[i].paymentStatus == 'expire') {
                            let obj = {
                                bookedFrom: 'Market Place',
                                address: data[i].address,
                                city: data[i].city,
                                state: data[i].state,
                                payment: data[i].amountCharge,
                                billboardId: data[i].billboardId,
                                dateBookedFrom: data[i].dateRange[0],
                                dateBookedTo: data[i].dateRange[1],

                            }
                            expireData.push(obj)
                        }
                        else if (data[i].paymentStatus == undefined) {
                            let obj = {
                                bookedFrom: 'Market Place',
                                address: data[i].address,
                                city: data[i].city,
                                state: data[i].state,
                                payment: data[i].amountCharge,
                                billboardId: data[i].billboardId,
                                dateBookedFrom: data[i].dateRange[0],
                                dateBookedTo: data[i].dateRange[1],

                            }
                            pendingData.push(obj)
                        }
                    }
                }
            }


            let responseMegaSale = await HttpUtils.post('getspecificUserBookedMegaSalebillboard', obj);
            if (responseMegaSale) {
                if (responseMegaSale.code == 200) {
                    let data = responseMegaSale.content;

                    for (var i = 0; i < data.length; i++) {
                        if (data[i].paymentStatus == 'paid') {
                            let obj = {
                                bookedFrom: 'Mega Sale',
                                address: data[i].address,
                                city: data[i].city,
                                state: data[i].state,
                                payment: data[i].billboardAmount,
                                billboardId: data[i].billboardId,
                                dateBookedFrom: data[i].bookedDate.slice(5, 15),
                                dateBookedTo: data[i].bookedDate.slice(19, 29),

                            }
                            paidData.push(obj)
                        }
                        else if (data[i].paymentStatus == 'unPaid') {
                            let obj = {
                                bookedFrom: 'Mega Sale',
                                address: data[i].address,
                                city: data[i].city,
                                state: data[i].state,
                                payment: data[i].billboardAmount,
                                billboardId: data[i].billboardId,
                                dateBookedFrom: data[i].bookedDate.slice(5, 15),
                                dateBookedTo: data[i].bookedDate.slice(19, 29),

                            }
                            unPaidData.push(obj)
                        }
                        else if (data[i].paymentStatus == 'expire') {
                            let obj = {
                                bookedFrom: 'Mega Sale',
                                address: data[i].address,
                                city: data[i].city,
                                state: data[i].state,
                                payment: data[i].billboardAmount,
                                billboardId: data[i].billboardId,
                                dateBookedFrom: data[i].bookedDate.slice(5, 15),
                                dateBookedTo: data[i].bookedDate.slice(19, 29),

                            }
                            expireData.push(obj)
                        }
                        else if (data[i].paymentStatus == undefined) {
                            data[i].bookedFrom = 'Mega Sale'
                            let obj = {
                                bookedFrom: 'Mega Sale',
                                address: data[i].address,
                                city: data[i].city,
                                state: data[i].state,
                                payment: data[i].billboardAmount,
                                dateBookedFrom: data[i].bookedDate.slice(5, 15),
                                dateBookedTo: data[i].bookedDate.slice(19, 29),
                                billboardId: data[i].billboardId,

                            }
                            pendingData.push(obj)
                        }
                    }
                }
            }
            let responseBidding = await HttpUtils.post('getspecificUserBookedBidderbillboard', obj);

            if (responseBidding) {
                if (responseBidding.code == 200) {
                    let data = responseBidding.content;
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].paymentStatus == 'paid') {
                            let obj = {
                                bookedFrom: 'Bidding',
                                payment: data[i].bidAamount,
                                dateBookedFrom: data[i].billboardAvailabilityFrom,
                                dateBookedTo: data[i].billboardAvailabilityFromTo,
                                address: data[i].address,
                                city: data[i].city,
                                state: data[i].state,
                                billboardId: data[i].billboardId,

                            }
                            paidData.push(obj)
                        }
                        else if (data[i].paymentStatus == 'unPaid') {
                            let obj = {
                                bookedFrom: 'Bidding',
                                address: data[i].address,
                                city: data[i].city,
                                state: data[i].state,
                                payment: data[i].bidAamount,
                                billboardId: data[i].billboardId,
                                dateBookedFrom: data[i].billboardAvailabilityFrom,
                                dateBookedTo: data[i].billboardAvailabilityFromTo,

                            }
                            unPaidData.push(obj)
                        }
                        else if (data[i].paymentStatus == 'expire') {
                            let obj = {
                                bookedFrom: 'Bidding',
                                address: data[i].address,
                                city: data[i].city,
                                state: data[i].state,
                                payment: data[i].bidAamount,
                                billboardId: data[i].billboardId,
                                dateBookedFrom: data[i].billboardAvailabilityFrom,
                                dateBookedTo: data[i].billboardAvailabilityFromTo,

                            }
                            expireData.push(obj)
                        }
                        else if (data[i].paymentStatus == undefined) {
                            let obj = {
                                bookedFrom: 'Bidding',
                                address: data[i].address,
                                city: data[i].city,
                                state: data[i].state,
                                payment: data[i].bidAamount,
                                billboardId: data[i].billboardId,
                                dateBookedFrom: data[i].billboardAvailabilityFrom,
                                dateBookedTo: data[i].billboardAvailabilityFromTo,

                            }
                            pendingData.push(obj)
                        }
                    }
                }
            }
        }



        this.setState({
            paid: paidData,
            unpaid: unPaidData,
            expire: expireData,
            pendingData: pendingData
        })

    }

    render() {
        const { paid, unpaid, expire, pendingData } = this.state;
        return (
            <div>
                <div className="row" style={{ marginTop: '20px' }}>
                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                        <div className="row">
                            <div className="col-12 col-sm-3 col-md-3 col-lg-2 col-xl-2">
                                <img
                                    src='https://res.cloudinary.com/dxk0bmtei/image/upload/v1590097678/demo1_hfw9wh.png'
                                    alt='img'
                                    className="myProfileLogoCompany"
                                />
                                <h1 className="myProfileName">My Profile</h1>
                            </div>
                            <div className="col-12 col-sm-9 col-md-9 col-lg-10 col-xl-10">
                                <fieldset className="mainField">
                                    <legend className="fieldinnerLegend">Company Details:</legend>
                                    <h4 className="maindescripthead">Description:</h4>
                                    <p className="paraInnerText">Lorem ipsum, or lipsum as it is sometimes known,
                                    is dummy text used in laying out print, graphic or web designs.
                                    The passage is attributed to an unknown typesetter in the 15th century
                                    who is thought to have scrambled parts of Cicero's De Finibus Bonorum
                                    et Malorum for use in a type specimen book.
                            </p>
                                    <h4 className="maindescripthead">Address:</h4>
                                    <p className="paraInnerText">
                                        Suit # 300, 3rd Floor, 1-D, Sunset Tower, Sunset Boulevard Road, Phase-2، DHA، Phase 2 Karachi, Karachi City, Sindh 75500
                            </p>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                </div>
                <br /><br /><br />
                <div className="row">
                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                        <div className="row" style={{ margin: '0px' }}>
                            <div className="col-1 col-sm-2 col-md-2 col-lg-2 col-xl-2"></div>
                            <div className="col-10 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                <nav>
                                    <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                        <a className="nav-item nav-link active tablee_Navtab" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">
                                            <span className="doesit10">Payment pending</span>
                                        </a>
                                        <a className="nav-item nav-link tablee_Navtab" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">
                                            <span className="doesit10">Payment paid(current)</span>
                                        </a>
                                        <a className="nav-item nav-link tablee_Navtab" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">
                                            <span className="doesit10">Payment unpaid</span>
                                        </a>
                                        <a className="nav-item nav-link tablee_Navtab" id="nav-users-tab" data-toggle="tab" href="#nav-users" role="tab" aria-controls="nav-users" aria-selected="false">
                                            <span className="doesit10">Expired</span>
                                        </a>
                                    </div>
                                </nav>
                            </div>
                            <div className="col-1 col-sm-2 col-md-2 col-lg-2 col-xl-2"></div>
                        </div>
                        <div className="row" style={{ margin: '0px' }}>
                            <div className="col-12 col-md-12 col-lg-12 col-xl-12 userDataPlace">
                                <div className="tab-content py-3 px-sm-0" id="nav-tabContent">
                                    <div className="tab-pane fade show active text-justify" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                        <table class="table" style={{ textAlign: 'center' }}>
                                            <thead className="tablee_Head">
                                                <tr>
                                                    <th className="BidhistoryTH">#</th>
                                                    <th className="BidhistoryTH">Booked From</th>
                                                    <th className="BidhistoryTH">Payment</th>
                                                    <th className="BidhistoryTH">Booked Date From</th>
                                                    <th className="BidhistoryTH">Booked Date To</th>
                                                    <th className="BidhistoryTH">Address</th>
                                                    <th className="BidhistoryTH">City</th>
                                                    <th className="BidhistoryTH">State</th>
                                                    <th className="BidhistoryTH">View</th>
                                                </tr>
                                            </thead>
                                            {pendingData && pendingData.map((elem, key) => {
                                                return (
                                                    <tbody>
                                                        <tr>
                                                            <td className="tablee_th">0</td>
                                                            <td className="tablee_td">{elem.bookedFrom}</td>
                                                            <td className="tablee_td">
                                                                <NumberFormat value={elem.payment} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
                                                            </td>
                                                            <td className="tablee_td">{elem.dateBookedFrom}</td>
                                                            <td className="tablee_td">{elem.dateBookedTo}</td>
                                                            <td className="tablee_td">{elem.address}</td>
                                                            <td className="tablee_td">{elem.city}</td>
                                                            <td className="tablee_td">{elem.state}</td>


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
                                                    <th className="BidhistoryTH">Booked From</th>
                                                    <th className="BidhistoryTH">Payment</th>
                                                    <th className="BidhistoryTH">Booked Date</th>
                                                    <th className="BidhistoryTH">Address</th>
                                                    <th className="BidhistoryTH">City</th>
                                                    <th className="BidhistoryTH">State</th>
                                                    <th className="BidhistoryTH">View</th>
                                                </tr>
                                            </thead>
                                            {paid && paid.map((elem, key) => {
                                                return (
                                                    <tbody>
                                                        <tr>
                                                            <td className="tablee_th">0</td>
                                                            <td className="tablee_td">{elem.bookedFrom}</td>
                                                            <td className="tablee_td">
                                                                <NumberFormat value={elem.payment} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
                                                            </td>
                                                            <td className="tablee_td">{elem.dateBookedFrom}</td>
                                                            <td className="tablee_td">{elem.dateBookedTo}</td>
                                                            <td className="tablee_td">{elem.address}</td>
                                                            <td className="tablee_td">{elem.city}</td>
                                                            <td className="tablee_td">{elem.state}</td>


                                                        </tr>
                                                    </tbody>
                                                )

                                            })}
                                        </table>
                                    </div>
                                    <div className="tab-pane fade" id="nav-users" role="tabpanel" aria-labelledby="nav-users-tab">
                                        <table class="table" style={{ textAlign: 'center' }}>
                                            <thead className="tablee_Head">
                                                <tr>
                                                    <th className="BidhistoryTH">#</th>
                                                    <th className="BidhistoryTH">Booked From</th>
                                                    <th className="BidhistoryTH">Payment</th>
                                                    <th className="BidhistoryTH">Booked Date</th>
                                                    <th className="BidhistoryTH">Address</th>
                                                    <th className="BidhistoryTH">City</th>
                                                    <th className="BidhistoryTH">State</th>
                                                    <th className="BidhistoryTH">View</th>
                                                </tr>
                                            </thead>
                                            {unpaid && unpaid.map((elem, key) => {
                                                return (
                                                    <tbody>
                                                        <tr>
                                                            <td className="tablee_th">0</td>
                                                            <td className="tablee_td">{elem.bookedFrom}</td>
                                                            <td className="tablee_td">
                                                                <NumberFormat value={elem.payment} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
                                                            </td>
                                                            <td className="tablee_td">{elem.dateBookedFrom}</td>
                                                            <td className="tablee_td">{elem.dateBookedTo}</td>
                                                            <td className="tablee_td">{elem.address}</td>
                                                            <td className="tablee_td">{elem.city}</td>
                                                            <td className="tablee_td">{elem.state}</td>


                                                        </tr>
                                                    </tbody>
                                                )

                                            })}
                                        </table>
                                    </div>
                                    <div className="tab-pane fade" id="nav-users" role="tabpanel" aria-labelledby="nav-users-tab">
                                        <table class="table" style={{ textAlign: 'center' }}>
                                            <thead className="tablee_Head">
                                                <tr>
                                                    <th className="BidhistoryTH">#</th>
                                                    <th className="BidhistoryTH">Booked From</th>
                                                    <th className="BidhistoryTH">Payment</th>
                                                    <th className="BidhistoryTH">Booked Date</th>
                                                    <th className="BidhistoryTH">Address</th>
                                                    <th className="BidhistoryTH">City</th>
                                                    <th className="BidhistoryTH">State</th>
                                                    <th className="BidhistoryTH">View</th>
                                                </tr>
                                            </thead>
                                            {expire && expire.map((elem, key) => {
                                                return (
                                                    <tbody>
                                                        <tr>
                                                            <td className="tablee_th">0</td>
                                                            <td className="tablee_td">{elem.bookedFrom}</td>
                                                            <td className="tablee_td">
                                                                <NumberFormat value={elem.payment} displayType={'text'} thousandSeparator={true} prefix={'Rs. '} />
                                                            </td>
                                                            <td className="tablee_td">{elem.dateBookedFrom}</td>
                                                            <td className="tablee_td">{elem.dateBookedTo}</td>
                                                            <td className="tablee_td">{elem.address}</td>
                                                            <td className="tablee_td">{elem.city}</td>
                                                            <td className="tablee_td">{elem.state}</td>


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
                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                </div>
            </div>
        )
    }

}
export default ProfileView;