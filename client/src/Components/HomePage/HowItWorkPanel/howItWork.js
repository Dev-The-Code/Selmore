import React, { Component } from 'react';
import './howItWork.scss';
import { Link } from 'react-router-dom';


class HowItWork extends Component {
    render() {
        return (
            <div className="animated animatedFadeInUp fadeInUp">
                <div className="row">
                    <div className="col-12 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 mainTenDivbord">
                        <div className="row">
                            <div className="col-1 col-sm-2 col-md-2 col-lg-3 col-xl-3"></div>
                            <div className="col-10 col-sm-8 col-md-8 col-lg-6 col-xl-6">
                                <h3 className="howWorkHead">How It Works?</h3>
                                <p className="howWorkBtomPara">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.</p>
                            </div>
                            <div className="col-1 col-sm-2 col-md-2 col-lg-3 col-xl-3"></div>
                        </div>
                        <div className="row">
                            <div className="col-1 col-sm-1 col-md-1 col-lg-2 col-xl-2"></div>
                            <div className="col-10 col-sm-10 col-md-10 col-lg-8 col-xl-8">
                                <div className="row">
                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-5 twoBoxesInside">
                                        <h3 className="sellerBuyerHead">Are you a seller?</h3>
                                        <p className="sellerBuyerText">List your ad media for rent</p>
                                        <Link to={`/seller`}>
                                            <button className="btn buySellBtn">Start selling</button>
                                        </Link>
                                    </div>
                                    <div className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2"></div>
                                    <div className="col-12 col-sm-5 col-md-5 col-lg-5 col-xl-5 twoBoxesInside">
                                        <h3 className="sellerBuyerHead">Are you a Buyer?</h3>
                                        <p className="sellerBuyerText">Advertise your brand easily</p>
                                        <Link to={`/buyer`}>
                                            <button className="btn buySellBtn">Buy ad media</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-1 col-sm-1 col-md-1 col-lg-2 col-xl-2"></div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                </div>
            </div>
        );
    }
}

export default HowItWork;