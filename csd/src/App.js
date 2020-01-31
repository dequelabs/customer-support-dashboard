import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import './App.css';
import Home from './components/Home';
import SubmitRequest from './components/SubmitRequest';
import ViewRequests from './components/ViewRequests';
import LogIn from './components/LogIn'
import DetailView from './components/DetailView';

export default class App extends Component {
  
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/request"> <SubmitRequest/> </Route>
          <Route path="/detail"> <DetailView/> </Route>
          <Route path="/view"> <ViewRequests/> </Route>
          <Route path="/home"> <Home/> </Route>
          <Route path="/"> <LogIn/> </Route>
        </Switch>
      </Router>
    );
  }
}