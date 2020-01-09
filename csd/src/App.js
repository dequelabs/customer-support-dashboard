import React from 'react';
import './App.css';
import 'typeface-roboto';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col, Button} from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <div className="App-Nav">
        <button className="Esc-Btn" type="button">Home</button>
      </div>
      <header className="App-header">
          Welcome to the Deque Customer Support Center!
      </header>
      <div className="App-body">
        <button className="Nav-Btn" type="button">Submit Request</button>
        <button className="Nav-Btn" type="button">View Request</button>      
      </div>     
    </div>
  );
}

export default App;


