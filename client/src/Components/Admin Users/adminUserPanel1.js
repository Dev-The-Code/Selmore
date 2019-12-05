import React, { Component } from 'react';
import './adminUser.css';


class UserPanel1 extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { } = this.props;
        return (
            <div>
                <div className="container" style={{marginTop:'3vw'}}>
                    <div className="row" style={{ margin: '0px' }}>
                        <div className="col-md-4"></div>
                        <div className="col-md-4">
                            <nav>
                                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                    <a className="nav-item nav-link active tablee_Navtab" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true"><span className="doesit10">New Users</span></a>
                                    <a className="nav-item nav-link tablee_Navtab" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false"><span className="doesit10">Approved Users</span></a>
                                </div>
                            </nav>
                        </div>
                        <div className="col-md-4"></div>
                    </div>
                    <div className="row" style={{ margin: '0px' }}>
                        <div className="col-12 col-md-12 col-lg-12 col-xl-12 userDataPlace">
                            <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                <div className="tab-pane fade show active text-justify" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                    <table class="table" style={{ textAlign: 'center' }}>
                                        <thead className="tablee_Head">
                                            <tr>
                                                <th>#</th>
                                                <th>Company name</th>
                                                <th>Email</th>
                                                <th>Landline no.</th>
                                                <th>Approve</th>
                                                <th>Decline</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="tablee_th">0</td>
                                                <td className="tablee_td">Devan Motors</td>
                                                <td className="tablee_td">devanmotor@gmail.com</td>
                                                <td className="tablee_td">0321 23456 7</td>
                                                <td className="tablee_td"><i class="fa fa-check-circle" style={{ fontSize: '25px' , color:'green' }}></i></td>
                                                <td className="tablee_td"><i class="fa fa-close" style={{ fontSize: '25px', color:'red' }}></i></td>
                                            </tr>
                                            <tr>
                                                <td className="tablee_th">1</td>
                                                <td className="tablee_td">Al Arcom Trading</td>
                                                <td className="tablee_td">arcomintl@gmail.com</td>
                                                <td className="tablee_td">0321 23456 7</td>
                                                <td className="tablee_td"><i class="fa fa-check-circle" style={{ fontSize: '25px', color:'green' }}></i></td>
                                                <td className="tablee_td"><i class="fa fa-close" style={{ fontSize: '25px', color:'red' }}></i></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                    <table class="table" style={{ textAlign: 'center' }}>
                                        <thead className="tablee_Head">
                                            <tr>
                                                <th>#</th>
                                                <th>Company name</th>
                                                <th>Email</th>
                                                <th>Landline no.</th>
                                                <th>Block</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="tablee_th">0</td>
                                                <td className="tablee_td">Devan Motors</td>
                                                <td className="tablee_td">devanmotor@gmail.com</td>
                                                <td className="tablee_td">0321 23456 7</td>
                                                <td className="tablee_td"><i class="fa fa-ban" style={{ fontSize: '25px' , color:'red' }}></i></td>
                                            </tr>
                                            <tr>
                                                <td className="tablee_th">1</td>
                                                <td className="tablee_td">Al Arcom Trading</td>
                                                <td className="tablee_td">arcomintl@gmail.com</td>
                                                <td className="tablee_td">0321 23456 7</td>
                                                <td className="tablee_td"><i class="fa fa-ban" style={{ fontSize: '25px' , color:'red' }}></i></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserPanel1;