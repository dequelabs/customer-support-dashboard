import React, { Component }from 'react';
import './App.css';
import 'typeface-roboto';
import { Button } from 'cauldron-react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
document.title = "Deque Customer Support";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/request">
            <Request />
          </Route>
          <Route path="/view">
            <View />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
  <div className="App">
     <div className="App-Nav">
      <Link to="/home">
        <Button className="Esc-Btn" type="button" onClick = {() => {
          console.log("return home");
          }}>Home</Button>
      </Link> 
    </div>
    <header className="App-header">
        Welcome to the Deque Customer Support Center!
    </header>
    <div className="App-body">
      <Link to="/request">
        <Button className="Esc-Btn" type="button">Submit Request</Button>
      </Link> 

      <Link to="/view">
        <Button className="Esc-Btn" type="button">View Requests</Button>
      </Link> 
    </div>     
  </div>);
}

function Request() {
  return (
    <div className="App">
      <div className="App-Nav">
        <Link to="/home">
          <Button className="Esc-Btn" type="button" onClick = {() => {
            console.log("return home");
          }}>Home</Button>
        </Link>
      </div>
      <header className="App-header">
        Deque Customer Support Center - Submit Request
    </header>
    </div>
  );
}

function View() {
  return (
    <div className="App">
      <div className="App-Nav">
        <Link to="/home">
          <Button className="Esc-Btn" type="button" onClick = {() => {
            console.log("return home");
          }}>Home</Button>
        </Link>
      </div>
      <header className="App-header">
        Deque Customer Support Center - View Requests
    </header>
    </div>
  );
}

export default App;


