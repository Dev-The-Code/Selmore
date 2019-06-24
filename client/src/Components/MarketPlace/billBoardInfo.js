import React, { Component } from 'react';
import './market.css';

class BillBoardInfo extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        let data = this.props.data;
        console.log(data, 'data')
    }
    render() {
        return (
            <div>
                <div class="container" style={{ width: "100%", padding: "0px" }}>
                    <div class="card-three-column">
                        <div class="row" style={{ padding: "0px" }}>
                            <div class="preview col-md-4">
                                <div className="row">
                                    <div className="col-md-2">
                                        <ul class="preview-thumbnail enavigation enav-tabs">
                                            {/* rendering li in dom & show images */}
                                            {/* {this.state.images.map(img => <li onClick={() => this.renderImagesinLi(img)}><a ><img src={img} /></a></li>)} */}
                                        </ul>
                                    </div>
                                    <div className="col-md-10">
                                        <div class="preview-pic tab-content">
                                            {/* <div class="tab-pane active" id="pic-1"><img src={this.state.imgUrl} /></div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="row">
                                    <div class="details col-md-7">
                                        <h3 class="product-title"
                                        >product</h3>
                                        <p> By PakJazba </p>
                                        <h3>{'$'} price & Free Shipping</h3>
                                        <p class="vote">Size: <strong>size</strong></p>
                                        <div style={{ marginTop: "20px" }}>
                                            <p>Product Feature: productFeature </p>
                                            <ul className="margins">
                                                <p>Description: description</p>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="margin"> From The Manufacturer </h4>
                                            <h5>manufacturer <br />manufacturerPart</h5>
                                            <p>Warranty Description: warrantyDescription</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default BillBoardInfo;
