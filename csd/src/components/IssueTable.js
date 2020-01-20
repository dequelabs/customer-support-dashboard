import React, { Component }from 'react';
import requests from '../assets/issues.json';
import '../App.css';
import ViewIssue from './ViewIssue';

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
            <div>
                {elements}
            </div>
        );
    }
}