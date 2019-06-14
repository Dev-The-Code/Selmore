import React, { Component } from 'react';
import './market.css';
import image1 from './billboard.jpg';
import {
    Checkbox, Form, Row,Col,
} from 'antd';

const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group;

class Market extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <div className='row billboard'>
                    <div className='col-md-3'>Filters</div>
                    <div className='col-md-9'>Billboards</div>
                </div>
                <div className='row filter'>
                    <div className='col-md-3'>
                                <CheckboxGroup 
                                    // setFieldsValue={this.state.subjectMatter}
                                    // onChange={this.onChangekeyWords.bind(this)}
                                >
                                    <Row>
                                        <Col >
                                            <Checkbox value="Gym/Fitness Center">Gym/Fitness Center</Checkbox>
                                        </Col>
                                        <Col >
                                            <Checkbox value="Swimming Pool">Swimming Pool</Checkbox>
                                        </Col>
                                        <Col >
                                            <Checkbox value="Car Park">Car Park</Checkbox>
                                        </Col>
                                        <Col >
                                            <Checkbox value="Visitors Parking">Visitors Parking</Checkbox>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col >
                                            <Checkbox value="Power Backup">Power Backup</Checkbox>
                                        </Col>
                                        <Col
                                        ><Checkbox value="Garbage Disposal">Garbage Disposal</Checkbox>
                                        </Col>
                                        <Col >
                                            <Checkbox value="Private Lawn">Private Lawn</Checkbox>
                                        </Col>
                                        <Col >
                                            <Checkbox value="Water Heater Plant">Water Heater Plant</Checkbox>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col >
                                            <Checkbox value="Security System">Security System</Checkbox>
                                        </Col>
                                        <Col >
                                            <Checkbox value="Laundry Service">Laundry Service </Checkbox>
                                        </Col>
                                        <Col >
                                            <Checkbox value="Elevator">Elevator</Checkbox>
                                        </Col>
                                        <Col >
                                            <Checkbox value="Club House">Club House</Checkbox>
                                        </Col>
                                    </Row>
                                </CheckboxGroup>
                    </div>
                    <div className='col-md-9'>
                        <div className='row '>
                            <div className='col-md-3'>
                                <img src={image1} className='imgBillBoard' />
                                <p>Billboards</p>
                                <p>Billboards</p>
                            </div>
                            <div className='col-md-3'>
                                <img src={image1} className='imgBillBoard' />
                                <p>Billboards</p>
                                <p>Billboards</p>
                            </div>
                            <div className='col-md-3'>
                                <img src={image1} className='imgBillBoard' />
                                <p>Billboards</p>
                                <p>Billboards</p>
                            </div>
                            <div className='col-md-3'>
                                <img src={image1} className='imgBillBoard' />
                                <p>Billboards</p>
                                <p>Billboards</p>
                            </div>
                        </div>
                        <div className='row '>
                            <div className='col-md-3'>
                                <img src={image1} className='imgBillBoard' />
                                <p>Billboards</p>
                                <p>Billboards</p>
                            </div>
                            <div className='col-md-3'>
                                <img src={image1} className='imgBillBoard' />
                                <p>Billboards</p>
                                <p>Billboards</p>
                            </div>
                            <div className='col-md-3'>
                                <img src={image1} className='imgBillBoard' />
                                <p>Billboards</p>
                                <p>Billboards</p>
                            </div>
                            <div className='col-md-3'>
                                <img src={image1} className='imgBillBoard' />
                                <p>Billboards</p>
                                <p>Billboards</p>
                            </div>
                        </div>
                        <div className='row '>
                            <div className='col-md-3'>
                                <img src={image1} className='imgBillBoard' />
                                <p>Billboards</p>
                                <p>Billboards</p>
                            </div>
                            <div className='col-md-3'>
                                <img src={image1} className='imgBillBoard' />
                                <p>Billboards</p>
                                <p>Billboards</p>
                            </div>
                            <div className='col-md-3'>
                                <img src={image1} className='imgBillBoard' />
                                <p>Billboards</p>
                                <p>Billboards</p>
                            </div>
                            <div className='col-md-3'>
                                <img src={image1} className='imgBillBoard' />
                                <p>Billboards</p>
                                <p>Billboards</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Market;