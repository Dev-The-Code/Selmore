import React, { Component } from 'react';
import './topCitiesBillboard.scss';
import { Link } from 'react-router-dom';


class TopCitiesBillboard extends Component {
    render() {
        return (
            <div className="animated animatedFadeInUp fadeInUp">
                <div className="row mainRwTopCities">
                    <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-1 col-md-1 col-lg-2 col-xl-2"></div>
                    <div className="col-10 col-md-8 col-lg-6 col-xl-6">
                        <h3 className="TopCitiesHead">Browse Billboards From Top Cities</h3>
                    </div>
                    <div className="col-12 col-md-1 col-lg-2 col-xl-2">
                        <Link><p className="seeAllTopCities">See All ></p></Link>
                    </div>
                    <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                </div>

                <div className="row mainTopCitiespanel">
                    <div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-10 col-md-10 col-lg-10 col-xl-10">
                        <div className="row">
                            <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                                <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586936694/roomRenting_f8w1st.jpg" alt="" className="topCitiesImgs" />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                                <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586936694/roomRenting_f8w1st.jpg" alt="" className="topCitiesImgs" />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                                <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586936694/roomRenting_f8w1st.jpg" alt="" className="topCitiesImgs" />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                                <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586936694/roomRenting_f8w1st.jpg" alt="" className="topCitiesImgs" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                                <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586936694/roomRenting_f8w1st.jpg" alt="" className="topCitiesImgs" />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                                <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586936694/roomRenting_f8w1st.jpg" alt="" className="topCitiesImgs" />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                                <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586936694/roomRenting_f8w1st.jpg" alt="" className="topCitiesImgs" />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                                <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586936694/roomRenting_f8w1st.jpg" alt="" className="topCitiesImgs" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TopCitiesBillboard;