import React, { Component } from 'react';
import './homeBanner.scss';
import { Link } from 'react-router-dom';


class HomeBanner extends Component {
    render() {
        return (
            <div className="animated animatedFadeInUp fadeInUp">
                <div>
                    <div className="row mainBannerBackImg">
                        <div className="col-1 col-md-1 col-sm-1 col-lg-1 col-xl-1"></div>
                        <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                            <h1 className="bannerMainText">
                                Pakistan Outdoor<br /> Advertising Portal
                                </h1>
                            <p className="bannerSmallText">
                                Browse Billboards, get discounted prices,<br /> bid your best price and more
                                </p><br />
                        </div>
                        <div className="col-1 col-md-1 col-sm-1 col-lg-1 col-xl-1"></div>
                    </div>
                </div>
                {/* <div style={{ backgoundColor: '#19303a' }}>
                    <div className="container animated animatedFadeInUp fadeInUp" style={{ paddingLeft: '0px' }}>
                        <div className="row rowcolor" style={{ marginLeft: '0px' }}>
                            <div className="col-md-8 col-sm-8 bannercol8">
                                <h1 className="weight"><strong><span className="textwhite1">PAKISTAN<br /> OUTDOOR ADVERTISING <br /> PORTAL</span></strong></h1><br />
                                <p className="right">Search for Unique Advertising opportising from 128 ad Listing in Pakistan</p><br />
                                <button type="button" className="btn btn-lg btncolor1"> <Link rel="noopener noreferrer" to={`/contact`}><span className="contbutton">Contact Us</span></Link></button>
                            </div>
                            <div className="col-md-4 col-sm-4">
                                <img src="../images/bodr-on.png" alt='img' className="tikimage" />
                            </div>
                        </div>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default HomeBanner;