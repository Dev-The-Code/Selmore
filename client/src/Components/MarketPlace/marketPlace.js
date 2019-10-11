import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import Market from './market';

class MarketPlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            adName: ''
        }
    }
    componentWillMount() {
        let data = this.props.location.state;
        console.log(data, 'data')
        if (data != undefined) {
            let adName = this.props.location.state.nameBill;
            this.setState({
                data: data.bilboardData,
                adName: adName
            })
        }
        window.scrollTo(0, 0);
        // console.log(this.props)
    }
    render() {
        const { data, adName } = this.state;
        return (
            <div>
                <Header showDropDown={this.props.showDropDown} hideDropDown={this.props.hideDropDown} dropDownUser={this.props.dropDownUser} />
                <Market data={data} nameBill={adName} />
                <Footer />
            </div>
        )
    }
}
export default MarketPlace;