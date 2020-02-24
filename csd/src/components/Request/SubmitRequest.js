import React, { Component }from 'react';
import { Redirect} from 'react-router-dom';
import { TextField, Select, Workspace, } from 'cauldron-react';
import axios from 'axios';
import { get } from '../../services/api'
import Grid from '@material-ui/core/Grid';
import '../../App.css';
import '../../styles/submitRequest.css';
import Header from '../Header';

export default class SubmitRequest extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      requestTypes: [],
      products: [],
      summaryError: null,
      descriptionError: null,
      requestInput: '',
      productInput: '',
      file: '',
      fileName: 'Choose File',
      uploadedFile: {},
      submitStatus: null,
      shouldRedirect: false,
      submitSuccess: null,
    }
  }

  sendData() {
    this.props.parentCallback(this.state.submitSuccess);
  }

  componentDidMount() {
    document.title = "Submit Request | Deque Systems";
    this.buildSelectOptions();
  }

  handleRedirect() {
    if (this.state.shouldRedirect) {
      this.sendData();
      return(
        <Redirect to="/home"/>
      );
    } else {
      return null;
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

  onChange = e => {
    this.setState({
        file: e.target.files[0],
        fileName: e.target.files[0].name
    });
  }

  async validate() {
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

      if (this.state.file) { 

        const formData = new FormData();
        formData.append('file', this.state.file);
        console.log(formData);

        axios.post('http://localhost:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(response => {
            console.log('post jira response success', response.status);
        }).catch(err => {
            console.log('async err catch:', err.response.status);
            console.log('async err catch:', err.response);
        })
        

      } else {
        console.log('post with no file');
      }

      // if (this.state.file) {

      //   const formData = new FormData();
      // formData.append('file', this.state.file);
      // try {
      //   await axios.post('http://localhost:3000/', formData, {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //     body: JSON.stringify(requestValues)
      //   });

      //   // post('requests', requestValues).then((result) => {
      //   //   this.setState({
      //   //       submitSuccess: result.ok,
      //   //       //submitSuccess: false,
      //   //       shouldRedirect: true,
      //   //   });
      //   // });

      // } catch (err) {
      //   // if (err.response.status === 500) {
      //   //   console.log('there was a problem with the server');
      //   // } else {
      //   //   console.log(err.response.data.msg);
      //   // }
      //   this.setState({
      //     submitSuccess: false,
      //     shouldRedirect: true,
      // });
      // }
        
      // } else {
      //   post('requests', requestValues).then((result) => {
      //     this.setState({
      //         submitSuccess: result.ok,
      //         shouldRedirect: true,
      //     });
      //   });
      // }
    }
  }
  
  render() {
      return (
        <div className="App">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
          <Header></Header>
          
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
                  autoFocus
                  required
                  label='Request Type'
                  value=''
                  options={this.state.requestTypes}
                  onSelect={selected => this.setState({
                    requestInput: selected.label
                  })}
                  className='Select'
                  id="RequestTypeSelect"
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
                  id="ProductSelect"
                />
                <TextField
                  required
                  label="Summary"
                  error={this.state.summaryError}
                  fieldRef={el => this.summaryInput = el}
                  className="OneLineInput"
                  id="SummaryInput"
                />
                <TextField 
                  required
                  multiline 
                  label="Description" 
                  error={this.state.descriptionError}
                  fieldRef={el => this.descriptionInput = el}
                  className="MultiLineInput"
                  id="DescriptionInput"
                />
                <TextField 
                  multiline 
                  label="Additional Info" 
                  fieldRef={el => this.additionalInfoInput = el}
                  className="MultiLineInput"
                  id="AdtlInfoInput"
                />
                <div className="dqpl-field-wrap">
                    <label className="dqpl-label" htmlFor="customFile">
                        Upload File <br/>
                        <input type="file" className="FileInput" id="customFile" onChange={this.onChange}/>
                    </label>
                </div>
                {this.submitMessage()}
                </form>     
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <button id="SubmitButton" className='FormSubmitButton' type="submit" onClick={() => {
                      this.validate();
                    }}>
                      Submit
                    </button>
                  </Grid>
                  <Grid item xs={6}>
                    <button id="CancelButton" className='FormSubmitButton' onClick={() => {
                      this.setState({
                        shouldRedirect: true
                      });
                      this.handleRedirect();
                    }}>
                      Cancel
                    </button>
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