import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import Market from './market';

class MarketPlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        }
    }
    componentWillMount() {
        let data = this.props.location.state;
        console.log(data, 'data')
        if(data != undefined){
            this.setState({
                data: data.bilboardData
            })
        }
        // console.log(this.props)
    }
    render() {
        const { data } = this.state;
        return (
            <div>
                <Header showDropDown={this.props.showDropDown} hideDropDown={this.props.hideDropDown} dropDownUser={this.props.dropDownUser} />
                <Market data={data} />
                <Footer />
            </div>
        )
    }
}
export default MarketPlace;