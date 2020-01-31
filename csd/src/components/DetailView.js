import React, { Component }from 'react';
import { TopBar, Workspace, TextField} from 'cauldron-react';
import Grid from '@material-ui/core/Grid';
import IssueType from './IssueType';
import '../App.css';
import '../styles/detailView.css'
import { get, post, } from '../services/api';

export default class DetailView extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            commentError: null,
            issueRef: window.location.pathname.split('/')[2],
            issue: null,
            issueComments: []
        }  
    }

    getIssueInfo() {
        get('request').then((result) => {
            result.values.forEach(element => {
                if(element.issueId === this.state.issueRef) {
                    console.log(element);
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
        if(this.state.issue.requestFieldValues[0].value !== '') {
            details.push(
                <p className='Descriptor Text' key={key++}>
                    Product <br/>
                    <span className='Content Text'>
                        {this.state.issue.requestFieldValues[0].value.value}
                    </span>
                </p>
            );
        }
        if(this.state.issue.requestFieldValues[2].value !== '') {
            details.push(
                <p className='Descriptor Text' key={key++}>
                    Description <br/>
                    <span className='Content Text'>
                        {this.state.issue.requestFieldValues[2].value}
                    </span>
                </p>
            );
        }
        if(this.state.issue.requestFieldValues[3].value !== '') {
            details.push(
                <p className='Descriptor Text' key={key++}>
                    Additional Info <br/>
                    <span className='Content Text'>
                        {this.state.issue.requestFieldValues[3].value}
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
                <p  className='Descriptor Text'key={key++}>
                    {element.author.displayName} - {element.created.friendly}<br/>
                    <span className='Content Text'>
                        {element.body}
                    </span>
                </p>
            );
        });
        return comments;
    }

    handleSubmit = e => {
        const commentEmpty = !this.commentInput.value.trim();
    
        if (commentEmpty) {
          e.preventDefault();
          this.setState({
            commentError: commentEmpty ? 'Can not submit empty comment.' : null,
          });
        }
        else {
            let commentDetails = {
                value:this.commentInput.value,
                requestId:this.state.issueRef
            }
            post('comments', commentDetails);    
        }  
    }

    componentDidMount() {
        this.getIssueInfo();
        this.getIssueComments();
        document.title = "View Request | Deque Systems";
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
            <div >
                <TopBar className='Header'>
                    <a href="http://www.deque.com" className='HomeLink'>
                        <img src="https://accessibility.deque.com/hubfs/logo-white.svg" width="100" alt="Link to Deque Home" title="Deque"></img>
                    </a>
                </TopBar>
                <Workspace className='Page'>
                    <Grid container spacing={0} >
                        <Grid item xs={12} md={8}>
                                <h1 className='HeadText'>
                                    {/* {this.state.issue.requestFieldValues[0].value} */}
                                </h1>
                                <div className='Details'>
                                    <p className='Content Text'>
                                        <span className='Descriptor Text'>{this.state.issue.reporter.displayName} </span> 
                                        Raised This
                                        <span className='Descriptor Text'> {this.state.issue.createdDate.friendly}</span>
                                    </p>
                                    <div >
                                        {this.detailBuilder()}
                                    </div>
                                </div>
                                <h2 className='SecondHead'>
                                    Follow Up:
                                </h2>
                                <div className='Comments'>
                                    {this.commentsBuilder()}
                                </div>
                                <form onSubmit={this.handleSubmit} noValidate>
                                    <TextField 
                                        multiline 
                                        label="Add Comment" 
                                        className='CommentInput'
                                        error={this.state.commentError}
                                        fieldRef={el => this.commentInput = el}
                                    />
                                    <button type='submit' className='SaveButton Text'>Save</button>
                                </form>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <h2 className='SecondHead'>
                                Status
                            </h2>
                            <div >
                                <p className='Descriptor Text'>
                                    Request type<br/> 
                                    <span className='Content Text'>
                                        <IssueType type={this.state.issue.requestTypeId}/>
                                    </span>
                                </p>
                                <p className='Descriptor Text'>
                                    Status<br/> 
                                    <span className='Content Text'>
                                        {this.state.issue.currentStatus.status}
                                    </span>
                                </p>
                                <p className='Descriptor Text'>
                                    Date Created<br/>
                                    <span className='Content Text'>
                                        {this.state.issue.createdDate.friendly}
                                    </span>
                                </p>
                                {/* <p className='Descriptor Text'>
                                    Shared With<br/>
                                        <span className='Content Text'>
                                            {this.state.issue.reporter.displayName}
                                        </span>
                                    </p>
                                <p className='Descriptor Text'>
                                    Notification Status<br/>
                                    <span className='Content Text'>
                                        Subscribed
                                    </span>
                                </p> */}
                                <p className='Descriptor Text'>
                                    Issue Key<br/> 
                                    <span className='Content Text'>
                                        {this.state.issue.issueKey}
                                    </span>
                                </p>
                            </div>
                        </Grid>
                    </Grid>
                </Workspace>
            </div>
            );
        }
    }
}