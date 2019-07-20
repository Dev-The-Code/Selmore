import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';




class ProfileView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
           
            <div>
                <div className="col-xl-12 col-lg-12 col-md-12 d-none d-sm-block">
                    <h1 style={{textAlign: 'center'}}>My Profile</h1>
                </div>
                <div className=" col-12 d-block d-sm-none">
                    <h2 style={{textAlign: 'center'}}>My Profile</h2>
                </div>
                
            </div>
        )
    }

}

export default ProfileView;
