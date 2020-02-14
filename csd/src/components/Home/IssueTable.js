import React, { Component, Fragment }from 'react';
import { Link, Loader } from 'cauldron-react';
import { getParam } from '../../services/api';
import IssueType from '../Utilities/IssueType'
import DateHandler from '../Utilities/DateHandler';
import '../../App.css';
import '../../styles/IssueTable.css';

export default class IssueTable extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            issues: null,
            params: props.params,
        }
    }

    

    async getIssues(params) {
        await getParam('request', params).then((result) => {
            if (!result.isLastPage) {
                console.log("FREAK OUT THIS ISNT THE LAST PAGE")
            }
            this.setState({
                issues: result.values,
            })
         });
    }
    
    componentDidMount() {
        this.getIssues(this.props.params);
    }

    shouldComponentUpdate(nextProps) {

        if (this.props.params !== nextProps.params) {
            this.getIssues(nextProps.params);
        }

        return true
    }

    render() {
       
        
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
                    <th scope='row'>
                        <Link href={'/detail/'+element.issueId}>
                            {element.requestFieldValues[1].value}
                        </Link>
                    </th>
                    <td>{element.issueKey}</td>
                    <td>{element.currentStatus.status}</td>
                    <td><IssueType type={element.requestTypeId}/></td>
                    <td><DateHandler date={element.createdDate.friendly}/></td>
                    <td>{element.reporter.displayName}</td>
                </tr>
            );
        });
            return (
                <Fragment>
                <table>
                    <thead>
                    <tr className='TableHead '>
                        <th scope="col">Summary</th>
                        <th scope="col">Key</th>
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
                <div className='PageControl BodyText'>
                    {this.state.params.page}
                </div>
                </Fragment>
            );
        }
    }
}