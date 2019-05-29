import React, { Component } from 'react';
import './billbidding.css';
import AbBanner from '../About Selmore/abBanner';

class Billbiddbanner extends Component {
  render() {
    return (
        <div>
			<AbBanner advertise={'ABOUT SELMORE'} bred={'About'} />
  		</div> 
    );
  }
}
export default Billbiddbanner;

/*<div className="row" style={{margin:'0px'}}> 	
				<img src="./images/about-banner.png" className="unit1"/>
			</div> 
			<div>
				<div className="container unit2">
					<h4><span className="unit3">BILLBOARDS</span></h4>						
				</div>
		    </div>
		    <div className="unit7">
        		<div className="container unit8">
        			<ol>
						<ul className="unit4"><a href="#"><span className="unit6">HOME</span></a></ul>
						<ul className="unit5"><a href="#"><span className="unit6">> CATEGEORY</span></a></ul>
						<ul className="unit5"><a href="#"><span className="unit6">> BIDDING BILLBOARDS</span></a></ul>
					</ol>
        		</div>
        	</div><br/>	*/