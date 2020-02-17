import React, { Component }from 'react';

export default class NextPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            disabled: props.lastPage,
            page: props.page
        }
    }

    handleNext() {
        //calback for page +1
    }

    render() {

        if(this.state.disabled) {
            return (
                <button
                    onClick={() => {
                    }}
                >
                Next</button>
            );
        } else {
            return (
                <button
                onClick={() => {
                    this.props.pageCallback(this.state.page+1);
                }}
                >Next
                </button>
            );
        }
    }
}