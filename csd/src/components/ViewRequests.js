import React, { Component } from 'react';
import { Button, } from 'cauldron-react';
import { Link, } from "react-router-dom";
import base64 from 'react-native-base64';

import '../App.css';

document.title = "Deque Customer Support";

export default class ViewRequests extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
          
        }
    }

    //attempts to make an authenticated request via basic auth using username and api key
    getRequests() {
        fetch('https://dequecsddev.atlassian.net/rest/servicedeskapi/request', {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + base64.encode("jonathan.thickens@deque.com:j0VEP5Ia8BngJnzcIm6pC00B"),
            'Accept': 'application/json',
            'Access-Control-Allow-Origin':'localhost:4000',
            'origin': 'https://dequecsddev.atlassian.net',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin'
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

    //attempts to make an unauthenticated request.
    getInfo() {
        fetch('https://dequecsddev.atlassian.net/rest/servicedeskapi/info', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Access-Control-Allow-Origin':'localhost:4000',
            'origin': 'https://dequecsddev.atlassian.net',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin'
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