import React, { Component } from 'react';
import './noAvalibleBiilboard.scss';
import { HttpUtils } from '../../Services/HttpUtils'
import { Link } from "react-router-dom";

class NoAvalibleBillboardpanel1 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            noAvalibleBiilboards: []
        }
    }

    componentDidMount() {
        this.getNoAvalibleBillboards();
    }

    getNoAvalibleBillboards = async () => {
        let noAvalibleBiilboard = []
        let response = await HttpUtils.get('getbillboard');

        if (response) {
            if (response.code == 200) {
                let data = response.content;

                for (var i = 0; i < data.length; i++) {
                    if (data[i].avalibleOn == '' || data[i].avalibleOn == undefined) {
                        if (data[i].avalibleOnId == '' || data[i].avalibleOnId == undefined) {
                            if (data[i].bookFrom == '' || data[i].bookFrom == undefined) {
                                if (data[i].bookId == '' || data[i].bookId == undefined) {
                                    if (data[i].status == 'No Available') {
                                        noAvalibleBiilboard.push(data[i])
                                    }
                                }
                            }
                        }
                    }
                }
                console.log(noAvalibleBiilboard , 'noAvalibleBiilboard')
                this.setState({
                    noAvalibleBiilboards: noAvalibleBiilboard
                })
            }
        }
    }

    statusChangeAvailable = async (data) => {
        let updateMarketPlace = {
            objectId: data.billboardId,
            avalibleOn: '',
            avalibleOnId: '',
            status: "Available",
            bookFrom: '',
            bookId: ''

        }
        let respMatkietPlace = await HttpUtils.post('listadd', updateMarketPlace);
        console.log(respMatkietPlace, 'respMatkietPlace')
        if (respMatkietPlace) {
            this.getNoAvalibleBillboards();

        }
    }


    render() {
        const { noAvalibleBiilboards } = this.state;
        console.log(noAvalibleBiilboards , 'noAvalibleBiilboards')
        return (
            <div>
                <div className="row" style={{ marginTop: '3vw' }}>
                    <div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-10 col-md-10 col-lg-10 col-xl-10">
                        <div className="row" style={{ margin: '0px' }}>
                            <div className="col-12 col-md-12 col-lg-12 col-xl-12 userDataPlace">
                                <div className="tab-content py-2 px-2 px-sm-0" id="nav-tabContent">
                                    <div className="tab-pane fade show active text-justify" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                        <table class="table" style={{ textAlign: 'center' }}>
                                            <thead className="tablee_Head">
                                                <tr>
                                                    <th className="BidhistoryTH">#</th>
                                                    <th className="BidhistoryTH">Company Name</th>
                                                    <th className="BidhistoryTH">Address</th>
                                                    <th className="BidhistoryTH">City</th>
                                                    <th className="BidhistoryTH">State</th>
                                                    <th className="BidhistoryTH">Status Change</th>
                                                    <th className="BidhistoryTH">View</th>
                                                </tr>
                                            </thead>
                                            {noAvalibleBiilboards && noAvalibleBiilboards.map((elem, key) => {
                                                return (
                                                    <tbody>
                                                        <tr>
                                                            <td className="tablee_th">{key + 1}</td>
                                                            <td className="tablee_td">{elem.companyName}</td>
                                                            <td className="tablee_td">{elem.address}</td>
                                                            <td className="tablee_td">{elem.city}</td>

                                                            <td className="tablee_td">{elem.state}</td>

                                                            <td className="tablee_td"><button class="fa fa-check-circle" style={{ fontSize: '17px', color: 'green' }}
                                                                onClick={this.statusChangeAvailable.bind(this, elem)}
                                                            >Status Change Available</button></td>

                                                            <td className="tablee_th">
                                                                <Link to={{ pathname: `/billborad_Militry`, state: elem.billboardId }}><span className="dropText">View</span></Link>
                                                            </td>

                                                        </tr>
                                                    </tbody>
                                                )
                                            })}
                                        </table>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 col-md-1 col-lg-1 col-xl-1"></div>
                </div>
            </div>
        );
    }
}
export default NoAvalibleBillboardpanel1;
