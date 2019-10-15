import React, { Component } from 'react';
import Header from './header';
import Banner from './banner';
import Panel0 from './panel0';
import Panel1 from './panel1';
import Panel2 from './panel2';
import Panel3 from './panel3';
import Panel4 from './panel4';
import Panel5 from './panel5';
import Panel6 from './panel6';
import Panel7 from './panel7';
import Footer from './footer';
import './home.css';

class Home extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    window.scrollTo(0, 0);
    console.log(window.scrollTo(0, 0) , 'window.scrollTo(0, 0)')
  }
  render() {
    return (
      <div>
        <Header showDropDown={this.props.showDropDown} hideDropDown={this.props.hideDropDown} dropDownUser={this.props.dropDownUser} />
        <Banner />
        <Panel0 />
        <Panel1 />
        <Panel2 />
        <Panel3 />
        <Panel4 />
        <Panel7 />
        <Panel5 />
        <Panel6 />
        <Footer />
      </div>
    );
  }
}

export default Home;
