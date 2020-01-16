import React, { Component } from 'react';
import { Button, } from 'cauldron-react';
import Axios from 'axios';
import '../App.css';

export default class LogIn extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            
        }
    }

    oauthSignIn() {
        //let endpoint = 'https://auth.atlassian.com/authorize';
        let endpoint = 'https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=PUh5rE3P6qbHlVTD4xHAivGCxpS3YW3r&scope=read%3Aservicedesk-request%20write%3Aservicedesk-request&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2F&state=asdfghjkl&response_type=code&prompt=consent';
        let form = document.createElement('form');
        form.setAttribute('method', 'GET');
        form.setAttribute('action', endpoint);

        // let params = {
        //     audience: 'api.atlassian.com',
        //     client_id: 'PUh5rE3P6qbHlVTD4xHAivGCxpS3YW3r',
        //     scope: 'read:servicedesk-request',
        //     redirect_uri: 'http://localhost:4000/home',
        //     state: 'pass-through value',
        //     response_type: 'code',
        //     prompt: 'consent',
        // };

        // for (let p in params) {
        //     let input = document.createElement('input');
        //     input.setAttribute('type', 'hidden');
        //     input.setAttribute('name', p);
        //     input.setAttribute('value', params[p]);
        //     form.appendChild(input);
        // }
        document.body.appendChild(form);
        form.submit();
    };

    async getURL() {

        console.log("getting token from Jira");
        let axios = Axios.create();
        try {
            let config = {
                params: {
                    audience: 'api.atlassian.com',
                    client_id: 'PUh5rE3P6qbHlVTD4xHAivGCxpS3YW3r',
                    scope: 'read:servicedesk-request',
                    redirect_uri: 'http://localhost:4000/home',
                    state: 'pass-through value',
                    response_type: 'code',
                    prompt: 'consent',
                }
            }
            const response = await axios.get('https://auth.atlassian.com/authorize', config);
            //const response = await axios.get('https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=PUh5rE3P6qbHlVTD4xHAivGCxpS3YW3r&scope=read%3Aservicedesk-request%20write%3Aservicedesk-request&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2F&state=statestatestate&response_type=code&prompt=consent');
            console.log("response: ", response);
        } catch (error) {
            console.error("failed request:", error);
        }
    }

    render() {
        return(
            <div className="App">
                <h1>
                    Log In
                </h1>
                <Button onClick={() => this.getURL()}>
                    Sign In With Jira - api
                </Button>
                <Button onClick={() => this.oauthSignIn()}>
                Sign In With Jira  - url
                </Button>
            </div>
        )
    }
}