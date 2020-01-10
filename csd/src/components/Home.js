import React, { Component }from 'react';
import { Button, } from 'cauldron-react';
import { Link, } from "react-router-dom";

import '../App.css';

document.title = "Deque Customer Support";

export default class Home extends Component {

    render() {
        return (
            <div className="App">
                <div className="App-Nav">
                    <Link to="/home">
                        <Button className="Esc-Btn" type="button">Home</Button>
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
            </div>
        );
    }
}