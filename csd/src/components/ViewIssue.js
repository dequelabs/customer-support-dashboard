import React, { Component }from 'react';
import Grid from '@material-ui/core/Grid';
//import requests from '../assets/issues.json';
import '../App.css';

export default class ViewIssue extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            issueId: props.issueId,
            type: props.type,
            reference: props.reference,
            summary: props.summary,
            status: props.status,
            requester: props.requester,
            date: props.date,
        }
    }


    render() {

        return (
            <div className="App">
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <div>
                            {this.state.summary}
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            {this.state.status}
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            {this.state.type}
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            {this.state.date}
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div>
                            {this.state.requester}
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}