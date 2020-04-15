import React, { Component } from 'react';
import './listingAd.scss';
import { Link } from 'react-router-dom';


class ListingAd extends Component {
    render() {
        return (
            <div className="animated animatedFadeInUp fadeInUp">
                <div className="row mainRwofList">
                    <div className="col-12 col-sm-1 col-md-1 col-lg-1 col-xl-1 questSec"></div>
                    <div className="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 questSec">
                        <h3 className="interestedHead">Interested in listing your ad media?</h3>
                        <p className="interestedBottomPara">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.</p>
                    </div>
                    <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 startSec">
                        <h3 className="getStartedText">Get Started ></h3>
                    </div>
                    <div className="col-12 col-sm-1 col-md-1 col-lg-1 col-xl-1 startSec"></div>
                </div>
            </div>
        );
    }
}

export default ListingAd;