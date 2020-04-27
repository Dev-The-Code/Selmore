import React, { Component } from 'react';
import './advertising.scss';

class Panel1 extends Component {
  render() {
    return (
      <div>
        <div className="row" style={{marginTop:'30px'}}>
          <div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
          <div className="col-10 col-md-10 col-lg-10 col-xl-10">
            <h4><span className="wood1">ADVERTISING AGENCIES</span></h4>
            <p><span className="wood2">You can easily with all advertising agencies. the
        			list below is registered in agency of Selmore</span></p>
          </div>
          <div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
        </div>
      </div>
    );
  }
}
export default Panel1;