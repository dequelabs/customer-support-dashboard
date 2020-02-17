import React, { Component }from 'react';

export default class PrevPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: props.page,
        }
    }


    render() {

        if(this.props.page === 1) {
            return (
                <button
                    onClick={() => {
                    }}
                >
                Back</button>
            );
        } else {
            return (
                <button
                onClick={() => {
                    this.props.pageCallback(this.props.page-1);
                }}
                >
                Back
                </button>
            );
        }
    }
}