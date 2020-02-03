import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import './App.css';
import Home from './components/Home/Home';
import SubmitRequest from './components/Request/SubmitRequest';
import LogIn from './components/Auth/LogIn'
import DetailView from './components/Detail/DetailView';

export default class App extends Component {
  
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/request"> <SubmitRequest/> </Route>
          <Route path="/detail"> <DetailView/> </Route>
          <Route path="/home"> <Home/> </Route>
          <Route path="/"> <LogIn/> </Route>
        </Switch>
      </Router>
    );
  }
}