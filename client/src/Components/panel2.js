import React, { Component } from 'react';
import './home.css';

class Panel2 extends Component {
  render() {
    return (
      <div>
        <div className="row clock animated animatedFadeInUp fadeInUp" style={{margin:'0px'}}>
      		<div className="container">
          			<div className="row clock">
          				<div className="col-md-4"></div>
          				<div className="col-md-4 line2" style={{marginTop:'15px'}}><h3 className="pakola1">OUR BRANDS</h3></div>
          				<div className="col-md-4"></div>
        			   </div>
      			      <div className="row clock">
          					<div className="col-md-5 col-4"></div>
          					<div className="col-md-2 col-4 hrline"></div>
          					<div className="col-md-5 col-4"></div>
    				      </div>
    				  <div className="row clock">
      					<div className="col-md-3">
      						<img src="../images/jazz.png" className="drn3"/>
      					</div>
      					<div className="col-md-3">
      						<img src="../images/candy.png" className="drn4"/>
      					</div>
      					<div className="col-md-3">
      						<img src="../images/hbl.png" className="drnn"/>
      					</div>
      					<div className="col-md-3">
      						<img src="../images/peekfreans.png" className="drn5"/>
      					</div>
    				  </div>
    		  </div>
        </div><br/>  

      </div>
    );
  }
}

export default Panel2;