import React, { Component } from 'react';
import './billmilitary.css';

class Militarypanel2 extends Component {
  render() {
    return (
     	<div>
     		<div className="container soldier2">
     			<div className="row" style={{margin:'0px'}}>
     				<div className="col-md-2 col-lg-1 col-xl-1 col-3">
     					<div className="honda1">
     						<h5><span className="honda2">Photo</span></h5>
     					</div>
     				</div>
     				<div className="col-md-7 col-lg-7 col-xl-8 col-6">
     					<input type="text" className="form-control" placeholder="Start The Discussion"/>
     				</div>
     				<div className="col-md-2 col-lg-1 col-xl-1 col-3">
     					<button className="btn btn-primary">Send</button>
     				</div>
     			</div>
     		</div><br/>	
     	</div>
    );
  }
}
export default Militarypanel2;