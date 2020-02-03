import React, { Component }from 'react';
import { Link, Loader } from 'cauldron-react';
import { get } from '../../services/api';
import IssueType from '../Utilities/IssueType'
import DateHandler from '../Utilities/DateHandler';
import '../../App.css';
import '../../styles/IssueTable.css';


export default class IssueTable extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            issues: null
        }
    }

    getIssues() {
        get('request').then((result) => {
            this.setState({
                issues: result.values,
            })
         });
    }
    
    componentDidMount() {
        this.getIssues();
    }

    render() {
        this.getIssues();
        if(this.state.issues === null) {
            return (
                <Loader label="Loading..." />
            );
        } else if (this.state.issues.length === 0) {
            return (
                <span className='BodyText'>
                    No Open Requests
                </span>
            );
        } else {
            let elements = [];
            let key = 0;
            this.state.issues.forEach(element => {
            elements.push(
                <tr key={++key}>
                    <td>
                        <Link href={'/detail/'+element.issueId}>
                            {element.requestFieldValues[1].value}
                        </Link>
                    </td>
                    <td>{element.currentStatus.status}</td>
                    <td><IssueType type={element.requestTypeId}/></td>
                    <td><DateHandler date={element.createdDate.friendly}/></td>
                    <td>{element.reporter.displayName}</td>
                </tr>
            );
        });
            return (
                <table>
                    <thead>
                    <tr className='TableHead '>
                        <th scope="col">Summary</th>
                        <th scope="col">Status</th>
                        <th scope="col">Type</th>
                        <th scope="col">Date</th>
                        <th scope="col">Requester</th>
                    </tr>
                    </thead>
                    <tbody className='TableBody'>
                        {elements}
                    </tbody>
                </table>
            );
        }
    }
}