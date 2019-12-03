import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import Market from './market';

class MarketPlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            showValueHead: ''
        }
    }
    componentWillMount() {
        let data = this.props.location.state;
        if (data != undefined) {
            let keyName = this.props.location.state.showValueHead;
            this.setState({
                data: data.bilboardData,
                showValueHead: keyName
            })
        }
        window.scrollTo(0, 0);
    }
    render() {
        const { data, showValueHead } = this.state;
        return (
            <div>
                <Header showDropDown={this.props.showDropDown} hideDropDown={this.props.hideDropDown} dropDownUser={this.props.dropDownUser} />
                <Market data={data} showValueHead={showValueHead} />
                <Footer />
            </div>
        )
    }
}
export default MarketPlace;