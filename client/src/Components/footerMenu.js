import React, { Component } from 'react';
import About from './about.js';
import QuickLinks from './quickLinks.js';
import Connect from './connect.js'



class FooterMenu extends Component { 
  quickLinks(){
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

  about(){
    return (
      <div>                  
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
  );
}

  
  render() {
    return (
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-4">
        	    {this.about()}
            </div>
            
              <div className="col-md-4">
                  {this.quickLinks()}
              </div>
           
            
              <div className="col-md-4">
                  <Connect />
              </div>
            
          </div>  
        </div>
    );
  }
}

export default FooterMenu;