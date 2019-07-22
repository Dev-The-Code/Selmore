import React, { Component } from 'react';
import './home.css';
import {Link, withRouter} from 'react-router-dom';


class Panel0 extends Component {
  render() {
    return (
      <div>
      		<div className="container up">
  				<div className="row">
      				<div className="col-md-4"></div>
  					<div className="col-md-4 line2"><h2 className="pakola1">BIDDING</h2></div>
      				<div className="col-md-4"></div>
			   	</div>
			    <div className="row">
  					<div className="col-md-5 col-4"></div>
					<div className="col-md-2 col-4 hrline"></div>
  					<div className="col-md-5 col-4"></div>
		      	</div><br/>
		      	<div className="row">
		      		<div className="col-md-4 seth1">
		      			<div className="key1">
		      				<img src="./images/bill1.png" className="imgsizee"/>
		      			</div>
		      			<div className="init2">
		      				<div style={{color: 'white'}}>
				      			<p className="fanta1">Lahore</p>
				      			<p className="fanta2"><button type="button" className="btn btn-primary fanta3"><Link  rel="noopener noreferrer" to={`/city_bidding`} style={{color:"white"}}>BIDDING</Link></button></p>
			      			</div>
      					</div>
		      		</div>
		      		<div className="col-md-4 text-center">
		      			<div className="key1">
		      				<img src="./images/bill2.png" className="imgsizee"/>
		      			</div>
		      			<div className="init6">
		      				<div style={{color: 'white'}}>
				      			<p className="fanta1">Shabbi</p>
				      			<p className="fantaa2"><button type="button" className="btn btn-primary fanta3"><Link  rel="noopener noreferrer" to={`/city_bidding`} style={{color:"white"}}>BIDDING</Link></button></p>
			      			</div>
	      				</div>
		      		</div>
		      		<div className="col-md-4 seth2">
		      			<div className="key1">
		      				<img src="./images/bill3.png" className="imgsizee"/>
		      			</div>
		      			<div className="init7">
		      				<div style={{color: 'white'}}>
				      			<p className="fanta1">Karachi</p>
				      			<p className="fanta2"><button type="button" className="btn btn-primary fanta3"><Link  rel="noopener noreferrer" to={`/city_bidding`} style={{color:"white"}}>BIDDING</Link></button></p>
			      			</div>
	      				</div>
		      		</div>
		      	</div>
		      	<div className="row moon2">
  					<div className="container fanta4">
						  <button type="button" className="btn btn-light yup"><span className="moon">SEE MORE</span></button>
			      </div>
  				</div>
      		</div>
      </div>
    );
  }
}

export default Panel0;
