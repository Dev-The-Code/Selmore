import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import BillBoard from './billBoard';

class AddBillboards extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        window.scrollTo(0,0);
    }
    render() {
        return (
            <div>
                <Header showDropDown={this.props.showDropDown} hideDropDown={this.props.hideDropDown} dropDownUser={this.props.dropDownUser} />
                <BillBoard data={this.props.location.state} />
                <Footer />
            </div>
        )
    }

}

export default AddBillboards;