import React, { Component }from 'react';

export default class NextPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //disabled: props.lastPage,
            page: props.page
        }
    }

    render() {

        if(this.props.lastPage) {
            return (
                <button className='PageDisabled' aria-disabled={true} >
                    Next
                </button>
            );
        } else {
            return (
                <button
                    onClick={() => {
                        this.props.pageCallback(this.props.page+1);
                    }}
                    className='PageEnabled'
                    >
                    Next
                </button>
            );
        }
    }
}