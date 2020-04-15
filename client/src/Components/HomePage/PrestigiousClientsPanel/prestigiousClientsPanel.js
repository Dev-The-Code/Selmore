import React, { Component } from 'react';
import './prestigiousClientsPanel.scss';
import { Link } from 'react-router-dom';


class PrestigiousClients extends Component {
    render() {
        return (
            <div className="animated animatedFadeInUp fadeInUp">
                <div className="row mainRwNewestBill">
                    <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-12 col-md-2 col-lg-3 col-xl-3"></div>
                    <div className="col-12 col-md-6 col-lg-4 col-xl-4">
                        <h3 className="newestBillHead">OurPrestigious Clients</h3>
                    </div>
                    <div className="col-12 col-md-2 col-lg-3 col-xl-3">
                        <Link><p className="seeAllnewestBill">See All ></p></Link>
                    </div>
                    <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                </div>
               
               
            </div>
        );
    }
}

export default PrestigiousClients;