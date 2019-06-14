import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import Market from './market';

class MarketPlace extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Header />
                <Market />
                <Footer />
            </div>
        )
    }
}
export default MarketPlace;