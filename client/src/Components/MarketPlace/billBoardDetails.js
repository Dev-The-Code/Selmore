import React, { Component } from 'react';
import './market.css';

class BillBoardDetail extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        let data = this.props.location.state;
        console.log(data, 'data')
    }
    render() {
        return (
            <div>
                BillBoardDetail
            </div>
        )
    }
}
export default BillBoardDetail;
