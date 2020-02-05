import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, } from "react-router-dom";

import './App.css';
import Home from './components/Home/Home';
import SubmitRequest from './components/Request/SubmitRequest';
import LogIn from './components/Auth/LogIn'
import DetailView from './components/Detail/DetailView';

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        submitSuccess: null
    }
  }

  submitCallback = (submitStatus) => {
    this.setState({
      submitSuccess: submitStatus,
    })
  }
  
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/request"> <SubmitRequest parentCallback={this.submitCallback} /> </Route>
          <Route path="/detail"> <DetailView/> </Route>
          <Route path="/home"> <Home submitSuccess={this.state.submitSuccess}/> </Route>
          <Route path="/"> <LogIn/> </Route>
        </Switch>
      </Router>
    );
  }
}