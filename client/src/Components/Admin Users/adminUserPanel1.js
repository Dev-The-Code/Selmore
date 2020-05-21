import React, { Component } from 'react';
import './adminUser.scss';
import { HttpUtils } from '../../Services/HttpUtils';


class UserPanel1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newUsers: [],
            approvedUsers: [],
            blockUsers: []
        }
    }

    componentDidMount() {
        this.getAllUsers()

    }

    getAllUsers = async () => {
        let newUsers = [];
        let approvedUsers = [];
        let blockUsers = [];

        let response = await HttpUtils.get('getalluser');
        let data = response.content;
        for (var i = 0; i < data.length; i++) {
            if (data[i].userStatus == 'pending') {
                newUsers.push(data[i])
            }
            else if (data[i].userStatus == "approved") {
                approvedUsers.push(data[i])
            }
            else if (data[i].userStatus == "block") {
                blockUsers.push(data[i])
            }
        }
        this.setState({
            newUsers: newUsers,
            approvedUsers: approvedUsers,
            blockUsers: blockUsers
        })
    }

    changeStatus = async (e, id) => {
        let obj = {
            id: id,
            userStatus: e
        }
        let response = await HttpUtils.post('changeStatus', obj);
        if (response.code == 200) {
            this.getAllUsers()

        }
    }

    render() {
        const { newUsers, approvedUsers, blockUsers } = this.state;
        // const { } = this.props;
        return (
            <div>
                <div className="container" style={{ marginTop: '3vw' }}>
                    <div className="row" style={{ margin: '0px' }}>
                        <div className="col-md-2"></div>
                        <div className="col-md-8">
                            <nav>
                                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                    <a className="nav-item nav-link active tablee_Navtab" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true"><span className="doesit10">New Users</span></a>
                                    <a className="nav-item nav-link tablee_Navtab" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false"><span className="doesit10">Approved Users</span></a>
                                    <a className="nav-item nav-link tablee_Navtab" id="nav-users-tab" data-toggle="tab" href="#nav-users" role="tab" aria-controls="nav-users" aria-selected="false"><span className="doesit10">Blocked Users</span></a>
                                </div>
                            </nav>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                    <div className="row" style={{ margin: '0px' }}>
                        <div className="col-12 col-md-12 col-lg-12 col-xl-12 userDataPlace">
                            <div className="tab-content py-3 px-sm-0" id="nav-tabContent">
                                <div className="tab-pane fade show active text-justify" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                    <table class="table" style={{ textAlign: 'center' }}>
                                        <thead className="tablee_Head">
                                            <tr>
                                                <th className="BidhistoryTH">#</th>
                                                <th className="BidhistoryTH">Company name</th>
                                                <th className="BidhistoryTH">Email</th>
                                                <th className="BidhistoryTH">Landline no.</th>
                                                <th className="BidhistoryTH">Approve</th>
                                                <th className="BidhistoryTH">Decline</th>
                                            </tr>
                                        </thead>
                                        {newUsers && newUsers.map((elem, key) => {
                                            return (
                                                <tbody>
                                                    <tr>
                                                        <td className="tablee_th">{key}</td>
                                                        <td className="tablee_td">{elem.companyName}</td>
                                                        <td className="tablee_td">{elem.email}</td>
                                                        <td className="tablee_td">{elem.landlineNo}</td>
                                                        <td className="tablee_td"><button class="fa fa-check-circle" style={{ fontSize: '25px', color: 'green' }} onClick={this.changeStatus.bind(this, 'approved', elem._id)}></button></td>
                                                        <td className="tablee_td"><button class="fa fa-close" style={{ fontSize: '25px', color: 'red' }} onClick={this.changeStatus.bind(this, 'block', elem._id)}></button></td>
                                                    </tr>
                                                </tbody>)
                                        })}

                                    </table>
                                </div>
                                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                    <table class="table" style={{ textAlign: 'center' }}>
                                        <thead className="tablee_Head">
                                            <tr>
                                                <th className="BidhistoryTH">#</th>
                                                <th className="BidhistoryTH">Company name</th>
                                                <th className="BidhistoryTH">Email</th>
                                                <th className="BidhistoryTH">Landline no.</th>
                                                <th className="BidhistoryTH">Block</th>
                                            </tr>
                                        </thead>
                                        {approvedUsers && approvedUsers.map((elem, key) => {
                                            return (
                                                <tbody>
                                                    <tr>
                                                        <td className="tablee_th">{key}</td>
                                                        <td className="tablee_td">{elem.companyName}</td>
                                                        <td className="tablee_td">{elem.email}</td>
                                                        <td className="tablee_td">{elem.landlineNo}</td>
                                                        <td className="tablee_td"><button class="fa fa-ban" style={{ fontSize: '25px', color: 'red' }} onClick={this.changeStatus.bind(this, 'block', elem._id)}></button></td>
                                                    </tr>
                                                    {/* <tr>
                                                <td className="tablee_th">1</td>
                                                <td className="tablee_td">Al Arcom Trading</td>
                                                <td className="tablee_td">arcomintl@gmail.com</td>
                                                <td className="tablee_td">0321 23456 7</td>
                                                <td className="tablee_td"><i class="fa fa-ban" style={{ fontSize: '25px', color: 'red' }}></i></td>
                                            </tr> */}
                                                </tbody>)
                                        })}
                                    </table>
                                </div>
                                <div className="tab-pane fade" id="nav-users" role="tabpanel" aria-labelledby="nav-users-tab">
                                    <table class="table" style={{ textAlign: 'center' }}>
                                        <thead className="tablee_Head">
                                            <tr>
                                                <th>#</th>
                                                <th>Company name</th>
                                                <th>Email</th>
                                                <th>Landline no.</th>
                                                <th>Re-approval</th>
                                            </tr>
                                        </thead>
                                        {blockUsers && blockUsers.map((elem, key) => {
                                            return (
                                                <tbody>
                                                    <tr>
                                                        <td className="tablee_th">{key}</td>
                                                        <td className="tablee_td">{elem.companyName}</td>
                                                        <td className="tablee_td">{elem.email}</td>
                                                        <td className="tablee_td">{elem.landlineNo}</td>
                                                        <td className="tablee_td"><button class="fa fa-check-circle" style={{ fontSize: '25px', color: 'green' }} onClick={this.changeStatus.bind(this, 'approved', elem._id)}></button></td>
                                                    </tr>
                                                    {/* <tr>
                                                <td className="tablee_th">1</td>
                                                <td className="tablee_td">Al Arcom Trading</td>
                                                <td className="tablee_td">arcomintl@gmail.com</td>
                                                <td className="tablee_td">0321 23456 7</td>
                                                <td className="tablee_td"><i class="fa fa-ban" style={{ fontSize: '25px', color: 'red' }}></i></td>
                                            </tr> */}
                                                </tbody>)
                                        })}
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