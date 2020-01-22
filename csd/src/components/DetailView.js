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

        requests.values.forEach(element => {
            if(element.issueId === this.state.issueRef) {
                request = element;
            } 
        });

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
                                    Detail view
                                </h1>
                                <p className='bodyText'>
                                    ticketRef={request.issueId}
                                </p>
                        </Grid>
                        <Grid item xs={4}>
                            <h2 className='SecondHead'>
                                Status Elements
                            </h2>
                            
                        </Grid>
                    </Grid>
                </Workspace>
            </div>
            );

        }
    }
}