import React, { Component }from 'react';
import { TopBar, Workspace, TextField, Loader, } from 'cauldron-react';
import Grid from '@material-ui/core/Grid';
import IssueType from '../Utilities/IssueType';
import DateHandler from '../Utilities/DateHandler';
import Header from '../Header';
import '../../App.css';
import '../../styles/detailView.css'
import { get, post, } from '../../services/api';
import NotificationStatus from './NotificationStatus';
import SharedWith from './SharedWith';

export default class DetailView extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            commentError: null,
            issueRef: window.location.pathname.split('/')[2],
            issue: null,
            issueComments: [],
        }  
    }

    getIssueInfo() {
        let found = false;
        get('request').then((result) => {
            result.values.forEach(element => {
                if(element.issueId === this.state.issueRef) {
                    found = true;
                    this.setState({
                        issue: element,
                    })
                } 
            });
            if(!found) {
                this.setState({
                    issue: false,
                })
            }
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
        if(this.state.issue.requestFieldValues[0].value) {
            details.push(
                <p className='Descriptor Text' key={key++}>
                    Product <br/>
                    <span className='Content Text'>
                        {this.state.issue.requestFieldValues[0].value.value}
                    </span>
                </p>
            );
        }
        if(this.state.issue.requestFieldValues[2].value) {
            details.push(
                <p className='Descriptor Text' key={key++}>
                    Description <br/>
                    <span className='Content Text'>
                        {this.state.issue.requestFieldValues[2].value}
                    </span>
                </p>
            );
        }
        if(this.state.issue.requestFieldValues[3].value) {
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
                <li  className='Descriptor Text'key={key++}>
                    {element.author.displayName} - <DateHandler date={element.created.friendly}/><br/>
                    <span className='Content Text'>
                        {element.body}
                    </span>
                </li>
            );
        });
        return <ul className='CommentList' >{comments}</ul>;
        //return comments;
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

        //if loading render loading page
        if (this.state.issue === null) {
            return(
                <div className="App">
                    <Header></Header>
                    <Workspace>
                        <Loader label="Loading..." />
                    </Workspace>
                </div>
            );
        //else, ticket found. render detail page
        }else if (this.state.issue === false) {
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
                                    {this.state.issue.requestFieldValues[1].value}
                                </h1>
                                <div className='Details'>
                                    <h2 className='ThirdHead'>
                                        Request Details
                                    </h2>
                                    <p className='Content Text'>
                                        <span className='Descriptor Text'>{this.state.issue.reporter.displayName} </span> 
                                        Raised This
                                        <span className='Descriptor Text'> <DateHandler date={this.state.issue.createdDate.friendly}/></span>
                                    </p>
                                    <div >
                                        {this.detailBuilder()}
                                    </div>
                                </div>
                                <h2 className='SecondHead'>
                                    Follow Up Comments:
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
                                        id='CommentField'
                                    />
                                    <button type='submit' id='SubmitCommentBtn' className='SaveButton Text'>Save</button>
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
                                        <DateHandler date={this.state.issue.createdDate.friendly}/>
                                    </span>
                                </p>
                                
                                <SharedWith issueRef= {this.state.issueRef} reporter={this.state.issue.reporter.displayName}/>
                                <NotificationStatus issueRef={this.state.issueRef}/>
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