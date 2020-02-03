import React, { Component }from 'react';
import {Redirect} from 'react-router-dom';
import {TextField, Select, TopBar, Workspace, } from 'cauldron-react';
import {post, get} from '../../services/api'
import Grid from '@material-ui/core/Grid';
import '../../App.css';
import '../../styles/submitRequest.css'


export default class SubmitRequest extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      summaryError: null,
      descriptionError: null,
      requestInput: '',
      productInput: '',
      submitStatus: null,
      requestTypes: [],
      products: [],
      shouldRedirect: false,
    }
  }

  componentDidMount() {
    document.title = "Submit Request | Deque Systems";
    this.buildSelectOptions();
  }

  handleRedirect() {
    if (this.state.shouldRedirect) {
      return(
        <Redirect to="/home/success"/>
      );
    } else {
      return <span/>
    }
  }

  buildSelectOptions() {
    let productNames = [];
    let requestTypeNames = [];
    get('requesttype').then((result) => {
      result.values.forEach(element => {
        if(element.name !== 'Email request') {
          requestTypeNames.push({ label: element.name });
        }
      });
    });
    get('requesttypefield').then((result) => {
      result.requestTypeFields[0].validValues.forEach(element => {
        productNames.push({ label: element.label });
      });
    });
    this.setState({
      requestTypes: requestTypeNames,
      products: productNames
    })
  }

  submitMessage() {
    if (this.state.submitStatus === null) {
      return "";
    } else if (this.state.submitStatus === false) {
      return (<div className='FailMessage'>Missing required information - please complete all required fields</div>);
    }
  }

  validate() {
    const summaryEmpty = !this.summaryInput.value.trim();
    const descriptionEmpty = !this.descriptionInput.value.trim();

    if (summaryEmpty || descriptionEmpty) {
      this.setState({
        submitStatus: false,
      })
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

      let requestValues = {
        type: this.state.requestInput,
        product: this.state.productInput,
        summary: this.summaryInput.value,
        description: this.descriptionInput.value,
        additional: this.additionalInfoInput.value,
      }
      post('requests', requestValues);
      this.setState({
        shouldRedirect: true
      });
    }
  }
  
  render() {
      return (
        <div className="App">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
          <TopBar className='Header'>
            <a href="http://www.deque.com" className='HomeLink'>
              <img src="https://accessibility.deque.com/hubfs/logo-white.svg" width="100" alt="Link to Deque Home" title="Deque"></img>
            </a>
          </TopBar>
          <Workspace className='Page'>
            <Grid container spacing={2}>
              <Grid item xs={12} md={7}>
                <h1 className='HeadText'>
                  How Can We Help?
                </h1>
                <p className='BodyText'>
                  Complete this form with your product or services questions. <br/>
                  Our Deque Support team will respond within one working day of receiving your contact.
                </p>
              </Grid>
              <Grid item xs={12} md={4}>
                <p></p>
              <form onSubmit={this.validate} noValidate>
                <Select
                  required
                  label='Request Type'
                  value=''
                  options={this.state.requestTypes}
                  onSelect={selected => this.setState({
                    requestInput: selected.label
                  })}
                  className='Select'
                />
                <Select
                  required
                  label='Product'
                  value=''
                  options={this.state.products}
                  onSelect={selected => this.setState({
                    productInput: selected.label
                  })}
                  className='Select'
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
                {this.submitMessage()}
                </form>     
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <button className='FormSubmitButton' type="submit" onClick={() => this.validate()}>
                      Submit
                    </button>
                  </Grid>
                  <Grid item xs={6}>
                    <a href="/home">
                      <button className='FormSubmitButton' >
                        Cancel
                      </button>
                    </a>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {this.handleRedirect()}
          </Workspace>
        </div>  
      );
    }
}