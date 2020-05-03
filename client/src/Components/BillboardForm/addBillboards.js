import React, { Component } from 'react';
import Header from '../Header/mainheader';
import Footer from '../Footer/mainFooter';
import BillBoard from './billBoard';

class AddBillboards extends Component {
    constructor(props) {
        super(props)
        this.state = {
          dropDownUser: false,
        }
      }
    
      componentWillMount() {
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
        const { dropDownUser } = this.state;
        return (
            <div>
                <Header showDropDown={this.showDropDown} hideDropDown={this.hideDropDown} dropDownUser={dropDownUser} />
                <BillBoard data={this.props.location.state} />
                <Footer />
            </div>
        )
    }

}

export default AddBillboards;