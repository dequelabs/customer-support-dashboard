import React, { Component }from 'react';
import { Button, TopBar, Workspace, Link, } from 'cauldron-react';
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