import React, { Component } from 'react';
import Connect from './connect.js'

class FooterMenu extends Component { 
  
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