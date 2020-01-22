import React, { Component }from 'react';
import { TopBar, Workspace,} from 'cauldron-react';
import Grid from '@material-ui/core/Grid';
import IssueTable from './IssueTable';
import '../App.css';

export default class Home extends Component {

    componentDidMount() {
        document.title = "Support | Deque Systems";
    }

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    jiraLogin() {
        console.log("attempting Jira Login");

        fetch('https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=PUh5rE3P6qbHlVTD4xHAivGCxpS3YW3r&scope=read%3Aservicedesk-request%20write%3Aservicedesk-request&redirect_uri=http%3A%2F%2Flocalhost%3A4000%2F&state=asdfghjkl&response_type=code&prompt=consent', {
            method: 'GET',
            headers: {
                'origin': 'https://dequecsddev.atlassian.net',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin'
            }
        })
        .then(response => {
            const statusCode = response.status;
            const data = response.json();
            return Promise.all([statusCode, data]);
        })
        .then(([res, data]) => {
            console.log(res);
            console.log(data);
        })
        .catch(error => {
            console.log(error);
            
        });
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
                    <Grid container spacing={1} >
                        <Grid item xs={5} >
                                <h1 className='HeadText'>
                                    Deque Customer Support
                                </h1>
                                <p className='BodyText'>
                                    Welcome to the Deque Customer support center. Here, you can raise a new customer support request, view the status of your pending requests, or modify submitted requests.
                                </p>
                                <h2 className='ThirdHead'>
                                    You can raise a Customer Support Request at the link below
                                </h2>
                                <a href="/request" className='RequestLink' alt="Link to make new support request">
                                    Make a Request
                                </a>
                                {/* <Button onClick={() => this.jiraLogin()}>log into jira</Button> */}
                        </Grid>
                        <Grid item xs={7}>
                            <h2 className='SecondHead'>
                                Open Requests
                            </h2>
                            <div >
                                <IssueTable></IssueTable>
                            </div>
                        </Grid>
                    </Grid>
                </Workspace>
            </div>
        );
    }
}