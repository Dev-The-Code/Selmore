import React, { Component } from 'react';
import './headerfooter.scss';
import FooterMenu from './footerMenu.js'
import About from './about.js';
import QuickLinks from './quickLinks.js';
import Connect from './connect.js';


let aboutObject = {
  first:'selmore advertising is leading',
  second:'outdoor advertising portal',
	third:'in pakistan. selmore is home ',
	fourth:'for outdoor advertising',
	fifth:'space.',
	sixth:'We connect ads buyer',
	seventh:' to ads seller'
}

let connectObject = {
  abc:'Blog',
  def:'Forum',
	ghi:'List your Ads',
}

let quicklinksObject = {
  first1:'About Us',
  second2:'FaQ',
	third3:'Privacy Policy',
	fourth4:'Advertise On Selmore',
	fifth5:'Contact Us',
}

class Footer extends Component {

  render() {
    return (
        <div>
      		<div className="container true3">

				<div className="row">
				<div className="col-12 col-md-4 col-lg-4 col-xl-4">
						<About about={aboutObject} />
				</div>
				<div className="col-12 col-md-4 col-lg-4 col-xl-4">
						<Connect connect={connectObject} />
				</div>
				<div className="col-12 col-md-4 col-lg-4 col-xl-4">
						<QuickLinks quicklinks={quicklinksObject}/>
				</div>

      				{/*<div className="col-4 col-md-4 col-lg-4 col-xl-4">
  						<h3  className="footertext1"><span>ABOUT</span></h3>
  							<div className="row">
	  							<div className="col-4 col-md-4 col-lg-4 col-xl-4"></div>
		      					<div className="col-4 col-md-4 col-lg-4 col-xl-4 hrline3"></div>
		      					<div className="col-4 col-md-4 col-lg-4 col-xl-4"></div>
  							</div>
  							<div className="d-none d-sm-block">
	      						<p className="footertext2"><span>selmore advertising is leading <br/> outdoor advertising portal<br/> in pakistan. selmore is home <br/>for outdoor advertising <br/>space.
	      					 We connect ads buyer<br/> to ads seller</span></p>
      						</div>
      						<div className="d-block d-sm-none">
	      						<p className="footertext2"><span>selmore advertising is leading outdoor advertising portal in pakistan. selmore is home for outdoor advertising space.
	      					 We connect ads buyer to ads seller</span></p>
      						</div>
      				</div>
      				<div className="col-4 col-md-4 col-lg-4 col-xl-4">
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
      				<div className="col-4 col-md-4 col-lg-4 col-xl-4">
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
      				</div>*/}
      			</div>
      		</div>
      				<div className="row rowbackground true7" style={{margin:'0px'}}>
                <div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
      					<div className="col-12 col-md-12 col-lg-12 col-xl-12 true6"><span className="true5">Copyrights 2019 By Selmore. All Rights Reservered</span></div>

      					<div className="col-2 col-md-5 col-lg-5 col-xl-5"></div>
      				</div>


       </div>
    );
  }
}

export default Footer;
