import React, { Component } from 'react';
import { Button, } from 'cauldron-react';
import { Link, } from "react-router-dom";
import base64 from 'react-native-base64';

import '../App.css';

document.title = "Deque Customer Support";

export default class ViewRequests extends Component {

    getRequests() {
        fetch('https://dequecsddev.atlassian.net/rest/servicedeskapi/request', {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + base64.encode("jonathan.thickens@deque.com:j0VEP5Ia8BngJnzcIm6pC00B"),
            'Accept': 'application/json',
            'responseType':'application/json',
          },
        })
        .then(response => {
          const statusCode = response.status;
          const data = response.json();
          return Promise.all([statusCode, data]);
        })
        .then(([res, data]) => {
            console.log("response: "+res);
            console.log("data: "+data);
        })
        .catch(error => {
          console.log(error);
          return { name: "network error", description: "" };
        });
    }

    getInfo() {
        fetch('https://dequecsddev.atlassian.net/rest/servicedeskapi/info', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin':'localhost:4000',
          },
        })
        .then(response => {
          const statusCode = response.status;
          const data = response.json();
          return Promise.all([statusCode, data]);
        })
        .then(([res, data]) => {
            console.log("response: "+res);
            console.log("data: "+data);
        })
        .catch(error => {
          console.log(error);
          return { name: "network error", description: "" };
        });
    }
    
    constructor(props) {
        super(props);
    
        this.state = {
          
        }
    }

    componentDidMount() {
        document.title = "View Requests - Deque Customer Support";
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
                <h1>
                    Requests
                </h1>
                <div>
                <Button onClick={() => this.getRequests()}>Get Requests</Button>
                <Button onClick={() => this.getInfo()}>Get info</Button>
                </div>
            </div>
        );
    }
}