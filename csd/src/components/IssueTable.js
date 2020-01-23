import React, { Component }from 'react';
import { Link, } from 'cauldron-react';
import { get } from '../services/api';
import '../App.css';


export default class IssueTable extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            issues: []
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

        let elements = [];
        let key = 0;
        this.state.issues.forEach(element => {
            elements.push(
                <tr className='Table' key={++key}>
                    <td>
                        <Link href={'/detail/'+element.issueId}>
                            {element.requestFieldValues[0].value}
                        </Link>
                    </td>
                    <td>{element.currentStatus.status}</td>
                    <td>{element.requestTypeId}</td>
                    <td>{element.createdDate.friendly}</td>
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
                <tbody>{elements}</tbody>
            </table>
        );
    }
}