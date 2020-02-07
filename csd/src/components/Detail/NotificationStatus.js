import React, { Component }from 'react';
import '../../styles/detailView.css';
import { get, deletes, put} from '../../services/api';

export default class NotificationStatus extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            subscribed: null,
            issueRef: this.props.issueRef,
        }
    }

    statusName() {
        if (this.state.subscribed) {
            return "Notifications On"
        } else {
            return "Notifications Off"
        }
    }

    async changeStatus() {
        if (this.state.subscribed) {
            await deletes('request/'+this.state.issueRef+'/notification').then((result) => {
                //console.log(result)
            });
        } else {
            await put('request/'+this.state.issueRef+'/notification').then((result) => {
                //console.log(result)
            });
        }
        this.getStatus();
    }

    getStatus() {
        get('request/'+this.state.issueRef+'/notification').then((result) => {
            this.setState({
                subscribed: result.subscribed,
            })
        });
    }
    componentDidMount() {
        this.getStatus();
    }

    render() {
        
        return (
            <p className='Descriptor Text'>
                <span aria-live="polite" aria-atomic="true" aria-relevant="all">{this.statusName()}</span><br/>
                <button className = 'ChangeStatus' onClick={() => this.changeStatus()}>
                    Change Status
                </button>
            </p> 
        )
    }
}