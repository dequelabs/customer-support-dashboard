import React, { Component }from 'react';
import { TopBar, Workspace,} from 'cauldron-react';
import Grid from '@material-ui/core/Grid';
import '../App.css';
import requests from '../assets/issues.json';

export default class DetailView extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            issueRef: window.location.pathname.split('/')[2],
        }  
    }

    render() {

        let request = null;
        //retreive ticket object
        requests.values.forEach(element => {
            if(element.issueId === this.state.issueRef) {
                request = element;
            } 
        });

        console.log(request)

        //if ticket can't be found, render "not found" page
        if (request === null) {
            return(
                <div className="App">
                    <TopBar className='Header'>
                        <a href="http://www.deque.com" className='HomeLink'>
                            <img src="https://accessibility.deque.com/hubfs/logo-white.svg" width="100" alt="Link to Deque Home" title="Deque"></img>
                        </a>
                    </TopBar>
                    <Workspace>
                    <h1 className='HeadText'>
                        Unable to Load issue
                    </h1>
                    </Workspace>
                </div>
            );
        //else, ticket found. render detail page
        } else {
            return (
            <div className="App">
                <TopBar className='Header'>
                    <a href="http://www.deque.com" className='HomeLink'>
                        <img src="https://accessibility.deque.com/hubfs/logo-white.svg" width="100" alt="Link to Deque Home" title="Deque"></img>
                    </a>
                </TopBar>
                <Workspace className='Col'>
                    <Grid container spacing={1} >
                        <Grid item xs={8} >
                                <h1 className='HeadText'>
                                    Request: {request.requestFieldValues[0].value}
                                </h1>
                                <p className='BodyText'>
                                    Description: {request.requestFieldValues[1].value}
                                </p>
                                <h2 className='SecondHead'>
                                    Follow Up:
                                </h2>
                        </Grid>
                        <Grid item xs={4}>
                            <h2 className='SecondHead'>
                                Status
                            </h2>
                            <div className='BodyText'>
                                <p>Request type: {request.requestTypeId}</p>
                                <p>Status: {request.currentStatus.status}</p>
                                <p>Date Created: {request.createdDate.friendly}</p>
                                <p>Shared With: {}</p>
                                <p>Notification Status: {}</p>
                                <p>Issue Key: {request.issueKey}</p>
                            </div>
                        </Grid>
                    </Grid>
                </Workspace>
            </div>
            );

        }
    }
}