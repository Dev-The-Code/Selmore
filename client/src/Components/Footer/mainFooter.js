import React, { Component } from 'react';
import './mainFooter.scss';
import { Link } from 'react-router-dom';


class MainFooter extends Component {
    render() {
        return (
            <div className="animated animatedFadeInUp fadeInUp">
                <div className="row wholeFooterBack">
                    <div className="col-12 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-12 col-sm-2 col-md-2 col-lg-2 col-xl-2 centerMob">
                        <img src="https://res.cloudinary.com/dxk0bmtei/image/upload/v1587019522/selmore-Logo_xvmcrs.png" alt="" className="" />
                    </div>
                    <div className="col-1 col-sm-2 col-md-2 col-lg-2 col-xl-2"></div>
                    <div className="col-11 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                        <h3 className="footerHeads">Contact</h3>
                        <ul className="listulSty">
                            <li>Blog</li>
                            <li>Forum</li>
                            <li>List your ad</li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-11 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                        <h3 className="footerHeads">Quick links</h3>
                        <ul className="listulSty">
                            <li>About us</li>
                            <li>FAQ</li>
                            <li>Privacy policy</li>
                            <li>Advertise on Selmore</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainFooter;