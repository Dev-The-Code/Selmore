import React, { Component } from 'react';



class Connect extends Component {
	// state = {
	// 	text1: "",
	// 	text2: '',
	// 	text3: ""
	// }

  render() {
	  // const { text1, text2, text3 } = this.state;
    return (
        <div>

      					<h3  className="footertext1"><span>CONNECT</span></h3>
						<div className="row">
							<div className="col-4 col-md-4 col-lg-4 col-xl-4"></div>
	      					<div className="col-4 col-md-4 col-lg-4 col-xl-4 hrline3"></div>
	      					<div className="col-4 col-md-4 col-lg-4 col-xl-4"></div>
						</div>
						<div>
							<ul className="true22">
							  <li><a href="#">Blog</a></li>
							  <li><a href="#">Forum</a></li>
							  <li><a href="#">List your Ads</a></li>
							</ul>
						</div>

       </div>
    );
  }
}

export default Connect;
