import React, { Component } from 'react';
import './popform.scss';

class Popform extends Component {
  render() {
    return (
      <div id="mmodal">
        <div>
          <div className="container" style={{ marginTop: '12%' }}>
            <div className="row" style={{ margin: '0px' }}>
              <div className="col-2 col-md-2 col-lg-2 col-xl-2"></div>
              <div className="col-3 col-md-3 col-lg-3 col-xl-3 redable8"></div>
              <div className="col-2 col-md-2 col-lg-2 col-xl-2 redable9">
                <img src="./images/selmore-logo.png" alt='img' height="70px" />
              </div>
              <div className="col-3 col-md-3 col-lg-3 col-xl-3 redable8">
                <div className="alert alert-dismissible">
                  <button type="button" className="close" data-dismiss="alert" data-target="#mmodal">&times;</button>
                </div>
              </div>
              <div className="col-2 col-md-2 col-lg-2 col-xl-2"></div>
            </div>
            <div className="row" style={{ margin: '0px' }}>
              <div className="col-2 col-md-2 col-lg-2 col-xl-2"></div>
              <div className="col-8 col-md-8 col-lg-8 col-xl-8 redable6">
                <h4 style={{ marginTop: '1%', marginBottom: '2%' }}><span className="redable7">Start Bidding Now!</span></h4>
              </div>
              <div className="col-2 col-md-2 col-lg-2 col-xl-2"></div>
            </div>
            <div className="row" style={{ margin: '0px' }}>
              <div className="col-2 col-md-2 col-lg-2 col-xl-2"></div>
              <div className="col-4 col-md-4 col-lg-4 col-xl-4 redable1">
                <h5><span className="redable2">Already have an account?</span></h5>
                <button className="btn redable3" type="button"><span className="redable4">Log in Here</span></button>
              </div>
              <div className="col-4 col-md-4 col-lg-4 col-xl-4 redable5">
                <h5><span className="redable2">New To Our Site?</span></h5>
                <button className="btn redable3" type="button"><span className="redable4">Register Today!</span></button>
              </div>
              <div className="col-2 col-md-2 col-lg-2 col-xl-2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Popform;