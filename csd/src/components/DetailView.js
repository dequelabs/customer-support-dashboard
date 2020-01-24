import React, { Component }from 'react';
import { TopBar, Workspace,} from 'cauldron-react';
import Grid from '@material-ui/core/Grid';
import '../App.css';
import { get, } from '../services/api';
import IssueType from './IssueType';

export default class DetailView extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            issueRef: window.location.pathname.split('/')[2],
            issue: null,
            issueComments: []
        }  
    }

    getIssueInfo() {
        get('request').then((result) => {
            result.values.forEach(element => {
                if(element.issueId === this.state.issueRef) {
                    this.setState({
                        issue: element,
                    })
                } 
            });
        });
    }

    getIssueComments() {
        get('request/'+this.state.issueRef+'/comment').then((result) => {
            this.setState({
                issueComments: result.values,
            })
         });
    }

    detailBuilder() {
        let details = [];
        let key = 0;
        if(this.state.issue.requestFieldValues[3].value !== '') {
            details.push(
                <p className='BodyText' key={key++}>
                    Product <br/>
                    <span>
                        {this.state.issue.requestFieldValues[3].value}
                    </span>
                </p>
            );
        }
        if(this.state.issue.requestFieldValues[1].value !== '') {
            details.push(
                <p className='BodyText' key={key++}>
                    Description <br/>
                    <span>
                        {this.state.issue.requestFieldValues[1].value}
                    </span>
                </p>
            );
        }
        if(this.state.issue.requestFieldValues[2].value !== '') {
            console.log()
            details.push(
                <p className='BodyText' key={key++}>
                    Additional Info <br/>
                    <span>
                        {this.state.issue.requestFieldValues[2].value}
                    </span>
                </p>
            );
        }
        return details
    }

    commentsBuilder() {
        let comments = [];
        let key = 0;
        this.state.issueComments.forEach(element => {
            comments.push(
                <p className='BodyText' key={key++}>
                    {element.author.displayName} {element.created.friendly}<br/>
                    <span>
                        {element.body}
                    </span>
                </p>
            );
        });
        return comments;
    }

    componentDidMount() {
        this.getIssueInfo();
        this.getIssueComments();
    }

    render() {

        //if ticket can't be found, render "not found" page
        if (this.state.issue === null) {
            return(
                <div className="App">
                    <TopBar className='Header'>
                        <a href="http://www.deque.com" className='HomeLink'>
                            <img src="https://accessibility.deque.com/hubfs/logo-white.svg" width="100" alt="Link to Deque Home" title="Deque"></img>
                        </a>
                    </TopBar>
                    <Workspace>
                    <h1 className='HeadText'>
                        Unable to Load issue
                    </h1>
                    </Workspace>
                </div>
            );

        //else, ticket found. render detail page
        } else {
            return (
            <div className="App">
                <TopBar className='Header'>
                    <a href="http://www.deque.com" className='HomeLink'>
                        <img src="https://accessibility.deque.com/hubfs/logo-white.svg" width="100" alt="Link to Deque Home" title="Deque"></img>
                    </a>
                </TopBar>
                <Workspace className='Col'>
                    <Grid container spacing={1} >
                        <Grid item xs={12} md={8}>
                                <h1 className='HeadText'>
                                    {this.state.issue.requestFieldValues[0].value}
                                </h1>
                                <p className='BodyText'>
                                    Request raised by {this.state.issue.reporter.displayName} {this.state.issue.createdDate.friendly}
                                </p>
                                <div>
                                    {this.detailBuilder()}
                                </div>
                                <h2 className='SecondHead'>
                                    Follow Up:
                                </h2>
                                <div>
                                    {this.commentsBuilder()}
                                </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h2 className='SecondHead'>
                                Status
                            </h2>
                            
                            <div className='BodyText'>
                                <p>Request type: <IssueType type={this.state.issue.requestTypeId}/></p>
                                <p>Status: {this.state.issue.currentStatus.status}</p>
                                <p>Date Created: {this.state.issue.createdDate.friendly}</p>
                                <p>Shared With: {this.state.issue.reporter.displayName}</p>
                                <p>Notification Status: Subscribed</p>
                                <p>Issue Key: {this.state.issue.issueKey}</p>
                            </div>
                        </Grid>
                    </Grid>
                </Workspace>
            </div>
            );

        }
    }
}