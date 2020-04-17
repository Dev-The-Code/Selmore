import React, { Component } from 'react';
import './prestigiousClientsPanel.scss';
import { Link } from 'react-router-dom';


class PrestigiousClients extends Component {
    render() {
        return (
            <div className="animated animatedFadeInUp fadeInUp">
                {/*hiddenn only on mobile*/}
                <div className="d-none d-sm-block">
                    <div className="row mainRwClients">
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <h3 className="clientsHead">Our Prestigious Clients</h3>
                        </div>
                        <div className="col-md-12 col-lg-12 col-xl-12">
                            <div id="demo" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <div className="row">
                                            <div className="col-md-2 col-lg-2 col-xl-2"></div>
                                            <div className="col-md-8 col-lg-8 col-xl-8">
                                                <div className="row">
                                                    <div className="col-md-4 col-lg-4 col-xl-4">
                                                        <img
                                                            src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1587103271/unilever_zfb4ss.png"
                                                            alt="logos"
                                                            className="logosClient"
                                                        />
                                                    </div>
                                                    <div className="col-md-4 col-lg-4 col-xl-4">
                                                        <img
                                                            src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1587103271/toyota_xyuo4r.png"
                                                            alt="logos"
                                                            className="logosClient"
                                                        />
                                                    </div>
                                                    <div className="col-md-4 col-lg-4 col-xl-4">
                                                        <img
                                                            src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1587103271/ufone_z6iwa6.png"
                                                            alt="logos"
                                                            className="logosClient"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-lg-2 col-xl-2"></div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div className="row">
                                            <div className="col-md-2 col-lg-2 col-xl-2"></div>
                                            <div className="col-md-8 col-lg-8 col-xl-8">
                                                <div className="row">
                                                    <div className="col-md-4 col-lg-4 col-xl-4">
                                                        <img
                                                            src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1587103271/tcs_w7zzxx.png"
                                                            alt="logos"
                                                            className="logosClient"
                                                        />
                                                    </div>
                                                    <div className="col-md-4 col-lg-4 col-xl-4">
                                                        <img
                                                            src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1587103271/candyland_nwxbcw.png"
                                                            alt="logos"
                                                            className="logosClient"
                                                        />
                                                    </div>
                                                    <div className="col-md-4 col-lg-4 col-xl-4">
                                                        <img
                                                            src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1587103271/samsung_kasf4u.png"
                                                            alt="logos"
                                                            className="logosClient"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-lg-2 col-xl-2"></div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div className="row">
                                            <div className="col-md-2 col-lg-2 col-xl-2"></div>
                                            <div className="col-md-8 col-lg-8 col-xl-8">
                                                <div className="row">
                                                    <div className="col-md-4 col-lg-4 col-xl-4">
                                                        <img
                                                            src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1587103271/coca-cola_qgnscg.png"
                                                            alt="logos"
                                                            className="logosClient"
                                                        />
                                                    </div>
                                                    <div className="col-md-4 col-lg-4 col-xl-4">
                                                        <img
                                                            src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1587103271/sc_bank_ihk2de.png"
                                                            alt="logos"
                                                            className="logosClient"
                                                        />
                                                    </div>
                                                    <div className="col-md-4 col-lg-4 col-xl-4">
                                                        <img
                                                            src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1587103271/p-and-g_tdfaux.png"
                                                            alt="logos"
                                                            className="logosClient"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-2 col-lg-2 col-xl-2"></div>
                                        </div>
                                    </div>
                                    <a class="carousel-control-prev" href="#demo" data-slide="prev">
                                        <span class="carousel-control-prev-icon"></span>
                                    </a>
                                    <a class="carousel-control-next" href="#demo" data-slide="next">
                                        <span class="carousel-control-next-icon"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*visible on mobile*/}
                <div className="d-block d-sm-none">
                    <div className="row mainRwClients">
                        <div className="col-1"></div>
                        <div className="col-10">
                            <h3 className="clientsHeadMob">Our Prestigious Clients</h3>
                        </div>
                        <div className="col-1"></div>
                        <div className="col-12">
                            <div id="demoMob" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <div className="row">
                                            <div className="col-2"></div>
                                            <div className="col-8">
                                                <img
                                                    src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1587103271/unilever_zfb4ss.png"
                                                    alt="logos"
                                                    className="logosClient"
                                                />
                                            </div>
                                            <div className="col-2"></div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div className="row">
                                            <div className="col-2"></div>
                                            <div className="col-8">
                                                <img
                                                    src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1587103271/toyota_xyuo4r.png"
                                                    alt="logos"
                                                    className="logosClient"
                                                />
                                            </div>
                                            <div className="col-2"></div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div className="row">
                                            <div className="col-2"></div>
                                            <div className="col-8">
                                                <img
                                                    src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1587103271/ufone_z6iwa6.png"
                                                    alt="logos"
                                                    className="logosClient"
                                                />
                                            </div>
                                            <div className="col-2"></div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div className="row">
                                            <div className="col-2"></div>
                                            <div className="col-8">
                                                <img
                                                    src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1587103271/tcs_w7zzxx.png"
                                                    alt="logos"
                                                    className="logosClient"
                                                />
                                            </div>
                                            <div className="col-2"></div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div className="row">
                                            <div className="col-2"></div>
                                            <div className="col-8">
                                                <img
                                                    src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1587103271/candyland_nwxbcw.png"
                                                    alt="logos"
                                                    className="logosClient"
                                                />
                                            </div>
                                            <div className="col-2"></div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div className="row">
                                            <div className="col-2"></div>
                                            <div className="col-8">
                                                <img
                                                    src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1587103271/samsung_kasf4u.png"
                                                    alt="logos"
                                                    className="logosClient"
                                                />
                                            </div>
                                            <div className="col-2"></div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div className="row">
                                            <div className="col-2"></div>
                                            <div className="col-8">
                                                <img
                                                    src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1587103271/coca-cola_qgnscg.png"
                                                    alt="logos"
                                                    className="logosClient"
                                                />
                                            </div>
                                            <div className="col-2"></div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div className="row">
                                            <div className="col-2"></div>
                                            <div className="col-8">
                                                <img
                                                    src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1587103271/sc_bank_ihk2de.png"
                                                    alt="logos"
                                                    className="logosClient"
                                                />
                                            </div>
                                            <div className="col-2"></div>
                                        </div>
                                    </div>
                                    <div class="carousel-item">
                                        <div className="row">
                                            <div className="col-2"></div>
                                            <div className="col-8">
                                                <img
                                                    src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1587103271/p-and-g_tdfaux.png"
                                                    alt="logos"
                                                    className="logosClient"
                                                />
                                            </div>
                                            <div className="col-2"></div>
                                        </div>
                                    </div>
                                    <a class="carousel-control-prev" href="#demoMob" data-slide="prev">
                                        <span class="carousel-control-prev-icon"></span>
                                    </a>
                                    <a class="carousel-control-next" href="#demoMob" data-slide="next">
                                        <span class="carousel-control-next-icon"></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PrestigiousClients;