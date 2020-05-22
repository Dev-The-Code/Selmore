import React, { Component } from 'react';
import './profileView.scss';

class ProfileView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className="row" style={{ marginTop: '20px' }}>
                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                        <div className="row">
                            <div className="col-12 col-sm-3 col-md-3 col-lg-2 col-xl-2">
                                <img
                                    src='https://res.cloudinary.com/dxk0bmtei/image/upload/v1590097678/demo1_hfw9wh.png'
                                    alt='img'
                                    className="myProfileLogoCompany"
                                />
                                <h1 className="myProfileName">My Profile</h1>
                            </div>
                            <div className="col-12 col-sm-9 col-md-9 col-lg-10 col-xl-10">
                                <fieldset className="mainField">
                                    <legend className="fieldinnerLegend">Company Details:</legend>
                                    <h4 className="maindescripthead">Description:</h4>
                                    <p className="paraInnerText">Lorem ipsum, or lipsum as it is sometimes known,
                                    is dummy text used in laying out print, graphic or web designs.
                                    The passage is attributed to an unknown typesetter in the 15th century
                                    who is thought to have scrambled parts of Cicero's De Finibus Bonorum
                                    et Malorum for use in a type specimen book.
                            </p>
                                    <h4 className="maindescripthead">Address:</h4>
                                    <p className="paraInnerText">
                                        Suit # 300, 3rd Floor, 1-D, Sunset Tower, Sunset Boulevard Road, Phase-2، DHA، Phase 2 Karachi, Karachi City, Sindh 75500
                            </p>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                </div>
                <br/><br/><br/>
                <div className="row">
                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                    <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                        <div className="row" style={{ margin: '0px' }}>
                            <div className="col-1 col-sm-2 col-md-2 col-lg-2 col-xl-2"></div>
                            <div className="col-10 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                                <nav>
                                    <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                        <a className="nav-item nav-link active tablee_Navtab" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">
                                            <span className="doesit10">Payment pending</span>
                                        </a>
                                        <a className="nav-item nav-link tablee_Navtab" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">
                                            <span className="doesit10">Payment paid(current)</span>
                                        </a>
                                        <a className="nav-item nav-link tablee_Navtab" id="nav-users-tab" data-toggle="tab" href="#nav-users" role="tab" aria-controls="nav-users" aria-selected="false">
                                            <span className="doesit10">Expired</span>
                                        </a>
                                    </div>
                                </nav>
                            </div>
                            <div className="col-1 col-sm-2 col-md-2 col-lg-2 col-xl-2"></div>
                        </div>
                        <div className="row" style={{ margin: '0px' }}>
                            <div className="col-12 col-md-12 col-lg-12 col-xl-12 userDataPlace">
                                <div className="tab-content py-3 px-sm-0" id="nav-tabContent">
                                    <div className="tab-pane fade show active text-justify" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                        <table class="table" style={{ textAlign: 'center' }}>
                                            <thead className="tablee_Head">
                                                <tr>
                                                    <th className="BidhistoryTH">#</th>
                                                    <th className="BidhistoryTH">Address</th>
                                                    <th className="BidhistoryTH">Email</th>
                                                    <th className="BidhistoryTH">Landline no.</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="tablee_th">0</td>
                                                    <td className="tablee_td">ram malengam road</td>
                                                    <td className="tablee_td">daniyal@gmail</td>
                                                    <td className="tablee_td">03232323</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                        <table class="table" style={{ textAlign: 'center' }}>
                                            <thead className="tablee_Head">
                                                <tr>
                                                    <th className="BidhistoryTH">#</th>
                                                    <th className="BidhistoryTH">Address</th>
                                                    <th className="BidhistoryTH">Email</th>
                                                    <th className="BidhistoryTH">Landline no.</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="tablee_th">0</td>
                                                    <td className="tablee_td">ram malengam road</td>
                                                    <td className="tablee_td">daniyal@gmail</td>
                                                    <td className="tablee_td">03232323</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="tab-pane fade" id="nav-users" role="tabpanel" aria-labelledby="nav-users-tab">
                                        <table class="table" style={{ textAlign: 'center' }}>
                                            <thead className="tablee_Head">
                                                <tr>
                                                    <th className="BidhistoryTH">#</th>
                                                    <th className="BidhistoryTH">Address</th>
                                                    <th className="BidhistoryTH">Email</th>
                                                    <th className="BidhistoryTH">Landline no.</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="tablee_th">0</td>
                                                    <td className="tablee_td">ram malengam road</td>
                                                    <td className="tablee_td">daniyal@gmail</td>
                                                    <td className="tablee_td">03232323</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1"></div>
                </div>
                {/* <div className="col-xl-12 col-lg-12 col-md-12 d-none d-sm-block" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                    <img src={Cookimg} alt='img' className="" style={{ width: '100%', position: 'absolute' }} />
                </div>
                <div className="container" style={{ border: '1px solid rgba(0,0,0,0.3)', backgroundColor: 'white', marginTop: '15%', position: 'relative', borderRadius: '10px' }}>
                    <div className="row">
                        <div className="col-md-3 col-12" style={{ marginTop: '-8%' }}>
                            <img src={Pro} alt='img' className="" style={{ width: '90%', borderRadius: '10px', border: '3px solid white', float: 'right' }} />
                        </div>
                        <div className="col-md-6 col-12">
                            <h1 style={{ textAlign: 'center', backgroundColor: 'white', borderRadius: '10px', padding: '30px' }}>My Profile</h1>
                        </div>
                        <div className="col-md-3"></div>
                    </div>
                    <Panel1 />
                    <Panel2 />
                </div>
                <Footer /> */}
            </div>
        )
    }

}
export default ProfileView;