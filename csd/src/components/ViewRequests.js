import React, { Component } from 'react';
import { Button, } from 'cauldron-react';
import { Link, } from "react-router-dom";

import '../App.css';

document.title = "Deque Customer Support";

export default class ViewRequests extends Component {

    render() {
        return (
            <div className="App">
                <div className="App-Nav">
                    <Link to="/home">
                        <Button className="Esc-Btn" type="button">Home</Button>
                    </Link>
                </div>
                <header className="App-header">
                    Deque Customer Support Center - View Requests
                </header>
            </div>
        );
    }
}