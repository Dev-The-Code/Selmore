import React, { Component } from 'react';
import './about.scss';

class AbBanner extends Component {
  render() {
    return (
        <div>				
					<div className="row" style={{margin:'0px'}}>
						<img src="./images/about-banner.png" alt ='img' className="glass1"/>
					</div>
					<div>
						<div className="container active2">
							<h4><span className="active3">{this.props.advertise}</span></h4>						
						</div>
					</div>
					<div className="active4">
						<div className="container active8">
							<ol className="olpad">
								<ul className="active6"><span className="active5">HOME</span></ul>
								<ul className="active7"><span className="active5">> {this.props.bred}</span></ul>
								<ul className="active7"><span className="active5">{this.props.bred2}</span></ul>
								<ul className="active7"><span className="active5">{this.props.bred3}</span></ul>
							</ol>
						</div>
					</div>
					
  		</div> 
    );
  }
}

export default AbBanner;