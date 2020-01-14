import React, { Component }from 'react';
import { Button, Select, TextField, } from 'cauldron-react';
import { Link, } from "react-router-dom";

import '../App.css';

export default class SubmitRequest extends Component {

  constructor(props) {
    super(props);

    this.state = {
      summaryError: null,
      descError: null,
    }
  }

  componentDidMount() {
    document.title = "Submit Request - Deque Customer Support";
  }

    
    validate = e => {
        e.preventDefault();
        const summaryEmpty = !this.summaryInput.value.trim();
        const descEmpty = !this.descInput.value.trim();

        this.setState({
          summaryError: summaryEmpty ? 'Name must not be blank.' : null,
          descError: descEmpty ? 'Description must not be blank.' : null,
        });
    
        if (summaryEmpty) {
          this.summaryInput.focus();
        } else if (descEmpty) {
            this.descInput.focus();
        }
    }
      
    resetForm() {
      this.setState({
        summaryError: null,
        descError: null,
      });
    }

    render() {
        return (
          
            <div className="App">
              <title>
            sumbit request
          </title>
              <div className="App-Nav">
                <Link to="/home">
                  <Button className="Esc-Btn" type="button" >Home</Button>
                </Link>
              </div>
              <h1 className="App-header">
                    Welcome to the Deque Customer Support Center!
                </h1>
              
                <form onSubmit={this.validate} noValidate className="Submit">
                    <Select
                        label='What Can We Help You With?'
                        value=''
                        //onSelect={selected => console.log('Selected: ', selected)}
                        options={[
                            { label: 'Provide Feedback' },
                            { label: 'Ask A Question' },
                            { label: 'Report A Problem' },
                            { label: 'Report A Severe Problem' },
                            { label: 'Request Training' },
                            { label: 'Request A Feature'},
                            { label: 'Other' }
                        ]}/>
                    <TextField
                        required
                        id="summary"
                        label="Summary"
                        error={this.state.summaryError}
                        fieldRef={el => this.summaryInput = el}
                        />
                    <Select
                        label='Product'
                        value=''
                        //onSelect={selected => console.log('Selected: ', selected)}
                        options={[
                            { label: 'Test Product' },
                        ]}/>
                    <TextField 
                        required
                        multiline label="Description" 
                        error={this.state.descError}
                        fieldRef={el => this.descInput = el}/>
                    <Button type="submit">Submit</Button>
                    <Button onClick={() => this.resetForm()}>Clear</Button>
                </form>
                
            </div>
            
          );
    }
}