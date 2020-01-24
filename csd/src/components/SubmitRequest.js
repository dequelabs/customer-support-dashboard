import React, { Component }from 'react';
import {TextField, Select, TopBar, Workspace, } from 'cauldron-react';
import Grid from '@material-ui/core/Grid';
import '../App.css';
import '../styles/submitRequest.css'


export default class SubmitRequest extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      summaryError: null,
      descriptionError: null,
      requestInput: '',
      productInput: '',
    }
  }

  componentDidMount() {
    document.title = "Submit Request | Deque Systems";
  }

  validate = e => {
    //e.preventDefault();
    const summaryEmpty = !this.summaryInput.value.trim();
    const descriptionEmpty = !this.descriptionInput.value.trim();

    if (summaryEmpty || descriptionEmpty) {
      e.preventDefault();
    }

    this.setState({
      summaryError: summaryEmpty ? 'Please complete this required field.' : null,
      descriptionError: descriptionEmpty ? 'Please complete this required field.' : null,
    });
    
    if (summaryEmpty && descriptionEmpty) {
      this.summaryInput.focus();
      this.summaryInput.className = 'OneLineInput-invalid';
      this.descriptionInput.className = 'MultiLineInput-invalid';
    } else if (summaryEmpty) {
      this.summaryInput.focus();
      this.summaryInput.className = 'OneLineInput-invalid';
      this.descriptionInput.className = 'MultiLineInput';
    } else if (descriptionEmpty) {
      this.descriptionInput.focus();
      this.summaryInput.className = 'OneLineInput';
      this.descriptionInput.className = 'MultiLineInput-invalid';
    } else {
      this.summaryInput.className = 'OneLineInput';
      this.descriptionInput.className = 'MultiLineInput';
      console.log("SUBMISSION DETAILS:");
      console.log("Request Type:", this.state.requestInput);
      console.log("Product:", this.state.productInput);
      console.log("Summary:", this.summaryInput.value);
      console.log("Description:", this.descriptionInput.value);
      console.log("Additional Info:", this.additionalInfoInput.value);
      e.preventDefault();
    }
  }

    render() {
        return (
          <div className="App">
            <TopBar className='Header'>
              <a href="http://www.deque.com" className='HomeLink'>
                <img src="https://accessibility.deque.com/hubfs/logo-white.svg" width="100" alt="Link to Deque Home" title="Deque"></img>
              </a>
            </TopBar>
            <Workspace className='Col'>
              <Grid container spacing={0}>
                <Grid item xs={12} md={7}>
                  <h1 className='HeadText'>
                    How Can We Help?
                  </h1>
                  <p className='BodyText'>
                    Complete this form with your product or services questions. <br/>
                    Our Deque Support team will respond within 1 (one) working day of receiving your contact.
                  </p>
                </Grid>
                <Grid item xs={12} md={4}>
                  <p></p>
                <form onSubmit={this.validate} noValidate>
                  <Select
                    label='Request Type'
                    value=''
                    options={[
                      { label: 'Provide Feedback' },
                      { label: 'Ask A Question' },
                      { label: 'Report A Problem' },
                      { label: 'Report A Severe Problem' },
                      { label: 'Request Training' },
                      { label: 'Request A Feature'},
                      { label: 'Other' }
                    ]}
                    onSelect={selected => this.setState({
                      requestInput: selected.label
                    })}
                    className='Select'
                  />
                  <Select
                    label='Product'
                    value=''
                    options={[
                      { label: 'Test Product' },
                      { label: 'Other' }
                    ]}
                    onSelect={selected => this.setState({
                      productInput: selected.label
                    })}
                  />
                  <TextField
                    required
                    label="Summary"
                    error={this.state.summaryError}
                    fieldRef={el => this.summaryInput = el}
                    className="OneLineInput"
                  />
                  <TextField 
                    required
                    multiline 
                    label="Description" 
                    error={this.state.descriptionError}
                    fieldRef={el => this.descriptionInput = el}
                    className="MultiLineInput"
                    />
                  <TextField 
                    multiline 
                    label="Additional Info" 
                    fieldRef={el => this.additionalInfoInput = el}
                    className="MultiLineInput"
                    />
                  <button className='FormSubmitButton' type="submit" >Submit</button>
                </form>     
                </Grid>
              </Grid>
            </Workspace>
          </div>  
        );
    }
}



