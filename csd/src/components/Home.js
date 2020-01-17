import React, { Component }from 'react';
import { Button, Link, } from 'cauldron-react';
import Grid from '@material-ui/core/Grid';

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
                <div className='Header'>
                    <a href="http://www.deque.com" className='HomeLink'>
                        <img src="https://accessibility.deque.com/hubfs/logo-white.svg" width="100" alt="Deque" title="Deque"></img>
                    </a>
                </div>
                <body className='Col'>
                    <Grid container spacing={1}>
                        <Grid item xs={5}>
                            <div>
                                <h1>
                                    Deque Customer Support
                                </h1>
                                <p>
                                    Welcome to the Deque Customer support center. Here, you can raise a new customer support request, view the status of your pending requests, and modify any submitted requests
                                </p>
                                <p>
                                    Contact Support with any product questions you have or issues you encounter. Our Deque Support team will respond within 1 working day of receiving your request.
                                </p>
                                <h2>
                                    You can raise a Customer Support Request at the link below
                                </h2>
                                <Button>Make A Request</Button>
                            </div>
                        </Grid>
                        <Grid item xs={7}>
                            <div>
                                <h2>
                                    Open Requests
                                </h2>
                            </div>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <p>
                                        summary
                                    </p>
                                </Grid>
                                <Grid item xs={2}>
                                    <p>
                                        status
                                    </p>
                                </Grid>
                                <Grid item xs={2}>
                                    <p>
                                        type
                                    </p>
                                </Grid>
                                <Grid item xs={2}>
                                    <p>
                                        date
                                    </p>
                                </Grid>
                                <Grid item xs={2}>
                                    <p>
                                        requester
                                    </p>
                                </Grid>
                            </Grid>
                            <div>
                                loc of 'issues' react component (list of issues)
                            </div>
                        </Grid>
                    </Grid>
                </body>
            </div>
        );
    }
}