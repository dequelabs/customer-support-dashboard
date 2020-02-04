import React, { Component }from 'react';
import '../../styles/detailView.css';
import { get, } from '../../services/api';

export default class SharedWith extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            reporter: this.props.reporter,
            sharedWith: [],
            issueRef: this.props.issueRef,
        }
    }

    getSharedUsers() {
        get('request/'+this.state.issueRef+'/participant').then((result) => {
            if(result.values.length > 0) {
                let shared = [];
                result.values.forEach(element => {
                    shared.push(element.displayName);
                });
                this.setState({
                    sharedWith: shared,
                });
            }
        });
    }

    sharedUsers() {
        if(this.state.sharedWith.length === 0) {
            return <span/>
        } else {
            let shared = [];
            let key = 0;
            this.state.sharedWith.forEach(element => {
                shared.push(
                    <span className='Content Text' key={key++}>
                        {element}
                    </span>
                );
            });
            return (
                <p className='Descriptor Text'>
                Shared With<br/>
                <span className='Content Text'>
                    {shared}
                </span>
            </p>
            );
        }
    }

    componentDidMount() {
        this.getSharedUsers();
    }

    render() {
        return (
            <span>
            <p className='Descriptor Text'>
                Reporter<br/>
                <span className='Content Text'>
                    {this.state.reporter}
                </span>
            </p>
            {this.sharedUsers()}
            </span>
        );
    }
}