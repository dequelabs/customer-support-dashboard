import React, { Component }from 'react';
import {TextField, Select, TopBar, Workspace, } from 'cauldron-react';
import {post} from '../services/api'
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
      submitStatus: null,
    }
  }

  componentDidMount() {
    document.title = "Submit Request | Deque Systems";
  }

  submitMessage() {
    if (this.state.submitStatus === null) {
      return "";
    } else if (this.state.submitStatus === true) {
      return (<div className='SuccessMessage'>Thanks, We've recieved your request</div>);
    } else if (this.state.submitStatus === false) {
      return (<div className='FailMessage'>Missing required information - please complete all required fields</div>);
    }
  }

  validate = e => {
    const summaryEmpty = !this.summaryInput.value.trim();
    const descriptionEmpty = !this.descriptionInput.value.trim();

    if (summaryEmpty || descriptionEmpty) {
      e.preventDefault();
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
      // console.log("SUBMISSION DETAILS:");
      // console.log("Request Type:", this.state.requestInput);
      // console.log("Product:", this.state.productInput);
      // console.log("Summary:", this.summaryInput.value);
      // console.log("Description:", this.descriptionInput.value);
      // console.log("Additional Info:", this.additionalInfoInput.value);

      let requestValues = {
        type: this.state.requestInput,
        product: this.state.productInput,
        summary: this.summaryInput.value,
        description: this.descriptionInput.value,
        additional: this.additionalInfoInput.value,
      }

      post('requests', requestValues);



      this.setState({
        submitStatus: true,
      })
    }
    e.preventDefault();
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
                  options={[
                    { label: 'Provide Feedback' },
                    { label: 'Ask A Question' },
                    { label: 'Report A Problem' },
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
                  required
                  label='Product'
                  value=''
                  options={[
                    { label: 'Aget' },
                    { label: 'Amaze' },
                    { label: 'Attest Mobile 2.0' },
                    { label: 'Attest HTML' },
                    { label: 'aXe' },
                    { label: 'aXePro' },
                    { label: 'Deque University' },
                    { label: 'WorldSpace Assure' },
                    { label: 'WorldSpace Attest' },
                    { label: 'WorldSpace Comply' },
                    { label: 'Other' }
                  ]}
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
                <button className='FormSubmitButton' type="submit" >
                  Submit
                </button>
                </form>     
              </Grid>
            </Grid>
          </Workspace>
        </div>  
      );
    }
}



