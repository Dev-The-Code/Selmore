import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';


//Components//
import MainPage from './Components/HomePage/homePage';
import About from './Components/About Selmore/about';
import Advertising from './Components/Advertising Agency/advertising';
import Faq from './Components/Faq/faq';
import Contactpage from './Components/Contact Page/contact';
import Bidding from './Components/Bidding/bidding';
import Billofbidding1 from './Components/Billboard of bidding1/billofbidding';
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
import AdminUser from './Components/Admin Users/adminUser';
import Carts from './Components/Carts of Book billboards/carts';
import RootPage from './Components/RootPage';
import './App.css';
import { PrivateRoute } from './Components/Login Form/PrivateRoute';
import { AdminAccess } from './Components/Login Form/AdminAccess';
import BrowseBillFromTopCities from './Components/BrowseBillFromTopCities/browseBillFromTopCities';


class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropDownUser: false,
      showHome: false,
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
              <AdminAccess exact path="/" component={RootPage}></AdminAccess>
              <PrivateRoute exact path="/home" component={MainPage}></PrivateRoute>
              <PrivateRoute exact path="/topCities_billboard" component={BrowseBillFromTopCities}></PrivateRoute>
              <PrivateRoute  path="/cart" component={Carts}></PrivateRoute>
              <PrivateRoute  path="/users" component={AdminUser}></PrivateRoute>
              <PrivateRoute  path="/megaSale" component={MegaSale}></PrivateRoute>
              <PrivateRoute  path="/megaDetail/:value" component={MegaDetail}></PrivateRoute>
              <PrivateRoute  path="/about" component={About}></PrivateRoute>
              <PrivateRoute  path="/advertising_agency" component={Advertising}></PrivateRoute>
              <PrivateRoute  path="/faq" component={Faq}></PrivateRoute>
              <PrivateRoute  path="/contact" component={Contactpage}></PrivateRoute>
              <PrivateRoute  path="/bidding" component={Bidding}></PrivateRoute>
              <PrivateRoute  path="/bidding_detail/:value" component={Billofbidding1}></PrivateRoute>
              <PrivateRoute  path="/signin" component={Login}></PrivateRoute>
              {/* <PrivateRoute  path="/seller" component={Seller}></PrivateRoute>
              <PrivateRoute  path="/buyer" component={Buyer}></PrivateRoute>
              <PrivateRoute  path="/billboard" component={Billboardmardan}></PrivateRoute> */}
              <PrivateRoute  path="/profile" component={ProfileView}></PrivateRoute>
              <PrivateRoute  path="/home" component={LogOut}></PrivateRoute>
              <PrivateRoute  path="/list_add" component={AddBillboards}></PrivateRoute>
              <PrivateRoute  path="/billborad_Militry" component={Billboardmilitary}></PrivateRoute>
              <PrivateRoute  path="/market_place" component={MarketPlace}></PrivateRoute>
              <PrivateRoute  path="/dashboard" component={Dashboard}></PrivateRoute>
             

              {/* <PrivateRoute exact path="/home"
                  render={props => {
                    return <Home {...props}
                      showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                      hideDropDown={this.hideDropDown} />
                  }}
                // component={Home}
                ></PrivateRoute> */}
              {/* <PrivateRoute path="/cart"
                render={props => {
                  return <Carts {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              ></PrivateRoute> */}

              {/* <Route path="/users"
                render={props => {
                  return <AdminUser {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              ></Route> */}
              {/* <Route path="/bidding_form"
                render={props => {
                  return <BidForm {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              ></Route>
              <Route path="/megaSale"
                render={props => {
                  return <MegaSale {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              ></Route> */}
              {/* <Route path="/megaDetail/:value"
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
              <Route path="/bidding_detail/:value"
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
              ></Route> */}
              {/* <Route path="/city_bidding"
                render={props => {
                  return <Billbidding {...props}
                    showDropDown={this.showDropDown} dropDownUser={this.dropDownUser}
                    hideDropDown={this.hideDropDown} />
                }}
              ></Route> */}
              {/* <Route path="/billboard"
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
              ></Route> */}
            </div>
          </BrowserRouter>
        </Provider>
      </div >
    );
  }
}

export default Routes;
