import React, { Component } from 'react';
import './seller.scss';

class Sellbanner extends Component {
  render() {
    return (
      <div>
        <div className="row" style={{ margin: '0px' }}>
          <img src="./images/about-banner.png" alt='img' className="lemon1" />
        </div>
        <div className="container lemon2">
          <h4><span className="lemon3">SELLER</span></h4>
        </div>
      </div>
    );
  }
}

export default Sellbanner;