import React, { Component } from 'react';
import './market.css';
import Header from '../header';
import Footer from '../footer';
import BillBoardInfo from './billBoardInfo'

class BillBoardDetail extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <Header />
                <BillBoardInfo data={this.props.location.state} />
                <Footer />
            </div>
        )
    }
}
export default BillBoardDetail;
