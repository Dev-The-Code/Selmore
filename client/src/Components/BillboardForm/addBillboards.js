import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import BillBoard from './billBoard';

class AddBillboards extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <Header />
                <BillBoard data ={this.props.location.state}/>
                <Footer />
            </div>
        )
    }

}

export default AddBillboards;