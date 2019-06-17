import React, { Component } from 'react';
import './market.css';
import image1 from './billboard.jpg';
import {
    Checkbox, Form, Row, Col,
} from 'antd';
import { HttpUtils } from '../../Services/HttpUtils';


const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group;

class Market extends Component {
    constructor(props) {
        super(props)
        this.state = {
            billboardData: ''
        }
    }

    componentDidMount() {
        this.billBoradDetails();
    }

    billBoradDetails = async () => {
        let response = await HttpUtils.get('getbillboard');
        console.log(response, 'response')
        this.setState({
            billboardData: response.content
        })
    }
    render() {
        const { billboardData } = this.state;
        console.log(billboardData, 'billboardData')
        return (
            <div>
                <div className='row billboard'>
                    <div className='col-md-3'>Filters</div>
                    <div className='col-md-9'>Billboards</div>
                </div>
                <div className='row filter'>
                    <div className='col-md-3'>
                        <CheckboxGroup
                        // setFieldsValue={this.state.intendedUsekeyWords}
                        // onChange={this.onChangekeyWords.bind(this)}
                        >
                            <div className='filterDivs'>Billboard Facing</div>
                            <Row>
                                <Col >
                                    <Checkbox value="audianceType">Audiance Type</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="status">Status</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="traffic">Traffic</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="Facing">Facing</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="lightning">Lightning</Checkbox>
                                </Col>
                                {/* <Col
                                ><Checkbox value="description">Description</Checkbox>
                                </Col> */}
                            </Row>
                            <div className='filterDivs'>Size</div>
                            <Row>
                                <Col >
                                    <Checkbox value="size">Size</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="width">Width</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="height">Height</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="type">Type </Checkbox>
                                </Col>
                            </Row>
                            <Row>
                                <div className='filterDivs'>Billboard Location</div>
                            </Row>
                            <Row>
                                <Col >
                                    <Checkbox value="latitude">Latitude</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="longitude">Longitude</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="address">Address</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="nearBy">Near By</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="city">City</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="state">State</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="country">Country</Checkbox>
                                </Col>
                            </Row>
                            <div className='filterDivs'>Billboard Rates</div>
                            <Row>
                                <Col >
                                    <Checkbox value="dailyRate">Daily Rate</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="weeklyRate">Weekly Rate</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="monthlyRate">Monthly Rate</Checkbox>
                                </Col>
                                <Col >
                                    <Checkbox value="yearlyRate">Yearly Rate</Checkbox>
                                </Col>
                            </Row>
                        </CheckboxGroup>
                    </div>
                    <div className='col-md-9'>
                        {/* {this.state.billboardData.map} */}
                        <div className='row '>
                            {billboardData && billboardData.map((elem, key) => {
                                console.log(elem, elem)
                                console.log(key, 'key')
                                return (
                                    <div className='col-md-3'>
                                        <img src={elem.billBoardImgs[0]} className='imgBillBoard' />
                                        <p>{elem.companyName}</p>
                                        <p>{elem.city[0]}</p>
                                    </div>
                                    // <div  key={key} className="card-body space" style={{marginBottom:"0px", paddingLeft:"0px"}}>
                                    //     <div className="row">
                                    //         <div className="col-md-12 col-sm-12 col-xs-12">
                                    //             <div className="col-md-3 col-sm-12 col-xs-12 " style={{paddingLeft:"0px" ,  paddingRight:"0px"}}><br/>
                                    //                 <img
                                    //                    src={elem.userImg ? elem.userImg : "../images/images.jpg"}
                                    //                     className="image-circle"
                                    //                     alt="" width="100" height="100"
                                    //                     style={{cursor: 'pointer'}}
                                    //                 />
                                    //             </div>
                                    //         </div>
                                    //    </div>
                                    // </div>
                                )
                            })}
                        </div>
                        {/* <div className='row '>
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
                        </div> */}
                    </div>
                </div>
            </div>
        )
    }
}
export default Market;