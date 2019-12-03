import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';


//Components//
import Home from './Components/home';
import About from './Components/About Selmore/about';
import Advertising from './Components/Advertising Agency/advertising';
import Faq from './Components/Faq/faq';
import Seller from './Components/Seller/seller';
import Buyer from './Components/Buyer/buyer';
import Contactpage from './Components/Contact Page/contact';
import Billboardmardan from './Components/Billboard Mardan/billmardan';
import Bidding from './Components/Bidding/bidding';
import Billbidding from './Components/Billbidding/billbidding';
import Billofbidding1 from './Components/Billboard of bidding1/billofbidding';
import BidForm from './Components/BiddingForm/bidForm';
import './App.css';
import Login from './Components/Login Form/loginform';
import LogOut from './Components/LogOut/logOut'
import ProfileView from './Components/Profile/profile';
import { Provider } from 'react-redux';
import store from './store';
import AddBillboards from './Components/BillboardForm/addBillboards';
import Billboardmilitary from './Components/Billboard Military/billmilitary';
import MegaSale from './Components/MegaSale/megaSale';
import MegaDetail from '../src/Components/MegaSaleDetail/megaDetail';
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
              <Route exact path="/"
                render={props => {
                  return <Home {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              // component={Home}
              ></Route>
              <Route exact path="/bidding_form"
                render={props => {
                  return <BidForm {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              ></Route>
              <Route exact path="/megaSale"
                render={props => {
                  return <MegaSale {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              ></Route>
              <Route exact path="/megaDetail"
                render={props => {
                  return <MegaDetail {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              ></Route>
              <Route path="/about"
                render={props => {
                  return <About {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              ></Route>
              <Route path="/advertising_agency"
                render={props => {
                  return <Advertising {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              ></Route>
              <Route path="/faq"
                render={props => {
                  return <Faq {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              ></Route>
              <Route path="/contact"
                render={props => {
                  return <Contactpage {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              ></Route>
              <Route path="/bidding"
                render={props => {
                  return <Bidding {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              ></Route>
              <Route path="/bidding_detail"
                render={props => {
                  return <Billofbidding1 {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              ></Route>
              <Route path="/signin"
                render={props => {
                  return <Login {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser} />
                }}
              ></Route>
              <Route path="/seller"
                render={props => {
                  return <Seller {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              ></Route>
              <Route path="/buyer"
                render={props => {
                  return <Buyer {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              ></Route>
              <Route path="/city_bidding"
                render={props => {
                  return <Billbidding {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              ></Route>
              <Route path="/billboard"
                render={props => {
                  return <Billboardmardan {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              ></Route>
              <Route path="/profile"
                render={props => {
                  return <ProfileView {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              ></Route>
              <Route path="/"
                render={props => {
                  return <LogOut {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              ></Route>
              <Route path="/list_add"
                render={props => {
                  return <AddBillboards {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              ></Route>
              <Route path='/billborad_Militry'
                render={props => {
                  return <Billboardmilitary {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              ></Route>
              {/* <Route path="/market_place" component={MarketPlace}></Route> */}

              <Route path='/market_place'

                render={props => {
                  return <MarketPlace {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              ></Route>
              <Route path='/dashboard'
                render={props => {
                  return <Dashboard {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              ></Route>
            </div>
          </BrowserRouter>
        </Provider>
      </div >
    );
  }
}

export default Routes;
