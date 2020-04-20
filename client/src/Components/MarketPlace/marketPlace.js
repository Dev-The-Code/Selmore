import React, { Component } from 'react';
import Header from '../Header/mainheader';
import Footer from '../footer';
import Market from './market';

class MarketPlace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            showValueHead: '',
            dropDownUser: false,

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
    
      showDropDown = () => {
        this.setState({
          dropDownUser: true
        })
      }
    
      hideDropDown = () => {
        this.setState({
          dropDownUser: false
        })
      }
    
    render() {
        const { data, showValueHead , dropDownUser} = this.state;
        return (
            <div>
                <Header showDropDown={this.showDropDown} hideDropDown={this.hideDropDown} dropDownUser={dropDownUser} />
                <Market data={data} showValueHead={showValueHead} />
                <Footer />
            </div>
        )
    }
}
export default MarketPlace;