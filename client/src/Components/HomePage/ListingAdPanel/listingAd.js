import React, { Component } from 'react';
import './listingAd.scss';
import { Link } from 'react-router-dom';


class ListingAd extends Component {
    render() {
        return (
            <div className="animated animatedFadeInUp fadeInUp">
                <div className="row mainRwofList">
                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1 questSec"></div>
                    <div className="col-11 col-sm-7 col-md-7 col-lg-7 col-xl-7 questSec">
                        <h3 className="interestedHead">Interested in listing your ad media?</h3>
                        <p className="interestedBottomPara">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.</p>
                    </div>
                    <div className="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 startSec">
                        <Link to={`/contact`}>
                            <h3 className="getStartedText">Get Started ></h3>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default ListingAd;