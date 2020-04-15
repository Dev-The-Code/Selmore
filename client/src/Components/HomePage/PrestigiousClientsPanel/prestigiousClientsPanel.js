import React, { Component } from 'react';
import './prestigiousClientsPanel.scss';
import { Link } from 'react-router-dom';


class PrestigiousClients extends Component {
    render() {
        return (
            <div className="animated animatedFadeInUp fadeInUp">
                <div className="row mainRwClients">
                    <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                        <h3 className="clientsHead">Our Prestigious Clients</h3>
                    </div>
                </div>
               
               <div className="row mainRwClientsCarosel">

               </div>
            </div>
        );
    }
}

export default PrestigiousClients;