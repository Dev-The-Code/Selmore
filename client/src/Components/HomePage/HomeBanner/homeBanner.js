import React, { Component } from 'react';
import Filtration from './bannerFiltration/bannerFiltration';
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
                <Filtration />
            </div>
        );
    }
}

export default HomeBanner;