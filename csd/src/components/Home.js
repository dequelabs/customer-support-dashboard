import React, { Component }from 'react';
import { Button, } from 'cauldron-react';
import { Link, } from "react-router-dom";

import '../App.css';

export default class Home extends Component {

    componentDidMount() {
        document.title = "Home - Deque Customer Support";
    }

    constructor(props) {
        super(props);
    
        this.state = {
          
        }
    }
    
    render() {
        return (
            <div className="App">
                <div className="App-Nav">
                    <Link to="/home">
                        <Button className="Esc-Btn" type="button">Home</Button>
                    </Link> 
                </div>
                <h1 className="App-header">
                    Welcome to the Deque Customer Support Center!
                </h1>
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