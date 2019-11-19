import React, { Component } from 'react';
import './bidForm.css';
import { Form, Icon, Input, Button } from 'antd';
import { Link } from 'react-router-dom';

class MainForm extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row" style={{marginTop:'3vw'}}>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                        <div className="col-12 col-md-5 col-lg-5 col-xl-5">
                            <h2>Add Bidding Billboard</h2><br/>
                            <Input
                                placeholder="Username"
                                className="bid_Input"
                            /><br />
                            <Input
                                placeholder="Username"
                                className="bid_Input"
                            /><br />
                            <Input
                                placeholder="Username"
                                className="bid_Input"
                            /><br />
                        </div>
                        <div className="col-12 col-md-5 col-lg-5 col-xl-5">
                            <Input
                                placeholder="Username"
                                className="bid_Input"
                            /><br />
                            <Input
                                placeholder="Username"
                                className="bid_Input"
                            /><br />
                            <Input
                                placeholder="Username"
                                className="bid_Input"
                            /><br />
                        </div>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainForm;