import React, { Component, Fragment }from 'react';
import { Link, Loader } from 'cauldron-react';
import { getParam } from '../../services/api';
import IssueType from '../Utilities/IssueType'
import DateHandler from '../Utilities/DateHandler';
import PrevPage from './PrevPage';
import NextPage from './NextPage';
import '../../App.css';
import '../../styles/IssueTable.css';

export default class IssueTable extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
            issues: null,
            params: props.params,
            page: 1,
            pageSize: 50,
            lastPage: true
        }
    }

    pageCallback = (pageNumber) => {
        this.setState({
          page: pageNumber,
        })
      }

    async getIssues(params, page, pageSize) {
        await getParam('request', params, page, pageSize).then((result) => {
            this.setState({
                issues: result.values,
                lastPage: result.isLastPage
            })
         });
    }
    
    componentDidMount() {
        this.getIssues(this.props.params, this.state.page, this.state.pageSize);
    }

    shouldComponentUpdate(nextProps, nextState) {

        if (this.props.params !== nextProps.params || this.state.page !== nextState.page) {
            this.setState({
                issues: null
            })
            this.getIssues(nextProps.params, nextState.page, this.state.pageSize);
        }

        return true
    }

    render() {
        
        if(this.state.issues === null) {
            return (
                <Loader label="Loading..." />
            );
        } else if (this.state.issues.length === 0) {
            return (
                <span className='BodyText'>
                    No Current Requests
                </span>
            );
        } else {
            let elements = [];
            let key = 0;
            this.state.issues.forEach(element => {
            elements.push(
                <tr key={++key}>
                    <th scope='row'>
                        <Link href={'/detail/'+element.issueId}>
                            {element.requestFieldValues[1].value}
                        </Link>
                    </th>
                    <td>{element.issueKey}</td>
                    <td>{element.currentStatus.status}</td>
                    <td><IssueType type={element.requestTypeId}/></td>
                    <td><DateHandler date={element.createdDate.friendly}/></td>
                    {/* <td>{element.reporter.displayName}</td> */}
                </tr>
            );
        });
            return (
                <Fragment>
                <table>
                    <thead>
                    <tr className='TableHead '>
                        <th scope="col">Summary</th>
                        <th scope="col">Key</th>
                        <th scope="col">Status</th>
                        <th scope="col">Type</th>
                        <th scope="col">Date</th>
                        {/* <th scope="col">Requester</th> */}
                    </tr>
                    </thead>
                    <tbody className='TableBody'>
                        {elements}
                    </tbody>
                </table>
                <div className='PageControl BodyText'>
                    <PrevPage page={this.state.page} pageCallback={this.pageCallback}/>
                    <span aria-live="polite" aria-atomic="true" aria-relevant="all" >
                    <span className='hidden'>
                        Page number 
                    </span>
                        {this.state.page}
                    </span> 
                    <NextPage page={this.state.page} lastPage={this.state.lastPage} pageCallback={this.pageCallback}/>
                </div>
                </Fragment>
            );
        }
    }
}