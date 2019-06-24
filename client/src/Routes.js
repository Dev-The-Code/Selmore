import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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
import BillBoardDetail from './Components/MarketPlace/billBoardDetails';

class Routes extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <Route exact path="/" component={Home}></Route>
              <Route path="/about" component={About}></Route>
              <Route path="/advertising_agency" component={Advertising}></Route>
              <Route path="/faq" component={Faq}></Route>
              <Route path="/contact" component={Contactpage}></Route>
              <Route path="/bidding" component={Bidding}></Route>
              <Route path="/bidding_karachi" component={Billofbidding1}></Route>
              <Route path="/signin" component={Login}></Route>
              <Route path="/seller" component={Seller}></Route>
              <Route path="/buyer" component={Buyer}></Route>
              <Route path="/city_bidding" component={Billbidding}></Route>
              <Route path="/billboard" component={Billboardmardan}></Route>
              <Route path="/profile" component={ProfileView}></Route>
              <Route path="/" component={LogOut}></Route>
              <Route path="/list_add" component={AddBillboards}></Route>
              <Route path = '/billborad_Militry' component = {Billboardmilitary}></Route>
              <Route path = '/market_place' component = {MarketPlace}></Route>
              <Route path = '/billBoardDetail' component = {BillBoardDetail}></Route>

            </div>
          </BrowserRouter>
        </Provider>
      </div>
    );
  }
}

export default Routes;
