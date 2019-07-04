import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';


//Components//
import Home from './Components/home';
import About from './Components/About Selmore/about';
import Header from './Components/header';
import Footer from './Components/footer';
import Advertising from './Components/Advertising Agency/advertising';
import Faq from './Components/Faq/faq';
import Seller from './Components/Seller/seller';
import Buyer from './Components/Buyer/buyer';
import Contactpage from './Components/Contact Page/contact';
import Sellerprofile from './Components/Seller Profile/sellerprofile';
import Billboardmardan from './Components/Billboard Mardan/billmardan';
// import Billboardmilitary from './Components/Billboard Military/billmilitary';
import Billboards from './Components/Billboards/billboards';
import Singposted from './Components/Singposted Listings/singposted';
import Bidding from './Components/Bidding/bidding';
import Billbidding from './Components/Billbidding/billbidding';
import Billofbidding1 from './Components/Billboard of bidding1/billofbidding';
import Popform from './Components/Popform/popform';
import './App.css';
import HomePanel7 from './Components/panel7';
import Login from './Components/Login Form/loginform';
import LogOut from './Components/LogOut/logOut'
import ProfileView from './Components/Profile/profile';
import { Provider } from 'react-redux';
import store from './store';
import AddBillboards from './Components/BillboardForm/addBillboards';
import Billboardmilitary from './Components/Billboard Military/billmilitary';
import MarketPlace from './Components/MarketPlace/marketPlace';
import Dashboard from './Components/Dashboard/dashboard';
import './App.css';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownUser: false
    }
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
    return (
      <div className='App'>
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <Route exact path="/" render={props => { return <Home {...props} showDropDown={this.showDropDown} dropDownUser={this.dropDownUser} hideDropDown={this.hideDropDown}/>}} 
              // component={Home}
              ></Route>
              <Route path="/about" render={props => { return <About {...props} showDropDown={this.showDropDown} dropDownUser={this.dropDownUser} hideDropDown={this.hideDropDown}/>}} 
              // component={About}
              ></Route>
              <Route path="/advertising_agency" render={props => { return <Advertising {...props} showDropDown={this.showDropDown} dropDownUser={this.dropDownUser} hideDropDown={this.hideDropDown}/>}}
              // component={Advertising}
              ></Route>
              <Route path="/faq" render={props => { return <Faq {...props} showDropDown={this.showDropDown} dropDownUser={this.dropDownUser} hideDropDown={this.hideDropDown}/>}}
              // component={Faq}
              ></Route>
              <Route path="/contact" render={props => { return <Contactpage {...props} showDropDown={this.showDropDown} dropDownUser={this.dropDownUser} hideDropDown={this.hideDropDown}/>}}
              // component={Contactpage}
              ></Route>
              <Route path="/bidding" render={props => { return <Bidding {...props} showDropDown={this.showDropDown} dropDownUser={this.dropDownUser} hideDropDown={this.hideDropDown}/>}}
              // component={Bidding}
              ></Route>
              <Route path="/bidding_karachi" render={props => { return <Billofbidding1 {...props} showDropDown={this.showDropDown} dropDownUser={this.dropDownUser} hideDropDown={this.hideDropDown}/>}}
              // component={Billofbidding1}
              ></Route>
              <Route path="/signin" render={props => { return <Login {...props} showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}/>}}
              // component={Login}
              ></Route>
              <Route path="/seller" render={props => { return <Seller {...props} showDropDown={this.showDropDown} dropDownUser={this.dropDownUser} hideDropDown={this.hideDropDown}/>}}
              // component={Seller}
              ></Route>
              <Route path="/buyer" render={props => { return <Buyer {...props} showDropDown={this.showDropDown} dropDownUser={this.dropDownUser} hideDropDown={this.hideDropDown}/>}}
              // component={Buyer}
              ></Route>
              <Route path="/city_bidding" render={props => { return <Billbidding {...props} showDropDown={this.showDropDown} dropDownUser={this.dropDownUser} hideDropDown={this.hideDropDown}/>}}
              // component={Billbidding}
              ></Route>
              <Route path="/billboard" render={props => { return <Billboardmardan {...props} showDropDown={this.showDropDown} dropDownUser={this.dropDownUser} hideDropDown={this.hideDropDown}/>}}
              // component={Billboardmardan}
              ></Route>
              <Route path="/profile" render={props => { return <ProfileView {...props} showDropDown={this.showDropDown} dropDownUser={this.dropDownUser} hideDropDown={this.hideDropDown}/>}}
              // component={ProfileView}
              ></Route>
              <Route path="/" render={props => { return <LogOut {...props} showDropDown={this.showDropDown} dropDownUser={this.dropDownUser} hideDropDown={this.hideDropDown}/>}}
              // component={LogOut}
              ></Route>
              <Route path="/list_add" render={props => { return <AddBillboards {...props} showDropDown={this.showDropDown} dropDownUser={this.dropDownUser} hideDropDown={this.hideDropDown}/>}}
              // component={AddBillboards}
              ></Route>
              <Route path='/billborad_Militry' render={props => { return <Billboardmilitary {...props} showDropDown={this.showDropDown} dropDownUser={this.dropDownUser} hideDropDown={this.hideDropDown}/>}}
              // component={Billboardmilitary}
              ></Route>
              <Route path='/market_place' render={props => { return <MarketPlace {...props} showDropDown={this.showDropDown} dropDownUser={this.dropDownUser} hideDropDown={this.hideDropDown}/>}}
              // component={MarketPlace}
              ></Route>
              <Route path='/dashboard' render={props => { return <Dashboard {...props} showDropDown={this.showDropDown} dropDownUser={this.dropDownUser} hideDropDown={this.hideDropDown}/>}}
              // component={Dashboard}
              ></Route>
            </div>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default Routes;
