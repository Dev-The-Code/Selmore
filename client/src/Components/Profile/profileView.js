import React, { Component } from 'react';
import Panel1 from '../panel1';
import Panel2 from '../panel2';
import Footer from '../footer';
import Cookimg from './cook.jpg';
import Pro from './pro.png';

class ProfileView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div>
                <div className="col-xl-12 col-lg-12 col-md-12 d-none d-sm-block" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
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
                <Footer />

            </div>
        )
    }

}

export default ProfileView;