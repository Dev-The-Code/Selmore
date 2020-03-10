import React, { Component } from 'react';
import './bidForm.scss';
import { Form, Input, Icon, Button, Upload, Modal, notification, Cascader, TimePicker } from 'antd';
import Select from 'react-select';
import moment from 'moment';
import { Link } from 'react-router-dom';

class MainForm extends Component {
    constructor() {
        super()
        this.state = {
            typeArr: ['Static', 'Classic', 'Digital', 'Mobile', 'Bridge',
                'Vinyl', 'Painted', 'Three Dimensional', 'Scented', 'Lamp Post'],
            categoryArr: ['Billboard ', 'Taxi Ads', 'Bus Ads', 'Bus Shelter Ads', 'Airport Ads', 'Shopping Mall', 'Streamers',
                'Total Cinima Ads', 'Radio Ads', 'Other'],
            facingArr: ['Front', 'Back'],
            audienceTypeArr: ['All types of people', 'Office type of people', 'Labour type people', 'Govt official type people'],
            audienceTypes: [],
        }
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row" style={{ marginTop: '3vw' }}>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                        <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                            <h2>Add Bidding Billboard</h2><br />
                            <h5 style={{ marginTop: '0.5vw' }}>Billboard in Karachi Millitary Road City Point Details</h5>
                        </div>
                        <div className="col-12 col-md-4 col-lg-4 col-xl-4"></div>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                    </div>
                    <div className="row" style={{ marginTop: '1vw' }}>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                        <div className="col-12 col-md-5 col-lg-5 col-xl-5">
                            <Input
                                placeholder="Height"
                                className="bid_Input"
                            /><br />
                        </div>
                        <div className="col-12 col-md-5 col-lg-5 col-xl-5">
                            <Input
                                placeholder="Width"
                                className="bid_Input"
                            /><br />
                        </div>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                        <div className="col-12 col-md-5 col-lg-5 col-xl-5">
                            <Input
                                placeholder="Lighting"
                                className="bid_Input"
                            /><br />

                        </div>
                        <div className="col-12 col-md-5 col-lg-5 col-xl-5">
                            <Input
                                placeholder="Description"
                                className="bid_Input"
                            /><br />
                        </div>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                    </div>
                    <div className="row" style={{ marginTop: '2vw' }}>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                        <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                            <h5>Military Road City rate Card</h5>
                        </div>
                        <div className="col-12 col-md-4 col-lg-4 col-xl-4"></div>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                    </div>
                    <div className="row" style={{ marginTop: '1vw' }}>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                        <div className="col-12 col-md-5 col-lg-5 col-xl-5">
                            <Input
                                placeholder="Daily"
                                className="bid_Input"
                            /><br />

                        </div>
                        <div className="col-12 col-md-5 col-lg-5 col-xl-5">
                            <Input
                                placeholder="Weekly"
                                className="bid_Input"
                            /><br />
                        </div>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                        <div className="col-12 col-md-5 col-lg-5 col-xl-5">
                            <Input
                                placeholder="Monthly"
                                className="bid_Input"
                            /><br />

                        </div>
                        <div className="col-12 col-md-5 col-lg-5 col-xl-5">
                            <Input
                                placeholder="Yearly"
                                className="bid_Input"
                            /><br />
                        </div>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                    </div>
                    <div className="row" style={{ marginTop: '2vw' }}>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                        <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                            <h5>Military Road City Demographics</h5>
                        </div>
                        <div className="col-12 col-md-4 col-lg-4 col-xl-4"></div>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                    </div>
                    <div className="row" style={{ marginTop: '1vw' }}>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                        <div className="col-12 col-md-10 col-lg-10 col-xl-10">
                            <div className="row">
                                <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                                    <Select
                                        onChange={this.handleChange}
                                        options={this.state.audienceTypeArr}
                                        placeholder="Audience type"
                                    >
                                    </Select>
                                </div>
                                <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                                    <Input
                                        placeholder="Daily Visitor"
                                        className="bid_Input"
                                    /><br />
                                </div>
                                <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                                    <Input
                                        placeholder="Near by"
                                        className="bid_Input"
                                    /><br />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                    </div>
                    <div className="row" style={{ marginTop: '2vw' }}>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                        <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                            <h5>Military Road City Demographics</h5>
                        </div>
                        <div className="col-12 col-md-4 col-lg-4 col-xl-4"></div>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                    </div>
                    <div className="row" style={{ marginTop: '1vw' }}>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                        <div className="col-12 col-md-5 col-lg-5 col-xl-5">
                            <Input
                                placeholder="Country"
                                className="bid_Input"
                            /><br />

                        </div>
                        <div className="col-12 col-md-5 col-lg-5 col-xl-5">
                            <Input
                                placeholder="State"
                                className="bid_Input"
                            /><br />
                        </div>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                        <div className="col-12 col-md-5 col-lg-5 col-xl-5">
                            <Input
                                placeholder="City"
                                className="bid_Input"
                            /><br />

                        </div>
                        <div className="col-12 col-md-5 col-lg-5 col-xl-5">
                            <Input
                                placeholder="Address"
                                className="bid_Input"
                            /><br />
                        </div>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                    </div>
                    <div className="row" style={{ marginTop: '2vw' }}>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                        <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                            <h5>Bidding Details</h5>
                        </div>
                        <div className="col-12 col-md-4 col-lg-4 col-xl-4"></div>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                    </div>
                    <div className="row" style={{ marginTop: '1vw' }}>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                        <div className="col-12 col-md-10 col-lg-10 col-xl-10">
                            <div className="row">
                                <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                                    <Input
                                        placeholder="Min Bid Price"
                                        className="bid_Input"
                                    /><br />
                                </div>
                                <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                                    <Upload>
                                        <Button>
                                            <Icon type="upload" /> Upload
                                        </Button>
                                    </Upload>
                                </div>
                                <div className="col-12 col-md-4 col-lg-4 col-xl-4">
                                    <TimePicker
                                        defaultValue={moment('12:08:23', 'HH:mm:ss')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                    </div>
                    <div className="row" style={{ marginTop: '1vw' }}>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                        <div className="col-12 col-md-5 col-lg-5 col-xl-5">
                            from
                            
                        </div>
                        <div className="col-12 col-md-5 col-lg-5 col-xl-5">
                            TO
                        </div>
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-1 col-lg-1 col-xl-1"></div>
                        <div className="col-12 col-md-5 col-lg-5 col-xl-5">
                            <Input
                                placeholder="City"
                                className="bid_Input"
                            /><br />

                        </div>
                        <div className="col-12 col-md-5 col-lg-5 col-xl-5">
                            <Input
                                placeholder="Address"
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