import React, { Component } from 'react';
import './bannerFiltration.scss';
import { Link } from 'react-router-dom';


class HomeBanner extends Component {
    render() {
        return (
            <div className="animated animatedFadeInUp fadeInUp">
                <div className="row">
                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                        <form>
                            <div className="filterPanel">ssss</div>
                        </form>
                    </div>
                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                </div>
            </div>
        );
    }
}

export default HomeBanner;