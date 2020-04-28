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
                            <Link to={''}><li className="footerNavtext">Blog</li></Link>
                            <Link to={''}><li className="footerNavtext">Forum</li></Link>
                            <Link to={'/list_add'}><li className="footerNavtext">List your ad</li></Link>
                            <Link to={'/contact'}><li className="footerNavtext">Contact Us</li></Link>
                        </ul>
                    </div>
                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-11 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                        <h3 className="footerHeads">Quick links</h3>
                        <ul className="listulSty">
                            <Link to={'/about'}><li className="footerNavtext">About us</li></Link>
                            <Link to={'/faq'}><li className="footerNavtext">FAQ</li></Link>
                            <Link to={'/faq'}><li className="footerNavtext">Privacy policy</li></Link>
                            <Link to={'/advertising_agency'}><li className="footerNavtext">Advertise on Selmore</li></Link>
                        </ul>
                    </div>
                </div>
            </div>
        );  
    }
}

export default MainFooter;