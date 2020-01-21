import React, { Component }from 'react';
import Grid from '@material-ui/core/Grid';
import { Link, } from 'cauldron-react';
import '../App.css';
import {TableRow } from '@material-ui/core';

export default class IssueView extends Component {

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
            <TableRow >
                <Grid container spacing={1} className='TableElement'>
                    <Grid item xs={3}>
                        <Link>
                            {this.state.summary}
                        </Link>
                    </Grid>
                    <Grid item xs={2}>
                        
                            {this.state.status}
                        
                    </Grid>
                    <Grid item xs={2}>
                        
                            {this.state.type}
                        
                    </Grid>
                    <Grid item xs={3}>
                        
                            {this.state.date}
                        
                    </Grid>
                    <Grid item xs={2}>
                
                            {this.state.requester}
                        
                    </Grid>
                </Grid>
            </TableRow>
        );
    }
}