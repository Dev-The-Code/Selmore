import React, { Component } from 'react';
import './megaSalePanel.scss';
import { Link } from 'react-router-dom';


class MegaSaleHome extends Component {
    render() {
        return (
            <div className="animated animatedFadeInUp fadeInUp">
                <div className="row mainRwPanel">
                    <div className="col-12 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                        <h3 className="megaSalHeading">Mega Sale</h3>
                        <Link><p className="seeAllMega">See All ></p></Link>
                    </div>
                    <div className="col-12 col-sm-2 col-md-3 col-lg-2 col-xl-2">
                        <div className="mainMegaCardDiv">
                            <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586885904/Picture20_nql7cc_n15zrl.jpg" alt="card" className="megaCardImgs" />
                            <p className="discountTag">10% off</p>
                            <div className="megaDetailCardDiv">
                                <p className="megaCardName">Hafiz Brother</p>
                                <p className="megaCardCity">Lahore</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-2 col-md-3 col-lg-2 col-xl-2">
                        <div className="mainMegaCardDiv">
                            <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586885904/Picture20_nql7cc_n15zrl.jpg" alt="card" className="megaCardImgs" />
                            <p className="discountTag">10% off</p>
                            <div className="megaDetailCardDiv">
                                <p className="megaCardName">Hafiz Brother</p>
                                <p className="megaCardCity">Lahore</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-2 col-md-3 col-lg-2 col-xl-2">
                        <div className="mainMegaCardDiv">
                            <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586885904/Picture20_nql7cc_n15zrl.jpg" alt="card" className="megaCardImgs" />
                            <p className="discountTag">10% off</p>
                            <div className="megaDetailCardDiv">
                                <p className="megaCardName">Hafiz Brother</p>
                                <p className="megaCardCity">Lahore</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-2 col-lg-3 col-xl-2 d-md-none d-lg-block">
                        <div className="mainMegaCardDiv">
                            <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586885904/Picture20_nql7cc_n15zrl.jpg" alt="card" className="megaCardImgs" />
                            <p className="discountTag">10% off</p>
                            <div className="megaDetailCardDiv">
                                <p className="megaCardName">Hafiz Brother</p>
                                <p className="megaCardCity">Lahore</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-1 col-lg-1 col-xl-1  d-md-none d-lg-block"></div>
                </div>
            </div>
        );
    }
}

export default MegaSaleHome;