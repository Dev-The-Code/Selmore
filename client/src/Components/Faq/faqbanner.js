import React, { Component } from 'react';
import './faq.scss';

class Faqbanner extends Component {
  render() {
    return (
      <div>
        <div className="row water" style={{ margin: '0px' }}>
          <img src="./images/about-banner.png" alt='img' className="" />
        </div>
        <div className="container water2">
          <h4><span className="water3">FREQUENTLY ASKED QUESTIONS</span></h4>
        </div>
      </div>
    );
  }
}

export default Faqbanner;