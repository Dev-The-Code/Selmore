import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import BillBoard from './billBoard';

class AddBillboards extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div>
                <Header />
                <BillBoard />
                <Footer />
            </div>
        )
    }

}

export default AddBillboards;