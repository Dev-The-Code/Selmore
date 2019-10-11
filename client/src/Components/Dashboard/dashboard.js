import React, { Component } from 'react';
import Header from '../header';
import Footer from '../footer';
import DashboardData from './dashboardData';

class Dashboard extends Component {
    constructor(props) {
        super(props)
    }
    componentWillMount() {
        window.scrollTo(0,0);
    }
    render() {
        return (
            <div>
                <Header showDropDown={this.props.showDropDown} hideDropDown={this.props.hideDropDown} dropDownUser={this.props.dropDownUser} />
                <DashboardData />
                <Footer />
            </div>
        )
    }
}
export default Dashboard;