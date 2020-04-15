import React, { Component } from 'react';
import './browseByCate.scss';
import { Link } from 'react-router-dom';


class BrowseByCate extends Component {
    render() {
        return (
            <div className="animated animatedFadeInUp fadeInUp">
                <div className="row mainRwBrowseCate">
                    <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-12 col-md-2 col-lg-3 col-xl-3"></div>
                    <div className="col-12 col-md-6 col-lg-4 col-xl-4">
                        <h3 className="browseCateHead">Browse By Category</h3>
                    </div>
                    <div className="col-12 col-md-2 col-lg-3 col-xl-3">
                        <Link><p className="seeAllCate">See All ></p></Link>
                    </div>
                    <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                </div>
                <div className="row mainRwBrowseCateImgs">
                    <div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-10 col-md-10 col-lg-10 col-xl-10">
                        <div className="row">
                            <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                                <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586936694/roomRenting_f8w1st.jpg" alt="" className="browseCateImgs" />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                                <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586936694/roomRenting_f8w1st.jpg" alt="" className="browseCateImgs" />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                                <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586936694/roomRenting_f8w1st.jpg" alt="" className="browseCateImgs" />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                                <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586936694/roomRenting_f8w1st.jpg" alt="" className="browseCateImgs" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                                <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586936694/roomRenting_f8w1st.jpg" alt="" className="browseCateImgs" />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                                <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586936694/roomRenting_f8w1st.jpg" alt="" className="browseCateImgs" />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                                <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586936694/roomRenting_f8w1st.jpg" alt="" className="browseCateImgs" />
                            </div>
                            <div className="col-12 col-md-3 col-lg-3 col-xl-3">
                                <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586936694/roomRenting_f8w1st.jpg" alt="" className="browseCateImgs" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586936694/roomRenting_f8w1st.jpg" alt="" className="browseCateImgs" />
                            </div>
                            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1586936694/roomRenting_f8w1st.jpg" alt="" className="browseCateImgs" />
                            </div>
                        </div>
                    </div>
                    <div className="col-11 col-md-1 col-lg-1 col-xl-1"></div>
                </div>
            </div>
        );
    }
}

export default BrowseByCate;