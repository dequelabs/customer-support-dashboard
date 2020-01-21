import React, { Component }from 'react';
import { Button, TextField, Select, TopBar, Workspace} from 'cauldron-react';
import Grid from '@material-ui/core/Grid';
import '../App.css';


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
    e.preventDefault();
    const summaryEmpty = !this.summaryInput.value.trim();
    const descriptionEmpty = !this.descriptionInput.value.trim();
    
    this.setState({
      summaryError: summaryEmpty ? 'Name must not be blank.' : null,
      descriptionError: descriptionEmpty ? 'Description must not be blank.' : null,
    });
    
    if (summaryEmpty) {
      this.summaryInput.focus();
    } else if (descriptionEmpty) {
      this.descriptionInput.focus();
    } else {
      console.log("valid, will sumbit");
      console.log("request type:", this.state.requestInput);
      console.log("product:", this.state.productInput);
      console.log("summary:", this.summaryInput.value);
      console.log("description:", this.descriptionInput.value);
      console.log("additional info:", this.additionalInfoInput.value);
      console.log();
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
              <Grid container spacing={1}>
                <Grid item xs={8}>
                  <h1>
                    How Can We Help?
                  </h1>
                  <p>
                    Complete this form with your product or services questions. Our Deque Support team will respond within 1 (one) working day of receiving your contact.
                  </p>
                </Grid>
                <Grid item xs={4}>
                  <p></p>
                <form onSubmit={this.validate} noValidate className="Submit">
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
                  />
                  <TextField 
                    required
                    multiline 
                    label="Description" 
                    error={this.state.descriptionError}
                    fieldRef={el => this.descriptionInput = el}
                    />
                  <TextField 
                    multiline 
                    label="Additional Info" 
                    fieldRef={el => this.additionalInfoInput = el}/>
                  <TextField 
                    multiline 
                    label="Attachment" />
                  <Button type="submit">Submit</Button>
                </form>     
                </Grid>
              </Grid>
            </Workspace>
          </div>  
        );
    }
}



