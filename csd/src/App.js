import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import './App.css';
import Home from './components/Home';
import SubmitRequest from './components/SubmitRequest';
import ViewRequests from './components/ViewRequests';

document.title = "Deque Customer Support";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/request"> <SubmitRequest/> </Route>
          <Route path="/view"> <ViewRequests/> </Route>
          <Route path="/"> <Home/> </Route>
        </Switch>
      </Router>
    );
  }
}




