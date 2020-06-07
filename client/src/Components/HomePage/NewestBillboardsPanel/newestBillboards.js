import React, { Component } from 'react';
import './newestBillboards.scss';
import { Link } from "react-router-dom";


class NewestBillboards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            

        }
    }
   

   
    render() {
        const { newestBillboard } = this.props;
        console.log(newestBillboard , 'newestBillboard')
        return (
            <div className="animated animatedFadeInUp fadeInUp">
                <div className="row mainRwNewestBill">
                    <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-12 col-md-2 col-lg-3 col-xl-3"></div>
                    <div className="col-12 col-md-6 col-lg-4 col-xl-4">
                        <h3 className="newestBillHead">Newest Billboards</h3>
                    </div>
                    <div className="col-12 col-md-2 col-lg-3 col-xl-3">
                        <Link to={`/market_place`}><p className="seeAllnewestBill">See All ></p></Link>
                    </div>
                    <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                </div>
                <div className="row mainRwBilboards">
                    <div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-10 col-md-10 col-lg-10 col-xl-10">
                        <div className="row">
                          
                            {newestBillboard && newestBillboard.map((elem, key) => {
                                return (
                                    <div className="col-12 col-md-4 col-lg-3 col-xl-3">
                                        <Link rel="noopener noreferrer" to={{ pathname: `/billborad_Militry`, state: elem }}>
                                            <div className="mainNewestBillCardDiv">
                                                <img src={elem.images[0]} alt={key} className="newestBillCardImgs" />
                                                <div className="newestBillDetailCardDiv">
                                                    <p className="newestBillCardName">{elem.companyName.substr(0, 13)}...</p>
                                                    <p className="newestBillCardCity">{elem.city}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                    <div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
                </div>
            </div>
        );
    }
}

export default NewestBillboards;