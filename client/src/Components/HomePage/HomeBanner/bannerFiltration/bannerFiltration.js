import React, { Component } from 'react';
import './bannerFiltration.scss';
import { Cascader, Checkbox, Form, Row, Col, Input, Radio, Button } from 'antd';
import { Link } from 'react-router-dom';

const options = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
    },
];

class HomeBanner extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    onChange = (value) => {
        console.log(value);
    }

    render() {
        return (
            <div className="animated animatedFadeInUp fadeInUp">
                <div className="row filterUpWthBaner">
                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10 filterPanel">
                        <div className="row">
                            <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <h3 className="filterPanelHeading">Browse Media</h3>
                            </div>
                        </div>
                        <div className="row" style={{paddingBottom:'1vw'}}>
                            <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                <Cascader
                                    options={options}
                                    className="selectDropDown"
                                    onChange={this.onChange.bind(this)}
                                    placeholder="Please select" />
                            </div>
                            <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                <Cascader
                                    options={options}
                                    className="selectDropDown"
                                    onChange={this.onChange.bind(this)}
                                    placeholder="Please select" />
                            </div>
                            <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3" style={{ textAlign: 'center' }}>
                                <Radio.Group className="radioCheckBanner">
                                    <Row>
                                        <Col >
                                            <Radio className="checkBoxText" value="On Sale">On Sale</Radio>
                                            <Radio className="checkBoxText" value="Bidding">Bidding</Radio>
                                        </Col>
                                    </Row>
                                </Radio.Group>
                            </div>
                            <div className="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-3">
                                <button
                                    className="btn broweBTnBanner"
                                    type="button"
                                >
                                    <span>Browse</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                </div>
            </div>
        );
    }
}

export default HomeBanner;