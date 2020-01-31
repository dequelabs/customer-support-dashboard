import React, { Component }from 'react';

export default class IssueType extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            date: props.date
        }
    }
    render() {

        let splitDate = this.state.date.split('/');

        if(splitDate.length !== 1) {

            let time = splitDate[2].split(' ');
            let cleanDate = splitDate[1] + ' ' + splitDate[0] + ' ' + time[1] + ' ' + time[2];

            return (<span>{cleanDate}</span>);
        } else {
            return (<span>{this.state.date}</span>);
        } 
    }
}