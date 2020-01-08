import React from 'react';
import './App.css';
import logo from './assets/dq_2nd_logo.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to the Deque Customer Support Center!
        </p>
      </header>
      <p className="logo" id="html">
          <img src={logo} />
        </p>
    </div>
  );
}



export default App;
