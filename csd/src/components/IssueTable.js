import React, { Component }from 'react';
import requests from '../assets/issues.json';
import Grid from '@material-ui/core/Grid';
import '../App.css';
import ViewIssue from './IssueView';
import { TableBody, Table, TableHead, TableRow } from '@material-ui/core';

export default class IssueTable extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            length: requests.values.length,
            issues: requests.values,
        }
    }

    render() {
        let elements = [];
        this.state.issues.forEach(element => {
            elements.push(<ViewIssue
                issueId={element.issueId}
                key={element.issueId}
                type={element.requestTypeId}
                reference={element.issueKey}
                summary={element.requestFieldValues[0].value}
                status={element.currentStatus.status}
                requester={element.reporter.displayName}
                date={element.createdDate.friendly}
            ></ViewIssue>);
        });
        
        return (
            <Table>
                <TableHead>
                    <TableRow>
                        <Grid container spacing={1} >
                            <Grid item xs={3}>
                                <TableHead className='TableHead '>
                                    Summary
                                </TableHead>
                            </Grid>
                            <Grid item xs={2}>
                                <th className='TableHead'>
                                    Status
                                </th>
                            </Grid>
                            <Grid item xs={2}>
                                 <th className='TableHead'>
                                    Type
                                </th>
                            </Grid>
                            <Grid item xs={3}>
                                <th className='TableHead'>
                                    Date
                                </th>
                            </Grid>
                            <Grid item xs={2}>
                                <th className='TableHead'>
                                    Requester
                                </th>
                            </Grid> 
                        </Grid>
                    </TableRow>
                </TableHead>
                <TableBody className='Table'>
                    {elements}
                </TableBody>
            </Table>
        );
    }
}