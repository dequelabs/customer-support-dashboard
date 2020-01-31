import React, { Component }from 'react';

export default class IssueType extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            type: props.type
        }
    }
    render() {

        let type = this.state.type;
        let value = '';

        if(type === '10008') {
            value = 'Report A Problem';
        } else if(type === '10006') {
            value = 'Request Training';
        } else if(type === '10009') {
            value = 'Request A Feature';
        }else if(type === '10012') {
            value = 'Provide Feedback';
        }else if(type === '10011') {
            value = 'Other';
        }else if(type === '10010') {
            value = 'Ask A Question';
        } else {
            value = type;
        }

        return (
            <span>
                {value}
            </span> 
        );
    }
}