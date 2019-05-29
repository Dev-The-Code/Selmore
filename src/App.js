import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';


import Routes from './Routes';



class App extends Component {
  render() {
    return (
      <div>
          <Routes />
      </div>
    );
  }
}

export default App;
