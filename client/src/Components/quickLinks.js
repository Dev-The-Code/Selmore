import React, { Component } from 'react';



class QuickLinks extends Component {
  render() {
    return (
        <div>        	
			<h3  className="footertext1"><span>QUICK LINKS</span></h3>
			<div className="row">
				<div className="col-4 col-md-3 col-lg-3 col-xl-3"></div>
				<div className="col-4 col-md-6 col-lg-6 col-xl-6 hrline3"></div>
				<div className="col-4 col-md-3 col-lg-3 col-xl-3"></div>
			</div>
			<div>
				<ul className="true2">
					<li><a href="#">About Us</a></li>
					<li><a href="#">FaQ</a></li>
					<li><a href="#">Privacy Policy</a></li>
					<li><a href="#">Advertise On Selmore</a></li>
					<li>Contact Us</li>
				</ul>  							
			</div>	      				
       </div>
    );
  }
}

export default QuickLinks;