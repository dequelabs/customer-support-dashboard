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
            value = 'Bug';
        } else if(type === '10006') {
            value = 'Support Request';
        } else if(type === '10009') {
            value = 'Feature Request';
        }

        return (
            <span>
                {value}
            </span> 
        )
    }
}