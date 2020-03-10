import React, { Component } from 'react';
import './megaDetail.scss';

class Megapanel2 extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3 col-lg-3 col-xl-3 col-1"></div>
                        <div className="col-md-6 col-lg-6 col-xl-6 col-10">
                            <div className="card_megadetail" style={{ borderRadius: '0px' }}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-1 col-lg-1 col-xl-1 col-2">
                                            <div className="honda1">
                                                <i className="fa fa-user"></i>
                                            </div>
                                        </div>
                                        <div className="col-md-11 col-lg-11 col-xl-11 col-10">
                                            <label for="name" className="detail">Selmore</label>
                                        </div>
                                        <div className="col-md-12 col-lg-12 col-xl-12 col-12">
                                            <hr />
                                        </div>
                                        <div className="col-md-1 col-lg-1 col-xl-1 col-2">
                                            <div className="honda1">
                                                <i className="fa fa-phone"></i>
                                            </div>
                                        </div>
                                        <div className="col-md-11 col-lg-11 col-xl-11 col-10">
                                            <label for="number" className="detail">0900-78601</label>
                                        </div>
                                        <div className="col-md-12 col-lg-12 col-xl-12 col-12">
                                            <hr />
                                        </div>
                                        <div className="col-md-1 col-lg-1 col-xl-1 col-2">
                                            <div className="honda1">
                                                <i className="fa fa-envelope"></i>
                                            </div>
                                        </div><br />
                                        <div className="col-md-11 col-lg-11 col-xl-11 col-10">
                                            <label for="email" className="detail">krlcreative@.com</label>
                                        </div>
                                        <div className="col-md-12 col-lg-12 col-xl-12 col-12">
                                            <hr />
                                        </div>
                                        <div className="col-md-1 col-lg-1 col-xl-1 col-2">
                                            <div className="honda1">
                                                <i className="fa fa-address-card"></i>
                                            </div>
                                        </div>
                                        <div className="col-md-11 col-lg-11 col-xl-11 col-10">
                                            <label for="address" className="detail">xyz.....</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 col-lg-3 col-xl-3 col-1"></div>
                    </div>
                </div><br />
            </div>
        );
    }
}
export default Megapanel2;
