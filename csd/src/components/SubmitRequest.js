import React, { Component }from 'react';
import { Button, Select, TextField, } from 'cauldron-react';
import { Link, } from "react-router-dom";

import '../App.css';

document.title = "Deque Customer Support";

export default class SubmitRequest extends Component {

    render() {
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
              <Select
                label='What Can We Help You With?'
                value=''
                onSelect={selected => console.log('Selected: ', selected)}
                options={[
                  { label: 'Provide Feedback' },
                  { label: 'Ask A Question' },
                  { label: 'Report A Problem' },
                  { label: 'Report A Severe Problem' },
                  { label: 'Request Training' },
                  { label: 'Request A Feature'},
                  { label: 'Other' }
                ]}
              />
            </div>
          );
    }
}