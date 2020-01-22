import React, { Component }from 'react';
import requests from '../assets/issues.json';
import Grid from '@material-ui/core/Grid';
import '../App.css';
import IssueView from './IssueView';

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
            elements.push(<IssueView
                issueId={element.issueId}
                key={element.issueId}
                type={element.requestTypeId}
                reference={element.issueKey}
                summary={element.requestFieldValues[0].value}
                status={element.currentStatus.status}
                requester={element.reporter.displayName}
                date={element.createdDate.friendly}
            ></IssueView>);
        });
        
        return (
            <div>
                <Grid container spacing={1} className='TableHead '>
                    <Grid item xs={3}>
                      Summary
                    </Grid>
                    <Grid item xs={2}>
                        Status
                    </Grid>
                    <Grid item xs={2}>
                        Type
                     </Grid>
                    <Grid item xs={3}>
                        Date
                    </Grid>
                    <Grid item xs={2}>
                        Requester
                    </Grid> 
                </Grid>
                <div className='Table'>
                    {elements}
                </div>
                
            </div>
            


            // <Table>
            //     <TableHead>
            //         <TableRow>
            //             <Grid container spacing={1} >
            //                 <Grid item xs={3}>
            //                     <TableHead scope="col" className='TableHead '>
            //                         Summary
            //                     </TableHead>
            //                 </Grid>
            //                 <Grid item xs={2}>
            //                     <th scope="col" className='TableHead'>
            //                         Status
            //                     </th>
            //                 </Grid>
            //                 <Grid item xs={2}>
            //                      <th scope="col" className='TableHead'>
            //                         Type
            //                     </th>
            //                 </Grid>
            //                 <Grid item xs={3}>
            //                     <th scope="col" className='TableHead'>
            //                         Date
            //                     </th>
            //                 </Grid>
            //                 <Grid item xs={2}>
            //                     <th scope="col" className='TableHead'>
            //                         Requester
            //                     </th>
            //                 </Grid> 
            //             </Grid>
            //         </TableRow>
            //     </TableHead>
            //     <TableBody className='Table'>
            //         {elements}
            //     </TableBody>
            // </Table>


            // <table>
            //     <tr>
            //         <th scope="col">Summary</th>
            //         <th scope="col">Status</th>
            //         <th scope="col">Type</th>
            //         <th scope="col">Date</th>
            //         <th scope="col">Requester</th>
            //     </tr>
            //     {elements}
            // </table>
        );
    }
}