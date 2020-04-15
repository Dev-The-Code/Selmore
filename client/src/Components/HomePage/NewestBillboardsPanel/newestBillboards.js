import React, { Component } from 'react';
import './newestBillboards.scss';
import { Link } from 'react-router-dom';


class NewestBillboards extends Component {
    render() {
        return (
            <div className="animated animatedFadeInUp fadeInUp">
                <div className="row mainRwNewestBill">
                    <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-12 col-md-2 col-lg-3 col-xl-3"></div>
                    <div className="col-12 col-md-6 col-lg-4 col-xl-4">
                        <h3 className="newestBillHead">Newest Billboards</h3>
                    </div>
                    <div className="col-12 col-md-2 col-lg-3 col-xl-3">
                        <Link><p className="seeAllnewestBill">See All ></p></Link>
                    </div>
                    <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                </div>
                <div className="row mainRwBilboards">
                    <div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-10 col-md-10 col-lg-10 col-xl-10">
                        <div className="row">
                            <div className="col-12 col-md-4 col-lg-3 col-xl-3">
                                <div className="mainNewestBillCardDiv">
                                    <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586885904/Picture20_nql7cc_n15zrl.jpg" alt="card" className="newestBillCardImgs" />
                                    <div className="newestBillDetailCardDiv">
                                        <p className="newestBillCardName">Hafiz Brother</p>
                                        <p className="newestBillCardCity">Lahore</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-3 col-xl-3">
                                <div className="mainNewestBillCardDiv">
                                    <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586885904/Picture20_nql7cc_n15zrl.jpg" alt="card" className="newestBillCardImgs" />
                                    <div className="newestBillDetailCardDiv">
                                        <p className="newestBillCardName">Hafiz Brother</p>
                                        <p className="newestBillCardCity">Lahore</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-3 col-xl-3">
                                <div className="mainNewestBillCardDiv">
                                    <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586885904/Picture20_nql7cc_n15zrl.jpg" alt="card" className="newestBillCardImgs" />
                                    <div className="newestBillDetailCardDiv">
                                        <p className="newestBillCardName">Hafiz Brother</p>
                                        <p className="newestBillCardCity">Lahore</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-3 col-xl-3">
                                <div className="mainNewestBillCardDiv">
                                    <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586885904/Picture20_nql7cc_n15zrl.jpg" alt="card" className="newestBillCardImgs" />
                                    <div className="newestBillDetailCardDiv">
                                        <p className="newestBillCardName">Hafiz Brother</p>
                                        <p className="newestBillCardCity">Lahore</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-3 col-xl-3">
                                <div className="mainNewestBillCardDiv">
                                    <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586885904/Picture20_nql7cc_n15zrl.jpg" alt="card" className="newestBillCardImgs" />
                                    <div className="newestBillDetailCardDiv">
                                        <p className="newestBillCardName">Hafiz Brother</p>
                                        <p className="newestBillCardCity">Lahore</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-3 col-xl-3">
                                <div className="mainNewestBillCardDiv">
                                    <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586885904/Picture20_nql7cc_n15zrl.jpg" alt="card" className="newestBillCardImgs" />
                                    <div className="newestBillDetailCardDiv">
                                        <p className="newestBillCardName">Hafiz Brother</p>
                                        <p className="newestBillCardCity">Lahore</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-3 col-xl-3">
                                <div className="mainNewestBillCardDiv">
                                    <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586885904/Picture20_nql7cc_n15zrl.jpg" alt="card" className="newestBillCardImgs" />
                                    <div className="newestBillDetailCardDiv">
                                        <p className="newestBillCardName">Hafiz Brother</p>
                                        <p className="newestBillCardCity">Lahore</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-4 col-lg-3 col-xl-3">
                                <div className="mainNewestBillCardDiv">
                                    <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586885904/Picture20_nql7cc_n15zrl.jpg" alt="card" className="newestBillCardImgs" />
                                    <div className="newestBillDetailCardDiv">
                                        <p className="newestBillCardName">Hafiz Brother</p>
                                        <p className="newestBillCardCity">Lahore</p>
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

export default NewestBillboards;