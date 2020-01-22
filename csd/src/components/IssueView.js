import React, { Component }from 'react';
import Grid from '@material-ui/core/Grid';
import { Link, } from 'cauldron-react';
import '../App.css';

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
           
                <Grid container spacing={1}>
                    <Grid item xs={3}>
                        
                            <Link href={'/detail/'+this.state.issueId}>
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
          

            // <TableRow >
            //     <Grid container spacing={1} className='TableElement'>
            //         <Grid item xs={3}>
            //             <TableCell>
            //                 <Link>
            //                     {this.state.summary}
            //                 </Link>
            //             </TableCell>
            //         </Grid>
            //         <Grid item xs={2}>
            //             <TableCell>
            //                 {this.state.status}
            //             </TableCell>
            //         </Grid>
            //         <Grid item xs={2}>
            //             <TableCell>
            //                 {this.state.type}
            //             </TableCell>
            //         </Grid>
            //         <Grid item xs={3}>
            //             <TableCell>
            //                 {this.state.date}
            //             </TableCell>
            //         </Grid>
            //         <Grid item xs={2}>
            //             <TableCell>
            //                 {this.state.requester}
            //             </TableCell>
            //         </Grid>
            //     </Grid>
            // </TableRow>


            // <tr>
            //     <th scope='row'>SummaryEl</th>
            //     <td >StatusEl</td>
            //     <td >TypeEl</td>
            //     <td >DateEl</td>
            //     <td >RequesterEl</td>
            // </tr>
        );
    }
}