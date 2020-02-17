import React, { Component }from 'react';
import { TextField, Select, Layout, Main, Toast, } from 'cauldron-react';
import { get} from '../../services/api'
import Grid from '@material-ui/core/Grid';
import IssueTable from './IssueTable';
import Header from '../Header';
import '../../App.css';
import '../../styles/home.css'
// import Footer from '../Footer';


export default class Home extends Component {

    componentDidMount() {
        document.title = "Support | Deque Systems";
        this.buildSelectOptions();
    }

    constructor(props) {
        super(props);

        this.state = {
            submitSuccess: props.submitSuccess,
            requestTypes: [],
            searchValue: '',
            statusValue: 'Any',
            creatorValue: 'Me',
            typeValue: 'Any',
            
        }
    }

    buildSelectOptions() {
        let requestTypeNames = [];
        get('requesttype').then((result) => {
          result.values.forEach(element => {
            if(element.name !== 'Email request') {
              requestTypeNames.push({ label: element.name }); 
            }
          });
        });
        requestTypeNames.push({ label: 'Any' }); 
        this.setState({
            requestTypes: requestTypeNames
        });
    }

    render() {
        return (
            <div>
                <Header></Header>
                <Layout>
                    <Main className='Page'>
                    <Toast
                        show={this.state.submitSuccess}
                        autoHide={5000}
                        type="confirmation"
                        >
                        Your Request Has Been Submitted
                    </Toast>
                    <Toast
                        show={this.state.submitSuccess === false}
                        autoHide={5000}
                        type="caution"
                        >
                        Create Request Failed, Try Again Later
                    </Toast>
                    <Grid container spacing={3} >
                        <Grid item xs={12} md={5}>
                            <h1 className='HeadText'>
                                Deque Customer Support
                            </h1>
                            <p className='BodyText'>
                                Welcome to the Deque Customer support center. Here, you can raise a new customer support request, view the status of your pending requests, or modify submitted requests.
                            </p>
                            <p className='BodyText'>
                                You can raise a Customer Support Request at the link below
                            </p>
                            <p className='ButtonContainer'>
                                <a href="/request" id='requestbtn' className='RequestLink' alt="Link to make new support request">
                                    Make a Request
                                </a>
                            </p>
                        </Grid>
                        <Grid item xs={12} md={7}>

                            <h2 className='SecondHead'>
                                View Requests
                            </h2>
                            {/* here goes the search and filter */}
                            <Grid container>
                                <Grid item xs={6} md={4}>
                                    <TextField
                                        label="Search"
                                        value={this.state.searchValue}
                                        onChange={value => this.setState({
                                            searchValue: value,
                                        })}
                                        className="OneLineInput"
                                        id="SummaryInput"
                                    />
                                </Grid>
                                <Grid item xs={6} md={4}>
                                    <Select
                                        label='Status'
                                        value={this.state.statusValue}
                                        options={[
                                            { label: 'Any' },
                                            { label: 'Open' },
                                            { label: 'Closed' }
                                          ]}
                                        onSelect={selected => this.setState({
                                            statusValue: selected.label
                                        })}
                                        className='Select'
                                        id="ProductSelect"
                                    />
                                </Grid>
                                {/* <Grid item xs={6} md={3}>
                                    <Select
                                        label='Creator'
                                        value='Me'
                                        options={[
                                            { label: 'Me' },
                                            { label: 'Anyone' }
                                          ]}
                                          onSelect={selected => this.setState({
                                            creatorValue: selected.label
                                        })}
                                        className='Select'
                                        id="ProductSelect"
                                    />
                                </Grid> */}
                                <Grid item xs={12} md={4}>
                                    <Select
                                        label='Type'
                                        value={this.state.typeValue}
                                        options={this.state.requestTypes}
                                        onSelect={selected => this.setState({
                                            typeValue: selected.label
                                        })}
                                        className='Select'
                                        id="ProductSelect"
                                    />
                                </Grid>
                            </Grid>
                            <IssueTable
                                params={{
                                    searchValue: this.state.searchValue,
                                    statusValue: this.state.statusValue,
                                    creatorValue: this.state.creatorValue,
                                    typeValue: this.state.typeValue,
                                }}
                            ></IssueTable>
                            
                        </Grid>
                    </Grid>
                </Main>
                </Layout>
            </div>
        );
    }
}