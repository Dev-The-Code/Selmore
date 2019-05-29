import React, { Component } from 'react';
import './about.css';

class AbBanner extends Component {
  render() {
  	console.log(this.props,'asdasdsadasdas');
    return (
        <div>				
					<div className="row" style={{margin:'0px'}}>
						<img src="./images/about-banner.png" className="glass1"/>
					</div>
					<div>
						<div className="container active2">
							<h4><span className="active3">{this.props.advertise}</span></h4>						
						</div>
					</div>
					<div className="active4">
						<div className="container active8">
							<ol className="olpad">
								<ul className="active6"><a href="#"><span className="active5">HOME</span></a></ul>
								<ul className="active7"><a href="#"><span className="active5">> {this.props.bred}</span></a></ul>
								<ul className="active7"><a href="#"><span className="active5">{this.props.bred2}</span></a></ul>
								<ul className="active7"><a href="#"><span className="active5">{this.props.bred3}</span></a></ul>
							</ol>
						</div>
					</div>
					
  		</div> 
    );
  }
}

export default AbBanner;